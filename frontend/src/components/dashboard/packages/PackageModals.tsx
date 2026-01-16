import React, { useState } from "react";
import { TextField, MenuItem, Box, Typography } from "@mui/material";
import { ReusableModal } from "../../shared/Modal";
import { useAuthStore } from "../../../store/authStore";
import {
  inputStyles,
  menuProps,
  generatePackageId,
  formatDate,
} from "./constants";
import type { PackageData } from "./mockData";

export type { PackageData };

interface AddPackageModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newPackage: PackageData) => void;
}

export const AddPackageModal: React.FC<AddPackageModalProps> = ({
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

    const newPackage: PackageData = {
      id: generatePackageId(),
      name,
      status,
      createdDate: currentDate,
      createdBy: currentUser,
      updatedDate: currentDate,
      updatedBy: currentUser,
    };
    onAdd(newPackage);
    setName("");
    onClose();
  };

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      title="Add New Package"
      onSave={handleSave}
      saveLabel="Create"
    >
      <Box display="flex" flexDirection="column" gap={3} pt={1}>
        <TextField
          label="Package Name"
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

interface EditPackageModalProps {
  open: boolean;
  onClose: () => void;
  package: PackageData | null;
  onSave: (updatedPackage: PackageData) => void;
}

export const EditPackageModal: React.FC<EditPackageModalProps> = ({
  open,
  onClose,
  package: pkg,
  onSave,
}) => {
  const [localData, setLocalData] = useState<PackageData | null>(null);

  React.useEffect(() => {
    if (open && pkg) {
      setLocalData(pkg);
    }
  }, [open, pkg]);

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
      title="Edit Package"
      onSave={handleSave}
      saveLabel="Update"
    >
      <Box display="flex" flexDirection="column" gap={3} pt={1}>
        <TextField
          label="Package Name"
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

interface DeletePackageModalProps {
  open: boolean;
  onClose: () => void;
  package: PackageData | null;
  onDelete: (id: string) => void;
}

export const DeletePackageModal: React.FC<DeletePackageModalProps> = ({
  open,
  onClose,
  package: pkg,
  onDelete,
}) => {
  const handleDelete = () => {
    if (pkg) {
      onDelete(pkg.id);
      onClose();
    }
  };

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      title="Delete Package"
      onSave={handleDelete}
      saveLabel="Delete"
    >
      <Typography color="text.primary">
        Are you sure you want to delete <strong>{pkg?.name}</strong>?
        <br />
        This action cannot be undone.
      </Typography>
    </ReusableModal>
  );
};
