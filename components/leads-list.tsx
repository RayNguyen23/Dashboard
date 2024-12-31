"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { apiUrl } from "@/apis/api";
import ClientCard from "@/components/client-card";
import { Client } from "@/interface/client";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 9;

  async function fetchClients() {
    try {
      const response = await axios.get<Client[]>(`${apiUrl}/api/get/leads`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      setClients(response.data);
      setFilteredClients(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch clients. Please try again later.");
      console.error("Error fetching clients:", err);
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const results = clients.filter(
      (client) =>
        client.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (client.Categories &&
          client.Categories.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredClients(results);
    setCurrentPage(1);
  }, [searchTerm, clients]);

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleRemoveClient = async (id: string) => {
    try {
      await axios.post(
        `${apiUrl}/api/delete/clients`,
        { id: id },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setClients(clients.filter((client) => client.id !== id));
    } catch (err) {
      console.error("Error removing client:", err);
      // You might want to show an error message to the user here
    }
  };

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
      <div className="mb-6 flex items-center">
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm mr-2 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-50">
          <Search className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {currentClients.map((client) => (
          <ClientCard
            key={client.id}
            id={client.id}
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
            onRemove={handleRemoveClient}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredClients.length / clientsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-4 py-2 rounded-md ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}
