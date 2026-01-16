import React, { useState } from "react";
import { TextField, MenuItem, Box, Typography } from "@mui/material";
import { ReusableModal } from "../../shared/Modal";
import { useAuthStore } from "../../../store/authStore";
import {
  inputStyles,
  menuProps,
  generateProjectId,
  formatDate,
} from "./constants";
import type { ProjectData } from "./mockData";

export type { ProjectData };

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newProject: ProjectData) => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const handleSave = () => {
    if (!name.trim()) return; // Basic validation

    const currentUser = useAuthStore.getState().user?.name || "Unknown User";
    const currentDate = formatDate();

    const newProject: ProjectData = {
      id: generateProjectId(),
      name,
      status,
      createdDate: currentDate,
      createdBy: currentUser,
      updatedDate: currentDate,
      updatedBy: currentUser,
    };
    onAdd(newProject);
    setName("");
    onClose();
  };

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      title="Add New Project"
      onSave={handleSave}
      saveLabel="Create"
    >
      <Box display="flex" flexDirection="column" gap={3} pt={1}>
        <TextField
          label="Project Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={inputStyles}
        />
        <TextField
          label="Status"
          select
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
          sx={inputStyles}
          SelectProps={{ MenuProps: menuProps }}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
      </Box>
    </ReusableModal>
  );
};

interface EditProjectModalProps {
  open: boolean;
  onClose: () => void;
  project: ProjectData | null;
  onSave: (updatedProject: ProjectData) => void;
}

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  open,
  onClose,
  project,
  onSave,
}) => {
  const [localData, setLocalData] = useState<ProjectData | null>(null);

  React.useEffect(() => {
    if (open && project) {
      setLocalData(project);
    }
  }, [open, project]);

  const handleSave = () => {
    if (localData) {
      const currentUser = useAuthStore.getState().user?.name || "Unknown User";
      const currentDate = formatDate();

      onSave({
        ...localData,
        updatedDate: currentDate,
        updatedBy: currentUser,
      });
      onClose();
    }
  };

  if (!localData) return null;

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      title="Edit Project"
      onSave={handleSave}
      saveLabel="Update"
    >
      <Box display="flex" flexDirection="column" gap={3} pt={1}>
        <TextField
          label="Project Name"
          fullWidth
          value={localData.name}
          onChange={(e) => setLocalData({ ...localData, name: e.target.value })}
          sx={inputStyles}
        />
        <TextField
          label="Status"
          select
          fullWidth
          value={localData.status}
          onChange={(e) =>
            setLocalData({
              ...localData,
              status: e.target.value as "Active" | "Inactive",
            })
          }
          sx={inputStyles}
          SelectProps={{ MenuProps: menuProps }} // ✅ APPLY THE FIX HERE
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>

        <TextField
          label="Created By"
          fullWidth
          disabled
          value={localData.createdBy}
          sx={{
            ...inputStyles,
            opacity: 0.7,
            "& .MuiInputBase-input.Mui-disabled": {
              "-webkit-text-fill-color": "#555", // Ensure disabled text is legible
            },
          }}
        />
      </Box>
    </ReusableModal>
  );
};

// =========================================
// 3. DELETE PROJECT MODAL
// =========================================
interface DeleteProjectModalProps {
  open: boolean;
  onClose: () => void;
  project: ProjectData | null;
  onDelete: (id: string) => void;
}

export const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  open,
  onClose,
  project,
  onDelete,
}) => {
  const handleDelete = () => {
    if (project) {
      onDelete(project.id);
      onClose();
    }
  };

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      title="Delete Project"
      onSave={handleDelete}
      saveLabel="Delete"
    >
      <Typography color="text.primary">
        Are you sure you want to delete <strong>{project?.name}</strong>?
        <br />
        This action cannot be undone.
      </Typography>
    </ReusableModal>
  );
};
