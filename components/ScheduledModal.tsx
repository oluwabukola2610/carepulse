import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppointmentForm } from "./forms/AppointmentForm";
import { useAcceptAppointmentMutation } from "@/services/actions/index.action";

export const ScheduledModal = ({
  appointment,
  open,
  onClose,
}: {
  appointment?: any;
  onClose: () => void;
  open: boolean;
}) => {
  const [acceptAppointment, { isLoading }] = useAcceptAppointmentMutation();
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAccept = async () => {
    setSuccess(null);
    setError(null);

    try {
      const res = await acceptAppointment({
        appointmentId: appointment?.appointmentId,
      }).unwrap();
      setSuccess("Appointment successfully scheduled!");
    } catch (error) {
      setError("Failed to schedule appointment. Please try again.");
      console.error("Failed to accept appointment", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="text-xl font-bold">
            Appointment Details
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Review the appointment information before proceeding.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="font-medium">Patient Name:</p>
            <p>{appointment?.fullName}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Appointment ID:</p>
            <p>{appointment?.appointmentId}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Reason:</p>
            <p>{appointment?.reason}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="font-medium">Comment:</p>
          <p>{appointment?.comment}</p>
        </div>
        {/* Success or Error Message */}
        {success && (
          <div className="mt-4 text-center text-green-800 font-medium">
            {success}
          </div>
        )}
        {error && (
          <div className="mt-4 text-center text-red-600 font-medium">
            {error}
          </div>
        )}
        <div className="flex justify-center mt-4">
          <Button
            onClick={handleAccept}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isLoading ? "Loading..." : "Accept"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduledModal;
