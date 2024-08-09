/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
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
import { useGetAllApointmentQuery } from "@/services/actions/index.action";
import { Skeleton } from "./ui/skeleton";
import { ScheduledModal } from "./ScheduledModal";
import CancelModal from "./CancelModal";
import DetailsModal from "./DetailsModal";

export interface Appointment {
  _id: string;
  userId: string;
  fullName?: string;
  reason: string;
  comment: string;
  schedule: string;
  status: Status;
  cancelReason?: string;
  appointmentId: string;
  createdAt: string;
  updatedAt: string;
}

export function DataTable() {
  const { data: patientAppointment, isLoading } = useGetAllApointmentQuery({});
  const [scheduleModalOpen, setScheduleModalOpen] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [detailsModalOpen, setdetailsModalOpen] = useState<boolean>(false);

  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const appointments: Appointment[] = patientAppointment?.appointments || [];

  const columns: ColumnDef<Appointment>[] = [
    {
      accessorKey: "fullName",
      header: "Patient",
      cell: (info) => (
        <div className="flex items-center">
          <Avatar>
            <AvatarFallback className="bg-blue-500 text-white">
              {info
                .getValue<string>()
                ?.split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      ),
    },
    {
      accessorKey: "schedule",
      header: "Scheduled Date & Time",
      cell: (info) => {
        const date = new Date(info.getValue<string>());
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        return `${formattedDate} ${formattedTime}`;
      },
    },
    {
      accessorKey: "comment",
      header: "Comment",
      cell: (info) => info.getValue<string>(),
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
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="flex space-x-2">
          {(data.status === "pending" || data.status === "cancelled") && (
            <button
              className="btn-scheduled"
              onClick={() => handleScheduleClick(row.original)}
            >
              Schedule
            </button>
          )}
          
          {data.status !== "cancelled" && (
            <button
              className="btn-details"
              onClick={() => handleDetails(row.original)}
            >
              Details
            </button>
          )}
          
          {(data.status === "pending" ) && (
            <button
              onClick={() => handleCancel(row.original)}
              className="btn-cancel"
            >
              Cancel
            </button>
          )}
        </div>
        );
      },
    },
  ];
  const handleScheduleClick = (appointment: Appointment) => {
    setScheduleModalOpen(true);
    setSelectedAppointment(appointment);
  };
  const handleCancel = (appointment: Appointment) => {
    setCancelModalOpen(true);
    setSelectedAppointment(appointment);
  };
  const handleDetails = (appointment: Appointment) => {
    setdetailsModalOpen(true);
    setSelectedAppointment(appointment);
  };
  const table = useReactTable({
    data: appointments,
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
          {isLoading ? (
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
      {scheduleModalOpen && (
        <ScheduledModal
          appointment={selectedAppointment}
          onClose={() => setScheduleModalOpen(false)}
          open={scheduleModalOpen}

        />
      )}
      {cancelModalOpen && (
        <CancelModal
          open={cancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          id={selectedAppointment?._id}
        />
      )}
      {detailsModalOpen && (
        <DetailsModal
          open={detailsModalOpen}
          onClose={() => setdetailsModalOpen(false)}
          id={selectedAppointment?.userId}
        />
      )}
    </div>
  );
}
