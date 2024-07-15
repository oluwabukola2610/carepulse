"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import { PatientFormValidation } from "@/lib/validation";
import { IdentificationTypes, PatientFormDefaultValues } from "@/lib/constants";
import SubmitButton from "../CustomButton";
import {
  CustomCheckbox,
  CustomDatePicker,
  CustomPhoneInput,
  CustomRadiobutton,
  CustomSelect,
  CustomTextArea,
  CustomTextInput,
} from "../CustomInput";
import {
  useUpdatePatientdataMutation,
  useUpdateUserDataMutation,
  useUploadDocumentMutation,
} from "@/services/actions/index.action";
import FileUploader from "../FileUploader";
import Alert from "../Alert";

const PatientForm = () => {
  const [updateData, { isLoading: isUpdating }] = useUpdateUserDataMutation();
  const [updatePatientMedical, { isLoading: isUpdatingMedical }] =
    useUpdatePatientdataMutation();
  const [upload, { isLoading: isUploading }] = useUploadDocumentMutation();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [base64File, setBase64File] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const router = useRouter();
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
    },
  });
  const handleFileUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result?.toString().split(",")[1] || "";
      setBase64File(base64String); // Store base64 string
      setPreviewUrl(reader.result?.toString() || ""); // Set preview URL
    };
    reader.readAsDataURL(file);
  }, []);

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    console.log("Form values:", values);
    console.log(base64File);

    const personalData = {
      fullName: values.fullName,
      phone: values.phone,
      birthDate: values.birthDate,
      gender: values.gender,
      address: values.address,
      emergencyContactName: values.emergencyContactName,
      emergencyContactNumber: values.emergencyContactNumber,
    };

    const medicalData = {
      bloodGroup: values.bloodGroup,
      genoType: values.genoType,
      allergies: values.allergies,
      medications: values.currentMedication,
      medicalHistory: values.pastMedicalHistory,
    };

    const documentData = {
      documentType: values.identificationType,
      documentNumber: values.identificationNumber,
      base64: base64File,
    };

    try {
      const [personalResponse, medicalResponse, documentResponse] =
        await Promise.all([
          updateData(personalData),
          updatePatientMedical(medicalData),
          upload(documentData),
        ]);
      if (
        personalResponse?.data.status === "success" &&
        medicalResponse?.data.status === "success" &&
        documentResponse?.data.status === "success"
      ) {
        setShowAlert(true);
        setAlertType("success");
        // Optionally redirect after successful submission
        // router.push(`/patient/success`);
      } else {
        setShowAlert(true);
        setAlertType("error");
        form.reset();
      }
    } catch (error) {
      setShowAlert(true);
      setAlertType("error");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>
        {showAlert && ( // Conditionally render alert
          <Alert
            title={alertType === "success" ? "Success!" : "Error!"}
            text={
              alertType === "success"
                ? "Your information has been successfully submitted."
                : "There was an error submitting your information. Please try again."
            }
            icon={alertType === "success" ? "success" : "error"}
          />
        )}

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>

          {/* NAME */}
          <CustomTextInput
            control={form.control}
            name="fullName"
            label="Full name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user icon"
          />

          {/* EMAIL & PHONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomTextInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="me@me.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email icon"
            />

            <CustomPhoneInput
              control={form.control}
              name="phone"
              label="Phone"
              placeholder="Enter your phone number"
            />
          </div>

          {/* BirthDate & Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomDatePicker
              control={form.control}
              name="birthDate"
              label="Date of birth"
            />

            <CustomRadiobutton
              control={form.control}
              name="gender"
              label="Gender"
            />
          </div>

          {/* Address & Occupation */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomTextInput
              control={form.control}
              name="address"
              label="Address"
              placeholder="14 street, New york, NY - 5101"
            />
          </div>

          {/* Emergency Contact Name & Emergency Contact Number */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomTextInput
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />
            <CustomPhoneInput
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency contact number"
              placeholder="(555) 123-4567"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomTextInput
              control={form.control}
              name="bloodGroup"
              label="Blood Group"
              placeholder="A+"
            />
            <CustomTextInput
              control={form.control}
              name="genoType"
              label="Genotype"
              placeholder="AA"
            />
          </div>

          {/* ALLERGY & CURRENT MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomTextArea
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin, Pollen"
            />

            <CustomTextArea
              control={form.control}
              name="currentMedication"
              label="Current medications"
              placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>

          {/* FAMILY MEDICATION & PAST MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomTextArea
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verfication</h2>
          </div>

          <CustomSelect
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
            options={IdentificationTypes.map((type) => ({
              value: type,
              label: type,
            }))}
          />
          <FormField
            control={form.control}
            name="identificationDocument"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="shad-input-label">
                  Scanned Copy of Identification Document/FormLabel{" "}
                </FormLabel>
                <FileUploader
                  files={form.getValues("identificationDocument")}
                  onChange={handleFileUpload}
                  previewUrl={previewUrl}
                />
              </FormItem>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>

          <CustomCheckbox
            control={form.control}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />

          <CustomCheckbox
            control={form.control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
          />

          <CustomCheckbox
            control={form.control}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the
            privacy policy"
          />
        </section>

        <SubmitButton
          isloading={isUpdating && isUpdatingMedical && isUploading}
        >
          Submit and Continue
        </SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
