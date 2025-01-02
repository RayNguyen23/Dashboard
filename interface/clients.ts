export interface Client {
  id: string;
  name: string;
  industry: string;
  status: "Active" | "Inactive" | "Pending";
  active_projects: string;
  total_revenue: string;
  contact_name: string;
  email: string;
  phone: string;
  start_date: string;
  notes: string;
}
