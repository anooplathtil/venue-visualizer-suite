import { useState } from "react";
import { Search, Download, Calendar, MapPin, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteBadge } from "@/components/ui/site-badge";
import { cn } from "@/lib/utils";

interface Booking {
  id: string;
  stallId: string;
  eventName: string;
  company: string;
  contact: string;
  email: string;
  status: "confirmed" | "pending" | "cancelled";
  amount: number;
  bookedAt: string;
}

const mockBookings: Booking[] = [
  {
    id: "1",
    stallId: "A1",
    eventName: "Tech Summit 2024",
    company: "TechCorp Inc.",
    contact: "John Doe",
    email: "john@techcorp.com",
    status: "confirmed",
    amount: 50000,
    bookedAt: "Dec 28, 2024",
  },
  {
    id: "2",
    stallId: "B1",
    eventName: "Tech Summit 2024",
    company: "DataInc",
    contact: "Mike Johnson",
    email: "mike@datainc.com",
    status: "confirmed",
    amount: 75000,
    bookedAt: "Dec 27, 2024",
  },
  {
    id: "3",
    stallId: "A2",
    eventName: "Tech Summit 2024",
    company: "Pending Corp",
    contact: "Jane Smith",
    email: "jane@pending.com",
    status: "pending",
    amount: 50000,
    bookedAt: "Dec 26, 2024",
  },
  {
    id: "4",
    stallId: "C3",
    eventName: "Finance Forum",
    company: "GlobalTech",
    contact: "Lisa Chen",
    email: "lisa@globaltech.com",
    status: "confirmed",
    amount: 100000,
    bookedAt: "Dec 25, 2024",
  },
];

const statusColors = {
  confirmed: "bg-status-success-bg text-status-success",
  pending: "bg-status-warning-bg text-status-warning",
  cancelled: "bg-status-error-bg text-status-error",
};

const StallBookings = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = mockBookings.filter(
    (booking) =>
      booking.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = mockBookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + b.amount, 0);

  const stats = {
    total: mockBookings.length,
    confirmed: mockBookings.filter((b) => b.status === "confirmed").length,
    pending: mockBookings.filter((b) => b.status === "pending").length,
    revenue: totalRevenue,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Stall Bookings</h1>
          <p className="text-muted-foreground mt-1">
            Manage stall bookings across all events
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <p className="text-2xl font-semibold text-foreground">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <p className="text-sm text-status-success">Confirmed</p>
            <p className="text-2xl font-semibold text-foreground">{stats.confirmed}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <p className="text-sm text-status-warning">Pending</p>
            <p className="text-2xl font-semibold text-foreground">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-semibold text-foreground">
              ₹{stats.revenue.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by company or contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <Card className="shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Stall
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Event
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Company
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Contact
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Booked On
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center">
                        <Store className="w-4 h-4 text-accent-foreground" />
                      </div>
                      <span className="font-medium text-foreground">
                        {booking.stallId}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-foreground">
                      {booking.eventName}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-foreground">
                      {booking.company}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm text-foreground">{booking.contact}</p>
                      <p className="text-xs text-muted-foreground">
                        {booking.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-foreground">
                      ₹{booking.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                        statusColors[booking.status]
                      )}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-muted-foreground">
                      {booking.bookedAt}
                    </span>
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

export default StallBookings;
