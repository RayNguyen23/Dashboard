"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "bg-gray-700" : "hover:bg-gray-700";
  };

  return (
    <div
      className={`${
        open ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-800 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2 p-4">
            <li>
              <Link
                href="/dashboard"
                className={`flex items-center rounded-md p-2 ${isActive(
                  "/dashboard"
                )}`}
                onClick={onClose}
              >
                <Home className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/clients"
                className={`flex items-center rounded-md p-2 ${isActive(
                  "/dashboard/clients"
                )}`}
                onClick={onClose}
              >
                <Users className="mr-2 h-5 w-5" />
                Clients
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className={`flex items-center rounded-md p-2 ${isActive(
                  "/dashboard/settings"
                )}`}
                onClick={onClose}
              >
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
