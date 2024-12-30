"use client";

import { ClientCard } from "@/components/client-card";
import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { apiUrl } from "@/apis/api";

interface Client {
  id: string;
  Name: string;
  Categories: string | null;
  TimeZone: string;
  Phones: string | null;
  AverageRating: string;
  GoogleMapsURL: string;
  Website: string;
  FullAddress: string;
  FeaturedImage: string;
}

export default function ClientsPage() {
  const [Clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchClients() {
    try {
      setIsLoading(true);
      const response = await axios.get<Client[]>(`${apiUrl}/api/get/clients`, {
        headers: {
          "ngrok-skip-browser-warning": "true", // Add the custom header
        },
      });

      setClients(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch clients. Please try again later.");
      console.error("Error fetching clients:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-6">
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Clients.map((client) => (
          <ClientCard
            key={client.id}
            name={client.Name}
            categories={
              client.Categories
                ? client.Categories.split(", ").map((c) => c.trim())
                : []
            }
            phone={client.Phones || ""}
            timeZone={client.TimeZone}
            rating={parseFloat(client.AverageRating) || 0}
            website={client.Website}
            address={client.FullAddress}
            image={client.FeaturedImage}
          />
        ))}
      </div>
    </div>
  );
}
