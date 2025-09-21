"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  LayoutGrid,
  User,
  Calendar,
  BarChart3,
  CloudUpload,
  Map,
  SlidersHorizontal,
  Plus,
  ChevronRight,
  ChevronDown,
  Sun,
  Moon,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { TimelineTasks } from "./timelines";
import { Logo } from "./Logo";

interface SidebarProps {
  className?: string;
}

type Section =
  | { name: string; type: "single"; hasChevron?: boolean }
  | { name: string; type: "timeline" }
  | { name: string; type: "collapsible"; items: { name: string; type: string; count?: number }[] };

export function Sidebar({ className }: SidebarProps) {
  const [projectsOpen, setProjectsOpen] = useState(true);
  const [tasksOpen, setTasksOpen] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState("Projects");
  const [activeItem, setActiveItem] = useState("Design system");
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile toggle

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const activeTheme = resolvedTheme;

  const navigationItems = [
    { icon: LayoutGrid, label: "Projects" },
    { icon: User, label: "Team" },
    { icon: Calendar, label: "Calendar" },
    { icon: BarChart3, label: "Analytics" },
    { icon: CloudUpload, label: "Storage" },
    { icon: Map, label: "Documentation" },
    { icon: SlidersHorizontal, label: "Settings" },
  ];

  const getContentForNavItem = (navItem: string): { title: string; sections: Section[] } => {
    switch (navItem) {
      case "Projects":
        return {
          title: "Projects",
          sections: [
            { name: "Team", type: "single", hasChevron: true },
            { name: "Projects", type: "timeline" },
            { name: "Tasks", type: "timeline" },
            { name: "Reminders", type: "single", hasChevron: true },
            { name: "Messengers", type: "single", hasChevron: true },
          ],
        };
      case "Team":
        return {
          title: "Team",
          sections: [
            {
              name: "Members",
              type: "collapsible",
              items: [
                { name: "All members", count: 12, type: "summary" },
                { name: "Designers", count: 4, type: "role" },
                { name: "Developers", count: 6, type: "role" },
                { name: "Managers", count: 2, type: "role" },
              ],
            },
            { name: "Permissions", type: "single", hasChevron: true },
            { name: "Invitations", type: "single", hasChevron: true },
          ],
        };
      case "Calendar":
        return {
          title: "Calendar",
          sections: [
            { name: "My Calendar", type: "single", hasChevron: true },
            {
              name: "Events",
              type: "collapsible",
              items: [
                { name: "Upcoming", count: 5, type: "summary" },
                { name: "Today", count: 2, type: "time" },
                { name: "This week", count: 8, type: "time" },
                { name: "This month", count: 24, type: "time" },
              ],
            },
            { name: "Meeting rooms", type: "single", hasChevron: true },
          ],
        };
      default:
        return { title: "Projects", sections: [] };
    }
  };

  const currentContent = getContentForNavItem(activeNavItem);

  return (
    <div className={cn("flex h-screen bg-background", className)}>
      {/* Hamburger menu - mobile only */}
      <button
        className="md:hidden p-2 m-2 fixed top-4 left-2 z-50 bg-gray-400 text-white rounded-md"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Desktop sidebar */}
      <div className="hidden md:flex w-[90px] bg-[#000] border-r border-sidebar-border flex-col items-center py-4 space-y-4">
        <div className="flex space-x-1 mb-4">
          <div className="w-[6px] h-[6px] rounded-full bg-[#ffffff]" />
          <div className="w-[6px] h-[6px] rounded-full bg-gray-400" />
          <div className="w-[6px] h-[6px] rounded-full bg-gray-400" />
        </div>
        <div className="py-10">
          <Logo />
        </div>
        {navigationItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            onClick={() => setActiveNavItem(item.label)}
            className={cn(
              "w-10 h-10 text-muted-foreground hover:bg-gray-700 rounded-full hover:text-white",
              activeNavItem === item.label && "bg-gray-500 text-white"
            )}
          >
            <item.icon className="h-6 w-6" />
          </Button>
        ))}

        <div className="mt-auto">
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-muted-foreground hover:bg-gray-500 rounded-full hover:text-white"
          >
            <LogOut className="h-[22px] w-[22px]" />
          </Button>
        </div>
      </div>

      {/* Sidebar right content */}
      <div
        className={cn(
          "flex-1 bg-background p-6 flex flex-col justify-between h-full",
          "md:relative md:block",
          "fixed top-0 right-0 h-full z-40 shadow-lg bg-background transition-transform transform",
          sidebarOpen ? "translate-x-0" : "translate-x-full",
          "md:translate-x-0 md:shadow-none md:h-auto md:w-[318px]"
        )}
      >
        {/* Close button mobile */}
        <button
          className="md:hidden self-end mb-4 p-2 rounded bg-gray-200 dark:bg-gray-800"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-[30px] font-bold text-foreground">{currentContent.title}</h1>
            <Button variant="outline" className="rounded-full bg-[#1C1D2214] w-[28px] h-[28px]">
              <Plus className="h-4 w-4 text-[#1C1D22]" />
            </Button>
          </div>

          {currentContent.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-3">
              {section.type === "single" && (
                <div className="flex items-center justify-between py-3 text-muted-foreground hover:text-foreground cursor-pointer">
                  <span className="text-[16px]">{section.name}</span>
                  {section.hasChevron && <ChevronRight className="h-4 w-4" />}
                </div>
              )}
              {section.type === "timeline" && (
                <div>
                  <div
                    className="flex items-center justify-between w-full py-2 cursor-pointer"
                    onClick={() =>
                      section.name === "Projects"
                        ? setProjectsOpen(!projectsOpen)
                        : section.name === "Tasks"
                        ? setTasksOpen(!tasksOpen)
                        : null
                    }
                  >
                    <h2 className="text-[16px] font-semibold text-foreground">{section.name}</h2>
                    {(section.name === "Projects" ? projectsOpen : section.name === "Tasks" ? tasksOpen : true) ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>

                  {section.name === "Projects" && projectsOpen && <TimelineTasks type="projects" />}
                  {section.name === "Tasks" && tasksOpen && <TimelineTasks type="tasks" />}
                </div>
              )}
              {section.type === "collapsible" && (
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left">
                    <h2 className="text-xl font-semibold text-foreground">{section.name}</h2>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mt-4">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className={cn(
                          "flex items-center justify-between py-2 px-3 rounded-full cursor-pointer transition-colors",
                          item.type === "summary"
                            ? "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            : activeItem === item.name && activeNavItem === "Projects"
                            ? "bg-accent text-accent-foreground font-medium"
                            : "text-foreground hover:bg-muted/50"
                        )}
                        onClick={() => item.type === "project" && setActiveItem(item.name)}
                      >
                        <span className="text-[#1C1D2280] dark:text-muted-foreground text-[16px]">{item.name}</span>
                        {item.count && <span className="text-sm">({item.count})</span>}
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          ))}
        </div>

        {/* Theme toggle pinned to bottom with sliding logic */}
        <div className="pt-6">
          <div
            className="flex items-center bg-gray-100 dark:bg-[#2b2c30] rounded-full p-1 shadow cursor-pointer w-full relative h-[42px]"
            onClick={() => setTheme(activeTheme === "light" ? "dark" : "light")}
          >
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white dark:bg-[#38393c] h-[34px] shadow transition-all duration-300 ease-in-out ${
                theme === "light" ? "left-1" : "left-[calc(50%+3px)]"
              }`}
            />
            <div
              className={`flex-1 flex items-center justify-center gap-1 z-10 font-semibold ${
                theme === "light" ? "text-black " : "text-[#959597]"
              }`}
            >
              <Sun className="h-4 w-4" />
              <span>Light</span>
            </div>
            <div
              className={`flex-1 flex items-center justify-center gap-1 z-10 ${
                theme === "dark" ? "text-black dark:text-white font-semibold" : "text-gray-400"
              }`}
            >
              <Moon className="h-4 w-4" />
              <span>Dark</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
