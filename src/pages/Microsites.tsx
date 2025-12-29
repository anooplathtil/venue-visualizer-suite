import { useState } from "react";
import { Plus, Search, MoreHorizontal, Edit, Eye, Trash2, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/ui/status-badge";
import { SiteBadge } from "@/components/ui/site-badge";

interface Microsite {
  id: string;
  title: string;
  slug: string;
  sites: ("nbt" | "fe")[];
  status: "draft" | "published" | "archived";
  pages: number;
  lastUpdated: string;
}

const mockMicrosites: Microsite[] = [
  {
    id: "1",
    title: "Budget 2024 Special",
    slug: "budget-2024",
    sites: ["nbt", "fe"],
    status: "published",
    pages: 5,
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    title: "Election Coverage Hub",
    slug: "elections-2024",
    sites: ["nbt"],
    status: "draft",
    pages: 8,
    lastUpdated: "Yesterday",
  },
  {
    id: "3",
    title: "Startup Ecosystem Report",
    slug: "startup-report",
    sites: ["fe"],
    status: "published",
    pages: 12,
    lastUpdated: "3 days ago",
  },
];

const Microsites = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMicrosites = mockMicrosites.filter((microsite) =>
    microsite.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Microsites</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage standalone microsites
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Microsite
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search microsites..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Microsites Table */}
      <Card className="shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Microsite
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  URL Slug
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Sites
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Pages
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Last Updated
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMicrosites.map((microsite) => (
                <tr
                  key={microsite.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <span className="font-medium text-foreground">
                        {microsite.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <code className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                      /{microsite.slug}
                    </code>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      {microsite.sites.map((site) => (
                        <SiteBadge key={site} site={site} />
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-foreground">
                      {microsite.pages} pages
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={microsite.status} />
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-muted-foreground">
                      {microsite.lastUpdated}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem>Archive</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Microsites;
