/* eslint-disable @typescript-eslint/no-explicit-any */

import Input from "@components/Input/Input";
import EyeClosedIcon from "@icons/EyeClosedIcon/EyeClosedIcon";
import EyeIcon from "@icons/EyeIcon/EyeIcon";
import { FC, ReactNode, forwardRef, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface IconInputProps {
  name: string;
  type: "email" | "text" | "password";
  icon: ReactNode;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
  register?: UseFormRegister<FieldValues>;
}

const IconInput: FC<IconInputProps> = forwardRef(
  ({ icon, type, errorMessage, ...props }, ref) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const onPasswordRevealClick = () => {
      setPasswordVisible((prev) => !prev);
    };

    const inputType =
      type === "password" ? (passwordVisible ? "text" : type) : type;

    return (
      <>
        <div className="flex items-center border border-gray-300 rounded-md px-3">
          {icon}
          <Input type={inputType} {...props} ref={ref} />
          <button
            type="button"
            className="bg-transparent"
            onClick={onPasswordRevealClick}
          >
            {type === "password" ? (
              passwordVisible ? (
                <EyeClosedIcon className="text-gray-300 w-6 h-6" />
              ) : (
                <EyeIcon className="text-gray-300 w-6 h-6" />
              )
            ) : null}
          </button>
        </div>
        {errorMessage && (
          <span className="text-red-600 text-xs">{errorMessage}</span>
        )}
      </>
    );
  }
);

export default IconInput;
