"use client";
import { useState } from "react";
import AppointmentForm from "./forms/AppointmentForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Appointment } from "./columns";

const ActionsDialog = ({
  buttonLabel,
  data,
}: {
  buttonLabel: string;
  data: Appointment;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="capitalize border border-gray-800 px-4 py-1 rounded-lg">
        {buttonLabel}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">
            {buttonLabel} Appointment
          </DialogTitle>
          <DialogDescription>
            Please fill in the following details to {buttonLabel} appointment
          </DialogDescription>
        </DialogHeader>
        {buttonLabel === "scheduled" ? (
          <AppointmentForm
            patientId={data.userId}
            appointment={data}
            type={buttonLabel}
            setOpen={setOpen}
          />
        ) : (
          <AppointmentForm
            patientId={data.userId}
            appointment={data}
            type={buttonLabel}
            setOpen={setOpen}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ActionsDialog;
