"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, HomeIcon, LogOut, UserCheck } from "lucide-react";
import { useGetUserDataQuery } from "@/services/actions/index.action";
import { usePathname, useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data } = useGetUserDataQuery({});
  const { push } = useRouter();
  const pathname = usePathname();
  const handleLogout = () => {};
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
            <div className="flex items-center cursor-pointer">
              <Avatar>
                <AvatarImage src={data?.bioData?.profilePic} />
                <AvatarFallback>
                  {data?.bioData?.fullName
                    .split(" ")
                    .map((name: any[]) => name[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <p className="text-16-semibold ml-2">{data?.bioData?.fullName}</p>
              <ChevronDown className="ml-2" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="py-2 px-6 items-center space-y-4"
          >
            {pathname === "/dashboard/profile" ? (
              <DropdownMenuItem
                onClick={() => push("/dashboard")}
                className="cursor-pointer"
              >
                <HomeIcon className="mr-2" />
                Home
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() => push("/dashboard/profile")}
                className="cursor-pointer"
              >
                <UserCheck className="mr-2" />
                Profile
              </DropdownMenuItem>
            )}
            <hr />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      {children}
    </div>
  );
};

export default Layout;
