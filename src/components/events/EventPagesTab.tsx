import { useState } from "react";
import {
  GripVertical,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  Image,
  Type,
  List,
  Users,
  Building,
  FormInput,
  Store,
  HelpCircle,
  Settings2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const sectionTypes = [
  { id: "hero", name: "Hero", icon: Image },
  { id: "richtext", name: "Rich Text", icon: Type },
  { id: "agenda", name: "Agenda", icon: List },
  { id: "speakers", name: "Speakers", icon: Users },
  { id: "sponsors", name: "Sponsors", icon: Building },
  { id: "form", name: "Form Embed", icon: FormInput },
  { id: "stalls", name: "Stall Booking", icon: Store },
  { id: "faq", name: "FAQ", icon: HelpCircle },
];

interface PageSection {
  id: string;
  type: string;
  name: string;
  visible: boolean;
  content?: string;
}

const initialSections: PageSection[] = [
  { id: "1", type: "hero", name: "Hero Banner", visible: true },
  { id: "2", type: "richtext", name: "About the Event", visible: true, content: "Welcome to Tech Summit 2024..." },
  { id: "3", type: "agenda", name: "Event Agenda", visible: true },
  { id: "4", type: "speakers", name: "Featured Speakers", visible: true },
  { id: "5", type: "sponsors", name: "Our Sponsors", visible: false },
];

const EventPagesTab = () => {
  const [sections, setSections] = useState<PageSection[]>(initialSections);
  const [selectedSection, setSelectedSection] = useState<PageSection | null>(sections[0]);

  const toggleVisibility = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
    );
  };

  const deleteSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
    if (selectedSection?.id === id) {
      setSelectedSection(null);
    }
  };

  const addSection = (type: string) => {
    const sectionType = sectionTypes.find((t) => t.id === type);
    if (!sectionType) return;
    
    const newSection: PageSection = {
      id: Date.now().toString(),
      type,
      name: sectionType.name,
      visible: true,
    };
    setSections((prev) => [...prev, newSection]);
    setSelectedSection(newSection);
  };

  const getSectionIcon = (type: string) => {
    const sectionType = sectionTypes.find((t) => t.id === type);
    return sectionType?.icon || Type;
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-280px)] min-h-[500px]">
      {/* Left: Add Section Panel */}
      <div className="col-span-3">
        <Card className="shadow-card h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Section
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {sectionTypes.map((type) => (
              <Button
                key={type.id}
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-3"
                onClick={() => addSection(type.id)}
              >
                <type.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{type.name}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Center: Page Sections */}
      <div className="col-span-5">
        <Card className="shadow-card h-full flex flex-col">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-sm font-semibold">Page Sections</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4 space-y-2">
            {sections.map((section) => {
              const Icon = getSectionIcon(section.type);
              return (
                <div
                  key={section.id}
                  onClick={() => setSelectedSection(section)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                    selectedSection?.id === section.id
                      ? "border-primary bg-accent"
                      : "border-border hover:border-primary/50 bg-card"
                  )}
                >
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {section.name}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {section.type}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVisibility(section.id);
                      }}
                    >
                      {section.visible ? (
                        <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSection(section.id);
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
            {sections.length === 0 && (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                No sections added yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right: Section Settings */}
      <div className="col-span-4">
        <Card className="shadow-card h-full flex flex-col">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Settings2 className="w-4 h-4" />
              Section Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4">
            {selectedSection ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="section-name">Section Name</Label>
                  <Input
                    id="section-name"
                    value={selectedSection.name}
                    onChange={(e) => {
                      setSections((prev) =>
                        prev.map((s) =>
                          s.id === selectedSection.id
                            ? { ...s, name: e.target.value }
                            : s
                        )
                      );
                      setSelectedSection({ ...selectedSection, name: e.target.value });
                    }}
                  />
                </div>

                {selectedSection.type === "hero" && (
                  <>
                    <div className="space-y-2">
                      <Label>Background Image</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Image className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Upload image
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-title">Title</Label>
                      <Input id="hero-title" placeholder="Enter hero title" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-subtitle">Subtitle</Label>
                      <Input id="hero-subtitle" placeholder="Enter subtitle" />
                    </div>
                  </>
                )}

                {selectedSection.type === "richtext" && (
                  <div className="space-y-2">
                    <Label htmlFor="richtext-content">Content</Label>
                    <Textarea
                      id="richtext-content"
                      rows={10}
                      placeholder="Enter your content..."
                      defaultValue={selectedSection.content}
                    />
                  </div>
                )}

                {selectedSection.type === "agenda" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Configure your event agenda with sessions and timings.
                    </p>
                    <Button variant="outline" className="w-full gap-2">
                      <Plus className="w-4 h-4" />
                      Add Session
                    </Button>
                  </div>
                )}

                {selectedSection.type === "speakers" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Add and manage event speakers.
                    </p>
                    <Button variant="outline" className="w-full gap-2">
                      <Plus className="w-4 h-4" />
                      Add Speaker
                    </Button>
                  </div>
                )}

                {selectedSection.type === "sponsors" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Showcase event sponsors by tier.
                    </p>
                    <Button variant="outline" className="w-full gap-2">
                      <Plus className="w-4 h-4" />
                      Add Sponsor
                    </Button>
                  </div>
                )}

                {selectedSection.type === "form" && (
                  <div className="space-y-4">
                    <Label>Select Form</Label>
                    <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                      <option value="">Select a form...</option>
                      <option value="registration">Event Registration</option>
                      <option value="speaker">Speaker Application</option>
                      <option value="sponsor">Sponsor Inquiry</option>
                    </select>
                  </div>
                )}

                {selectedSection.type === "faq" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Add frequently asked questions.
                    </p>
                    <Button variant="outline" className="w-full gap-2">
                      <Plus className="w-4 h-4" />
                      Add Question
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                Select a section to edit
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventPagesTab;
