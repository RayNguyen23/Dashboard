import { Clock, Globe, Mail, MapPin, Phone, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ClientCardProps {
  id: string;
  name: string;
  categories: string[];
  phone: string;
  email?: string;
  timeZone: string;
  rating: number;
  website?: string;
  address?: string;
  image?: string;
  onRemove: (id: string) => void;
}

export default function ClientCard({
  id,
  name,
  categories,
  phone,
  email,
  timeZone,
  rating,
  website,
  address,
  image,
  onRemove,
}: ClientCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md h-full">
      <div className="relative">
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-sm backdrop-blur-sm">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{rating.toFixed(1)}</span>
        </div>
        {image ? (
          <div className="aspect-[2/1] overflow-hidden">
            <Image
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-[2/1] bg-gray-100" />
        )}
      </div>
      <div className="flex flex-col flex-grow p-4 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{name}</h3>
          <button
            onClick={() => onRemove(id)}
            className="text-red-500 hover:text-red-700 transition-colors"
            aria-label="Remove client"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
            >
              {category}
            </span>
          ))}
        </div>
        <hr className="border-gray-200" />
        <div className="space-y-2 text-sm flex-grow">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{timeZone}</span>
          </div>
          {(() => {
            const lastPhone = phone.split(", ").at(-1)?.trim(); // Get the last phone number and trim whitespace
            return lastPhone ? (
              <div key={lastPhone} className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <Link href={`tel:${lastPhone}`} className="hover:underline">
                  {lastPhone}
                </Link>
              </div>
            ) : null;
          })()}

          {email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <Link href={`mailto:${email}`} className="hover:underline">
                {email}
              </Link>
            </div>
          )}
          {address && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{address}</span>
            </div>
          )}
        </div>
        <div className="space-y-2 mt-auto">
          <Link
            href={`tel:${phone}`}
            className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Phone className="mr-2 h-4 w-4" />
            Call
          </Link>
          {website ? (
            <Link
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Globe className="mr-2 h-4 w-4" />
              Visit Website
            </Link>
          ) : (
            <div className="flex w-full items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white">
              <Globe className="mr-2 h-4 w-4" />
              Missing
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
