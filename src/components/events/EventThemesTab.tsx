import { Check, Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

const presetThemes = [
  {
    id: "default",
    name: "Default Blue",
    primary: "#3B82F6",
    secondary: "#EFF6FF",
    accent: "#1D4ED8",
  },
  {
    id: "emerald",
    name: "Emerald",
    primary: "#10B981",
    secondary: "#ECFDF5",
    accent: "#059669",
  },
  {
    id: "amber",
    name: "Amber",
    primary: "#F59E0B",
    secondary: "#FFFBEB",
    accent: "#D97706",
  },
  {
    id: "rose",
    name: "Rose",
    primary: "#F43F5E",
    secondary: "#FFF1F2",
    accent: "#E11D48",
  },
  {
    id: "violet",
    name: "Violet",
    primary: "#8B5CF6",
    secondary: "#F5F3FF",
    accent: "#7C3AED",
  },
  {
    id: "slate",
    name: "Slate",
    primary: "#475569",
    secondary: "#F8FAFC",
    accent: "#334155",
  },
];

const EventThemesTab = () => {
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [customColors, setCustomColors] = useState({
    primary: "#3B82F6",
    secondary: "#EFF6FF",
    accent: "#1D4ED8",
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Theme Selection */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Preset Themes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {presetThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setSelectedTheme(theme.id);
                    setCustomColors({
                      primary: theme.primary,
                      secondary: theme.secondary,
                      accent: theme.accent,
                    });
                  }}
                  className={cn(
                    "relative p-4 rounded-lg border-2 transition-all text-left",
                    selectedTheme === theme.id
                      ? "border-primary bg-accent/30"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  {selectedTheme === theme.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-6 h-6 rounded-full border border-border"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <div
                      className="w-6 h-6 rounded-full border border-border"
                      style={{ backgroundColor: theme.secondary }}
                    />
                    <div
                      className="w-6 h-6 rounded-full border border-border"
                      style={{ backgroundColor: theme.accent }}
                    />
                  </div>
                  <p className="font-medium text-sm text-foreground">
                    {theme.name}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Custom Colors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primary">Primary</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="primary"
                    type="color"
                    value={customColors.primary}
                    onChange={(e) =>
                      setCustomColors({ ...customColors, primary: e.target.value })
                    }
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={customColors.primary}
                    onChange={(e) =>
                      setCustomColors({ ...customColors, primary: e.target.value })
                    }
                    className="flex-1 font-mono text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondary">Secondary</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="secondary"
                    type="color"
                    value={customColors.secondary}
                    onChange={(e) =>
                      setCustomColors({ ...customColors, secondary: e.target.value })
                    }
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={customColors.secondary}
                    onChange={(e) =>
                      setCustomColors({ ...customColors, secondary: e.target.value })
                    }
                    className="flex-1 font-mono text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accent">Accent</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="accent"
                    type="color"
                    value={customColors.accent}
                    onChange={(e) =>
                      setCustomColors({ ...customColors, accent: e.target.value })
                    }
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={customColors.accent}
                    onChange={(e) =>
                      setCustomColors({ ...customColors, accent: e.target.value })
                    }
                    className="flex-1 font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      <div className="space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="rounded-lg overflow-hidden border border-border"
              style={{ backgroundColor: customColors.secondary }}
            >
              <div
                className="h-16 flex items-center px-4"
                style={{ backgroundColor: customColors.primary }}
              >
                <span className="text-sm font-semibold" style={{ color: '#fff' }}>
                  Tech Summit 2024
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div
                  className="h-3 rounded-full w-3/4"
                  style={{ backgroundColor: customColors.primary, opacity: 0.2 }}
                />
                <div
                  className="h-3 rounded-full w-1/2"
                  style={{ backgroundColor: customColors.primary, opacity: 0.15 }}
                />
                <button
                  className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
                  style={{
                    backgroundColor: customColors.accent,
                    color: '#fff',
                  }}
                >
                  Register Now
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventThemesTab;
