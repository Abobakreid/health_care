import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  redirect("/signup");
  return <div>Root</div>;
};

export default page;
