import { Calendar, MapPin, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const EventOverviewTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                placeholder="Enter event title"
                defaultValue="Tech Summit 2024"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">/events/</span>
                <Input
                  id="slug"
                  placeholder="tech-summit-2024"
                  defaultValue="tech-summit-2024"
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter event description"
                rows={4}
                defaultValue="Join us for the biggest technology summit of 2024, featuring industry leaders, innovative workshops, and networking opportunities."
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Date & Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="start-date"
                    type="date"
                    className="pl-10"
                    defaultValue="2024-01-15"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="end-date"
                    type="date"
                    className="pl-10"
                    defaultValue="2024-01-17"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="venue"
                  placeholder="Enter venue name"
                  className="pl-10"
                  defaultValue="Mumbai Convention Center"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Enter full address"
                rows={2}
                defaultValue="Bandra Kurla Complex, Mumbai, Maharashtra 400051"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Cover Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">
                Upload cover image
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Recommended: 1920×1080px
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Publish Sites</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox id="nbt" defaultChecked />
              <Label
                htmlFor="nbt"
                className="text-sm font-medium cursor-pointer"
              >
                NBT
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox id="fe" defaultChecked />
              <Label
                htmlFor="fe"
                className="text-sm font-medium cursor-pointer"
              >
                Financial Express
              </Label>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox id="registration" defaultChecked />
              <Label
                htmlFor="registration"
                className="text-sm font-medium cursor-pointer"
              >
                Enable registration
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox id="stalls" defaultChecked />
              <Label
                htmlFor="stalls"
                className="text-sm font-medium cursor-pointer"
              >
                Enable stall booking
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox id="comments" />
              <Label
                htmlFor="comments"
                className="text-sm font-medium cursor-pointer"
              >
                Enable comments
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventOverviewTab;
