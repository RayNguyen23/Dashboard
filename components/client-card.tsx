"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Globe, MapPin, Star } from "lucide-react";

interface ClientCardProps {
  client: {
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
  };
}

export function ClientCard({ client }: ClientCardProps) {
  // Handle phone call by splitting the string into individual phone numbers
  const handlePhoneCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  // Handle sending email (assuming a basic format for the email address)
  const handleSendEmail = () => {
    window.location.href = `mailto:contact@${client.Website}`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="truncate text-xl md:text-2xl">
          {client.Name}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-md">
          <Image
            src={client.FeaturedImage}
            alt={client.Name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="sm:col-span-1 md:col-span-2 lg:col-span-1">
          <div className="grid gap-4">
            <div>
              <p className="text-sm font-medium">Categories</p>
              <p className="text-sm text-gray-500">
                {client.Categories
                  ? client.Categories.split(",").join(", ")
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Time Zone</p>
              <p className="text-sm text-gray-500">{client.TimeZone}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Average Rating</p>
              <p className="flex items-center text-sm text-gray-500">
                <Star className="mr-1 h-4 w-4 text-yellow-400" />
                {client.AverageRating}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Website</p>
              <a
                href={client.Website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-blue-500 hover:underline"
              >
                <Globe className="mr-1 h-4 w-4" />
                Visit Site
              </a>
            </div>
            <div>
              <p className="text-sm font-medium">Address</p>
              <a
                href={client.GoogleMapsURL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-blue-500 hover:underline"
              >
                <MapPin className="mr-1 h-4 w-4" />
                <span className="truncate">{client.FullAddress}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="sm:col-span-1 md:col-span-2 lg:col-span-1">
          <div className="flex flex-wrap gap-2">
            {/* Handle phone numbers */}
            {client.Phones
              ? client.Phones.split(",").map((phone, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePhoneCall(phone.trim())}
                    className="flex-grow sm:flex-grow-0"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    {phone.trim()}
                  </Button>
                ))
              : null}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSendEmail}
              className="flex-grow sm:flex-grow-0"
            >
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
