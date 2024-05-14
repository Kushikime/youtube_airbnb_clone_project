/* eslint-disable @typescript-eslint/no-explicit-any */
import { object, string, ref } from "yup";

const emailRegex = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

interface RegisterFormFields {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const registerValidationSchema = object({
  name: string().required("Please enter your name").default(""),
  email: string()
    .required("Please enter your email")
    .matches(emailRegex, "Please enter a valid email")
    .default(""),
  password: string()
    .required("Please enter your password")
    .min(6, "Password must be 6+ characters"),
  repeatPassword: string()
    .required("Please enter your password")
    .oneOf([ref("password")], "Passwords do not match."),
});

export { registerValidationSchema };
export type { RegisterFormFields };
