import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

type ProjectCardProps = {
  project: {
    id: string;
    name: string;
    status: "In Progress" | "Planning" | "Completed" | "On Hold";
    deadline: string;
    description: string;
  };
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
};

export function ProjectCard({ project, onEdit, onRemove }: ProjectCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-4">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold tracking-tight">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <Badge
              className="px-2 py-1 text-xs font-medium"
              variant={
                project.status === "Completed"
                  ? "success"
                  : project.status === "In Progress"
                  ? "warning"
                  : project.status === "Planning"
                  ? "warning"
                  : "destructive"
              }
            >
              {project.status}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Due {new Date(project.deadline).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-2 border-t pt-4">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2"
            onClick={() => onEdit(project.id)}
          >
            <Edit2 className="h-4 w-4" />
            <span className="ml-2">Edit</span>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="h-8 px-2"
            onClick={() => onRemove(project.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="ml-2">Remove</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
