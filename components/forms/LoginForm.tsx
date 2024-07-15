"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { LoginValidation } from "@/lib/validation";
import SubmitButton from "../CustomButton";
import { CustomTextInput } from "../CustomInput";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLoginMutation } from "@/services/actions/index.action";
import Alert from "../Alert";

const LoginForm = () => {
  const { push } = useRouter();
  const [Login, { isLoading }] = useLoginMutation();
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof LoginValidation>) => {
    try {
      const response = await Login(values.email).unwrap();
      if (response) {
        console.log(response);
      }
    } catch (error: any) {
      setMessage(error?.data?.error || "Error signing in");
      setShowAlert(true);
      form.reset();
    }
  };
  return (
    <div>
      {showAlert && <Alert title="Error!" text={message} icon="error" />}
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
              <h1 className="header">welcome back👋</h1>
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
            <SubmitButton isloading={isLoading}>Sign In</SubmitButton>{" "}
          </form>
        </Form>
        <div className="text-14-regular mt-4">
          New user?{" "}
          <Link href="/" className="text-green-500">
            Register
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

export default LoginForm;
