import { FormState } from "@features/Auth/model/model";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { RegisterFormFields, registerValidationSchema } from "../model/model";
import { yupResolver } from "@hookform/resolvers/yup";
import UserIcon from "@icons/UserIcon/UserIcon";
import IconInput from "@components/IconInput/IconInput";
import KeyIcon from "@icons/KeyIcon/KeyIcon";

interface IRegisterFormProps {
  changeFormState: (state: FormState) => void;
}

const RegisterForm: FC<IRegisterFormProps> = ({ changeFormState }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormFields>({
    defaultValues: { email: "", password: "", repeatPassword: "" },
    resolver: yupResolver(registerValidationSchema),
  });

  const onRegisterSubmit = (data: RegisterFormFields) => {
    console.log("data: ", data);
  };

  const emailError = errors?.email?.message;
  const passwordError = errors?.password?.message;
  const repeatPasswordError = errors?.repeatPassword?.message;

  return (
    <>
      <h1 className="text-4xl text-center mb-4 font-semibold">Register</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onRegisterSubmit)}>
        <IconInput
          type="email"
          placeholder="Email"
          icon={<UserIcon className="text-gray-300 w-4 h-4" />}
          errorMessage={emailError}
          {...register("email")}
        />
        <IconInput
          placeholder="Password"
          icon={<KeyIcon className="text-gray-300 w-4 h-4" />}
          errorMessage={passwordError}
          type={"password"}
          {...register("password")}
        />
        <IconInput
          placeholder="Password"
          icon={<KeyIcon className="text-gray-300 w-4 h-4" />}
          errorMessage={repeatPasswordError}
          type={"password"}
          {...register("repeatPassword")}
        />
        <button className="primary mt-4">Sign up</button>
        <div className="flex justify-center text-sm">
          Already have an account?
          <button
            type="button"
            className="underline font-bold ml-1 bg-transparent"
            onClick={() => changeFormState("login")}
          >
            Back to login
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
