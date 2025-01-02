"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trash2,
  Plus,
  Briefcase,
  DollarSign,
  User,
  Mail,
  Phone,
  Calendar,
  Edit,
  Search,
  X,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AddClientForm } from "@/components/add-client-form";
import { Client } from "@/interface/clients";
import { apiUrl } from "@/apis/api";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

function formatCurrency(amount: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchClients() {
    try {
      const response = await axios.get(`${apiUrl}/api/get/clients`);
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

  const removeClient = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/api/delete/clients`, {
        data: {
          id,
        },
      });

      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };
  const addClient = async (newClient: Omit<Client, "id">) => {
    await axios.post(`${apiUrl}/api/add/clients`, newClient);
    fetchClients();
    setShowAddForm(false);
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
          <h1 className="text-5xl font-extrabold text-blue-900 tracking-tight">
            Client Dashboard
          </h1>
          <div className="relative w-full sm:w-96">
            <Input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 w-full rounded-full shadow-md focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500"
              size={20}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 pb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredClients.map((client) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ClientCard client={client} onRemove={removeClient} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <Button
        className="fixed bottom-8 right-8 bg-black hover:bg-blue-700 text-white transition-colors duration-300 rounded-full shadow-lg text-lg px-6 py-3"
        onClick={() => setShowAddForm(true)}
      >
        <Plus className="mr-2 h-5 w-5" /> Add New Client
      </Button>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl"
            >
              <AddClientForm
                onAdd={addClient}
                onCancel={() => setShowAddForm(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ClientCard({
  client,
  onRemove,
}: {
  client: Client;
  onRemove: (id: string) => void;
}) {
  const statusColors = {
    Active: "bg-green-100 text-green-800",
    Inactive: "bg-red-100 text-red-800",
    Pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl bg-white relative">
      <CardHeader className="bg-blue-600 p-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-white">
            {client.name}
          </CardTitle>
          <Badge
            className={`${
              statusColors[client.status as keyof typeof statusColors]
            } text-xs font-semibold px-2 py-1 rounded-full transition-colors duration-200`}
          >
            {client.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <InfoItem icon={Briefcase} label="Industry" value={client.industry} />
          <InfoItem
            icon={DollarSign}
            label="Projects"
            value={client.active_projects}
          />
          <InfoItem
            icon={DollarSign}
            label="Revenue"
            value={formatCurrency(client.total_revenue)}
          />
          <InfoItem
            icon={Calendar}
            label="Start Date"
            value={client.start_date}
          />
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-3">
            Contact Details
          </h3>
          <div className="space-y-3">
            <InfoItem icon={User} label="Contact" value={client.contact_name} />
            <InfoItem icon={Mail} label="Email" value={client.email} />
            <InfoItem icon={Phone} label="Phone" value={client.phone} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="w-10 h-10">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Client</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Client</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button
          variant="destructive"
          onClick={() => onRemove(client.id)}
          className="bg-red-500 hover:bg-red-600 text-white transition-colors duration-300"
        >
          <Trash2 className="mr-2 h-4 w-4" /> Remove Client
        </Button>
      </CardFooter>
    </Card>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 text-sm sm:text-base break-words">
      <Icon className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
      <div className="flex-grow min-w-0">
        <span className="font-medium text-gray-700">{label}:</span>
        <span className="ml-2 text-gray-600 break-words">{value}</span>
      </div>
    </div>
  );
}
