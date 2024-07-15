import { getUser } from "@/services/actions/patient.action";
import Image from "next/image";
import { redirect } from "next/navigation";
import PatientForm from "../forms/PatientForm";

const Patient = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  console.log("User:", user); // Add this line

  //   const patient = await getPatient(userId);

  //   if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <PatientForm user={user} />

          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Patient;
