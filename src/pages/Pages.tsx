import { useState } from "react";
import { Plus, Search, MoreHorizontal, Edit, Eye, Trash2, Layers, FileText } from "lucide-react";
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

interface PageItem {
  id: string;
  title: string;
  parentEvent: string;
  sections: number;
  status: "draft" | "published" | "archived";
  lastUpdated: string;
}

const mockPages: PageItem[] = [
  {
    id: "1",
    title: "Home",
    parentEvent: "Tech Summit 2024",
    sections: 6,
    status: "published",
    lastUpdated: "1 hour ago",
  },
  {
    id: "2",
    title: "Agenda",
    parentEvent: "Tech Summit 2024",
    sections: 3,
    status: "published",
    lastUpdated: "2 hours ago",
  },
  {
    id: "3",
    title: "Speakers",
    parentEvent: "Tech Summit 2024",
    sections: 4,
    status: "draft",
    lastUpdated: "Yesterday",
  },
  {
    id: "4",
    title: "Registration",
    parentEvent: "Finance Forum",
    sections: 2,
    status: "published",
    lastUpdated: "2 days ago",
  },
];

const Pages = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPages = mockPages.filter((page) =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Pages</h1>
          <p className="text-muted-foreground mt-1">
            Manage page layouts and content sections
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Page
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Pages Table */}
      <Card className="shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Page
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Parent Event
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Sections
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
              {filteredPages.map((page) => (
                <tr
                  key={page.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground">
                        {page.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-foreground">
                      {page.parentEvent}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      {page.sections} sections
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={page.status} />
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-muted-foreground">
                      {page.lastUpdated}
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
                          <DropdownMenuItem>Move to...</DropdownMenuItem>
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

export default Pages;
