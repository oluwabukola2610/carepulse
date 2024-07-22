"use client";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useLazyGetUserDataQuery,
  useValidateLogincodeMutation,
} from "@/services/actions/index.action";
import { useRouter } from "next/navigation";
import Layout from "@/components/AuthLayout";
import Alert from "@/components/Alert";

const PassKey = () => {
  const [otp, setOtp] = useState("");
  const [validate, { isLoading: isValidating }] =
    useValidateLogincodeMutation();
  const [getUser, { isLoading }] = useLazyGetUserDataQuery();
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const { push } = useRouter();

  const validateOtp = async () => {
    try {
      await validate({ otp }).unwrap();
      const userResponse = await getUser({}).unwrap();
      console.log(userResponse);
      setOtp("");
      if (userResponse.bioData?.role === "Patient") {
        if (userResponse?.onboarding === true) {
          push("/patient/new-appointment");
        } else {
          push("/patient/onboard");
        }
      } else if (userResponse.bioData?.role === "Physician") {
        if (userResponse?.onboarding === true) {
          push("/physican/dashboard");
        } else {
          push("/physican/onboard");
        }
      } else {
        push("/");
      }
    } catch (error: any) {
      setShowAlert(true);
      setMessage(error?.data?.error || "Invalid OTP");
    }
  };

  return (
    <Layout>
      {showAlert && <Alert title="Error!" text={message} icon="error" />}
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="shad-alert-dialog p-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-lg font-semibold">Access Verification</h2>
          </div>
          <p className="text-gray-300 mb-6">
            Please enter your passkey to continue
          </p>
          <div className="mb-6">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup className="shad-otp">
                <InputOTPSlot className="shad-otp-slot" index={0} />
                <InputOTPSlot className="shad-otp-slot" index={1} />
                <InputOTPSlot className="shad-otp-slot" index={2} />
                <InputOTPSlot className="shad-otp-slot" index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <button
            onClick={validateOtp}
            className="shad-primary-btn w-full py-2 rounded-md text-white bg-green-500 hover:bg-green-600"
            disabled={isValidating && otp.length !== 4}
          >
            {isValidating ? "Validating..." : "Validate OTP"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PassKey;
