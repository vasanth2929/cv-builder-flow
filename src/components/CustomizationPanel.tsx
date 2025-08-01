import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
          <Label htmlFor="primaryColor">Primary Color</Label>
          <Input
            id="primaryColor"
            type="color"
            value={customization.primaryColor}
            onChange={(e) => onCustomizationChange("primaryColor", e.target.value)}
            className="h-10 w-full"
          />
        </div>

        {/* Text Color */}
        <div>
          <Label htmlFor="textColor">Text Color</Label>
          <Input
            id="textColor"
            type="color"
            value={customization.textColor}
            onChange={(e) => onCustomizationChange("textColor", e.target.value)}
            className="h-10 w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}