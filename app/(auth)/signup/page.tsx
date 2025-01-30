import AdminDialog from "@/components/AdminDialog";
import AuthForm from "@/components/forms/AuthForm";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-svh flex-col lg:flex-row px-4 lg:pl-4">
      <div className="col-span-1">
        <div className="flex flex-col justify-between py-4 lg:px-16 w-full h-full ">
          <header className="flex flex-row mt-16">
            <Image
              src="/assets/icons/logo-icon.svg"
              alt="logo"
              width={30}
              height={30}
            />
            <h2 className="text-2xl font-semibold">HealthCare</h2>
          </header>
          <div className="w-full lg:w-[500px] max-w-[550px]">
            <AuthForm formType="signup" />
          </div>
          <footer className="flex flex-row justify-between items-center">
            <h2>&copy; HealthCare CopyRights</h2>
            <AdminDialog />
          </footer>
        </div>
      </div>
      <div className="hidden lg:flex col-span-1 relative">
        <Image
          src={"/assets/images/onboarding-img.png"}
          alt="onboaring img"
          fill
          className="max-w-full max-h-full rounded-xl aspect-square"
        />
      </div>
    </div>
  );
};

export default page;
