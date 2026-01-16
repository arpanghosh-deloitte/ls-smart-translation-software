import React, { useState } from "react";
import { TextField, MenuItem, Box, Typography } from "@mui/material";
import { ReusableModal } from "../../shared/Modal";
import { useAuthStore } from "../../../store/authStore";
import {
  inputStyles,
  menuProps,
  generateOutputId,
  formatDate,
} from "./constants";
import type { OutputData } from "./mockData";

export type { OutputData };

interface AddOutputModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newOutput: OutputData) => void;
}

export const AddOutputModal: React.FC<AddOutputModalProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const handleSave = () => {
    if (!name.trim()) return;

    const currentUser = useAuthStore.getState().user?.name || "Unknown User";
    const currentDate = formatDate();

    const newOutput: OutputData = {
      id: generateOutputId(),
      name,
      status,
      createdDate: currentDate,
      createdBy: currentUser,
      updatedDate: currentDate,
      updatedBy: currentUser,
    };
    onAdd(newOutput);
    setName("");
    onClose();
  };

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      title="Add New Output"
      onSave={handleSave}
      saveLabel="Create"
    >
      <Box display="flex" flexDirection="column" gap={3} pt={1}>
        <TextField
          label="Output Name"
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

interface EditOutputModalProps {
  open: boolean;
  onClose: () => void;
  output: OutputData | null;
  onSave: (updatedOutput: OutputData) => void;
}

export const EditOutputModal: React.FC<EditOutputModalProps> = ({
  open,
  onClose,
  output,
  onSave,
}) => {
  const [localData, setLocalData] = useState<OutputData | null>(null);

  React.useEffect(() => {
    if (open && output) {
      setLocalData(output);
    }
  }, [open, output]);

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
      title="Edit Output"
      onSave={handleSave}
      saveLabel="Update"
    >
      <Box display="flex" flexDirection="column" gap={3} pt={1}>
        <TextField
          label="Output Name"
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
          SelectProps={{ MenuProps: menuProps }}
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
              "-webkit-text-fill-color": "#555",
            },
          }}
        />
      </Box>
    </ReusableModal>
  );
};

interface DeleteOutputModalProps {
  open: boolean;
  onClose: () => void;
  output: OutputData | null;
  onDelete: (id: string) => void;
}

export const DeleteOutputModal: React.FC<DeleteOutputModalProps> = ({
  open,
  onClose,
  output,
  onDelete,
}) => {
  const handleDelete = () => {
    if (output) {
      onDelete(output.id);
      onClose();
    }
  };

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      title="Delete Output"
      onSave={handleDelete}
      saveLabel="Delete"
    >
      <Typography color="text.primary">
        Are you sure you want to delete <strong>{output?.name}</strong>?
        <br />
        This action cannot be undone.
      </Typography>
    </ReusableModal>
  );
};
