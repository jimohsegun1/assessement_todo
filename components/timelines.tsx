"use client";

import { cn } from "@/lib/utils";

interface TimelineTasksProps {
  className?: string;
  type: "projects" | "tasks";
}

export function TimelineTasks({ className, type }: TimelineTasksProps) {
  const projectSteps = [
    { name: "All projects", count: 3, status: "active", isActive: false },
    { name: "Design system", status: "todo", isActive: true },
    { name: "User flow", status: "progress", isActive: false },
    { name: "Ux research", status: "progress", isActive: false },
  ];

  const taskSteps = [
    { name: "All tasks", count: 11, status: "summary", isActive: false },
    { name: "To do", count: 4, status: "todo", isActive: false },
    { name: "In progress", count: 4, status: "progress", isActive: true },
    { name: "Done", count: 3, status: "done", isActive: false },
  ];

  // choose dataset based on type
  const steps = type === "projects" ? projectSteps : taskSteps;

  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-3 top-1 bottom-1 w-px bg-gray-300"></div>

      {steps.map((step, index) => (
        <div key={index} className="relative flex items-center py-2">
          <div className="absolute left-3 w-4 h-px bg-gray-300"></div>

          <div
            className={cn(
              "ml-10 px-3 py-1 rounded-full flex items-center justify-between",
              step.isActive && "bg-gray-100 dark:bg-[#2b2c30]"
            )}
          >
            <span
              className={cn(
                "text-[14px] font-medium",
                step.isActive ? "text-black dark:text-white" : "text-gray-500"
              )}
            >
              {step.name}
            </span>

            {step.count !== undefined && (
              <span
                className={cn(
                  "text-[14px] font-medium ms-1",
                  step.isActive ? "text-black dark:text-white" : "text-gray-500"
                )}
              >
                ({step.count})
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
