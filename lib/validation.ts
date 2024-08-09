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
    .min(2, "Full name must contain at least 2 characters.")
    .max(50, "Full name must not exceed 50 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Please enter a valid phone number with the country code (e.g., +1234567890)."
    ),
  birthDate: z.coerce
    .date()
    .refine(
      (date) => date <= new Date(),
      "Birth date cannot be in the future."
    ),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Please select a gender." }),
  }),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters long.")
    .max(500, "Address must not exceed 500 characters."),
  emergencyContactName: z
    .string()
    .min(2, "Emergency contact name must contain at least 2 characters.")
    .max(50, "Emergency contact name must not exceed 50 characters."),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Please enter a valid emergency contact number with the country code."
    ),
  allergies: z.string().optional(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    errorMap: () => ({ message: "Please select a valid blood group." }),
  }),
  genoType: z.enum(["AA", "AS", "SS", "AC", "SC"], {
    errorMap: () => ({ message: "Please select a valid genotype." }),
  }),
  currentMedication: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to treatment to proceed.",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message:
        "You must consent to the disclosure of your health information to proceed.",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must agree to the privacy policy to proceed.",
    }),
});

// DoctorFormValidation schema
export const DoctorFormValidation = z.object({
  fullName: z
    .string()
    .min(2, "Full name must have at least 2 characters.")
    .max(50, "Full name cannot exceed 50 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Phone number must include the country code and contain 10 to 15 digits."
    ),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Please select a gender." }),
  }),
  address: z
    .string()
    .min(5, "Address must have at least 5 characters.")
    .max(500, "Address cannot exceed 500 characters."),
  medicalLicenseNumber: z
    .string()
    .min(5, "Medical license number must have at least 5 characters.")
    .max(50, "Medical license number cannot exceed 50 characters."),
  specialization: z
    .string()
    .min(2, "Specialization must have at least 2 characters.")
    .max(50, "Specialization cannot exceed 50 characters."),
  yearsOfExperience: z
    .string()
    .min(1, "Years of experience cannot be less than 1.")
    .max(100, "Years of experience cannot exceed 100 years."),
  clinicName: z
    .string()
    .min(2, "Clinic name must have at least 2 characters.")
    .max(100, "Clinic name cannot exceed 100 characters."),
  clinicAddress: z
    .string()
    .min(5, "Clinic address must have at least 5 characters.")
    .max(500, "Clinic address cannot exceed 500 characters."),
  consultationHours: z
    .string()
    .min(5, "Consultation hours description must have at least 5 characters.")
    .max(100, "Consultation hours description cannot exceed 100 characters."),
  emergencyContactName: z
    .string()
    .min(2, "Emergency contact name must have at least 2 characters.")
    .max(50, "Emergency contact name cannot exceed 50 characters."),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Emergency contact number must include the country code and contain 10 to 15 digits."
    ),
  profilePicture: z.custom<File[]>().optional(),
  termsOfServiceConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must agree to the terms of service to proceed.",
    }),
  professionalConductConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message:
        "You must agree to maintain professional conduct and ethics to proceed.",
    }),
  dataProtectionConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to the data protection policies to proceed.",
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
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
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
