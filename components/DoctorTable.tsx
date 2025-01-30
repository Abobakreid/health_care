import { Doctors } from "@/constant";
import { cn } from "@/lib/utils";
import Image from "next/image";

const DoctorTable = ({ primaryphysician }: { primaryphysician: string }) => {
  const doctor = Doctors.find(
    (physician) => physician.name === primaryphysician
  );
  return (
    <div className={cn("flex gap-2 rounded-lg w-fit px-3 py-1 items-center")}>
      <Image
        src={doctor?.image as string}
        alt="status icon"
        width={100}
        height={100}
        className="w-6 h-6 object-contain"
      />
      <h2>{primaryphysician}</h2>
    </div>
  );
};

export default DoctorTable;
