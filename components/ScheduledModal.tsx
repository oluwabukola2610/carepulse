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

export const ScheduledModal = ({
  appointment,
  onClose,
}: {
  appointment?: any;
  onClose: () => void;
}) => {
  const [open, setOpen] = useState(true);

  const handleDialogClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
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
        {/* <AppointmentForm type="schedule" /> */}
        <div className="flex justify-center mt-4">
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Accept
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduledModal;
