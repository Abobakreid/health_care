import { getUser } from "@/actions/actions";
import PatientForm from "@/components/forms/PatientForm";
import { PatientIdProps } from "@/types";
import Image from "next/image";

const Page = async ({ params }: PatientIdProps) => {
  const { patientId } = await params;
  await getUser(patientId);
  // console.log(patientId, "params");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-svh flex-col lg:flex-row px-4 lg:pl-4">
      <div className="col-span-1">
        <div className="flex flex-col justify-between py-4 lg:px-16 w-full h-full gap-5">
          <header className="flex flex-row mt-16">
            <Image
              src="/assets/icons/logo-icon.svg"
              alt="logo"
              width={30}
              height={30}
            />
            <h2 className="text-2xl font-semibold">HealthCare</h2>
          </header>
          <div className="w-full">
            {patientId && <PatientForm patientId={patientId} />}
          </div>
          <footer className="flex flex-row justify-between items-center">
            <h2>&copy; HealthCare CopyRights</h2>
          </footer>
        </div>
      </div>
      <div className=" hidden lg:flex col-span-1 relative">
        <Image
          src={"/assets/images/register-img.png"}
          alt="onboarding img"
          fill
          className="max-w-full max-h-full rounded-xl aspect-square"
        />
      </div>
    </div>
  );
};

export default Page;
