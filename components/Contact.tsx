"use client";

import * as React from "react";
import { CircleUser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Contact() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="rounded-full p-2 hover:bg-themebackground">
          <CircleUser />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => window.open("https://discord.gg/NhkFPMfu", "_blank")}
        >
          <div className="flex items-center gap-1">
            <Avatar>
              <AvatarImage src="/logo.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-md text-center w-[75px]">Discord Server</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            window.open("https://github.com/Ayush-865/hayday/issues", "_blank")
          }
        >
          <div className="flex items-center gap-1">
            <Avatar>
              <AvatarImage src="/github.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-md text-center w-[75px]">Submit Issues</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            window.open("http://discord.com/users/758357761385168966", "_blank")
          }
        >
          <div className="flex items-center gap-1">
            <Avatar>
              <AvatarImage src="/ayush.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-md text-center w-[75px]">
              Developer Contact
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
