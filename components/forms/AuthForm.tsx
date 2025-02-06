"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { login, signup } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AuthFormSchema } from "@/lib/utils";
import { InputTypes } from "@/types/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { AuthFormProps } from "../../types";
import AuthInput from "../AuthInput";
import Link from "next/link";

const AuthForm = ({ formType }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formSchema = AuthFormSchema(formType);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (formType == "signup") {
        const data = {
          email: values.email,
          password: values.username!,
        };
        await signup(data);
        // console.log(response, "response2");
      } else {
        const data = {
          email: values.email,
        };
        await login(data);
        // console.log(response, "response2");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-semibold">Hi there, ...</h2>
        <h2>Get Started With Appointment</h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {formType == "signup" && (
            <AuthInput
              control={form.control}
              label={"UserName"}
              placeholder="Username"
              name={"username"}
              inputImage="/assets/icons/user.svg"
              inputType={InputTypes.Input}
            />
          )}
          <AuthInput
            control={form.control}
            label={"Email"}
            placeholder="example@example.com"
            name={"email"}
            inputImage="/assets/icons/email.svg"
            inputType={InputTypes.Input}
          />
          {formType == "signup" && (
            <AuthInput
              control={form.control}
              label={"Phone Number"}
              placeholder="+2011122889039"
              name={"phoneNumber"}
              inputType={InputTypes.Phone_input}
            />
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-40 disabled:opacity-100 flex justify-center items-center"
          >
            {isLoading ? (
              <Image
                src={"/assets/icons/loader.svg"}
                alt="loader"
                width={10}
                height={10}
                className="animate-spin w-10 h-8 !text-black "
              />
            ) : (
              "Get Started"
            )}
          </Button>

          <div className="flex flex-row gap-2 justify-center ">
            <span>
              {formType == "login"
                ? "You don't have An Account"
                : "You have an account"}
            </span>
            <Link
              href={`/${formType == "login" ? "signup" : "login"}`}
              className="capitalize"
            >
              {formType == "login" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
