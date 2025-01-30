import { cn } from "@/lib/utils";
import { AdminCardProps } from "@/types";
import { AdminCardType } from "@/types/enum";
import Image from "next/image";
import React from "react";

const AdminCard = ({ type, count, label, icon }: AdminCardProps) => {
  return (
    <div
      className={cn(
        type == AdminCardType.appointment && "bg-appointments",
        type == AdminCardType.pending && "bg-pending",
        type == AdminCardType.cancelled && "bg-cancelled",
        "flex flex-col px-6 py-8 gap-3 !rounded-[15px]"
      )}
    >
      <div className="flex gap-2 items-center">
        <Image
          src={icon}
          alt="calendar icon"
          width={100}
          height={100}
          className="object-contain w-8 h-8"
        />
        <h2>{count}</h2>
      </div>
      <h2>{label}</h2>
    </div>
  );
};

export default AdminCard;
