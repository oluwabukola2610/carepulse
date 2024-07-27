"use client";
import React, { useCallback, useState } from "react";
import { useGetUserDataQuery } from "@/services/actions/index.action";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useDropzone } from "react-dropzone";

const Profile = () => {
  const { data } = useGetUserDataQuery({});
  const { push } = useRouter();
  const [activeTab, setActiveTab] = useState("personal");
  // const handleEditProfile = () => {};
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      console.log("File accepted:", acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <main className="flex-col flex items-center justify-center w-full space-y-6 max-w-3xl mx-auto">
      <div className="relative">
        <Image
          src={data?.bioData?.profilePic}
          alt="Profile Picture"
          width={120}
          height={120}
          className="rounded-full object-cover"
        />
        <div
          {...getRootProps()}
          className=" absolute bottom-0 right-0 bg-blue-500 text-white p-2
          rounded-full"
        >
          <input {...getInputProps()} />

          <Pencil className="h-5 w-5" />
        </div>
      </div>
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">{data?.bioData?.fullName}</h2>
        <p className="text-gray-400 ">{data?.bioData?.role}</p>
      </div>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full space-y-4"
      >
        <TabsList className="flex border-b border-gray-300">
          <TabsTrigger
            value="personal"
            className={`flex-1 py-2 px-4 text-center cursor-pointer transition-colors duration-300 text-lg font-semibold ${
              activeTab === "personal" ? "text-blue-100 " : "text-gray-500"
            }`}
          >
            Personal Info
          </TabsTrigger>
          <TabsTrigger
            value="medical"
            className={`flex-1 py-2 px-4 text-center cursor-pointer transition-colors duration-300 text-lg font-semibold ${
              activeTab === "medical" ? "text-blue-100 " : "text-gray-500"
            }`}
          >
            Medical Info
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="">
          <div className="w-full space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 ">Email:</span>
              <span className="text-gray-300 font-medium">
                {data?.bioData?.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 ">Phone:</span>
              <span className="text-gray-300 font-medium">
                {data?.bioData?.phone}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 ">Date of Birth:</span>
              <span className="text-gray-300 font-medium">
                {new Date(data?.bioData?.dateofbirth).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 ">Address:</span>
              <span className="text-gray-300 font-medium">
                {data?.bioData?.address}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 ">Emergency Contact:</span>
              <span className="text-gray-300 font-medium">
                {data?.bioData?.emergencyContact}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 ">Emergency Contact Phone:</span>
              <span className="text-gray-300 font-medium">
                {data?.bioData?.emergencyContactPhone}
              </span>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="medical">
          <div className="w-full space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 ">Specialization:</span>
              <span className="text-gray-300 font-medium">
                {data?.medicals?.specialization}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 ">Years of Experience:</span>
              <span className="text-gray-300 font-medium">
                {data?.medicals?.yearsOfExperience}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 ">Consultation Hours:</span>
              <span className="text-gray-300 font-medium">
                {data?.medicals?.consultationHours}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 ">Clinic Name:</span>
              <span className="text-gray-300 font-medium">
                {data?.medicals?.clinicName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 ">Clinic Address:</span>
              <span className="text-gray-300 font-medium">
                {data?.medicals?.clinicAddress}
              </span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Profile;
