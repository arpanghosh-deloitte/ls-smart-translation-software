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
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList";

// ✅ GENERIC INTERFACE: TData allows this table to accept ANY type of data
interface ReusableTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  title?: string;
  actionButtons?: React.ReactNode; // For "Add Project" button etc.
}

export function ReusableTable<TData>(
  props: ReusableTableProps<TData>
): React.ReactElement {
  const { columns, data, title, actionButtons } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

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
      {/* 1. TABLE HEADER SECTION (Title & Actions) */}
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
            <IconButton sx={{ ml: { xs: 0, sm: 1 }, color: "#000" }}>
              <FilterListIcon />
            </IconButton>
          </Box>
        </Box>
      )}

      {/* 3. THE TABLE ITSELF */}
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
                    onClick={header.column.getToggleSortingHandler()}
                    sx={{
                      fontWeight: 700,
                      color: "#1a1a1a",
                      backgroundColor: "#f8f9fa",
                      borderBottom: "2px solid #e0e0e0",
                      cursor: header.column.getCanSort()
                        ? "pointer"
                        : "default",
                      whiteSpace: "nowrap",
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      px: { xs: 1, sm: 2 },
                      py: { xs: 1, sm: 1.5 },
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={0.5}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {/* Sorting Icons */}
                      {{
                        asc: (
                          <ArrowUpwardIcon
                            fontSize="small"
                            sx={{ color: "#000000" }}
                          />
                        ),
                        desc: (
                          <ArrowDownwardIcon
                            fontSize="small"
                            sx={{ color: "#000000" }}
                          />
                        ),
                      }[header.column.getIsSorted() as string] ?? null}

                      {!header.column.getIsSorted() &&
                        header.column.getCanSort() && (
                          <SortIcon
                            fontSize="small"
                            sx={{ color: "#000000", opacity: 1 }}
                          />
                        )}
                    </Box>
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

      {/* 4. PAGINATION */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={pagination.pageSize}
        page={pagination.pageIndex}
        onPageChange={(_, p) => table.setPageIndex(p)}
        onRowsPerPageChange={(e) => table.setPageSize(Number(e.target.value))}
        // Customizing the Dropdown (Select)
        SelectProps={{
          inputProps: { "aria-label": "rows per page" },
          native: false,
          // 1. Force the arrow icon to be Black
          sx: {
            "& .MuiSvgIcon-root": {
              color: "#1a1a1a !important", // Black Arrow
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
        // 2. Fix Alignment issues in the Toolbar
        sx={{
          borderTop: "1px solid #e0e0e0",

          // Container alignment
          "& .MuiTablePagination-toolbar": {
            minHeight: "52px",
            paddingRight: "24px",
          },

          // "Rows per page" text alignment
          "& .MuiTablePagination-selectLabel": {
            marginBottom: 0,
            marginTop: 0,
            fontWeight: 500,
            color: "#666",
            lineHeight: "1.5", // Ensures vertical centering
          },

          // The dropdown number alignment
          "& .MuiInputBase-root": {
            marginRight: "20px",
            marginLeft: "8px",
            marginTop: 0,
            marginBottom: 0,
          },

          // "1-5 of 5" text alignment
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
