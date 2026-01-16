import { useState } from "react";
import { Box, Button, Chip, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { ReusableTable } from "../../shared/Table";
import {
  EditProjectModal,
  AddProjectModal,
  DeleteProjectModal,
} from "./ProjectModals";
import { initialProjects } from "./mockData";
import type { ProjectData } from "./mockData";
import type { ColumnDef } from "@tanstack/react-table";

interface ProjectListProps {
  onViewPackages: (projectId: string) => void;
}

const ProjectList = ({ onViewPackages }: ProjectListProps) => {
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );

  const handleEdit = (project: ProjectData) => {
    setSelectedProject(project);
    setEditModalOpen(true);
  };

  const handleSaveProject = (updatedProject: ProjectData) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
  };

  const handleAddProject = (newProject: ProjectData) => {
    setProjects((prev) => [...prev, newProject]);
  };

  const handleDelete = (project: ProjectData) => {
    setSelectedProject(project);
    setDeleteModalOpen(true);
  };

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const projectColumns: ColumnDef<ProjectData>[] = [
    { accessorKey: "id", header: "Project-ID", size: 100 },
    { accessorKey: "name", header: "Project-Name" },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const status = info.getValue() as string;
        return (
          <Chip
            label={status}
            size="small"
            color={status === "Active" ? "success" : "default"}
            variant={status === "Active" ? "filled" : "outlined"}
            sx={{ fontWeight: 500 }}
          />
        );
      },
    },
    { accessorKey: "createdDate", header: "Created-Date" },
    { accessorKey: "createdBy", header: "Created-By" },
    { accessorKey: "updatedDate", header: "Last-Updated-Date" },
    { accessorKey: "updatedBy", header: "Last-Updated-By" },
    {
      id: "viewPackages",
      header: "View Packages",
      cell: ({ row }) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => onViewPackages(row.original.id)}
          sx={{
            textTransform: "none",
            fontSize: "0.75rem",
            color: "#000",
            borderColor: "#86BC25",
            "&:hover": {
              borderColor: "#86BC25",
              backgroundColor: "rgba(134, 188, 37, 0.1)",
            },
          }}
        >
          View Packages
        </Button>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 } }}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              color="primary"
              sx={{ p: { xs: 0.5, sm: 1 } }}
              onClick={() => handleEdit(row.original)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              sx={{ p: { xs: 0.5, sm: 1 } }}
              onClick={() => handleDelete(row.original)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {/* 4. Use the Reusable Table Component */}
      <ReusableTable
        title="Manage Your Project"
        data={projects}
        columns={projectColumns}
        actionButtons={
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            size="small"
            onClick={() => setAddModalOpen(true)}
            sx={{
              fontWeight: 600,
              textTransform: "none",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              px: { xs: 1, sm: 2 },
            }}
          >
            Add Project
          </Button>
        }
      />

      <AddProjectModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddProject}
      />

      <EditProjectModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        project={selectedProject}
        onSave={handleSaveProject}
      />

      <DeleteProjectModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        project={selectedProject}
        onDelete={handleDeleteProject}
      />
    </Box>
  );
};

export default ProjectList;
