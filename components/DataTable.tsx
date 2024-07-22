/* eslint-disable react-hooks/rules-of-hooks */
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
import { useGetAllPatientQuery } from "@/services/actions/index.action";
import { Skeleton } from "./ui/skeleton";
// Define the type for patient data
interface Patient {
  fullName: string;
  createdAt: string | number | Date;
  gender: string;
  status: Status;
}

// Define the type for columns
const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "fullName",
    header: "Patient",
    cell: (info) => (
      <div className="flex items-center">
        <Avatar>
          <AvatarFallback className="bg-blue-500 text-white">
            {info
              .getValue<string>()
              .split(" ")
              .map((name) => name[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <span className="ml-2">{info.getValue<string>()}</span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: (info) => new Date(info.getValue<string>()).toLocaleDateString(),
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
    cell: (info) => info.getValue<string>(),
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

export function DataTable() {
  const { data: patientData, isLoading: isGettingPatient } =
    useGetAllPatientQuery({});

  const patients: Patient[] =
    patientData?.patients.map((patient: Patient) => ({
      ...patient,
      status: "pending",
    })) || [];

  const table = useReactTable({
    data: patients,
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
          {isGettingPatient ? (
            Array(10)
              .fill(0)
              .map((_, idx) => (
                <TableRow key={idx} className="shad-table-row">
                  <TableCell>
                    <Skeleton className="h-6 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-40" />
                  </TableCell>
                </TableRow>
              ))
          ) : table.getRowModel().rows?.length ? (
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
