import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (
  dateString: Date | string,
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    year: "numeric", // numeric year (e.g., '2023')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false),
    timeZone: timeZone, // use the provided timezone
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
    timeZone: timeZone, // use the provided timezone
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
    timeZone: timeZone, // use the provided timezone
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    timeZone: timeZone, // use the provided timezone
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export const AuthFormSchema = (type: string) => {
  return z.object({
    username:
      type == "login" ? z.string().optional() : z.string().min(2).max(50),
    email: z.string().email(),
    phoneNumber:
      type == "login"
        ? z.string().optional()
        : z
            .string()
            .refine((val) => /^\+\d{10,15}$/.test(val), "Invalid phone number"),
  });
};

// schema for validation patient form
export const formPatientSchema = z.object({
  // personal information
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email"),
  phoneNumber: z
    .string()
    .refine((val) => /^\+\d{10,15}$/.test(val), "Invalid phone number"),
  dateOFBirth: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "You need to select gender.",
  }),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  occupation: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  emergencyContactName: z.string(),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Invalid phone number"
    ),
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  insuranceProvider: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters"),
  insurancePolicyNumber: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters"),
  allergies: z.string().min(2, "Select at least one doctor"),
  currentMedication: z.string().min(2, "Select at least one doctor"),
  familyMedicalHistory: z.string().min(2, "Select at least one doctor"),
  pastMedicalHistory: z.string().min(2, "Select at least one doctor"),
  identificationType: z.string().min(2, "Select at least one doctor"),
  identificationNumber: z.string().min(2, "Select at least one doctor"),
  uploadImage: z.custom<File[]>(),
  checkReceive: z.boolean().refine((value) => value === true, {
    message: "You must consent to treatment in order to proceed",
  }),
  checkUse: z.boolean().refine((value) => value === true, {
    message: "You must consent to disclosure in order to proceed",
  }),
  checkKnowledge: z.boolean().refine((value) => value === true, {
    message: "You must consent to privacy in order to proceed",
  }),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  reason: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters"),
  note: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters"),
  appointmentDate: z.coerce.date(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().optional(),
  reason: z.string().optional(),
  note: z.string().optional(),
  appointmentDate: z.coerce.date().optional(),
  cancelReason: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters"),
});

export const UpdateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor").optional(),
  reason: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters")
    .optional(),
  note: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters")
    .optional(),
  appointmentDate: z.coerce.date().optional(),
  cancelReason: z.string().optional(),
});

export const formAppointmentSchemas = (type: string) => {
  switch (type) {
    case "cancel":
      return CancelAppointmentSchema;
    case "scheduled":
      return UpdateAppointmentSchema;
    default:
      return CreateAppointmentSchema;
  }
};

export const inputOTPSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}
