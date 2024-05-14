/* eslint-disable @typescript-eslint/no-explicit-any */
import { object, string } from "yup";

const emailRegex = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

interface LoginFormFields {
  email: string;
  password: string;
}

const loginValidationSchema = object({
  email: string()
    .required("Please enter your email")
    .matches(emailRegex, "Please enter a valid email")
    .default(""),
  password: string()
    .required("Please enter your password")
    .min(6, "Password must be 6+ characters"),
});

export { loginValidationSchema };
export type { LoginFormFields };
