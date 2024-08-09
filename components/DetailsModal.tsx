import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetPatientDetailsMutation } from "@/services/actions/index.action";

export const DetailsModal = ({
  id,
  onClose,
  open,
}: {
  id: string | undefined;
  onClose: () => void;
  open: boolean;
}) => {
  const [getPatientDetails, { data, isLoading, error }] =
    useGetPatientDetailsMutation();

  useEffect(() => {
    if (open && id) {
      getPatientDetails({ userId: id });
    }
  }, [open, id, getPatientDetails]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="shad-dialog sm:max-w-lg h-[6 00px] overflow-y-auto">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="text-xl font-bold">
            Patient Details
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Review the patient information before proceeding.
          </DialogDescription>
        </DialogHeader>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error fetching details</p>}
        {data && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Bio Data</h3>
              <p>
                <strong>Full Name:</strong> {data?.bioData?.fullName}
              </p>
              <p>
                <strong>Email:</strong> {data?.bioData?.email}
              </p>
              <p>
                <strong>Phone:</strong> {data?.bioData?.phone}
              </p>
              <p>
                <strong>Address:</strong> {data?.bioData?.address}
              </p>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {new Date(data?.bioData?.dateofbirth).toLocaleDateString()}
              </p>
              <p>
                <strong>Gender:</strong> {data?.bioData?.gender}
              </p>
              <p>
                <strong>Emergency Contact:</strong>{" "}
                {data?.bioData?.emergencyContact} (
                {data?.bioData?.emergencyContactPhone})
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Medical Details</h3>
              <p>
                <strong>Blood Group:</strong> {data?.medicals?.bloodGroup}
              </p>
              <p>
                <strong>Genotype:</strong> {data.medicals?.genoType}
              </p>
              <p>
                <strong>Allergies:</strong> {data.medicals?.allergies}
              </p>
              <p>
                <strong>Medications:</strong> {data.medicals?.medications}
              </p>
              <p>
                <strong>Medical History:</strong>{" "}
                {data.medicals?.medicalHistory}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
