"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StatCard } from "@/components/StatsCard";
import { DataTable } from "@/components/DataTable";
import {
  useGetAllApointmentQuery,
  useGetUserDataQuery,
} from "@/services/actions/index.action";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const { data } = useGetUserDataQuery({});
  const { data: appointment } = useGetAllApointmentQuery({});

  const scheduledAppointments =
    appointment?.appointments.filter(
      (appt: { status: string }) => appt.status === "scheduled"
    ).length || 0;
  const pendingAppointments =
    appointment?.appointments.filter(
      (appt: { status: string }) => appt.status === "pending"
    ).length || 0;
  const cancelledAppointments =
    appointment?.appointments.filter(
      (appt: { status: string }) => appt.status === "cancelled"
    ).length || 0;

  const handleLogout = () => {
    // Handle logout logic here
  };

  const handleProfile = () => {
    // Handle profile navigation here
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header flex justify-between items-center py-4 px-6">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex space-x-2 items-center cursor-pointer">
              <Avatar>
                <AvatarImage src={data?.bioData?.profilePic} />
                <AvatarFallback>
                  {data?.bioData?.fullName
                    .split(" ")
                    .map((name: any[]) => name[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <p className="text-16-semibold">{data?.bioData?.fullName}</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem onClick={handleProfile}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={scheduledAppointments}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={pendingAppointments}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={cancelledAppointments}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable />
      </main>
    </div>
  );
};

export default Dashboard;
