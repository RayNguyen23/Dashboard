"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiUrl } from "@/apis/api";
import { ProjectForm } from "@/components/ProjectForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ProjectCard } from "@/components/ProjectCard";
import { Plus } from "lucide-react";
import axios from "axios";

type Project = {
  id: string;
  name: string;
  status: "In Progress" | "Planning" | "Completed" | "On Hold";
  deadline: string;
  start_date: string;
  budget: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  progress_percent: string;
  created_at: string;
  updated_at: string;
};

type StatusCardProps = {
  title: string;
  value: number;
};

function StatusCard({ title, value }: StatusCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

// Function to calculate status counts
const calculateStatusCounts = (projects: Project[]) => {
  const counts = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === "In Progress").length,
    completed: projects.filter((p) => p.status === "Completed").length,
    onHold: projects.filter((p) => p.status === "On Hold").length,
  };
  return counts;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [statusCounts, setStatusCounts] = useState({
    total: 0,
    inProgress: 0,
    completed: 0,
    onHold: 0,
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  // Function to fetch projects from API
  async function fetchProjects() {
    try {
      const response = await fetch(`${apiUrl}/api/get/projects`);
      const data: Project[] = await response.json();
      const formattedData = data.map((project) => ({
        ...project,
        deadline: project.deadline.split("T")[0],
        start_date: project.start_date.split("T")[0],
        created_at: project.created_at.split("T")[0],
        updated_at: project.updated_at.split("T")[0],
      }));
      setProjects(formattedData);
      const counts = calculateStatusCounts(formattedData);
      setStatusCounts(counts);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  // Function to handle form opening
  const handleAddProject = () => {
    setIsFormOpen(true);
  };

  // Function to handle form closing
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  // Function to handle when a project is added
  const handleProjectAdded = () => {
    fetchProjects();
    setIsFormOpen(false);
  };

  // Function to handle project edit (not implemented)
  const handleEditProject = (id: string) => {
    // Implement edit functionality
    console.log("Edit project:", id);
  };

  // Function to handle project deletion
  const handleRemoveProject = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/api/delete/projects`, {
        data: {
          id,
        },
      });
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="min-h-screen space-y-8 p-4 md:p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track your project portfolio
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatusCard title="Total Projects" value={statusCounts.total} />
        <StatusCard title="In Progress" value={statusCounts.inProgress} />
        <StatusCard title="Completed" value={statusCounts.completed} />
        <StatusCard title="On Hold" value={statusCounts.onHold} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={handleEditProject}
            onRemove={handleRemoveProject}
          />
        ))}
      </div>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Create a new project by filling out the information below.
            </DialogDescription>
          </DialogHeader>
          <ProjectForm
            onClose={handleCloseForm}
            onProjectAdded={handleProjectAdded}
          />
        </DialogContent>
      </Dialog>
      <Button
        size="lg"
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg"
        onClick={handleAddProject}
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">Add New Project</span>
      </Button>
    </div>
  );
}
