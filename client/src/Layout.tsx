import Header from "@features/Header/ui/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-full items-stretch">
      <Header />
      <div className="p-4 flex-grow-1 h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
