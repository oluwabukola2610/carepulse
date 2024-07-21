"use client";
import Image from "next/image";
import Link from "next/link";

import { StatCard } from "@/components/StatsCard";
import { DataTable } from "@/components/DataTable";
import {
  useGetUserDataQuery,
  useLazyGetUserDataQuery,
} from "@/services/actions/index.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard = () => {
  const { data, isLoading } = useGetUserDataQuery({});

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <div className="flex space-x-2 items-center">
          <Avatar>
            <AvatarImage src={data?.bioData?.profilePic} />
          </Avatar>
          <p className="text-16-semibold">{data?.bioData?.fullName}</p>
        </div>
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
            count={0}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={0}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={0}
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
