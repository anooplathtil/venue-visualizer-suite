import { Calendar, FileText, Inbox, TrendingUp, Users, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    label: "Total Events",
    value: "24",
    change: "+3 this month",
    icon: Calendar,
    trend: "up",
  },
  {
    label: "Active Microsites",
    value: "8",
    change: "+1 this week",
    icon: FileText,
    trend: "up",
  },
  {
    label: "Form Submissions",
    value: "1,247",
    change: "+89 today",
    icon: Inbox,
    trend: "up",
  },
  {
    label: "Stall Bookings",
    value: "156",
    change: "12 pending",
    icon: Users,
    trend: "neutral",
  },
];

const recentActivity = [
  {
    id: 1,
    action: "Event published",
    item: "Tech Summit 2024",
    user: "John Doe",
    time: "2 hours ago",
  },
  {
    id: 2,
    action: "Form submission",
    item: "Speaker Registration",
    user: "Jane Smith",
    time: "3 hours ago",
  },
  {
    id: 3,
    action: "Stall booked",
    item: "Stall A12 - TechCorp",
    user: "Mike Johnson",
    time: "5 hours ago",
  },
  {
    id: 4,
    action: "Page updated",
    item: "Agenda Page",
    user: "Sarah Williams",
    time: "Yesterday",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Tech Summit 2024",
    date: "Jan 15-17, 2024",
    location: "Mumbai Convention Center",
    status: "published",
  },
  {
    id: 2,
    title: "Finance Forum",
    date: "Feb 8, 2024",
    location: "Delhi Trade Center",
    status: "draft",
  },
  {
    id: 3,
    title: "Startup Expo",
    date: "Mar 22-24, 2024",
    location: "Bangalore Tech Park",
    status: "draft",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening across your sites.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-card hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-semibold text-foreground mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    {stat.trend === "up" && (
                      <TrendingUp className="w-3 h-3 text-status-success" />
                    )}
                    {stat.change}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {activity.item}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.user} · {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
              <a
                href="/events"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View all
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start justify-between pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {event.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.date}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.location}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      event.status === "published"
                        ? "bg-status-success-bg text-status-success"
                        : "bg-status-warning-bg text-status-warning"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
