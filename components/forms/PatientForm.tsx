"use client";
import { register } from "@/actions/actions";
import { Doctors, IdentificationTypes } from "@/constant";
import { formPatientSchema } from "@/lib/utils";
import { InputTypes } from "@/types/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthInput from "../AuthInput";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { SelectItem } from "../ui/select";

const PatientForm = ({ patientId }: { patientId: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formPatientSchema>>({
    resolver: zodResolver(formPatientSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      dateOFBirth: new Date(Date.now()),
      gender: "Male",
      address: "",
      occupation: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
      primaryPhysician: "",
      insuranceProvider: "",
      insurancePolicyNumber: "",
      allergies: "",
      currentMedication: "",
      familyMedicalHistory: "",
      pastMedicalHistory: "",
      identificationType: "",
      identificationNumber: "",
      uploadImage: [],
      checkReceive: false,
      checkUse: false,
      checkKnowledge: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formPatientSchema>) => {
    setIsLoading(true);
    let formData;
    if (values.uploadImage && values.uploadImage.length > 0) {
      const blobFile = new Blob([values.uploadImage[0]], {
        type: values.uploadImage[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.uploadImage[0].name);
    }

    try {
      const data = {
        email: values.email,
        phone: values.phoneNumber,
        name: values.name,
        privacyConsent: values.checkReceive,
        gender: values.gender,
        dateofbirth: new Date(values.dateOFBirth),
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocumentId: "",
        identificationDocumentUrl: formData,
        primaryphysician: values.primaryPhysician,
        treatmentConsent: values.checkUse,
        disclosureConsent: values.checkKnowledge,
        userId: patientId,
      };
      await register(data);
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
      <div>
        <h2 className="text-2xl font-semibold">Personal Information</h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <AuthInput
            control={form.control}
            label={"UserName"}
            placeholder="Username"
            name={"name"}
            inputImage="/assets/icons/user.svg"
            inputType={InputTypes.Input}
          />

          <div className="grid grid-cols-1 gap-5  lg:grid-cols-2 items-center  ">
            <AuthInput
              control={form.control}
              label={"Email"}
              placeholder="example@example.com"
              name={"email"}
              inputImage="/assets/icons/email.svg"
              inputType={InputTypes.Input}
            />
            <AuthInput
              control={form.control}
              label={"Phone Number"}
              placeholder="+2011122889039"
              name={"phoneNumber"}
              inputType={InputTypes.Phone_input}
            />
          </div>

          <div className="grid grid-cols-1 gap-5  lg:grid-cols-2 items-center  ">
            <AuthInput
              control={form.control}
              label={"Birth Date"}
              inputImage="/assets/icons/calendar.svg"
              name={"dateOFBirth"}
              inputType={InputTypes.DatePicker}
            />
            <AuthInput
              control={form.control}
              label={"Gender"}
              name={"gender"}
              inputType={InputTypes.Radio}
            />
          </div>

          <div className="grid grid-cols-1 gap-5  lg:grid-cols-2 items-center  ">
            <AuthInput
              control={form.control}
              label={"Address"}
              placeholder="14th street, new York"
              name={"address"}
              inputType={InputTypes.Input}
            />
            <AuthInput
              control={form.control}
              label={"Occupation"}
              placeholder="Software engineer "
              name={"occupation"}
              inputType={InputTypes.Input}
            />
          </div>

          <div className="grid grid-cols-1 gap-5  lg:grid-cols-2 items-center  ">
            <AuthInput
              control={form.control}
              label={"Emergency Contact Name"}
              placeholder="Guardian's Name"
              name={"emergencyContactName"}
              inputType={InputTypes.Input}
            />
            <AuthInput
              control={form.control}
              label={"Emergency Contact Number"}
              placeholder="+2011122889039"
              name={"emergencyContactNumber"}
              inputType={InputTypes.Phone_input}
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Medical Information</h2>
          </div>

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
              label={"Insurance Provider"}
              placeholder="BlueCross BlueShield"
              name={"insuranceProvider"}
              inputType={InputTypes.Input}
            />
            <AuthInput
              control={form.control}
              label={"Insurance Policy Number"}
              placeholder="ABC12345678"
              name={"insurancePolicyNumber"}
              inputType={InputTypes.Input}
            />
          </div>

          <div className="grid grid-cols-1 gap-5  lg:grid-cols-2 items-center  ">
            <AuthInput
              control={form.control}
              label={"Allergies (if any)"}
              placeholder="Peanuts, Penicillin, Pollen"
              name={"allergies"}
              inputType={InputTypes.Textarea}
            />
            <AuthInput
              control={form.control}
              label={"Current Medication (if any)"}
              placeholder="Ibuprofen 200mg, Paracetamol 500mg"
              name={"currentMedication"}
              inputType={InputTypes.Textarea}
            />
          </div>

          <div className="grid grid-cols-1 gap-5  lg:grid-cols-2 items-center  ">
            <AuthInput
              control={form.control}
              label={"Family Medical History"}
              placeholder="Mother had a cancer , father had a  disease"
              name={"familyMedicalHistory"}
              inputType={InputTypes.Textarea}
            />
            <AuthInput
              control={form.control}
              label={"Past Medical History"}
              placeholder="Appendectomy, Tonsillectomy"
              name={"pastMedicalHistory"}
              inputType={InputTypes.Textarea}
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              Identification and verification
            </h2>
          </div>

          <AuthInput
            control={form.control}
            label={"Identification Type"}
            placeholder="ex: Doctor's license"
            name={"identificationType"}
            inputType={InputTypes.Select}
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem value={type} key={i}>
                <div className="flex flex-row gap-3 items-center">
                  <h2>{type}</h2>
                </div>
              </SelectItem>
            ))}
          </AuthInput>

          <AuthInput
            control={form.control}
            label={"Identification Number"}
            placeholder="ex:12345678"
            name={"identificationNumber"}
            inputType={InputTypes.Input}
          />

          <AuthInput
            control={form.control}
            label={"Scanned Copy of Identification information "}
            placeholder="123456789"
            name={"uploadImage"}
            inputType={InputTypes.UploadFile}
          />

          <div>
            <h2 className="text-2xl font-semibold">Consent and Privacy</h2>
          </div>

          <AuthInput
            control={form.control}
            label={"I consent to receive treatment for my health condition."}
            name={"checkReceive"}
            inputType={InputTypes.Checkbox}
          />
          <AuthInput
            control={form.control}
            label={
              "I consent to the use and disclosure of my health information for treatment purposes"
            }
            name={"checkUse"}
            inputType={InputTypes.Checkbox}
          />
          <AuthInput
            control={form.control}
            label={
              "I acknowledge that I have reviewed and agree to the privacy policy"
            }
            name={"checkKnowledge"}
            inputType={InputTypes.Checkbox}
          />

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
        </form>
      </Form>
    </div>
  );
};

export default PatientForm;
