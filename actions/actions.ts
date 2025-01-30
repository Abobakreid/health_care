"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  CreateAppointmentProps,
  GetAppointmentListProps,
  LoginProps,
  RegisterProps,
  storageProps,
  UpdateAppointmentProps,
} from "@/types";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

export const getUser = async (userId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("id", userId);

  if (error) {
    console.log(error, "Authent");
    redirect("/error");
  }

  if (data) {
    console.log(data[0].privacyConsent);
    redirect(`/patients/${data[0].id}/new-appointment`);
  }
  // redirect(`/patients/${data[0]?.id}/register`);
  return data[0];
};

export async function login({ email }: LoginProps) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const logindata = {
    email: email,
    password: "StrongPassword123!",
  };

  console.log(logindata, "logindata");

  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword(logindata);
  if (error) {
    console.log(error, "Authent");
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect(`/patients/${user?.id}/register`);
}

export async function signup({ email }: LoginProps) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const Userdata = {
    email: email,
    password: "StrongPassword123!",
  };

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(Userdata);

  if (error && !user) {
    redirect("/error");
  }

  console.log(user?.id, "response1");

  revalidatePath("/", "layout");
  redirect(`/patients/${user?.id}/register`);
}

async function UploadFile(
  identificationDocumentUrl: FormData,
  userID: string
): Promise<storageProps | null> {
  const supabase = await createClient();

  const file = identificationDocumentUrl.get("blobFile") as Blob | null;
  const filename = identificationDocumentUrl.get("fileName") as string | null;

  if (!file || !filename) {
    console.error("File or filename is missing!");
    return null; // Return early if there's no file or filename
  }

  const { data, error } = await supabase.storage
    .from("healthCare")
    .upload(`${userID}/${uuidv4()}`, file!);
  console.log("Uploaded file", error);
  if (error && !data) {
    redirect("/error");
  }

  return data;
}

export async function register(info: RegisterProps) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  let storageData: storageProps | null = null;
  if (info.identificationDocumentUrl) {
    storageData = await UploadFile(info.identificationDocumentUrl, info.userId);
  }

  const Userdata = {
    ...info,
    identificationDocumentId: storageData ? storageData?.id : null,
    identificationDocumentUrl: storageData
      ? `object/public/${storageData?.fullPath}`
      : null,
  };

  const { data, error } = await supabase.from("patients").insert([Userdata]);

  if (error && !data) {
    redirect("/error");
  }

  console.log(data, "response1");

  revalidatePath("/", "layout");
  redirect(`/patients/${info?.userId}/new-appointment`);
}
export async function CreateAppointment(info: CreateAppointmentProps) {
  // console.log(info, "Create App");
  const supabase = await createClient();

  const Userdata = {
    ...info,
  };

  const { data, error } = await supabase
    .from("appointment")
    .insert([Userdata])
    .select();

  console.log(error, "response1");
  if (error && !data) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect(
    `/patients/${info?.userId}/new-appointment/success?appointmentId=${data[0].id}`
  );
}

export async function GetAppointment(appointmentId: string) {
  const supabase = await createClient();
  console.log(appointmentId, "success");

  const { data, error } = await supabase
    .from("appointment")
    .select("*")
    .eq("id", appointmentId);

  console.log(error, "success");
  if (error && !data) {
    redirect("/error");
  }
  return data[0];
}

export async function GetAppointmentList(): Promise<GetAppointmentListProps> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("appointment")
    .select("*, patients (id, name)");

  const initialValues = {
    pending: 0,
    cancelled: 0,
    scheduled: 0,
  };

  console.log(data, "initial");

  console.log(error, "success");
  if (error && !data) {
    redirect("/error");
  }

  const counts = data.reduce((acc, val) => {
    if (val.state === "scheduled") {
      acc.scheduled += 1;
    } else if (val.state === "cancelled") {
      acc.cancelled += 1;
    } else if (val.state === "pending") {
      acc.pending += 1;
    }
    return acc; // Always return acc in a reduce callback
  }, initialValues);
  return { ...counts, list: data };
}

export const sendSMS = async (toWho: string, message: string) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: "+201122889039",
    });
    console.log("SMS sent wow:", response.sid);
    return response;
  } catch (error) {
    console.error("Error sending SMS wow:", error);
    throw error;
  }
};

export async function UpdateAppointment(info: UpdateAppointmentProps) {
  // console.log(info, "Create App");
  const supabase = await createClient();

  const Userdata = {
    ...info.appointmentData,
  };

  const { data, error } = await supabase
    .from("appointment")
    .update(Userdata)
    .eq("id", info.appointmentId)
    .select("*, patients (id, name, phone)");

  console.log(data, "response1op new kio");
  if (error && !data) {
    redirect("/error");
  }
  revalidatePath("/admin", "layout");
  // const message = `Your appointment on ${data[0].appointmentDate} has been canceled.`;
  // await sendSMS(data[0].patients.phone, message);
  return { state: "success" };
}
