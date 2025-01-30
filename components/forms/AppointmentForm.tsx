"use client";
import { CreateAppointment, UpdateAppointment } from "@/actions/actions";
import { Doctors } from "@/constant";
import { formAppointmentSchemas } from "@/lib/utils";
import { InputTypes } from "@/types/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthInput from "../AuthInput";
import { Appointment } from "../columns";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { SelectItem } from "../ui/select";

const AppointmentForm = ({
  patientId,
  type,
  appointment,
  setOpen,
}: {
  patientId: string;
  type: string;
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formAppointmentSchema = formAppointmentSchemas(type);
  const form = useForm<z.infer<typeof formAppointmentSchema>>({
    resolver: zodResolver(formAppointmentSchema),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryphysician : "",
      reason: appointment ? appointment?.reason : "",
      note: appointment ? appointment?.note : "",
      appointmentDate: appointment
        ? new Date(appointment.appointmentDate)
        : new Date(Date.now()),
      cancelReason: appointment?.cancelReason || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formAppointmentSchema>) => {
    setIsLoading(true);
    let status;
    switch (type) {
      case "scheduled":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type == "create") {
        const data = {
          primaryphysician: values.primaryPhysician!,
          reason: values.reason!,
          note: values.note!,
          appointmentDate: new Date(values.appointmentDate!),
          state: status,
          userId: patientId,
        };
        const response = await CreateAppointment(data);
        console.log(response, "response2");
      } else {
        const data = {
          appointmentId: appointment?.id ?? "",
          appointmentData: {
            primaryphysician: values.primaryPhysician!,
            reason: values.reason!,
            note: values.note!,
            appointmentDate: new Date(values.appointmentDate!),
            state: status,
            userId: patientId,
            cancelReason: values.reason!,
          },
        };
        const response = await UpdateAppointment(data);
        console.log(response, "response2");
        if (response.state && setOpen) {
          setOpen(false);
        }
      }
    } catch (error) {
      console.log(values, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {type == "create" && (
        <div>
          <h2 className="text-3xl font-semibold">Hi there, ...</h2>
          <h2 className="text-sm">Request a new appointment in 10 seconds</h2>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {type !== "cancel" && (
            <div className="space-y-8">
              <AuthInput
                control={form.control}
                label={"Primary physician"}
                placeholder="Select a physician"
                name={"primaryPhysician"}
                inputType={InputTypes.Select}
              >
                {Doctors.map((doctor) => (
                  <SelectItem value={doctor.name} key={doctor.id}>
                    <div className="flex flex-row gap-3 items-center">
                      <Image
                        src={doctor.image}
                        width={24}
                        alt="doctor icon"
                        height={24}
                        className="object-contain w-7 h-7"
                      />
                      <h2>{doctor.name}</h2>
                    </div>
                  </SelectItem>
                ))}
              </AuthInput>
              <div className="grid grid-cols-1 gap-5  lg:grid-cols-2 items-center  ">
                <AuthInput
                  control={form.control}
                  label={"Reason For Appointment"}
                  placeholder="ex:Annual Monthly CheckUp"
                  name={"reason"}
                  inputType={InputTypes.Textarea}
                />
                <AuthInput
                  control={form.control}
                  label={"Additional Information / Notes"}
                  placeholder="ex:Prefer Afternoon Appointment, if possible"
                  name={"note"}
                  inputType={InputTypes.Textarea}
                />
              </div>

              <AuthInput
                control={form.control}
                label={"Expected Appointment Date"}
                inputImage="/assets/icons/calendar.svg"
                name={"appointmentDate"}
                showTimeSelect
                dateFormat="MM/dd/yyyy  -  h:mm aa"
                inputType={InputTypes.DatePicker}
              />
            </div>
          )}

          {type == "cancel" && (
            <AuthInput
              control={form.control}
              label={"Enter Cancel Reason"}
              placeholder="Enter Reason for cancellation"
              name={"cancelReason"}
              inputType={InputTypes.Textarea}
            />
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-40 disabled:opacity-100 flex justify-center items-center"
          >
            {isLoading && (
              <Image
                src={"/assets/icons/loader.svg"}
                alt="loader"
                width={10}
                height={10}
                className="animate-spin w-10 h-8 !text-black "
              />
            )}
            {type}
          </Button>
          {/* <DialogClose>
          </DialogClose> */}
        </form>
      </Form>
    </div>
  );
};

export default AppointmentForm;
