import { GetAppointmentList } from "@/actions/actions";
import AdminCard from "@/components/AdminCard";
import { columns } from "@/components/columns";
import DataTable from "@/components/DataTable";
import { AdminCardType } from "@/types/enum";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const adminCard = await GetAppointmentList();
  return (
    <section className="space-y-8 px-6">
      <header className="flex flex-row justify-between py-4 bg-black px-2 lg:px-20">
        <Link
          href={"/login"}
          className="flex flex-row items-center gap-2 justify-center"
        >
          <Image
            src="/assets/icons/logo-icon.svg"
            alt="logo icon"
            width={100}
            height={100}
            className="object-contain w-8 h-8"
          />
          <h2>HealthCare</h2>
        </Link>
        <div className="flex flex-row items-center gap-2 justify-center">
          <Image
            src="/assets/images/admin.png"
            alt="logo icon"
            width={100}
            height={100}
            className="object-contain w-10 h-10"
          />
          <h2>Admin</h2>
        </div>
      </header>
      <div className="indent-2 lg:indent-24">
        <h2 className="text-5xl font-semibold">Welcome, Admin</h2>
        <p className="text-sm tracking-widest mt-2">
          Start day with managing new appointment
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 ">
        <AdminCard
          count={adminCard.scheduled}
          icon="/assets/icons/appointments.svg"
          label="Total Number of scheduled appointments"
          type={AdminCardType.appointment}
        />
        <AdminCard
          count={adminCard.pending}
          icon="/assets/icons/pending.svg"
          label="Total Number of pending appointments"
          type={AdminCardType.pending}
        />
        <AdminCard
          count={adminCard.cancelled}
          icon="/assets/icons/cancelled.svg"
          label="Total Number of cancelled appointments"
          type={AdminCardType.cancelled}
        />
      </div>
      <div className="lg:px-20">
        <DataTable columns={columns} data={adminCard.list} />
      </div>
    </section>
  );
};

export default page;
