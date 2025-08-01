import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Plus, X } from "lucide-react";
import { Education } from "../types/resume";

interface EducationEditModalProps {
  education: Education[];
  onUpdate: (education: Education[]) => void;
}

export function EducationEditModal({ education, onUpdate }: EducationEditModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [formData, setFormData] = useState<Partial<Education>>({});

  const handleEdit = (edu: Education) => {
    setEditingEducation(edu);
    setFormData(edu);
  };

  const handleAdd = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: "",
      school: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
    };
    setEditingEducation(newEducation);
    setFormData(newEducation);
  };

  const handleSave = () => {
    if (!formData.degree || !formData.school) return;

    const updatedEducation = { ...formData } as Education;
    
    if (editingEducation?.id && education.find(edu => edu.id === editingEducation.id)) {
      // Update existing
      const updatedEducations = education.map(edu =>
        edu.id === editingEducation.id ? updatedEducation : edu
      );
      onUpdate(updatedEducations);
    } else {
      // Add new
      onUpdate([...education, updatedEducation]);
    }

    setEditingEducation(null);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    const updatedEducations = education.filter(edu => edu.id !== id);
    onUpdate(updatedEducations);
  };

  const handleFieldChange = (field: keyof Education, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="w-4 h-4 mr-2" />
          Edit Education
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Education</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Education List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Current Education</h3>
              <Button onClick={handleAdd} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </div>
            
            <div className="space-y-3">
              {education.map((edu) => (
                <Card key={edu.id} className="relative">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-sm">{edu.degree}</CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {edu.school} • {edu.location}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(edu)}
                        >
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(edu.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Badge variant="secondary" className="text-xs mb-2">
                      {edu.startDate} - {edu.endDate}
                    </Badge>
                    {edu.gpa && (
                      <p className="text-xs text-muted-foreground">
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Edit Form */}
          {editingEducation && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {education.find(edu => edu.id === editingEducation.id) ? 'Edit' : 'Add'} Education
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    value={formData.degree || ""}
                    onChange={(e) => handleFieldChange("degree", e.target.value)}
                    placeholder="Bachelor of Science in Computer Science"
                  />
                </div>

                <div>
                  <Label htmlFor="school">School</Label>
                  <Input
                    id="school"
                    value={formData.school || ""}
                    onChange={(e) => handleFieldChange("school", e.target.value)}
                    placeholder="University of Technology"
                  />
                </div>

                <div>
                  <Label htmlFor="eduLocation">Location</Label>
                  <Input
                    id="eduLocation"
                    value={formData.location || ""}
                    onChange={(e) => handleFieldChange("location", e.target.value)}
                    placeholder="Boston, MA"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eduStartDate">Start Date</Label>
                    <Input
                      id="eduStartDate"
                      value={formData.startDate || ""}
                      onChange={(e) => handleFieldChange("startDate", e.target.value)}
                      placeholder="2018-09"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eduEndDate">End Date</Label>
                    <Input
                      id="eduEndDate"
                      value={formData.endDate || ""}
                      onChange={(e) => handleFieldChange("endDate", e.target.value)}
                      placeholder="2022-05"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="gpa">GPA (optional)</Label>
                  <Input
                    id="gpa"
                    value={formData.gpa || ""}
                    onChange={(e) => handleFieldChange("gpa", e.target.value)}
                    placeholder="3.8"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave}>Save</Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEditingEducation(null);
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