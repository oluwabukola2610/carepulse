"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import SubmitButton from "../CustomButton";
import {
  CustomCheckbox,
  CustomDatePicker,
  CustomPhoneInput,
  CustomRadiobutton,
  CustomTextInput,
} from "../CustomInput";
import { DoctorFormDefaultValues } from "@/lib/constants";
import { DoctorFormValidation } from "@/lib/validation";
import FileUploader from "../FileUploader";
import {
  useUpdatePhysiciandataMutation,
  useUpdateUserDataMutation,
  useUploadImageMutation,
} from "@/services/actions/index.action";
import Alert from "../Alert";
import { useRouter } from "next/navigation";

const PhysicianForm = () => {
  const [previewUrl, setPreviewUrl] = useState<any | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [upload, { isLoading }] = useUploadImageMutation();
  const [updateData, { isLoading: isUpdating }] = useUpdateUserDataMutation();
  const [updatePhysician, { isLoading: isUpdatingMedical }] =
    useUpdatePhysiciandataMutation();
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues: DoctorFormDefaultValues,
  });

  const handleFileUpload = useCallback((file: File) => {
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const onSubmit = async (values: z.infer<typeof DoctorFormValidation>) => {
    const formData = new FormData();
    if (file) {
      formData.append("profileImage", file);
    }
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
      medicalLicenceNumber: values.medicalLicenseNumber,
      specialization: values.specialization,
      yearsOfExperience: values.yearsOfExperience,
      consultationHours: values.consultationHours,
      clinicName: values.clinicName,
      clinicAddress: values.clinicAddress,
    };
    try {
      const [personalResponse, medicalResponse, documentResponse] =
        await Promise.all([
          updateData(personalData),
          updatePhysician(medicalData),
          upload(formData),
        ]);
      if (
        personalResponse?.data.status === "success" &&
        medicalResponse?.data.status === "success" &&
        documentResponse?.data.status === "success"
      ) {
        setShowAlert(true);
        setAlertType("success");
        router.push(`/physican/dashboard`);
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
    const response = await upload(formData);
    console.log(response);
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

          <CustomTextInput
            control={form.control}
            name="fullName"
            label="Full Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user icon"
          />

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

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomDatePicker
              control={form.control}
              name="birthDate"
              label="Date of Birth"
            />

            <CustomRadiobutton
              control={form.control}
              name="gender"
              label="Gender"
            />
          </div>

          <CustomTextInput
            control={form.control}
            name="address"
            label="Address"
            placeholder="14 Street, New York, NY - 5101"
          />

          <CustomTextInput
            control={form.control}
            name="medicalLicenseNumber"
            label="Medical License Number"
            placeholder="ABC123456"
          />

          <CustomTextInput
            control={form.control}
            name="specialization"
            label="Specialization"
            placeholder="Cardiology"
          />

          <CustomTextInput
            control={form.control}
            name="yearsOfExperience"
            label="Years of Experience"
            placeholder="10"
          />

          <CustomTextInput
            control={form.control}
            name="clinicName"
            label="Clinic Name"
            placeholder="Doe Clinic"
          />

          <CustomTextInput
            control={form.control}
            name="clinicAddress"
            label="Clinic Address"
            placeholder="14 Street, New York, NY - 5101"
          />

          <CustomTextInput
            control={form.control}
            name="consultationHours"
            label="Consultation Hours"
            placeholder="9 AM - 5 PM"
          />

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomTextInput
              control={form.control}
              name="emergencyContactName"
              label="Emergency Contact Name"
              placeholder="Guardian's Name"
            />

            <CustomPhoneInput
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency Contact Number"
              placeholder="(555) 123-4567"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Profile Picture</h2>
          </div>

          <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="shad-input-label">
                  Upload Profile Picture
                </FormLabel>
                <FileUploader
                  files={form.getValues("profilePicture")}
                  onChange={handleFileUpload}
                  previewUrl={previewUrl}
                />{" "}
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
            name="termsOfServiceConsent"
            label="I agree to the terms of service."
          />

          <CustomCheckbox
            control={form.control}
            name="professionalConductConsent"
            label="I agree to uphold professional conduct and ethics."
          />

          <CustomCheckbox
            control={form.control}
            name="dataProtectionConsent"
            label="I consent to the data protection policies."
          />
        </section>

        <SubmitButton isloading={isLoading && isUpdating && isUpdatingMedical}>
          Submit and Continue
        </SubmitButton>
      </form>
    </Form>
  );
};

export default PhysicianForm;
