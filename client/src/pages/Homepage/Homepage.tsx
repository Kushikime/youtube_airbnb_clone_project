import FiltersBar from "@features/FiltersBar/ui/FiltersBar";
import { FC } from "react";

interface IHomepageProps {}

const Homepage: FC<IHomepageProps> = () => {
  return (
    <div>
      <FiltersBar />
    </div>
  );
};

export default Homepage;
