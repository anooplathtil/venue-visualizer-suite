import { useState } from "react";
import { Search, Download, Filter, Eye, MoreHorizontal, Mail, Calendar } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";

interface Submission {
  id: string;
  formName: string;
  eventName: string;
  site: "nbt" | "fe";
  submittedAt: string;
  status: "new" | "reviewed" | "archived";
  email: string;
  name: string;
}

const mockSubmissions: Submission[] = [
  {
    id: "1",
    formName: "Event Registration",
    eventName: "Tech Summit 2024",
    site: "nbt",
    submittedAt: "Dec 28, 2024 at 4:30 PM",
    status: "new",
    email: "john.doe@email.com",
    name: "John Doe",
  },
  {
    id: "2",
    formName: "Speaker Application",
    eventName: "Tech Summit 2024",
    site: "fe",
    submittedAt: "Dec 28, 2024 at 3:15 PM",
    status: "reviewed",
    email: "jane.smith@company.com",
    name: "Jane Smith",
  },
  {
    id: "3",
    formName: "Sponsor Inquiry",
    eventName: "Finance Forum",
    site: "fe",
    submittedAt: "Dec 28, 2024 at 2:00 PM",
    status: "new",
    email: "mike.wilson@corp.com",
    name: "Mike Wilson",
  },
  {
    id: "4",
    formName: "Event Registration",
    eventName: "Startup Expo",
    site: "nbt",
    submittedAt: "Dec 27, 2024 at 11:45 AM",
    status: "archived",
    email: "sarah.lee@startup.io",
    name: "Sarah Lee",
  },
  {
    id: "5",
    formName: "Event Registration",
    eventName: "Tech Summit 2024",
    site: "nbt",
    submittedAt: "Dec 27, 2024 at 10:20 AM",
    status: "reviewed",
    email: "tom.brown@email.com",
    name: "Tom Brown",
  },
];

const statusMap = {
  new: "draft" as const,
  reviewed: "published" as const,
  archived: "archived" as const,
};

const Submissions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);
  const navigate = useNavigate();

  const filteredSubmissions = mockSubmissions.filter(
    (submission) =>
      submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.formName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelection = (id: string) => {
    setSelectedSubmissions((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedSubmissions.length === filteredSubmissions.length) {
      setSelectedSubmissions([]);
    } else {
      setSelectedSubmissions(filteredSubmissions.map((s) => s.id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Submissions</h1>
          <p className="text-muted-foreground mt-1">
            View and manage form submissions across all events
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Selected Actions */}
      {selectedSubmissions.length > 0 && (
        <div className="flex items-center gap-4 p-3 bg-accent rounded-lg">
          <span className="text-sm font-medium text-accent-foreground">
            {selectedSubmissions.length} selected
          </span>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">
              Mark as Reviewed
            </Button>
            <Button variant="secondary" size="sm">
              Archive
            </Button>
            <Button variant="secondary" size="sm" className="gap-1">
              <Download className="w-3 h-3" />
              Export
            </Button>
          </div>
        </div>
      )}

      {/* Submissions Table */}
      <Card className="shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="py-3 px-4 w-12">
                  <Checkbox
                    checked={
                      selectedSubmissions.length === filteredSubmissions.length &&
                      filteredSubmissions.length > 0
                    }
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Submitter
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Form
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Event
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Site
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Submitted
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((submission) => (
                <tr
                  key={submission.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-4 px-4">
                    <Checkbox
                      checked={selectedSubmissions.includes(submission.id)}
                      onCheckedChange={() => toggleSelection(submission.id)}
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-foreground">
                        {submission.name}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {submission.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-foreground">
                      {submission.formName}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-foreground">
                      {submission.eventName}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <SiteBadge site={submission.site} />
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {submission.submittedAt}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={statusMap[submission.status]} />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
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
                          <DropdownMenuItem>Mark as Reviewed</DropdownMenuItem>
                          <DropdownMenuItem>Archive</DropdownMenuItem>
                          <DropdownMenuItem>Download</DropdownMenuItem>
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

export default Submissions;
