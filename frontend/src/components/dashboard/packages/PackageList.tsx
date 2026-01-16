import { useState } from "react";
import { Box, Button, Chip, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { ReusableTable } from "../../shared/Table";
import {
  EditPackageModal,
  AddPackageModal,
  DeletePackageModal,
} from "./PackageModals";
import { initialPackages } from "./mockData";
import type { PackageData } from "./mockData";
import type { ColumnDef } from "@tanstack/react-table";

interface PackageListProps {
  projectId: string | null;
  onViewOutput: (packageId: string) => void;
}

const PackageList = ({ projectId, onViewOutput }: PackageListProps) => {
  const [packages, setPackages] = useState<PackageData[]>(
    projectId ? initialPackages.filter(pkg => pkg.projectId === projectId) : initialPackages
  );
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(
    null
  );

  const handleEdit = (pkg: PackageData) => {
    setSelectedPackage(pkg);
    setEditModalOpen(true);
  };

  const handleSavePackage = (updatedPackage: PackageData) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === updatedPackage.id ? updatedPackage : p))
    );
  };

  const handleAddPackage = (newPackage: PackageData) => {
    setPackages((prev) => [...prev, newPackage]);
  };

  const handleDelete = (pkg: PackageData) => {
    setSelectedPackage(pkg);
    setDeleteModalOpen(true);
  };

  const handleDeletePackage = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  const packageColumns: ColumnDef<PackageData>[] = [
    { accessorKey: "id", header: "Package-ID", size: 100 },
    { accessorKey: "name", header: "Package-Name" },
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
      id: "viewOutput",
      header: "View Output",
      cell: ({ row }) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => onViewOutput(row.original.id)}
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
          View Output
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
      <ReusableTable
        title="Manage Your Package"
        data={packages}
        columns={packageColumns}
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
            Add Package
          </Button>
        }
      />

      <AddPackageModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddPackage}
      />

      <EditPackageModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        package={selectedPackage}
        onSave={handleSavePackage}
      />

      <DeletePackageModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        package={selectedPackage}
        onDelete={handleDeletePackage}
      />
    </Box>
  );
};

export default PackageList;
