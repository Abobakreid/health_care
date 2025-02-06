import { GetAppointment } from "@/actions/actions";
import { Separator } from "@/components/ui/separator";
import { Doctors } from "@/constant";
import { formatDateTime } from "@/lib/utils";
import { SuccessProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

const page = async ({ params, searchParams }: SuccessProps) => {
  const { patientId } = await params;
  const { appointmentId } = await searchParams;
  const appointment = await GetAppointment(appointmentId);
  // console.log(appointment, "Appointment successfully");
  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryphysician
  );
  return (
    <div className="flex flex-col justify-center gap-y-10 items-center h-svh">
      <header className="flex flex-row">
        <Image
          src="/assets/icons/logo-icon.svg"
          alt="logo"
          width={100}
          height={100}
          className="object-contain w-8 h-8"
        />
        <h2>HealthCare</h2>
      </header>
      <div className="text-center flex flex-col justify-center items-center">
        <Image
          src={"/assets/gifs/success.gif"}
          alt="success"
          width={200}
          height={300}
        />
        <h2 className="text-6xl mb-2">
          Your
          <span className="text-green-800 mx-2">Appointment</span>
          has
          <br />
          been successfully submitted
        </h2>
        <p>We will be in touch shortly to confirm .</p>
      </div>
      <div className="w-full lg:w-[500px] xl:w-[1200px]">
        <Separator />
      </div>
      <div className="flex flex-row gap-x-8 items-center">
        <h2 className="text-xl">Requested appointment details: </h2>
        <div className="flex flex-row gap-2 items-center">
          <Image
            src={doctor?.image as string}
            width={100}
            height={100}
            alt="doctor Image"
            className="w-8 h-8"
          />
          <p>{doctor?.name}</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Image
            src="/assets/icons/calendar.svg"
            alt="calendar icon"
            width={100}
            height={100}
            className="w-8 h-8"
          />
          <p>{formatDateTime(appointment?.appointmentDate).dateTime}</p>
        </div>
      </div>
      <div className="w-full lg:w-[500px] xl:w-[1200px]">
        <Separator />
      </div>

      <Link
        href={`/patients/${patientId}/new-appointment`}
        className="bg-green-800 px-4 py-2 rounded-r-lg"
      >
        Create New Appointment
      </Link>
    </div>
  );
};

export default page;
