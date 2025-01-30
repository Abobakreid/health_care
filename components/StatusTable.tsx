import { StatusIcon } from "@/constant";
import { cn } from "@/lib/utils";
import { AdminCardType } from "@/types/enum";
import Image from "next/image";

const StatusTable = ({ status }: { status: string }) => {
  return (
    <div
      className={cn(
        {
          "bg-green-600": status === AdminCardType.appointment,
          "bg-blue-600": status === AdminCardType.pending,
          "bg-red-600": status === AdminCardType.cancelled,
        },
        "flex gap-2 rounded-lg w-fit px-3 py-1 items-center flex-wrap"
      )}
    >
      <Image
        src={StatusIcon[status as AdminCardType]}
        alt="status icon"
        width={100}
        height={100}
        className="w-6 h-6 object-contain"
      />
      <h2
        className={cn(
          {
            "text-green-100": status === AdminCardType.appointment,
            "text-red-100": status === AdminCardType.cancelled,
            "text-blue-100": status === AdminCardType.pending,
          },
          "hidden xl:flex"
        )}
      >
        {status}
      </h2>
    </div>
  );
};

export default StatusTable;
