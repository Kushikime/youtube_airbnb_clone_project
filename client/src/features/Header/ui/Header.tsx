import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

import LogoIcon from "@icons/LogoIcon/LogoIcon";
import MenuIcon from "@icons/MenuIcon/MenuIcon";
import UserIcon from "@icons/UserIcon/UserIcon";

interface IHeaderProps {}

const Header: FC<IHeaderProps> = () => {
  const { pathname } = useLocation();
  const showContent = pathname !== "/auth";
  return (
    <header className="p-4 flex items-center justify-between">
      <Link to="/" className="flex items-center text-center gap-1">
        <LogoIcon className="w-8 h-8 text-primary-500" />
        <span className="font-semibold text-xl ffpoppins text-primary-500 ml-1">
          airbnb
        </span>
      </Link>
      {showContent && (
        <div className="flex items-center gap-2 h-12 border border-gray-300 rounded-full py-2 px-2">
          <MenuIcon className="w-4" />
          <Link
            to="/auth"
            className="bg-gray-500 text-white rounded-full border-2 border-gray-500 overflow-hidden"
          >
            <UserIcon className="relative top-1" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
