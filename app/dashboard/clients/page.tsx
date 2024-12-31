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
import { Trash2 } from "lucide-react";

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

  const removeClient = (id: number) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Button>Add New Client</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} onRemove={removeClient} />
        ))}
      </div>
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
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{client.name}</CardTitle>
        <Badge
          variant={
            client.status === "Active"
              ? "success"
              : client.status === "Inactive"
              ? "destructive"
              : "warning"
          }
        >
          {client.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="font-semibold">Industry:</dt>
            <dd>{client.industry}</dd>
          </div>
          <div>
            <dt className="font-semibold">Active Projects:</dt>
            <dd>{client.activeProjects}</dd>
          </div>
          <div>
            <dt className="font-semibold">Total Revenue:</dt>
            <dd>${client.totalRevenue.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="font-semibold">Contact:</dt>
            <dd>{client.contactName}</dd>
          </div>
          <div>
            <dt className="font-semibold">Email:</dt>
            <dd>{client.email}</dd>
          </div>
          <div>
            <dt className="font-semibold">Phone:</dt>
            <dd>{client.phone}</dd>
          </div>
          <div>
            <dt className="font-semibold">Start Date:</dt>
            <dd>{format(client.startDate, "MM/dd/yyyy")}</dd>
          </div>
          <div>
            <dt className="font-semibold">Notes:</dt>
            <dd>{client.notes}</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter>
        <Button
          variant="destructive"
          onClick={() => onRemove(client.id)}
          className="w-full"
        >
          <Trash2 className="mr-2 h-4 w-4" /> Remove Client
        </Button>
      </CardFooter>
    </Card>
  );
}
