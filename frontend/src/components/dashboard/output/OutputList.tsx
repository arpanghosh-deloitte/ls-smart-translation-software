import { useState } from "react";
import { Box, Button, Chip, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { ReusableTable } from "../../shared/Table";
import {
  EditOutputModal,
  AddOutputModal,
  DeleteOutputModal,
} from "./OutputModals";
import { initialOutputs } from "./mockData";
import type { OutputData } from "./mockData";
import type { ColumnDef } from "@tanstack/react-table";

interface OutputListProps {
  packageId: string | null;
}

const OutputList = ({ packageId }: OutputListProps) => {
  const [outputs, setOutputs] = useState<OutputData[]>(
    packageId ? initialOutputs.filter(output => output.packageId === packageId) : initialOutputs
  );
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOutput, setSelectedOutput] = useState<OutputData | null>(
    null
  );

  const handleEdit = (output: OutputData) => {
    setSelectedOutput(output);
    setEditModalOpen(true);
  };

  const handleSaveOutput = (updatedOutput: OutputData) => {
    setOutputs((prev) =>
      prev.map((p) => (p.id === updatedOutput.id ? updatedOutput : p))
    );
  };

  const handleAddOutput = (newOutput: OutputData) => {
    setOutputs((prev) => [...prev, newOutput]);
  };

  const handleDelete = (output: OutputData) => {
    setSelectedOutput(output);
    setDeleteModalOpen(true);
  };

  const handleDeleteOutput = (id: string) => {
    setOutputs((prev) => prev.filter((p) => p.id !== id));
  };

  const outputColumns: ColumnDef<OutputData>[] = [
    { accessorKey: "id", header: "Output-ID", size: 100 },
    { accessorKey: "name", header: "Output-Name" },
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
        title="Manage Your Output"
        data={outputs}
        columns={outputColumns}
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
            Add Output
          </Button>
        }
      />

      <AddOutputModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddOutput}
      />

      <EditOutputModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        output={selectedOutput}
        onSave={handleSaveOutput}
      />

      <DeleteOutputModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        output={selectedOutput}
        onDelete={handleDeleteOutput}
      />
    </Box>
  );
};

export default OutputList;
