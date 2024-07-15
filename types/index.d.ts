/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female" | "Other";
declare type bloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";
declare type genoType = "AA" | "AS" | "SS" | "AC" | "SC";

declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
// declare interface User extends CreateUserParams {
//   id: any;
//   $id: string;
// }
declare interface RegisterPatientParams extends CreateUserParams {
  fullName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  allergies: string;
  currentMedication: string;
  pastMedicalHistory: string;
  identificationType: string;
  identificationNumber: string;
  identificationDocument: any[];
  treatmentConsent: boolean;
  disclosureConsent: boolean;
  privacyConsent: boolean;
}

// Define DoctorForm types

declare interface RegisterDoctParams extends CreateUserParams {
  fullName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  medicalLicenseNumber: string;
  specialization: string;
  yearsOfExperience: number;
  clinicName: string;
  clinicAddress: string;
  consultationHours: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  profilePicture: any[];
  termsOfServiceConsent: boolean;
  professionalConductConsent: boolean;
  dataProtectionConsent: boolean;
}

declare type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};
