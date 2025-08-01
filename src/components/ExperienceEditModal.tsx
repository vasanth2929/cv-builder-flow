import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Plus, X } from "lucide-react";
import { Experience } from "../types/resume";
import { MarkdownEditor } from "./MarkdownEditor";

interface ExperienceEditModalProps {
  experiences: Experience[];
  onUpdate: (experiences: Experience[]) => void;
}

export function ExperienceEditModal({ experiences, onUpdate }: ExperienceEditModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({});

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData(experience);
  };

  const handleAdd = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setEditingExperience(newExperience);
    setFormData(newExperience);
  };

  const handleSave = () => {
    if (!formData.title || !formData.company) return;

    const updatedExperience = { ...formData } as Experience;
    
    if (editingExperience?.id && experiences.find(exp => exp.id === editingExperience.id)) {
      // Update existing
      const updatedExperiences = experiences.map(exp =>
        exp.id === editingExperience.id ? updatedExperience : exp
      );
      onUpdate(updatedExperiences);
    } else {
      // Add new
      onUpdate([...experiences, updatedExperience]);
    }

    setEditingExperience(null);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    const updatedExperiences = experiences.filter(exp => exp.id !== id);
    onUpdate(updatedExperiences);
  };

  const handleFieldChange = (field: keyof Experience, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="w-4 h-4 mr-2" />
          Edit Experience
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Work Experience</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Experience List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Current Experience</h3>
              <Button onClick={handleAdd} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </div>
            
            <div className="space-y-3">
              {experiences.map((experience) => (
                <Card key={experience.id} className="relative">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-sm">{experience.title}</CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {experience.company} • {experience.location}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(experience)}
                        >
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(experience.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Badge variant="secondary" className="text-xs mb-2">
                      {experience.startDate} - {experience.endDate}
                    </Badge>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {experience.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Edit Form */}
          {editingExperience && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {experiences.find(exp => exp.id === editingExperience.id) ? 'Edit' : 'Add'} Experience
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={formData.title || ""}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    placeholder="Senior Software Engineer"
                  />
                </div>

                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company || ""}
                    onChange={(e) => handleFieldChange("company", e.target.value)}
                    placeholder="Tech Corp"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location || ""}
                    onChange={(e) => handleFieldChange("location", e.target.value)}
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      value={formData.startDate || ""}
                      onChange={(e) => handleFieldChange("startDate", e.target.value)}
                      placeholder="2022-01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      value={formData.endDate || ""}
                      onChange={(e) => handleFieldChange("endDate", e.target.value)}
                      placeholder="Present"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description (Markdown supported)</Label>
                  <MarkdownEditor
                    value={formData.description || ""}
                    onChange={(value) => handleFieldChange("description", value)}
                    placeholder="Led development of React applications and mentored junior developers..."
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave}>Save</Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEditingExperience(null);
                      setFormData({});
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}