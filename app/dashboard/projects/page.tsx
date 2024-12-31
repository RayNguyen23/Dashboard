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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    client: "TechCorp",
    status: "In Progress",
    deadline: "2023-12-31",
  },
  {
    id: 2,
    name: "Mobile App Development",
    client: "HealthPlus",
    status: "Planning",
    deadline: "2024-03-15",
  },
  {
    id: 3,
    name: "E-commerce Platform",
    client: "FashionHub",
    status: "Completed",
    deadline: "2023-11-30",
  },
  {
    id: 4,
    name: "CRM Integration",
    client: "ServicePro",
    status: "On Hold",
    deadline: "2024-02-28",
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <Button>Add New Project</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {["Total Projects", "In Progress", "Completed", "On Hold"].map(
          (status) => (
            <Card key={status}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{status}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.floor(Math.random() * 20)}
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Project List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      {project.name}
                    </TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          project.status === "Completed"
                            ? "success"
                            : project.status === "In Progress"
                            ? "default"
                            : project.status === "Planning"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{project.deadline}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
