import { AuthInputProps } from "@/types";
import { InputTypes } from "@/types/enum";
import "react-phone-number-input/style.css";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import RenderInput from "./RenderInput";

const AuthInput = (props: AuthInputProps) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.inputType !== InputTypes.Checkbox && (
            <FormLabel>{props.label}</FormLabel>
          )}
          <FormControl>
            <RenderInput renderInput={props} field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AuthInput;
