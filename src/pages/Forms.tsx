import { useState } from "react";
import { Plus, Search, MoreHorizontal, Edit, Eye, Copy, Trash2, FormInput, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface Form {
  id: string;
  name: string;
  eventName: string;
  fields: number;
  submissions: number;
  lastUpdated: string;
}

const mockForms: Form[] = [
  {
    id: "1",
    name: "Event Registration",
    eventName: "Tech Summit 2024",
    fields: 8,
    submissions: 245,
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "Speaker Application",
    eventName: "Tech Summit 2024",
    fields: 12,
    submissions: 34,
    lastUpdated: "Yesterday",
  },
  {
    id: "3",
    name: "Sponsor Inquiry",
    eventName: "Multiple Events",
    fields: 6,
    submissions: 18,
    lastUpdated: "3 days ago",
  },
  {
    id: "4",
    name: "Volunteer Signup",
    eventName: "Finance Forum",
    fields: 5,
    submissions: 67,
    lastUpdated: "1 week ago",
  },
];

const Forms = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredForms = mockForms.filter((form) =>
    form.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Forms</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage registration and inquiry forms
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Form
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search forms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredForms.map((form) => (
          <Card
            key={form.id}
            className="shadow-card hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <FormInput className="w-5 h-5 text-accent-foreground" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2">
                      <Edit className="w-4 h-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Eye className="w-4 h-4" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Copy className="w-4 h-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <h3 className="font-semibold text-foreground mb-1">{form.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {form.eventName}
              </p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {form.fields} fields
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Inbox className="w-3.5 h-3.5" />
                  {form.submissions} submissions
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Updated {form.lastUpdated}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => navigate("/submissions")}
                >
                  View Submissions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Forms;
