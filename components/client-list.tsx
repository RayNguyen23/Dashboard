"use client";
import { ClientCard } from "@/components/client-card";
import { useState, useEffect } from "react";
import axios from "axios";

interface Client {
  id: string;
  Name: string;
  Categories: string | null; // Allow null or undefined for categories
  TimeZone: string;
  Phones: string | null; // Allow null or undefined for phones
  AverageRating: string;
  GoogleMapsURL: string;
  Website: string;
  FullAddress: string;
  FeaturedImage: string;
}

export function ClientList() {
  const [mockClients, setMockClients] = useState<Client[]>([]);

  async function fetchData() {
    const response = await axios.get("http://localhost:3300/api/get/clients");
    setMockClients(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {mockClients.map((client) => (
        <ClientCard key={client.id} client={client} />
      ))}
    </div>
  );
}
