import { useState } from "react";
import {
  GripVertical,
  Plus,
  Trash2,
  Type,
  Mail,
  Phone,
  ChevronDown,
  Upload,
  Settings2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const fieldTypes = [
  { id: "text", name: "Text", icon: Type },
  { id: "email", name: "Email", icon: Mail },
  { id: "phone", name: "Phone", icon: Phone },
  { id: "select", name: "Dropdown", icon: ChevronDown },
  { id: "file", name: "File Upload", icon: Upload },
];

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
}

const initialFields: FormField[] = [
  { id: "1", type: "text", label: "Full Name", required: true, placeholder: "Enter your name" },
  { id: "2", type: "email", label: "Email Address", required: true, placeholder: "Enter your email" },
  { id: "3", type: "phone", label: "Phone Number", required: false, placeholder: "+91 XXXXX XXXXX" },
  { id: "4", type: "select", label: "Ticket Type", required: true, options: ["General", "VIP", "Speaker"] },
];

const EventFormsTab = () => {
  const [fields, setFields] = useState<FormField[]>(initialFields);
  const [selectedField, setSelectedField] = useState<FormField | null>(fields[0]);

  const addField = (type: string) => {
    const fieldType = fieldTypes.find((t) => t.id === type);
    if (!fieldType) return;

    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: fieldType.name,
      required: false,
      placeholder: "",
      options: type === "select" ? ["Option 1", "Option 2"] : undefined,
    };
    setFields((prev) => [...prev, newField]);
    setSelectedField(newField);
  };

  const deleteField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    if (selectedField?.id === id) {
      setSelectedField(null);
    }
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
    if (selectedField?.id === id) {
      setSelectedField({ ...selectedField, ...updates });
    }
  };

  const getFieldIcon = (type: string) => {
    const fieldType = fieldTypes.find((t) => t.id === type);
    return fieldType?.icon || Type;
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-280px)] min-h-[500px]">
      {/* Left: Form Fields */}
      <div className="col-span-6">
        <Card className="shadow-card h-full flex flex-col">
          <CardHeader className="pb-3 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Registration Form</CardTitle>
              <div className="flex items-center gap-2">
                {fieldTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => addField(type.id)}
                    title={`Add ${type.name}`}
                  >
                    <type.icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4 space-y-2">
            {fields.map((field) => {
              const Icon = getFieldIcon(field.type);
              return (
                <div
                  key={field.id}
                  onClick={() => setSelectedField(field)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                    selectedField?.id === field.id
                      ? "border-primary bg-accent"
                      : "border-border hover:border-primary/50 bg-card"
                  )}
                >
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {field.label}
                      {field.required && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {field.type}
                    </p>
                  </div>
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
              );
            })}
            {fields.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-sm">
                <p>No fields added yet</p>
                <p className="text-xs mt-1">Click the icons above to add fields</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right: Field Settings */}
      <div className="col-span-6">
        <Card className="shadow-card h-full flex flex-col">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Settings2 className="w-4 h-4" />
              Field Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4">
            {selectedField ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="field-label">Label</Label>
                  <Input
                    id="field-label"
                    value={selectedField.label}
                    onChange={(e) =>
                      updateField(selectedField.id, { label: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="field-placeholder">Placeholder</Label>
                  <Input
                    id="field-placeholder"
                    value={selectedField.placeholder || ""}
                    onChange={(e) =>
                      updateField(selectedField.id, { placeholder: e.target.value })
                    }
                    placeholder="Enter placeholder text"
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <Label htmlFor="field-required" className="cursor-pointer">
                    Required field
                  </Label>
                  <Switch
                    id="field-required"
                    checked={selectedField.required}
                    onCheckedChange={(checked) =>
                      updateField(selectedField.id, { required: checked })
                    }
                  />
                </div>

                {selectedField.type === "select" && (
                  <div className="space-y-2">
                    <Label>Options</Label>
                    <div className="space-y-2">
                      {selectedField.options?.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...(selectedField.options || [])];
                              newOptions[index] = e.target.value;
                              updateField(selectedField.id, { options: newOptions });
                            }}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => {
                              const newOptions = selectedField.options?.filter(
                                (_, i) => i !== index
                              );
                              updateField(selectedField.id, { options: newOptions });
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                        onClick={() => {
                          const newOptions = [
                            ...(selectedField.options || []),
                            `Option ${(selectedField.options?.length || 0) + 1}`,
                          ];
                          updateField(selectedField.id, { options: newOptions });
                        }}
                      >
                        <Plus className="w-4 h-4" />
                        Add Option
                      </Button>
                    </div>
                  </div>
                )}

                {selectedField.type === "file" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Allowed file types</Label>
                      <Input placeholder="e.g., .pdf, .doc, .jpg" />
                    </div>
                    <div className="space-y-2">
                      <Label>Max file size (MB)</Label>
                      <Input type="number" defaultValue="5" />
                    </div>
                  </div>
                )}

                {/* Preview */}
                <div className="mt-6 pt-4 border-t border-border">
                  <Label className="text-xs text-muted-foreground mb-3 block">
                    Preview
                  </Label>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Label className="text-sm mb-2 block">
                      {selectedField.label}
                      {selectedField.required && (
                        <span className="text-destructive ml-0.5">*</span>
                      )}
                    </Label>
                    {selectedField.type === "select" ? (
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                        <option value="">Select...</option>
                        {selectedField.options?.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : selectedField.type === "file" ? (
                      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                        <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">
                          Click to upload
                        </p>
                      </div>
                    ) : (
                      <Input
                        placeholder={selectedField.placeholder}
                        type={selectedField.type}
                        disabled
                      />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                Select a field to configure
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventFormsTab;
