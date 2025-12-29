import { cn } from "@/lib/utils";

interface SiteBadgeProps {
  site: "nbt" | "fe";
  className?: string;
}

const siteConfig = {
  nbt: {
    label: "NBT",
    className: "bg-badge-nbt-bg text-badge-nbt",
  },
  fe: {
    label: "FE",
    className: "bg-badge-fe-bg text-badge-fe",
  },
};

export const SiteBadge = ({ site, className }: SiteBadgeProps) => {
  const config = siteConfig[site];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};
