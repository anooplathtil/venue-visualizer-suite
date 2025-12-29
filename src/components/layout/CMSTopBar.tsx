import { Search, Eye, Upload, ChevronDown, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const sites = [
  { id: "nbt", name: "NBT", color: "badge-nbt" },
  { id: "fe", name: "Financial Express", color: "badge-fe" },
];

const CMSTopBar = () => {
  const [currentSite, setCurrentSite] = useState(sites[0]);

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Left: Site Selector */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 font-medium">
              <div
                className={`w-2 h-2 rounded-full ${
                  currentSite.id === "nbt" ? "bg-badge-nbt" : "bg-badge-fe"
                }`}
              />
              {currentSite.name}
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {sites.map((site) => (
              <DropdownMenuItem
                key={site.id}
                onClick={() => setCurrentSite(site)}
                className="gap-2"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    site.id === "nbt" ? "bg-badge-nbt" : "bg-badge-fe"
                  }`}
                />
                {site.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search events, pages, forms..."
            className="pl-10 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="gap-2">
          <Eye className="w-4 h-4" />
          Preview
        </Button>
        <Button size="sm" className="gap-2">
          <Upload className="w-4 h-4" />
          Publish
        </Button>
        
        <div className="w-px h-8 bg-border mx-2" />
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-status-error rounded-full" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="w-8 h-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default CMSTopBar;
