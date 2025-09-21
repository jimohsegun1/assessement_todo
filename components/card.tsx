"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MoreHorizontal,
  MessageSquareText,
  Paperclip,
  User,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  title: string;
  description: string;
  progress: number;
  progressColor: "orange" | "green" | "red";
  date: string;
  comments?: number;
  views?: number;
  users?: number;
  avatars: string[];
  className?: string;
}

export function TaskCard({
  title,
  description,
  progress,
  progressColor,
  date,
  comments,
  views,
  avatars,
  className,
}: TaskCardProps) {
  const progressColorClass = {
    orange: "bg-[#FFA048]",
    green: "bg-[#78D700]",
    red: "bg-red-500",
  }[progressColor];

  const MetricItem = ({ icon: Icon, count }: { icon: typeof Paperclip; count: number }) => (
    <div className="flex items-center space-x-1">
      <Icon className="h-4 w-4" />
      <span>{count}</span>
    </div>
  );

  return (
    <div className="group border-[#1C1D220F] dark:hover:border-muted-foreground/25 text-card-foreground flex flex-col gap-4 rounded-xl border-2 hover:border-dashed">
      <Card
        className={cn(
          "relative h-40 sm:h-44 md:h-48 w-full max-w-full py-0 transform-3d border-0 transition-all duration-300",
          "group-hover:shadow-2xl group-hover:shadow-black/20 group-hover:-translate-y-8 group-hover:translate-x-8 group-hover:z-10",
          className
        )}
      >
        <CardContent className="p-3 sm:p-4 h-full flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-foreground text-base sm:text-lg leading-tight">
              {title}
            </h3>
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 sm:h-7 sm:w-7 -mt-1 border-[#1C1D221A] border-2 rounded-full"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm sm:text-base text-[#1C1D2280] dark:text-muted-foreground mb-2 sm:mb-4">
            {description}
          </p>

          <div className="flex-grow">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <div className="flex gap-2 items-center">
                <List size={16} className="text-[#1C1D2280] dark:text-muted-foreground" />
                <span className="text-sm sm:text-base text-[#1C1D2280] dark:text-muted-foreground">
                  Progress
                </span>
              </div>
              <span className="text-xs font-medium">{progress}/10</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1 sm:h-1.5">
              <div
                className={cn("rounded-full h-full", progressColorClass)}
                style={{ width: `${(progress / 10) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-muted-foreground">{date}</span>

            {avatars.length > 0 ? (
              <div className="flex -space-x-2">
                {avatars.slice(0, 3).map((avatar, index) => (
                  <Avatar key={index} className="ring-background ring-2 w-6 h-6 sm:w-7 sm:h-7">
                    <AvatarImage src={avatar} alt={`Avatar ${index}`} />
                    <AvatarFallback className="text-xs">
                      <User size={12} />
                    </AvatarFallback>
                  </Avatar>
                ))}
                {avatars.length > 3 && (
                  <Avatar className="ring-background ring-2 w-6 h-6 sm:w-7 sm:h-7">
                    <AvatarFallback className="text-xs bg-white dark:bg-white/10 dark:backdrop-blur-md dark:border dark:border-white/20">
                      +{avatars.length - 3}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs text-muted-foreground">
                {comments && <MetricItem icon={MessageSquareText} count={comments} />}
                {views && <MetricItem icon={Paperclip} count={views} />}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}