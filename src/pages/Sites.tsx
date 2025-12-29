import { Globe, Settings, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiteBadge } from "@/components/ui/site-badge";

const sites = [
  {
    id: "nbt",
    name: "Navbharat Times",
    domain: "nbt.in",
    events: 12,
    microsites: 5,
    color: "badge-nbt",
  },
  {
    id: "fe",
    name: "Financial Express",
    domain: "financialexpress.com",
    events: 8,
    microsites: 3,
    color: "badge-fe",
  },
];

const Sites = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Sites</h1>
        <p className="text-muted-foreground mt-1">
          Manage your publishing destinations and site settings
        </p>
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sites.map((site) => (
          <Card key={site.id} className="shadow-card">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      site.id === "nbt" ? "bg-badge-nbt-bg" : "bg-badge-fe-bg"
                    }`}
                  >
                    <Globe
                      className={`w-6 h-6 ${
                        site.id === "nbt" ? "text-badge-nbt" : "text-badge-fe"
                      }`}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{site.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{site.domain}</p>
                  </div>
                </div>
                <SiteBadge site={site.id as "nbt" | "fe"} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-2xl font-semibold text-foreground">
                    {site.events}
                  </p>
                  <p className="text-sm text-muted-foreground">Events</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-2xl font-semibold text-foreground">
                    {site.microsites}
                  </p>
                  <p className="text-sm text-muted-foreground">Microsites</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Visit Site
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sites;
