import React, { useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";

interface ReusableTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  title?: string;
  actionButtons?: React.ReactNode;
}

export function ReusableTable<TData>(
  props: ReusableTableProps<TData>
): React.ReactElement {
  const { columns, data, title, actionButtons } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    state: { sorting, globalFilter, pagination },
  });

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
      }}
    >
      {(title || actionButtons) && (
        <Box
          sx={{
            p: { xs: 1, sm: 2 },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            gap: { xs: 1, sm: 0 },
            backgroundColor: "#fff",
          }}
        >
          {title && (
            <Typography
              variant="h6"
              fontWeight={600}
              color="#1a1a1a"
              sx={{
                mb: { xs: 1, sm: 0 },
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              {title}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {actionButtons}
            <IconButton
              sx={{ ml: { xs: 0, sm: 1 }, color: "#000" }}
              onClick={(e) => setFilterAnchorEl(e.currentTarget)}
            >
              <FilterListIcon />
            </IconButton>

            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={() => setFilterAnchorEl(null)}
              PaperProps={{
                sx: {
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
                  minWidth: 200,
                },
              }}
            >
              <Typography sx={{ px: 2, py: 1, fontWeight: 600, color: "#333" }}>
                Sort Options
              </Typography>
              <Divider />
              {columns.map((column) => {
                if (column.id === "actions") return null;
                const columnId =
                  "accessorKey" in column
                    ? (column as { accessorKey: string }).accessorKey
                    : column.id;
                const isCurrentSort = sorting[0]?.id === columnId;
                const sortDirection = sorting[0]?.desc ? "desc" : "asc";

                const isLastUpdateDateColumn =
                  (columnId?.toLowerCase().includes("last") &&
                    columnId?.toLowerCase().includes("update") &&
                    columnId?.toLowerCase().includes("date") &&
                    !columnId?.toLowerCase().includes("by")) ||
                  (String(column.header).toLowerCase().includes("last") &&
                    String(column.header).toLowerCase().includes("update") &&
                    String(column.header).toLowerCase().includes("date") &&
                    !String(column.header).toLowerCase().includes("by"));

                const isNameColumn =
                  !isLastUpdateDateColumn &&
                  (columnId?.toLowerCase().includes("name") ||
                    columnId?.toLowerCase().includes("by") ||
                    columnId?.toLowerCase().includes("updated") ||
                    String(column.header).toLowerCase().includes("name") ||
                    String(column.header).toLowerCase().includes("by") ||
                    String(column.header).toLowerCase().includes("updated"));

                const isDateColumn =
                  !isNameColumn &&
                  !isLastUpdateDateColumn &&
                  (columnId?.toLowerCase().includes("date") ||
                    columnId?.toLowerCase().includes("created") ||
                    String(column.header).toLowerCase().includes("date") ||
                    String(column.header).toLowerCase().includes("created"));

                const isStatusColumn =
                  columnId?.toLowerCase().includes("status") ||
                  String(column.header).toLowerCase().includes("status");

                return (
                  <Box key={columnId}>
                    <MenuItem
                      onClick={() => {
                        setSorting([{ id: columnId || "", desc: false }]);
                        setFilterAnchorEl(null);
                      }}
                      sx={{
                        backgroundColor:
                          isCurrentSort && sortDirection === "asc"
                            ? "rgba(134, 188, 37, 0.1)"
                            : "transparent",
                        "&:hover": { backgroundColor: "#f5f5f5" },
                      }}
                    >
                      <ListItemIcon>
                        <ArrowUpwardIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${column.header} (${
                          isLastUpdateDateColumn
                            ? "Old Date First"
                            : isDateColumn
                            ? "Old Date First"
                            : isNameColumn
                            ? "A-Z"
                            : isStatusColumn
                            ? "Active First"
                            : "Ascending"
                        })`}
                      />
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSorting([{ id: columnId || "", desc: true }]);
                        setFilterAnchorEl(null);
                      }}
                      sx={{
                        backgroundColor:
                          isCurrentSort && sortDirection === "desc"
                            ? "rgba(134, 188, 37, 0.1)"
                            : "transparent",
                        "&:hover": { backgroundColor: "#f5f5f5" },
                      }}
                    >
                      <ListItemIcon>
                        <ArrowDownwardIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${column.header} (${
                          isLastUpdateDateColumn
                            ? "New Date First"
                            : isDateColumn
                            ? "New Date First"
                            : isNameColumn
                            ? "Z-A"
                            : isStatusColumn
                            ? "Inactive First"
                            : "Descending"
                        })`}
                      />
                    </MenuItem>
                  </Box>
                );
              })}
              <Divider />
              <MenuItem
                onClick={() => {
                  setSorting([]);
                  setFilterAnchorEl(null);
                }}
                sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
              >
                <ListItemIcon>
                  <SortByAlphaIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Clear Sort" />
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      )}

      <TableContainer
        sx={{ maxHeight: { xs: 400, sm: 500, md: 600 }, overflowX: "auto" }}
      >
        <MuiTable
          stickyHeader
          size="medium"
          sx={{ minWidth: { xs: 800, sm: 1000 } }}
        >
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      fontWeight: 700,
                      color: "#1a1a1a",
                      backgroundColor: "#f8f9fa",
                      borderBottom: "2px solid #e0e0e0",
                      whiteSpace: "nowrap",
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      px: { xs: 1, sm: 2 },
                      py: { xs: 1, sm: 1.5 },
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{ "&:nth-of-type(even)": { backgroundColor: "#fcfcfc" } }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      sx={{
                        color: "#333",
                        py: { xs: 1, sm: 1.5 },
                        px: { xs: 1, sm: 2 },
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ py: 6 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    No records found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={pagination.pageSize}
        page={pagination.pageIndex}
        onPageChange={(_, p) => table.setPageIndex(p)}
        onRowsPerPageChange={(e) => table.setPageSize(Number(e.target.value))}
        SelectProps={{
          inputProps: { "aria-label": "rows per page" },
          native: false,
          sx: {
            "& .MuiSvgIcon-root": {
              color: "#1a1a1a !important",
            },
          },
          MenuProps: {
            PaperProps: {
              elevation: 3,
              sx: {
                backgroundColor: "#ffffff",
                borderRadius: "4px",
                marginTop: "4px",
                "& .MuiMenuItem-root": {
                  fontSize: "14px",
                  color: "#333",
                  "&.Mui-selected": {
                    backgroundColor: "rgba(134, 188, 37, 0.1)",
                    color: "#000",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "rgba(134, 188, 37, 0.2)" },
                  },
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                },
              },
            },
          },
        }}
        sx={{
          borderTop: "1px solid #e0e0e0",
          "& .MuiTablePagination-toolbar": {
            minHeight: "52px",
            paddingRight: "24px",
          },
          "& .MuiTablePagination-selectLabel": {
            marginBottom: 0,
            marginTop: 0,
            fontWeight: 500,
            color: "#666",
            lineHeight: "1.5",
          },
          "& .MuiInputBase-root": {
            marginRight: "20px",
            marginLeft: "8px",
            marginTop: 0,
            marginBottom: 0,
          },
          "& .MuiTablePagination-displayedRows": {
            marginBottom: 0,
            marginTop: 0,
            fontWeight: 500,
            color: "#333",
            lineHeight: "1.5",
          },
        }}
      />
    </Paper>
  );
}
