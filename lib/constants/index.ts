export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  fullName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  allergies: "",
  bloodGroup: "" as bloodGroup,
  genoType: "" as genoType,
  currentMedication: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};
export const DoctorFormDefaultValues = {
  fullName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  medicalLicenseNumber: "",
  specialization: "",
  yearsOfExperience: 0,
  clinicName: "",
  clinicAddress: "",
  consultationHours: "", // e.g., "9 AM - 5 PM"
  emergencyContactName: "",
  emergencyContactNumber: "",
  profilePicture: [],
  termsOfServiceConsent: false,
  professionalConductConsent: false,
  dataProtectionConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Medical Insurance Card/Policy",
  "National Identity Card",
  "Passport",
  "Student ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
