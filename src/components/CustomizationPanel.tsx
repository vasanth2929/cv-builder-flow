import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Palette } from "lucide-react";

interface CustomizationPanelProps {
  customization: {
    fontSize: number;
    primaryColor: string;
    textColor: string;
  };
  onCustomizationChange: (key: string, value: any) => void;
}

const colorOptions = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#10B981" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F59E0B" },
  { name: "Teal", value: "#14B8A6" },
];

const textColorOptions = [
  { name: "Black", value: "#000000" },
  { name: "Dark Gray", value: "#374151" },
  { name: "Medium Gray", value: "#6B7280" },
];

export function CustomizationPanel({ customization, onCustomizationChange }: CustomizationPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Customization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Font Size */}
        <div>
          <Label>Font Size: {customization.fontSize}px</Label>
          <Slider
            value={[customization.fontSize]}
            onValueChange={(value) => onCustomizationChange("fontSize", value[0])}
            min={10}
            max={16}
            step={1}
            className="mt-2"
          />
        </div>

        {/* Primary Color */}
        <div>
          <Label>Primary Color</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => onCustomizationChange("primaryColor", color.value)}
                className={`w-full h-8 rounded border-2 transition-all ${
                  customization.primaryColor === color.value
                    ? "border-foreground scale-105"
                    : "border-border hover:border-muted-foreground"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Text Color */}
        <div>
          <Label>Text Color</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {textColorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => onCustomizationChange("textColor", color.value)}
                className={`w-full h-8 rounded border-2 transition-all ${
                  customization.textColor === color.value
                    ? "border-foreground scale-105"
                    : "border-border hover:border-muted-foreground"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}