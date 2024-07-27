"use client";
import React from "react";

import { StatCard } from "@/components/StatsCard";
import { DataTable } from "@/components/DataTable";
import { useGetAllApointmentQuery } from "@/services/actions/index.action";

const Dashboard = () => {
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

  return (
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
  );
};

export default Dashboard;
