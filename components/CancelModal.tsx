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
export const CancelModal = ({
  id,
  onClose,
  open,
}: {
  open: boolean;
  id?: string;
  onClose: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="text-xl font-bold">
            Cancel Appointment
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Please provide a valid reason for canceling the appointment.
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm type="cancel" id={id} />
      </DialogContent>
    </Dialog>
  );
};

export default CancelModal;
