import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stall {
  id: string;
  name: string;
  status: "available" | "held" | "booked";
  price: number;
  size: string;
  bookedBy?: string;
  company?: string;
}

const mockStalls: Stall[] = [
  { id: "A1", name: "Stall A1", status: "booked", price: 50000, size: "3x3m", bookedBy: "John Doe", company: "TechCorp" },
  { id: "A2", name: "Stall A2", status: "held", price: 50000, size: "3x3m", bookedBy: "Jane Smith" },
  { id: "A3", name: "Stall A3", status: "available", price: 50000, size: "3x3m" },
  { id: "A4", name: "Stall A4", status: "available", price: 50000, size: "3x3m" },
  { id: "B1", name: "Stall B1", status: "booked", price: 75000, size: "4x4m", bookedBy: "Mike Johnson", company: "DataInc" },
  { id: "B2", name: "Stall B2", status: "available", price: 75000, size: "4x4m" },
  { id: "B3", name: "Stall B3", status: "held", price: 75000, size: "4x4m", bookedBy: "Sarah Williams" },
  { id: "B4", name: "Stall B4", status: "booked", price: 75000, size: "4x4m", bookedBy: "Tom Brown", company: "InnovateLab" },
  { id: "C1", name: "Stall C1", status: "available", price: 100000, size: "5x5m" },
  { id: "C2", name: "Stall C2", status: "available", price: 100000, size: "5x5m" },
  { id: "C3", name: "Stall C3", status: "booked", price: 100000, size: "5x5m", bookedBy: "Lisa Chen", company: "GlobalTech" },
  { id: "C4", name: "Stall C4", status: "available", price: 100000, size: "5x5m" },
];

const statusColors = {
  available: "bg-status-success hover:bg-status-success/80",
  held: "bg-status-warning hover:bg-status-warning/80",
  booked: "bg-status-error hover:bg-status-error/80",
};

const EventStallsTab = () => {
  const [stalls] = useState<Stall[]>(mockStalls);
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null);

  const stats = {
    total: stalls.length,
    available: stalls.filter((s) => s.status === "available").length,
    held: stalls.filter((s) => s.status === "held").length,
    booked: stalls.filter((s) => s.status === "booked").length,
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Stats */}
      <div className="col-span-12">
        <div className="grid grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Stalls</p>
              <p className="text-2xl font-semibold text-foreground">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <p className="text-sm text-status-success">Available</p>
              <p className="text-2xl font-semibold text-foreground">{stats.available}</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <p className="text-sm text-status-warning">Held</p>
              <p className="text-2xl font-semibold text-foreground">{stats.held}</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <p className="text-sm text-status-error">Booked</p>
              <p className="text-2xl font-semibold text-foreground">{stats.booked}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floor Plan */}
      <div className="col-span-8">
        <Card className="shadow-card">
          <CardHeader className="pb-3 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Floor Plan</CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Upload className="w-4 h-4" />
                Upload Floorplan
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Legend */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-status-success" />
                <span className="text-sm text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-status-warning" />
                <span className="text-sm text-muted-foreground">Held</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-status-error" />
                <span className="text-sm text-muted-foreground">Booked</span>
              </div>
            </div>

            {/* Stall Grid */}
            <div className="bg-muted/30 rounded-lg p-6 border border-border">
              <div className="space-y-4">
                {/* Row A */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Row A (3x3m - ₹50,000)</p>
                  <div className="flex gap-3">
                    {stalls.filter((s) => s.id.startsWith("A")).map((stall) => (
                      <button
                        key={stall.id}
                        onClick={() => setSelectedStall(stall)}
                        className={cn(
                          "w-20 h-20 rounded-lg flex items-center justify-center text-sm font-medium transition-all",
                          statusColors[stall.status],
                          "text-primary-foreground",
                          selectedStall?.id === stall.id && "ring-2 ring-foreground ring-offset-2"
                        )}
                      >
                        {stall.id}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row B */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Row B (4x4m - ₹75,000)</p>
                  <div className="flex gap-3">
                    {stalls.filter((s) => s.id.startsWith("B")).map((stall) => (
                      <button
                        key={stall.id}
                        onClick={() => setSelectedStall(stall)}
                        className={cn(
                          "w-24 h-24 rounded-lg flex items-center justify-center text-sm font-medium transition-all",
                          statusColors[stall.status],
                          "text-primary-foreground",
                          selectedStall?.id === stall.id && "ring-2 ring-foreground ring-offset-2"
                        )}
                      >
                        {stall.id}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row C */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Row C (5x5m - ₹1,00,000)</p>
                  <div className="flex gap-3">
                    {stalls.filter((s) => s.id.startsWith("C")).map((stall) => (
                      <button
                        key={stall.id}
                        onClick={() => setSelectedStall(stall)}
                        className={cn(
                          "w-28 h-28 rounded-lg flex items-center justify-center text-sm font-medium transition-all",
                          statusColors[stall.status],
                          "text-primary-foreground",
                          selectedStall?.id === stall.id && "ring-2 ring-foreground ring-offset-2"
                        )}
                      >
                        {stall.id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stall Details */}
      <div className="col-span-4">
        <Card className="shadow-card h-full">
          <CardHeader className="pb-3 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Stall Details</CardTitle>
              {selectedStall && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setSelectedStall(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {selectedStall ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    {selectedStall.name}
                  </h3>
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium capitalize text-primary-foreground",
                      statusColors[selectedStall.status]
                    )}
                  >
                    {selectedStall.status}
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Size</span>
                    <span className="text-sm font-medium text-foreground">
                      {selectedStall.size}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="text-sm font-medium text-foreground">
                      ₹{selectedStall.price.toLocaleString()}
                    </span>
                  </div>
                  {selectedStall.bookedBy && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Contact</span>
                      <span className="text-sm font-medium text-foreground">
                        {selectedStall.bookedBy}
                      </span>
                    </div>
                  )}
                  {selectedStall.company && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Company</span>
                      <span className="text-sm font-medium text-foreground">
                        {selectedStall.company}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 space-y-2">
                  {selectedStall.status === "available" && (
                    <>
                      <Button className="w-full">Book Stall</Button>
                      <Button variant="outline" className="w-full">
                        Hold Stall
                      </Button>
                    </>
                  )}
                  {selectedStall.status === "held" && (
                    <>
                      <Button className="w-full">Confirm Booking</Button>
                      <Button variant="outline" className="w-full">
                        Release Hold
                      </Button>
                    </>
                  )}
                  {selectedStall.status === "booked" && (
                    <Button variant="outline" className="w-full">
                      Cancel Booking
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">
                Select a stall to view details
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventStallsTab;
