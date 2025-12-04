import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
}

export function SummaryCard({ title, value, icon, className }: SummaryCardProps) {
  return (
    <Card className={cn("flex flex-col gap-2 p-4", className)}>
      <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
        {icon}
        {title}
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </Card>
  );
}
