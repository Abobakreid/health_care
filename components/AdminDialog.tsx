"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { decryptKey, encryptKey, inputOTPSchema } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminDialog = () => {
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof inputOTPSchema>>({
    resolver: zodResolver(inputOTPSchema),
    defaultValues: {
      pin: "",
    },
  });

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("access_token")
      : null;

  useEffect(() => {
    const decryptedKey = encryptedKey && decryptKey(encryptedKey);
    if (encryptedKey) {
      if (decryptedKey === process.env.NEXT_PUBLIC_PASSKEY) {
        router.push("/admin");
      } else {
        setError("Invalid OTP , please try again");
      }
    }
  }, [encryptedKey]);

  function onSubmit(values: z.infer<typeof inputOTPSchema>) {
    if (values.pin === process.env.NEXT_PUBLIC_PASSKEY) {
      const encryptedKey = encryptKey(values.pin);
      console.log(values.pin, "encryptedKey ki");
      localStorage.setItem("access_token", encryptedKey);
      router.push("/admin");
    } else {
      console.log(values.pin, "encryptedKey");
      setError("Invalid OTP , please try again");
    }
  }

  return (
    <Dialog>
      <DialogTrigger>Admin</DialogTrigger>
      <DialogTitle className="hidden">gh</DialogTitle>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verify OTP</FormLabel>
                  <FormDescription>
                    Please enter the otp sent to registered mobile number.
                  </FormDescription>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="justify-center w-full py-2">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <span className="text-sm text-red-600 flex justify-center mt-2">
                    {error}
                  </span>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Verify</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminDialog;
