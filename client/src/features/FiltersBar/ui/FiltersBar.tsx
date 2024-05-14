import SearchIcon from "@icons/SearchIcon/SearchIcon";
import { FC } from "react";

interface IFiltersBarProps {}

const FiltersBar: FC<IFiltersBarProps> = () => {
  return (
    <div className="flex items-center justify-between gap-2 border border-gray-300 rounded-full shadow-md shadow-gray-300 h-16 py-2 px-2">
      <div className="text-sm">Anywhere</div>
      <span className="border-l h-full  bg-gray-300"></span>
      <div className="text-sm">Any week</div>
      <span className="border-l h-full  bg-gray-300"></span>
      <div className="text-sm">Add guests</div>
      <button className="bg-primary-500 hover:bg-primary-700 text-white p-1 rounded-full h-full w-11 flex items-center justify-center">
        <SearchIcon className="w-10 h-4" />
      </button>
    </div>
  );
};

export default FiltersBar;
