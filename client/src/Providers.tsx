import { FC, PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

interface IProvidersProps extends PropsWithChildren {}

const Providers: FC<IProvidersProps> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default Providers;
