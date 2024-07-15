"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { UserFormValidation } from "@/lib/validation";
import SubmitButton from "../CustomButton";
import { CustomSelect, CustomTextInput } from "../CustomInput";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRegisterMutation } from "@/services/actions/index.action";
import Alert from "../Alert";

const RegisterForm = () => {
  const { push } = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [message, setMessage] = useState("");
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      role: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setShowAlert(false);
    try {
      const user = {
        email: values.email,
        role: values.role,
      };
      const response = await register(user).unwrap();
      setShowAlert(true);
      setAlertType("success");
      setMessage(response?.message);
      push("/otp");
    } catch (error: any) {
      setShowAlert(true);
      setAlertType("error");
      setMessage(error?.data?.error || "Error during user creation");
      form.reset();
    }
  };

  return (
    <div>
      {showAlert && (
        <Alert
          title={alertType === "success" ? "Success!" : "Error!"}
          text={message}
          icon={alertType === "success" ? "success" : "error"}
        />
      )}
      <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        <Image
          src="/assets/icons/logo-full.svg"
          height={1000}
          width={1000}
          alt="patient"
          className="mb-12 h-10 w-fit"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-6"
          >
            <section className="mb-12 space-y-4">
              <h1 className="header">Hi there 👋</h1>
              <p className="text-dark-700">Get started with appointments.</p>
            </section>
            <CustomTextInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email icon"
            />
            <CustomSelect
              control={form.control}
              name="role"
              label="Role"
              placeholder="Select your role"
              options={[
                { value: "Patient", label: "Patient" },
                { value: "Physician", label: "Physician" },
              ]}
            />
            <SubmitButton isloading={isLoading}>Get Started</SubmitButton>{" "}
          </form>
        </Form>
        <div className="text-14-regular mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-green-500">
            Sign In
          </Link>
        </div>

        <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">
            © 2024 CarePluse
          </p>
          <Link href="/?admin=true" className="text-green-500">
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
