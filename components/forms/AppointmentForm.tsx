"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from "../ui/form";
import { CustomDatePicker, CustomTextArea } from "../CustomInput";
import SubmitButton from "../CustomButton";
import { getAppointmentSchema } from "@/lib/validation";
import {
  useCancelAppointMentMutation,
  useCreateAppointMentMutation,
} from "@/services/actions/index.action";
import { useState } from "react";
import Alert from "../Alert";

export const AppointmentForm = ({
  type,
  id,
}: {
  type: "create" | "schedule" | "cancel";
  id?: string;
}) => {
  const [createAppointment, { isLoading: isCreating }] =
    useCreateAppointMentMutation();
  const [cancelAppointment, { isLoading: isCanceling }] =
    useCancelAppointMentMutation();

  const AppointmentFormValidation = getAppointmentSchema(type);
  const [showAlert, setShowAlert] = useState(false);
  const { push } = useRouter();

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    console.log("Form values:", values);
    try {
      if (type === "create" && "schedule" in values && "reason" in values) {
        const appointment = {
          schedule: values.schedule,
          reason: values.reason,
          comment: values.note,
        };
        const newAppointment = await createAppointment(appointment).unwrap();
        if (newAppointment) {
          form.reset();
          push("/patient/new-appointment/success");
        }
      } else if (type === "cancel" && "cancellationReason" in values) {
        const cancelData = {
          appointmentId: id,
          reason: values.cancellationReason,
        };
        const cancelledAppointment = await cancelAppointment(
          cancelData
        ).unwrap();
        if (cancelledAppointment) {
          form.reset();
          console.log("Cancellation successful:", cancelledAppointment);
        }
      } else {
        console.log("Unsupported form type");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      setShowAlert(true);
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
      {showAlert && (
        <Alert
          title="Error!"
          text="Error submitting appointment"
          icon="error"
        />
      )}

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
          isloading={isCreating || isCanceling}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full mt-3`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
