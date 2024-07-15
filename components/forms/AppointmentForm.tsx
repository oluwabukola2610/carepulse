"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from "../ui/form";
import {
  CustomDatePicker,
  CustomTextArea,
  CustomTextInput,
} from "../CustomInput";
import SubmitButton from "../CustomButton";
import { getAppointmentSchema } from "@/lib/validation";
import { useState } from "react";

export const AppointmentForm = ({
  type = "create",
}: {
  type: "create" | "schedule" | "cancel";
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  });

  // const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
  //   setIsLoading(true);

  //   let status;
  //   switch (type) {
  //     case "schedule":
  //       status = "scheduled";
  //       break;
  //     case "cancel":
  //       status = "cancelled";
  //       break;
  //     default:
  //       status = "pending";
  //   }

  //   try {
  //     // Replace with actual logic for creating or updating appointments
  //     if (type === "create") {
  //       const appointment = {
  //         userId: "userIdPlaceholder",
  //         patient: "patientIdPlaceholder",
  //         schedule: new Date(values.schedule),
  //         reason: values.reason!,
  //         status,
  //         note: values.note,
  //       };

  //       const newAppointment = await CreateAppointmentSchema(appointment);
  //       if (newAppointment) {
  //         form.reset();
  //         router.push(`/patients/userIdPlaceholder/new-appointment/success?appointmentId=${newAppointment.$id}`);
  //       }
  //     } else {
  //       const appointmentToUpdate = {
  //         userId: "userIdPlaceholder",
  //         appointmentId: "appointmentIdPlaceholder",
  //         appointment: {
  //           schedule: new Date(values.schedule),
  //           status,
  //           cancellationReason: values.cancellationReason,
  //         },
  //         type,
  //       };

  //       const updatedAppointment = await updateAppointment(appointmentToUpdate);
  //       if (updatedAppointment) {
  //         setOpen && setOpen(false);
  //         form.reset();
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    try {
      // You can perform different actions based on the type of form (create, schedule, cancel)
      switch (type) {
        case "create":
          // Example logic for creating a new appointment
          console.log("Creating new appointment:", values);
          break;
        case "schedule":
          // Example logic for scheduling an appointment
          console.log("Scheduling appointment:", values);
          break;
        case "cancel":
          // Example logic for cancelling an appointment
          console.log("Cancelling appointment:", values);
          break;
        default:
          console.log("Unsupported form type");
      }
    } catch (error) {
      console.error("");
    }
  };

  const buttonLabel =
    type === "cancel"
      ? "Cancel Appointment"
      : type === "schedule"
      ? "Schedule Appointment"
      : "Submit Appointment";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds.
            </p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            <CustomDatePicker
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />

            <div
              className={`flex flex-col gap-6 ${
                type === "create" && "xl:flex-row"
              }`}
            >
              <CustomTextArea
                control={form.control}
                name="reason"
                label="Appointment reason"
                placeholder="Annual monthly check-up"
                disabled={type === "schedule"}
              />

              <CustomTextArea
                control={form.control}
                name="note"
                label="Comments/notes"
                placeholder="Prefer afternoon appointments, if possible"
                disabled={type === "schedule"}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomTextArea
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton
          isloading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
