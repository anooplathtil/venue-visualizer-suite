import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SiteBadge } from "@/components/ui/site-badge";
import { Check, ExternalLink, AlertCircle, Globe, Calendar, FileCheck } from "lucide-react";

const publishChecklist = [
  { id: 1, label: "Event title and description", completed: true },
  { id: 2, label: "Cover image uploaded", completed: true },
  { id: 3, label: "Date and venue set", completed: true },
  { id: 4, label: "At least one page section added", completed: true },
  { id: 5, label: "Registration form configured", completed: true },
  { id: 6, label: "SEO metadata filled", completed: false },
];

const EventPublishTab = () => {
  const completedCount = publishChecklist.filter((item) => item.completed).length;
  const totalCount = publishChecklist.length;
  const isReady = completedCount === totalCount;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Publish Status */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileCheck className="w-5 h-5" />
              Publish Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {completedCount} of {totalCount} completed
                </span>
                <span className="text-sm font-medium text-foreground">
                  {Math.round((completedCount / totalCount) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              {publishChecklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      item.completed
                        ? "bg-status-success text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.completed ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-current" />
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      item.completed
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Site Publishing */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Publish to Sites
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <SiteBadge site="nbt" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Navbharat Times
                  </p>
                  <p className="text-xs text-muted-foreground">
                    nbt.in/events/tech-summit-2024
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch id="publish-nbt" defaultChecked />
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <SiteBadge site="fe" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Financial Express
                  </p>
                  <p className="text-xs text-muted-foreground">
                    financialexpress.com/events/tech-summit-2024
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch id="publish-fe" defaultChecked />
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Schedule Publishing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <Label htmlFor="schedule-toggle" className="text-sm font-medium">
                  Schedule for later
                </Label>
                <p className="text-xs text-muted-foreground">
                  Set a specific date and time to publish
                </p>
              </div>
              <Switch id="schedule-toggle" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Publish Button */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            {isReady ? (
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-status-success-bg flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-status-success" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Ready to publish
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  All requirements have been met
                </p>
                <Button className="w-full">Publish Now</Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-status-warning-bg flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-6 h-6 text-status-warning" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Not ready to publish
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Complete all checklist items
                </p>
                <Button className="w-full" disabled>
                  Publish Now
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Last Published */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Last Published</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <SiteBadge site="nbt" />
              <span className="text-xs text-muted-foreground">
                Dec 28, 2024 at 3:45 PM
              </span>
            </div>
            <div className="flex items-center gap-2">
              <SiteBadge site="fe" />
              <span className="text-xs text-muted-foreground">
                Dec 28, 2024 at 3:45 PM
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventPublishTab;
