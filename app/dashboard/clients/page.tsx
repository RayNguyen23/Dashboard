"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Trash2,
  Plus,
  Briefcase,
  DollarSign,
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  Edit,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AddClientForm } from "@/components/add-client-form";

interface Client {
  id: number;
  name: string;
  industry: string;
  status: "Active" | "Inactive" | "Pending";
  activeProjects: number;
  totalRevenue: number;
  contactName: string;
  email: string;
  phone: string;
  startDate: Date;
  notes: string;
}

const initialClients: Client[] = [
  {
    id: 1,
    name: "TechCorp",
    industry: "Technology",
    status: "Active",
    activeProjects: 3,
    totalRevenue: 75000,
    contactName: "John Doe",
    email: "john@techcorp.com",
    phone: "+1 (555) 123-4567",
    startDate: new Date("2022-01-15"),
    notes: "Expanding to new markets",
  },
  {
    id: 2,
    name: "HealthPlus",
    industry: "Healthcare",
    status: "Active",
    activeProjects: 1,
    totalRevenue: 30000,
    contactName: "Jane Smith",
    email: "jane@healthplus.com",
    phone: "+1 (555) 987-6543",
    startDate: new Date("2022-03-01"),
    notes: "Focusing on telemedicine solutions",
  },
  {
    id: 3,
    name: "FashionHub",
    industry: "Retail",
    status: "Inactive",
    activeProjects: 0,
    totalRevenue: 50000,
    contactName: "Alice Johnson",
    email: "alice@fashionhub.com",
    phone: "+1 (555) 246-8135",
    startDate: new Date("2021-11-10"),
    notes: "Rebranding in progress",
  },
  {
    id: 4,
    name: "ServicePro",
    industry: "Professional Services",
    status: "Active",
    activeProjects: 2,
    totalRevenue: 45000,
    contactName: "Bob Wilson",
    email: "bob@servicepro.com",
    phone: "+1 (555) 369-2580",
    startDate: new Date("2022-05-20"),
    notes: "Expanding service offerings",
  },
  {
    id: 5,
    name: "EduTech",
    industry: "Education",
    status: "Pending",
    activeProjects: 1,
    totalRevenue: 15000,
    contactName: "Eva Brown",
    email: "eva@edutech.com",
    phone: "+1 (555) 147-2589",
    startDate: new Date("2022-07-05"),
    notes: "Developing new e-learning platform",
  },
];

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [showAddForm, setShowAddForm] = useState(false);

  const removeClient = (id: number) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  const addClient = (newClient: Omit<Client, "id">) => {
    const id = Math.max(...clients.map((c) => c.id)) + 1;
    setClients([...clients, { ...newClient, id }]);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Client Management
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
          {clients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onRemove={removeClient}
            />
          ))}
        </div>
      </div>
      <Button
        className="fixed bottom-8 right-8 bg-black hover:bg-gray-800 text-white transition-colors duration-300 rounded-full shadow-lg"
        onClick={() => setShowAddForm(true)}
      >
        <Plus className="mr-2 h-4 w-4" /> Add New Client
      </Button>
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <AddClientForm
            onAdd={addClient}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}
    </div>
  );
}

function ClientCard({
  client,
  onRemove,
}: {
  client: Client;
  onRemove: (id: number) => void;
}) {
  const statusColors = {
    Active: "bg-green-100 hover:bg-green-200 text-green-800",
    Inactive: "bg-red-100 hover:bg-red-200 text-red-800",
    Pending: "bg-yellow-100 hover:bg-yellow-200 text-yellow-800",
  };

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl bg-white relative pb-16">
      <CardHeader className="bg-blue-600 p-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-white">
            {client.name}
          </CardTitle>
          <Badge
            className={`${
              statusColors[client.status]
            } text-xs font-semibold px-2 py-1 rounded-full transition-colors duration-200`}
          >
            {client.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <InfoItem icon={Briefcase} label="Industry" value={client.industry} />
          <InfoItem
            icon={DollarSign}
            label="Projects"
            value={client.activeProjects.toString()}
          />
          <InfoItem
            icon={DollarSign}
            label="Revenue"
            value={`$${client.totalRevenue.toLocaleString()}`}
          />
          <InfoItem
            icon={Calendar}
            label="Start Date"
            value={format(client.startDate, "MM/dd/yyyy")}
          />
        </div>
        <div className="mt-4">
          <h3 className="text-sm text-blue-500 font-medium text-gray-700 mb-2">
            Contact Details
          </h3>
          <div className="space-y-2">
            <InfoItem icon={User} label="Contact" value={client.contactName} />
            <InfoItem icon={Mail} label="Email" value={client.email} />
            <InfoItem icon={Phone} label="Phone" value={client.phone} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 flex flex-col gap-2">
        <div className="w-full">
          <InfoItem icon={FileText} label="Notes" value={client.notes} />
        </div>
      </CardFooter>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50">
        <div className="flex justify-between items-center">
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
        </div>
      </div>
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
    <div className="flex items-center text-sm">
      <Icon className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
      <div className="flex-grow">
        <span className="font-medium text-gray-700">{label}:</span>
        <span className="ml-1 text-gray-600 break-words">{value}</span>
      </div>
    </div>
  );
}
