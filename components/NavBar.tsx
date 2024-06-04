"use client";
import { AlignLeft, CircleUser, Languages, Search } from "lucide-react";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { ThemeToggle } from "./ThemeToggle";
import { Contact } from "./Contact";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const NavBar = () => {
  return (
    <>
      <nav className="px-0 md:px-5 bg-themeforeground overflow-hidden shadow-lg flex items-center justify-between mb-4 rounded-md h-[64px] w-full max-w-[calc(1440px-3rem)] ">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/logo.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-lg">HayDay Calculator</span>
        </div>
        <div className="flex items-center gap-x-1">
          <Contact />
          <ThemeToggle />
          <ModeToggle />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
