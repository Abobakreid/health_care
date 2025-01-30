import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { AdminCardType, InputTypes } from "./enum";
declare type AuthFormProps = {
  formType: string;
};

declare type AuthInputProps = {
  control: Control<unknown>;
  label: string;
  placeholder?: string;
  name: FieldPath<unknown>;
  inputImage?: string;
  altImage?: string;
  inputType: InputTypes;
  children?: React.ReactNode;
  showTimeSelect?: boolean;
  dateFormat?: string;
};
declare type RenderInputProps = {
  renderInput: AuthInputProps;
  field: ControllerRenderProps<FieldValues, string>;
};

declare type LoginProps = {
  email: string;
};

declare type UploadFilesProps = {
  files: File[];
  onChange: (files: File[]) => void;
};

declare type RegisterProps = {
  email: string;
  phone: string;
  name: string;
  privacyConsent: boolean;
  gender: string;
  dateofbirth: Date;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string;
  currentMedication: string;
  familyMedicalHistory: string;
  pastMedicalHistory: string;
  identificationType: string;
  identificationNumber: string;
  identificationDocumentId: string;
  identificationDocumentUrl: ForsmData;
  primaryphysician: string;
  userId: string;
};
declare type storageProps = {
  id: string;
  path: string;
  fullPath: string;
};

declare type PatientIdProps = {
  params: {
    patientId: string;
  };
};
declare type CreateAppointmentProps = {
  primaryphysician: string;
  reason: string;
  note: string;
  appointmentDate: Date;
  state: string;
  userId: string;
  cancelReason?: string;
};

declare type UpdateAppointmentProps = {
  appointmentId: string;
  appointmentData: CreateAppointmentProps;
};

declare type AdminCardProps = {
  type: AdminCardType;
  count: number;
  label: string;
  icon: string;
};

declare type SuccessProps = {
  params: {
    patientId: string;
  };
  searchParams: {
    appointmentId: string;
  };
};

declare type GetAppointmentListProps = {
  pending: number;
  cancelled: number;
  scheduled: number;
  list: Appointment;
};
