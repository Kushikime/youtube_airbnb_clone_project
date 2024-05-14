/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, forwardRef } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface IInputProps {
  type: "email" | "text" | "password";
  placeholder?: string;
  name: string;
  className?: string;
  register?: UseFormRegister<FieldValues>;
  ref?: any;
}

const Input: FC<IInputProps> = forwardRef((props, ref) => {
  return <input ref={ref as any} {...props} />;
});

export default Input;
