"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "./ui/checkbox";
import { AdminCardType } from "@/types/enum";
import { formatDateTime } from "@/lib/utils";
import ActionsTable from "./ActionsTable";
import StatusTable from "./StatusTable";
import DoctorTable from "./DoctorTable";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Appointment = {
  id: string;
  created_at: string;
  reason: string;
  primaryphysician: string;
  note: string;
  cancelReason?: string;
  appointmentDate: Date;
  userId: string;
  state: AdminCardType;
  patients?: {
    id: string;
    name: string;
  };
};

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "patients", // Sorting by patient name
    header: "Patients",
    cell: ({ row }) => {
      const patientName = row.original?.patients?.name;
      return <p>{patientName}</p>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const appointmentDate = row.original?.appointmentDate;

      if (!appointmentDate) {
        return <p>No Date</p>;
      }

      return <p>{formatDateTime(appointmentDate).dateTime}</p>;
    },
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.original?.appointmentDate || 0).getTime();
      const dateB = new Date(rowB.original?.appointmentDate || 0).getTime();
      return dateA - dateB;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointmentDate = row.original;
      return <StatusTable status={appointmentDate?.state} />;
    },
  },
  {
    accessorKey: "doctor",
    header: "Doctor",
    cell: ({ row }) => {
      const appointmentData = row.original;
      return (
        <DoctorTable primaryphysician={appointmentData?.primaryphysician} />
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const appointmentData = row.original;
      return (
        <div>
          <ActionsTable actions={appointmentData} />
        </div>
      );
    },
  },
];
