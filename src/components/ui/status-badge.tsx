import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "draft" | "published" | "archived";
  className?: string;
}

const statusStyles = {
  draft: "bg-status-warning-bg text-status-warning",
  published: "bg-status-success-bg text-status-success",
  archived: "bg-muted text-muted-foreground",
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize",
        statusStyles[status],
        className
      )}
    >
      {status}
    </span>
  );
};
