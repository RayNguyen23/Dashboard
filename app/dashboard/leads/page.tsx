import ClientList from "@/components/leads-list";

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Leads</h1>
      <ClientList />
    </div>
  );
}
