import React, { useState } from "react";
import { Box, Button, Chip, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { ReusableTable } from "../../shared/Table";
import { EditProjectModal } from "./ProjectModals";
import type { ColumnDef } from "@tanstack/react-table";

// 1. Define Data Type (Matches your screenshot columns)
interface ProjectData {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
}

// 2. Mock Data
const initialProjects: ProjectData[] = [
  {
    id: "1",
    name: "Project 1",
    status: "Active",
    createdDate: "2024-03-01",
    createdBy: "John Doe",
    updatedDate: "2024-03-01",
    updatedBy: "Jane Doe",
  },
  {
    id: "2",
    name: "Project 2",
    status: "Inactive",
    createdDate: "2024-03-02",
    createdBy: "Jane Doe",
    updatedDate: "2024-03-02",
    updatedBy: "John Doe",
  },
  {
    id: "3",
    name: "Project 3",
    status: "Active",
    createdDate: "2024-03-03",
    createdBy: "John Doe",
    updatedDate: "2024-03-03",
    updatedBy: "Jane Doe",
  },
  {
    id: "4",
    name: "Project 4",
    status: "Inactive",
    createdDate: "2024-03-04",
    createdBy: "Jane Doe",
    updatedDate: "2024-03-04",
    updatedBy: "John Doe",
  },
  {
    id: "5",
    name: "Project 5",
    status: "Active",
    createdDate: "2024-03-05",
    createdBy: "John Doe",
    updatedDate: "2024-03-05",
    updatedBy: "Jane Doe",
  },
];

const ProjectList = () => {
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleEdit = (project: ProjectData) => {
    setSelectedProject(project);
    setEditModalOpen(true);
  };

  const handleSaveProject = (updatedProject: ProjectData) => {
    setProjects(prev => 
      prev.map(p => p.id === updatedProject.id ? updatedProject : p)
    );
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
            // Customizing colors to match your screenshot (Active = Green-ish)
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
            onClick={() => console.log("Open Add Modal")}
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
      
      <EditProjectModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        project={selectedProject}
        onSave={handleSaveProject}
      />
    </Box>
  );
};

export default ProjectList;
