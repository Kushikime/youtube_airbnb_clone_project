import { FormState } from "@features/Auth/model/model";
import LoginForm from "@features/Auth/ui/LoginForm/ui/LoginForm";
import RegisterForm from "@features/Auth/ui/RegisterForm/ui/RegisterForm";
import { FC, useState } from "react";

interface IAuthPageProps {}

const AuthPage: FC<IAuthPageProps> = () => {
  const [formState, setFormState] = useState<FormState>("login");

  const changeFormState = (state: FormState) => setFormState(state);

  const renderForm = () => {
    switch (formState) {
      case "login":
        return <LoginForm changeFormState={changeFormState} />;

      case "register":
        return <RegisterForm changeFormState={changeFormState} />;
    }
  };

  return (
    <div className="h-full flex flex-col items-center">
      <div className="mt-40 w-full max-w-md">{renderForm()}</div>
    </div>
  );
};

export default AuthPage;
