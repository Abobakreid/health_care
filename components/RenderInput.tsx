import { radioGender } from "@/constant";
import { cn } from "@/lib/utils";
import { RenderInputProps } from "@/types";
import { InputTypes } from "@/types/enum";
import { E164Number } from "libphonenumber-js/core";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-number-input";
import { Checkbox } from "./ui/checkbox";
import { FormControl, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import UploadFile from "./UploadFile";
// render the input element with the properties of the input element upon type
const RenderInput = ({ renderInput, field }: RenderInputProps) => {
  switch (renderInput.inputType) {
    case InputTypes.Input:
      return (
        <div className="flex flex-row flex-nowrap border ring-input border-input focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-1 rounded-lg pl-1 py-[2px]">
          {renderInput?.inputImage && (
            <Image
              src={renderInput.inputImage}
              alt={renderInput.altImage || "icon"}
              width={15}
              height={15}
              className="w-8 object-contain"
            />
          )}
          <Input
            placeholder={renderInput.placeholder}
            {...field}
            className="flex-1 focus-visible:outline-none focus-visible:ring-0 border-none outline-none"
          />
        </div>
      );
    case InputTypes.Phone_input:
      return (
        <PhoneInput
          defaultCountry="US"
          placeholder="Enter phone number"
          value={field.value as E164Number}
          international
          withCountryCallingCode
          onChange={field.onChange}
          className={cn(
            "flex flex-row flex-nowrap border ring-input border-input focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-1 rounded-lg pl-1 py-[2px]",
            "Phone-Input"
          )}
        />
      );
    case InputTypes.DatePicker:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src={renderInput.inputImage!}
            height={24}
            width={24}
            alt="user"
            className="ml-2"
          />
          <FormControl>
            <DatePicker
              showTimeSelect={renderInput.showTimeSelect ?? false}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              timeInputLabel="Time:"
              dateFormat={renderInput.dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker w-full"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              className="bg-transparent border-gray-300 rounded-lg shadow-md w-full pl-2 outline-none"
            />
          </FormControl>
        </div>
      );
    case InputTypes.Radio:
      return (
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="flex flex-row "
        >
          {radioGender.map((radio) => (
            <FormItem
              className="flex  items-center space-x-3 space-y-0 border px-4 py-2 border-input rounded-sm"
              key={radio}
            >
              <FormControl>
                <RadioGroupItem value={radio} className="cursor-pointer" />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer">
                {radio}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      );
    case InputTypes.Select:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={renderInput.placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>{renderInput.children}</SelectContent>
        </Select>
      );
    case InputTypes.Textarea:
      return (
        <div>
          <Textarea
            placeholder={renderInput.placeholder}
            className="resize-y"
            {...field}
          />
        </div>
      );
    case InputTypes.UploadFile:
      return (
        <div>
          <UploadFile files={field.value} onChange={field.onChange} />
        </div>
      );
    case InputTypes.Checkbox:
      return (
        <div className="flex  gap-3 items-center">
          <Checkbox
            id={renderInput.name}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <FormLabel htmlFor={renderInput.name}>{renderInput.label}</FormLabel>
        </div>
      );
    default:
      return null;
  }
};

export default RenderInput;
