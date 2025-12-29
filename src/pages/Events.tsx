import { useState } from "react";
import { Plus, Search, MoreHorizontal, Edit, Eye, Trash2, Calendar, MapPin } from "lucide-react";
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
import { useNavigate } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  sites: ("nbt" | "fe")[];
  status: "draft" | "published" | "archived";
  thumbnail?: string;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Tech Summit 2024",
    date: "Jan 15-17, 2024",
    location: "Mumbai Convention Center",
    sites: ["nbt", "fe"],
    status: "published",
  },
  {
    id: "2",
    title: "Finance Forum",
    date: "Feb 8, 2024",
    location: "Delhi Trade Center",
    sites: ["fe"],
    status: "draft",
  },
  {
    id: "3",
    title: "Startup Expo",
    date: "Mar 22-24, 2024",
    location: "Bangalore Tech Park",
    sites: ["nbt"],
    status: "draft",
  },
  {
    id: "4",
    title: "Healthcare Innovation Summit",
    date: "Apr 5-6, 2024",
    location: "Hyderabad International Center",
    sites: ["nbt", "fe"],
    status: "published",
  },
  {
    id: "5",
    title: "Auto Expo 2024",
    date: "May 12-15, 2024",
    location: "Greater Noida Expo Mart",
    sites: ["nbt"],
    status: "draft",
  },
];

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"grid" | "table">("table");
  const navigate = useNavigate();

  const filteredEvents = mockEvents.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Events</h1>
          <p className="text-muted-foreground mt-1">
            Manage and publish events across your sites
          </p>
        </div>
        <Button className="gap-2" onClick={() => navigate("/events/new")}>
          <Plus className="w-4 h-4" />
          Create Event
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant={view === "table" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setView("table")}
          >
            Table
          </Button>
          <Button
            variant={view === "grid" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setView("grid")}
          >
            Grid
          </Button>
        </div>
      </div>

      {/* Events Table */}
      {view === "table" && (
        <Card className="shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Event
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Date & Location
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Sites
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
                {filteredEvents.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {event.title}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-foreground flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                          {event.date}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {event.location}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5">
                        {event.sites.map((site) => (
                          <SiteBadge key={site} site={site} />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={event.status} />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/events/${event.id}`);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
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
      )}

      {/* Events Grid */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="shadow-card hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Calendar className="w-10 h-10 text-primary/50" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-foreground">{event.title}</h3>
                  <StatusBadge status={event.status} />
                </div>
                <div className="space-y-1 mb-3">
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {event.date}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {event.location}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {event.sites.map((site) => (
                    <SiteBadge key={site} site={site} />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
