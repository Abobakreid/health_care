import AppointmentForm from "@/components/forms/AppointmentForm";
import { PatientIdProps } from "@/types";
import Image from "next/image";

const page = async ({ params }: PatientIdProps) => {
  const { patientId } = await params;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-svh flex-col lg:flex-row px-4 lg:pl-4">
      <div className="col-span-1">
        <div className="flex flex-col justify-between py-4 lg:px-16 w-full h-full ">
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
            <AppointmentForm patientId={patientId} type={"create"} />
          </div>
          <footer className="flex flex-row justify-between items-center">
            <h2>&copy; HealthCare CopyRights</h2>
          </footer>
        </div>
      </div>
      <div className="hidden col-span-1 relative  lg:grid justify-end items-end overflow-hidden">
        <Image
          src={"/assets/images/appointment-img.png"}
          alt="onboaring img"
          width={500}
          height={500}
          className="w-[500px] max-w-[500px] h-full max-h-full rounded-xl aspect-square"
        />
      </div>
    </div>
  );
};

export default page;
