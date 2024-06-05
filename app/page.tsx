import React from "react";
import List from "./List";
import Options from "./Options";
import NavBar from "@/components/NavBar";

const page = () => {
  return (
    <>
      <div className="min-h-screen p-3 gap-3 bg-themebackground md:flex">
        <div className="md:w-1/2 lg:w-1/3">
          <NavBar />
          <Options />
        </div>

        <List />
      </div>
    </>
  );
};

export default page;
