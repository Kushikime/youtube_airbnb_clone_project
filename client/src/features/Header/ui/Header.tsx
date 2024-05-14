import { FC } from "react";
import { Link } from "react-router-dom";

import LogoIcon from "@icons/LogoIcon/LogoIcon";
import SearchIcon from "@icons/SearchIcon/SearchIcon";
import MenuIcon from "@icons/MenuIcon/MenuIcon";
import UserIcon from "@icons/UserIcon/UserIcon";

interface IHeaderProps {}

const Header: FC<IHeaderProps> = () => {
  return (
    <header className="p-4 flex items-center justify-between">
      <Link to="/" className="flex items-center text-center gap-1">
        <LogoIcon className="-rotate-90 w-8 h-8" />
        <span className="font-bold text-xl">airbnb</span>
      </Link>
      <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-2.5  h-12 shadow-md shadow-gray-300">
        <div className="text-sm">Anywhere</div>
        <span className="border-l h-full  bg-gray-300"></span>
        <div className="text-sm">Any week</div>
        <span className="border-l h-full  bg-gray-300"></span>
        <div className="text-sm">Add guests</div>
        <button className="bg-primary text-white p-1 rounded-full">
          <SearchIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center gap-2 h-12 border border-gray-300 rounded-full py-2 px-4">
        <MenuIcon />
        <Link
          to="/auth"
          className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden"
        >
          <UserIcon className="relative top-1" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
