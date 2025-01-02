"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, DollarSign, Users, Building } from "lucide-react";
import { RevenueChart } from "@/components/revenue-chart";
import { ClientAcquisitionChart } from "@/components/client-acquisition-chart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { apiUrl } from "@/apis/api";

function formatCurrency(amount: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

export default function DashboardHome() {
  const [clients, setClients] = useState(null);
  const [projects, setProjects] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [leads, setLeads] = useState(null);

  useEffect(() => {
    // Fetch data for clients
    axios
      .get(`${apiUrl}/api/get/dashboard/clients`)
      .then((response) => setClients(response.data[0]["COUNT(*)"]))
      .catch((error) => console.error("Error fetching clients data:", error));

    // Fetch data for projects
    axios
      .get(`${apiUrl}/api/get/dashboard/projects`)
      .then((response) => setProjects(response.data[0]["COUNT(*)"]))
      .catch((error) => console.error("Error fetching projects data:", error));

    // Fetch data for revenue
    axios
      .get(`${apiUrl}/api/get/dashboard/revenue`)
      .then((response) => setRevenue(response.data[0]["SUM(amount)"]))
      .catch((error) => console.error("Error fetching revenue data:", error));

    // Fetch data for leads
    axios
      .get(`${apiUrl}/api/get/dashboard/leads`)
      .then((response) => setLeads(response.data[0]["COUNT(*)"]))
      .catch((error) => console.error("Error fetching leads data:", error));
  }, []);

  const router = useRouter();
  useEffect(() => {
    const getCookie = Cookies.get("IsLogin");
    if (getCookie != "true") {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clients !== null ? clients : "Loading..."}
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <Activity className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects !== null ? projects : "Loading..."}
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              +3 new this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {revenue !== null ? formatCurrency(revenue) : "Loading..."}
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              +2.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Building className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leads !== null ? leads : "Loading..."}
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              +5 from last week
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <RevenueChart />
        <ClientAcquisitionChart />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>Monthly revenue report generated</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
