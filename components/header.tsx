"use client";

import { Search, Bell, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardHeader() {
    const [value, setValue] = useState("");

  return (
    <div className="flex items-center justify-between px-6 pt-8 bg-background">
      <h1 className="text-sm ml-10 md:ml-0 md:text-2xl font-bold text-foreground">
        Welcome back, Vincent 👋
      </h1>

      <div className="hidden md:flex items-center space-x-4">
        <div
          className={`
        relative overflow-hidden 
        rounded-full flex items-center duration-300 group
        ${value ? "w-[270px]" : "w-[60px] hover:w-[270px]"}
      `}
        >
          <Search
            className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-all duration-300 ${
              value
                ? "left-3"
                : "left-1/2 -translate-x-1/2 group-hover:left-3 group-hover:translate-x-0"
            }
        `}
          />

          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search..."
            className={`
          pl-10 bg-muted/50 border-0 focus-visible:ring-0 transition-all duration-300
          ${
            value
              ? "w-64 opacity-100"
              : "w-0 opacity-0 group-hover:w-64 group-hover:opacity-100"
          }
        `}
          />
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">19 May 2022</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/images/profile_img.png" alt="Vincent" />
              <AvatarFallback>V</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
