import { FormState } from "@features/Auth/model/model";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormFields, loginValidationSchema } from "../model/model";
import UserIcon from "@icons/UserIcon/UserIcon";
import KeyIcon from "@icons/KeyIcon/KeyIcon";
import IconInput from "@components/IconInput/IconInput";

interface ILoginFormProps {
  changeFormState: (state: FormState) => void;
}

const LoginForm: FC<ILoginFormProps> = ({ changeFormState }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormFields>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(loginValidationSchema),
  });

  const onLoginSubmit = (data: LoginFormFields) => {
    console.log("data: ", data);
  };

  const emailError = errors?.email?.message;
  const passwordError = errors?.password?.message;

  return (
    <>
      <h1 className="text-4xl text-center mb-4 font-semibold ffpoppins">
        Login
      </h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(onLoginSubmit)}
      >
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

        <button className="primary mt-2">Login</button>
        <div className="flex justify-center text-sm">
          Don't have an account yet?
          <button
            type="button"
            className="underline font-bold ml-1 bg-transparent"
            onClick={() => changeFormState("register")}
          >
            Register now
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
