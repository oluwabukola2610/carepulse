import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import Image from "next/image";
import { StatusBadge } from "./StatusBadge";

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "patient",
    header: "Patient",
    cell: (info) => (
      <div className="flex items-center">
        <Avatar>
          <AvatarFallback>{info.getValue() as string} </AvatarFallback>
        </Avatar>
        <span className="ml-2">{info.getValue() as string}</span>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={data.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (info) => (
      <div className="flex space-x-2">
        <button className="btn-scheduled">Scheduled</button>
        <button className="btn-details">Details</button>
        <button className="btn-cancel">Cancel</button>
      </div>
    ),
  },
];

const data = [
  {
    patient: "John Doe",
    date: "2024-07-20",
    status: "pending",
    gender: "Male",
    actions: "",
  },
  {
    patient: "Jane Smith",
    date: "2024-07-21",
    status: "scheduled",
    gender: "Female",
    actions: "",
  },
];
// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
// }
export function DataTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="data-table">
      <Table className="shad-table">
        <TableHeader className=" bg-dark-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="shad-table-row-header">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="shad-table-row"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="table-actions">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="shad-gray-btn"
        >
          <Image
            src="/assets/icons/arrow.svg"
            width={24}
            height={24}
            alt="arrow"
          />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="shad-gray-btn"
        >
          <Image
            src="/assets/icons/arrow.svg"
            width={24}
            height={24}
            alt="arrow "
            className="rotate-180"
          />
        </Button>
      </div>
    </div>
  );
}
