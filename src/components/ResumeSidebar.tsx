import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, X, Download, Palette } from "lucide-react";
import { ResumeData } from "../types/resume";
import { TemplateSelector } from "./TemplateSelector";
import { CustomizationPanel } from "./CustomizationPanel";
import { ExperienceEditModal } from "./ExperienceEditModal";
import { EducationEditModal } from "./EducationEditModal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFResume } from "./PDFResume";

interface ResumeSidebarProps {
  resumeData: ResumeData;
  onUpdateData: (data: Partial<ResumeData>) => void;
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
  customization: {
    fontSize: number;
    primaryColor: string;
    textColor: string;
  };
  onCustomizationChange: (key: string, value: any) => void;
}

export function ResumeSidebar({
  resumeData,
  onUpdateData,
  onAddSkill,
  onRemoveSkill,
  selectedTemplate,
  onTemplateChange,
  customization,
  onCustomizationChange,
}: ResumeSidebarProps) {
  const [newSkill, setNewSkill] = useState("");

  const handlePersonalInfoChange = (field: string, value: string) => {
    onUpdateData({
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      onAddSkill(newSkill.trim());
      setNewSkill("");
    }
  };

  const handleUpdateExperience = (experiences: any[]) => {
    onUpdateData({
      sections: resumeData.sections.map(section => 
        section.type === "experience" 
          ? { ...section, content: { ...section.content, experiences } }
          : section
      )
    });
  };

  const handleUpdateEducation = (education: any[]) => {
    onUpdateData({
      sections: resumeData.sections.map(section => 
        section.type === "education" 
          ? { ...section, content: { ...section.content, education } }
          : section
      )
    });
  };

  const skillsSection = resumeData.sections.find(section => section.type === "skills");
  const skills = skillsSection?.content.skills || [];
  const experienceSection = resumeData.sections.find(section => section.type === "experience");
  const experiences = experienceSection?.content.experiences || [];
  const educationSection = resumeData.sections.find(section => section.type === "education");
  const education = educationSection?.content.education || [];

  return (
    <div className="w-80 border-r bg-card shadow-card h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-foreground">Resume Builder</h2>
        <p className="text-sm text-muted-foreground">Customize your professional resume</p>
      </div>

      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="p-4">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="mt-4 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={resumeData.personalInfo.fullName}
                      onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={resumeData.personalInfo.location}
                      onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website/LinkedIn</Label>
                    <Input
                      id="website"
                      value={resumeData.personalInfo.website || ""}
                      onChange={(e) => handlePersonalInfoChange("website", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Summary Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Professional Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="w-full h-24 p-3 border rounded-md resize-none text-sm"
                    placeholder="Write a brief professional summary..."
                    value={resumeData.sections.find(s => s.type === "summary")?.content.summary || ""}
                    onChange={(e) => {
                      onUpdateData({
                        sections: resumeData.sections.map(section => 
                          section.type === "summary" 
                            ? { ...section, content: { ...section.content, summary: e.target.value } }
                            : section
                        )
                      });
                    }}
                  />
                </CardContent>
              </Card>

              {/* Skills Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                    />
                    <Button size="sm" onClick={handleAddSkill}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="pr-1">
                        {skill}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-auto p-1"
                          onClick={() => onRemoveSkill(skill)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Experience Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <ExperienceEditModal
                    experiences={experiences}
                    onUpdate={handleUpdateExperience}
                  />
                </CardContent>
              </Card>

              {/* Education Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <EducationEditModal
                    education={education}
                    onUpdate={handleUpdateEducation}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="design" className="mt-4 space-y-6">
              {/* Template Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Templates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TemplateSelector
                    selectedTemplate={selectedTemplate}
                    onTemplateChange={onTemplateChange}
                  />
                </CardContent>
              </Card>

              {/* Customization */}
              <CustomizationPanel
                customization={customization}
                onCustomizationChange={onCustomizationChange}
              />
            </TabsContent>

            <TabsContent value="export" className="mt-4 space-y-6">
              {/* PDF Export */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <PDFDownloadLink
                    document={
                      <PDFResume
                        resumeData={resumeData}
                        template={selectedTemplate}
                        customization={customization}
                      />
                    }
                    fileName={`${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`}
                  >
                    {({ loading }) => (
                      <Button className="w-full" variant="hero" size="lg" disabled={loading}>
                        <Download className="w-4 h-4" />
                        {loading ? 'Generating PDF...' : 'Download PDF'}
                      </Button>
                    )}
                  </PDFDownloadLink>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
      </ScrollArea>
    </div>
  );
}