import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const clients = [
  {
    id: 1,
    name: "TechCorp",
    industry: "Technology",
    status: "Active",
    projects: 3,
    totalRevenue: 75000,
  },
  {
    id: 2,
    name: "HealthPlus",
    industry: "Healthcare",
    status: "Active",
    projects: 1,
    totalRevenue: 30000,
  },
  {
    id: 3,
    name: "FashionHub",
    industry: "Retail",
    status: "Inactive",
    projects: 0,
    totalRevenue: 50000,
  },
  {
    id: 4,
    name: "ServicePro",
    industry: "Professional Services",
    status: "Active",
    projects: 2,
    totalRevenue: 45000,
  },
  {
    id: 5,
    name: "EduTech",
    industry: "Education",
    status: "Pending",
    projects: 1,
    totalRevenue: 15000,
  },
];

export default function ClientsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Button>Add New Client</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Active Projects</TableHead>
            <TableHead>Total Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.industry}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    client.status === "Active"
                      ? "success"
                      : client.status === "Inactive"
                      ? "secondary"
                      : "warning"
                  }
                >
                  {client.status}
                </Badge>
              </TableCell>
              <TableCell>{client.projects}</TableCell>
              <TableCell>${client.totalRevenue.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
