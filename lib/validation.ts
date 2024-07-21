import { z } from "zod";
export const LoginValidation = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});
export const UserFormValidation = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  role: z.string().min(2, "Role is required"),
});

export const PatientFormValidation = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  emergencyContactName: z
    .string()
    .min(2, "Emergency contact name IS required")
    .max(50, "Emergency contact name must be at most 50 characters"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Invalid phone number"
    ),
  allergies: z.string().optional(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  genoType: z.enum(["AA", "AS", "SS", "AC", "SC"]),
  currentMedication: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to treatment in order to proceed",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
});
// DoctorFormValidation schema
export const DoctorFormValidation = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  medicalLicenseNumber: z
    .string()
    .min(5, "Medical license number must be at least 5 characters")
    .max(50, "Medical license number must be at most 50 characters"),
  specialization: z
    .string()
    .min(2, "Specialization must be at least 2 characters")
    .max(50, "Specialization must be at most 50 characters"),
  yearsOfExperience: z
    .string()
    .min(0, "Years of experience must be at least 0")
    .max(100, "Years of experience must be at most 100"),
  clinicName: z
    .string()
    .min(2, "Clinic name must be at least 2 characters")
    .max(100, "Clinic name must be at most 100 characters"),
  clinicAddress: z
    .string()
    .min(5, "Clinic address must be at least 5 characters")
    .max(500, "Clinic address must be at most 500 characters"),
  consultationHours: z
    .string()
    .min(5, "Consultation hours must be at least 5 characters")
    .max(100, "Consultation hours must be at most 100 characters"),
  emergencyContactName: z
    .string()
    .min(2, "Emergency contact name must be at least 2 characters")
    .max(50, "Emergency contact name must be at most 50 characters"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Invalid phone number"
    ),
  profilePicture: z.custom<File[]>().optional(),
  termsOfServiceConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must agree to the terms of service in order to proceed",
    }),
  professionalConductConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message:
        "You must agree to uphold professional conduct and ethics in order to proceed",
    }),
  dataProtectionConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message:
        "You must consent to the data protection policies in order to proceed",
    }),
});

export const CreateAppointmentSchema = z.object({
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
