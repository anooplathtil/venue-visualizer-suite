import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  GripVertical,
  Plus,
  Trash2,
  Type,
  Mail,
  Phone,
  ChevronDown,
  Upload,
  Calendar,
  Hash,
  AlignLeft,
  CheckSquare,
  Settings2,
  Eye,
  Save,
  BookmarkPlus,
  Library,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const fieldTypes = [
  { id: "text", name: "Short Text", icon: Type },
  { id: "textarea", name: "Long Text", icon: AlignLeft },
  { id: "email", name: "Email", icon: Mail },
  { id: "phone", name: "Phone", icon: Phone },
  { id: "number", name: "Number", icon: Hash },
  { id: "date", name: "Date", icon: Calendar },
  { id: "select", name: "Dropdown", icon: ChevronDown },
  { id: "checkbox", name: "Checkbox", icon: CheckSquare },
  { id: "file", name: "File Upload", icon: Upload },
];

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  helpText?: string;
  options?: string[];
}

interface LibraryField extends Omit<FormField, "id"> {
  id: string;
  category?: string;
}

const initialLibrary: LibraryField[] = [
  {
    id: "lib-name",
    type: "text",
    label: "Full Name",
    required: true,
    placeholder: "Enter your full name",
    category: "Personal",
  },
  {
    id: "lib-email",
    type: "email",
    label: "Work Email",
    required: true,
    placeholder: "name@company.com",
    category: "Personal",
  },
  {
    id: "lib-phone",
    type: "phone",
    label: "Phone Number",
    required: false,
    placeholder: "+91 XXXXX XXXXX",
    category: "Personal",
  },
  {
    id: "lib-company",
    type: "text",
    label: "Company Name",
    required: false,
    placeholder: "Your organization",
    category: "Business",
  },
  {
    id: "lib-designation",
    type: "text",
    label: "Designation",
    required: false,
    placeholder: "e.g. Marketing Manager",
    category: "Business",
  },
  {
    id: "lib-ticket",
    type: "select",
    label: "Ticket Type",
    required: true,
    options: ["General", "VIP", "Speaker", "Sponsor"],
    category: "Event",
  },
  {
    id: "lib-dietary",
    type: "select",
    label: "Dietary Preference",
    required: false,
    options: ["Veg", "Non-Veg", "Vegan", "Jain"],
    category: "Event",
  },
  {
    id: "lib-consent",
    type: "checkbox",
    label: "I agree to the terms & conditions",
    required: true,
    category: "Compliance",
  },
  {
    id: "lib-resume",
    type: "file",
    label: "Upload Resume",
    required: false,
    category: "Files",
  },
];

const CreateForm = () => {
  const navigate = useNavigate();
  const [formName, setFormName] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");
  const [eventId, setEventId] = useState<string>("");
  const [submitLabel, setSubmitLabel] = useState("Submit");
  const [successMessage, setSuccessMessage] = useState(
    "Thanks! Your response has been recorded."
  );
  const [fields, setFields] = useState<FormField[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [library, setLibrary] = useState<LibraryField[]>(initialLibrary);
  const [librarySearch, setLibrarySearch] = useState("");

  const selectedField = fields.find((f) => f.id === selectedFieldId) || null;

  const addField = (type: string) => {
    const ft = fieldTypes.find((t) => t.id === type);
    if (!ft) return;
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: ft.name,
      required: false,
      placeholder: "",
      options: type === "select" ? ["Option 1", "Option 2"] : undefined,
    };
    setFields((prev) => [...prev, newField]);
    setSelectedFieldId(newField.id);
  };

  const addFromLibrary = (libField: LibraryField) => {
    const { id: _ignored, category: _c, ...rest } = libField;
    const newField: FormField = {
      ...rest,
      id: Date.now().toString(),
      options: libField.options ? [...libField.options] : undefined,
    };
    setFields((prev) => [...prev, newField]);
    setSelectedFieldId(newField.id);
    toast({
      title: "Field added",
      description: `${libField.label} added from library.`,
    });
  };

  const saveToLibrary = (field: FormField) => {
    const exists = library.some(
      (l) => l.label.toLowerCase() === field.label.toLowerCase() && l.type === field.type
    );
    if (exists) {
      toast({
        title: "Already in library",
        description: `"${field.label}" is already saved.`,
      });
      return;
    }
    const libField: LibraryField = {
      id: `lib-${Date.now()}`,
      type: field.type,
      label: field.label,
      required: field.required,
      placeholder: field.placeholder,
      helpText: field.helpText,
      options: field.options ? [...field.options] : undefined,
      category: "Custom",
    };
    setLibrary((prev) => [libField, ...prev]);
    toast({
      title: "Saved to library",
      description: `"${field.label}" can now be reused.`,
    });
  };

  const removeFromLibrary = (id: string) => {
    setLibrary((prev) => prev.filter((l) => l.id !== id));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const deleteField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    if (selectedFieldId === id) setSelectedFieldId(null);
  };

  const moveField = (id: string, dir: -1 | 1) => {
    setFields((prev) => {
      const idx = prev.findIndex((f) => f.id === id);
      if (idx < 0) return prev;
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
      return next;
    });
  };

  const getIcon = (type: string) =>
    fieldTypes.find((t) => t.id === type)?.icon || Type;

  const filteredLibrary = library.filter((l) =>
    l.label.toLowerCase().includes(librarySearch.toLowerCase())
  );
  const groupedLibrary = filteredLibrary.reduce<Record<string, LibraryField[]>>(
    (acc, f) => {
      const cat = f.category || "Other";
      (acc[cat] = acc[cat] || []).push(f);
      return acc;
    },
    {}
  );

  const handleSave = () => {
    if (!formName.trim()) {
      toast({ title: "Form name is required", variant: "destructive" });
      return;
    }
    if (fields.length === 0) {
      toast({ title: "Add at least one field", variant: "destructive" });
      return;
    }
    toast({ title: "Form saved", description: `${formName} has been saved.` });
    navigate("/forms");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/forms")}
            className="h-9 w-9"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Create Form
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Build a registration or inquiry form for your events
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button className="gap-2" onClick={handleSave}>
            <Save className="w-4 h-4" />
            Save Form
          </Button>
        </div>
      </div>

      {/* Form Meta */}
      <Card className="shadow-card">
        <CardContent className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="form-name">Form Name</Label>
            <Input
              id="form-name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g. Event Registration"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="form-event">Linked Event</Label>
            <Select value={eventId} onValueChange={setEventId}>
              <SelectTrigger id="form-event">
                <SelectValue placeholder="Select event (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech-summit">Tech Summit 2024</SelectItem>
                <SelectItem value="finance-forum">Finance Forum</SelectItem>
                <SelectItem value="multiple">Multiple Events</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-3">
            <Label htmlFor="form-desc">Description</Label>
            <Textarea
              id="form-desc"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="What is this form for?"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Builder */}
      <div className="grid grid-cols-12 gap-6">
        {/* Field Library */}
        <div className="col-span-12 lg:col-span-3">
          <Card className="shadow-card">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm font-semibold">Add Field</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <Tabs defaultValue="types" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-3">
                  <TabsTrigger value="types" className="text-xs gap-1.5">
                    <Plus className="w-3.5 h-3.5" />
                    Types
                  </TabsTrigger>
                  <TabsTrigger value="library" className="text-xs gap-1.5">
                    <Library className="w-3.5 h-3.5" />
                    Library
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="types" className="space-y-1 mt-0">
                  {fieldTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => addField(type.id)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-md hover:bg-accent transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                        <type.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {type.name}
                      </span>
                      <Plus className="w-4 h-4 text-muted-foreground ml-auto" />
                    </button>
                  ))}
                </TabsContent>

                <TabsContent value="library" className="mt-0 space-y-3">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={librarySearch}
                      onChange={(e) => setLibrarySearch(e.target.value)}
                      placeholder="Search saved fields"
                      className="h-8 pl-8 text-xs"
                    />
                  </div>

                  {filteredLibrary.length === 0 ? (
                    <div className="text-center py-6 px-2">
                      <Library className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">
                        No saved fields found
                      </p>
                      <p className="text-[11px] text-muted-foreground/70 mt-1">
                        Save fields from the canvas to reuse them here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
                      {Object.entries(groupedLibrary).map(([category, items]) => (
                        <div key={category} className="space-y-1">
                          <div className="flex items-center justify-between px-1">
                            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                              {category}
                            </span>
                            <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
                              {items.length}
                            </Badge>
                          </div>
                          {items.map((libField) => {
                            const Icon = getIcon(libField.type);
                            return (
                              <div
                                key={libField.id}
                                className="group flex items-center gap-2.5 p-2 rounded-md border border-border hover:border-primary/50 hover:bg-accent transition-colors"
                              >
                                <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center shrink-0">
                                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-foreground truncate">
                                    {libField.label}
                                  </p>
                                  <p className="text-[11px] text-muted-foreground capitalize">
                                    {libField.type}
                                    {libField.required && " · required"}
                                  </p>
                                </div>
                                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-destructive hover:text-destructive"
                                    onClick={() => removeFromLibrary(libField.id)}
                                    title="Remove from library"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => addFromLibrary(libField)}
                                  title="Add to form"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Canvas */}
        <div className="col-span-12 lg:col-span-6">
          <Card className="shadow-card min-h-[500px]">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm font-semibold">
                Form Canvas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {fields.length === 0 ? (
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center mb-3">
                    <Plus className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Start building your form
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click a field type from the left to add it
                  </p>
                </div>
              ) : (
                fields.map((field, i) => {
                  const Icon = getIcon(field.type);
                  return (
                    <div
                      key={field.id}
                      onClick={() => setSelectedFieldId(field.id)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                        selectedFieldId === field.id
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
                          {field.label}
                          {field.required && (
                            <span className="text-destructive ml-1">*</span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {field.type}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveField(field.id, -1);
                          }}
                          disabled={i === 0}
                        >
                          ↑
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveField(field.id, 1);
                          }}
                          disabled={i === fields.length - 1}
                        >
                          ↓
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteField(field.id);
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
              {fields.length > 0 && (
                <div className="pt-4 mt-2 border-t border-border">
                  <Button className="w-full" disabled>
                    {submitLabel}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Settings Panel */}
        <div className="col-span-12 lg:col-span-3">
          <Card className="shadow-card">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Settings2 className="w-4 h-4" />
                {selectedField ? "Field Settings" : "Form Settings"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {selectedField ? (
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => saveToLibrary(selectedField)}
                  >
                    <BookmarkPlus className="w-4 h-4" />
                    Save to Library
                  </Button>
                  <div className="space-y-2">
                    <Label htmlFor="f-label">Label</Label>
                    <Input
                      id="f-label"
                      value={selectedField.label}
                      onChange={(e) =>
                        updateField(selectedField.id, { label: e.target.value })
                      }
                    />
                  </div>
                  {!["checkbox", "file"].includes(selectedField.type) && (
                    <div className="space-y-2">
                      <Label htmlFor="f-placeholder">Placeholder</Label>
                      <Input
                        id="f-placeholder"
                        value={selectedField.placeholder || ""}
                        onChange={(e) =>
                          updateField(selectedField.id, {
                            placeholder: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="f-help">Help Text</Label>
                    <Input
                      id="f-help"
                      value={selectedField.helpText || ""}
                      onChange={(e) =>
                        updateField(selectedField.id, {
                          helpText: e.target.value,
                        })
                      }
                      placeholder="Optional hint shown below field"
                    />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <Label htmlFor="f-required" className="cursor-pointer">
                      Required
                    </Label>
                    <Switch
                      id="f-required"
                      checked={selectedField.required}
                      onCheckedChange={(c) =>
                        updateField(selectedField.id, { required: c })
                      }
                    />
                  </div>

                  {selectedField.type === "select" && (
                    <div className="space-y-2">
                      <Label>Options</Label>
                      <div className="space-y-2">
                        {selectedField.options?.map((opt, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Input
                              value={opt}
                              onChange={(e) => {
                                const next = [...(selectedField.options || [])];
                                next[idx] = e.target.value;
                                updateField(selectedField.id, { options: next });
                              }}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() =>
                                updateField(selectedField.id, {
                                  options: selectedField.options?.filter(
                                    (_, i) => i !== idx
                                  ),
                                })
                              }
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-2"
                          onClick={() =>
                            updateField(selectedField.id, {
                              options: [
                                ...(selectedField.options || []),
                                `Option ${(selectedField.options?.length || 0) + 1}`,
                              ],
                            })
                          }
                        >
                          <Plus className="w-4 h-4" />
                          Add Option
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="submit">Submit</TabsTrigger>
                  </TabsList>
                  <TabsContent value="general" className="space-y-4 mt-4">
                    <div className="flex items-center justify-between">
                      <Label>Allow multiple submissions</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Require login</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Enable captcha</Label>
                      <Switch defaultChecked />
                    </div>
                  </TabsContent>
                  <TabsContent value="submit" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="submit-label">Submit button label</Label>
                      <Input
                        id="submit-label"
                        value={submitLabel}
                        onChange={(e) => setSubmitLabel(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="success-msg">Success message</Label>
                      <Textarea
                        id="success-msg"
                        value={successMessage}
                        onChange={(e) => setSuccessMessage(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;