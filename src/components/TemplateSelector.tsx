import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design",
    colors: ["#3B82F6", "#1E40AF", "#F8FAFC"],
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional professional layout",
    colors: ["#1F2937", "#374151", "#F9FAFB"],
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and expressive design",
    colors: ["#7C3AED", "#5B21B6", "#FAF5FF"],
  },
];

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

export function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  return (
    <div className="grid gap-3">
      {templates.map((template) => (
        <Card
          key={template.id}
          className={cn(
            "p-4 cursor-pointer transition-all duration-200 hover:shadow-card",
            selectedTemplate === template.id
              ? "ring-2 ring-primary shadow-elegant"
              : "hover:border-primary/50"
          )}
          onClick={() => onTemplateChange(template.id)}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-sm">{template.name}</h3>
            <div className="flex gap-1">
              {template.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full border border-border"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{template.description}</p>
        </Card>
      ))}
    </div>
  );
}