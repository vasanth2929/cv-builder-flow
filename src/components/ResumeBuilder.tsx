import { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ResumeSidebar } from "./ResumeSidebar";
import { ResumePreview } from "./ResumePreview";
import { ResumeData, SectionType } from "../types/resume";

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    website: "linkedin.com/in/johndoe",
  },
  sections: [
    {
      id: "skills",
      type: "skills" as SectionType,
      title: "Skills",
      order: 0,
      content: {
        skills: ["JavaScript", "React", "TypeScript", "Node.js", "Python"]
      }
    },
    {
      id: "experience",
      type: "experience" as SectionType,
      title: "Work Experience",
      order: 1,
      content: {
        experiences: [
          {
            id: "1",
            title: "Senior Software Engineer",
            company: "Tech Corp",
            location: "San Francisco, CA",
            startDate: "2022-01",
            endDate: "Present",
            description: "Led development of React applications and mentored junior developers."
          }
        ]
      }
    },
    {
      id: "education",
      type: "education" as SectionType,
      title: "Education",
      order: 2,
      content: {
        education: [
          {
            id: "1",
            degree: "Bachelor of Science in Computer Science",
            school: "University of Technology",
            location: "Boston, MA",
            startDate: "2018-09",
            endDate: "2022-05",
            gpa: "3.8"
          }
        ]
      }
    }
  ]
};

export function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [customization, setCustomization] = useState({
    fontSize: 12,
    primaryColor: "#3B82F6",
    textColor: "#000000",
  });
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setResumeData((prev) => {
        const oldIndex = prev.sections.findIndex((section) => section.id === active.id);
        const newIndex = prev.sections.findIndex((section) => section.id === over.id);
        
        const newSections = arrayMove(prev.sections, oldIndex, newIndex);
        
        return {
          ...prev,
          sections: newSections.map((section, index) => ({
            ...section,
            order: index
          }))
        };
      });
    }
  };

  const updateResumeData = (newData: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...newData }));
  };

  const addSkill = (skill: string) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.type === "skills" 
          ? {
              ...section,
              content: {
                ...section.content,
                skills: [...(section.content.skills || []), skill]
              }
            }
          : section
      )
    }));
  };

  const removeSkill = (skillToRemove: string) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.type === "skills" 
          ? {
              ...section,
              content: {
                ...section.content,
                skills: (section.content.skills || []).filter(skill => skill !== skillToRemove)
              }
            }
          : section
      )
    }));
  };

  const handleCustomizationChange = (key: string, value: any) => {
    setCustomization(prev => ({ ...prev, [key]: value }));
  };

  const sectionIds = resumeData.sections.map(section => section.id);

  return (
    <div className="min-h-screen bg-resume-bg">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex h-screen">
          <ResumeSidebar 
            resumeData={resumeData}
            onUpdateData={updateResumeData}
            onAddSkill={addSkill}
            onRemoveSkill={removeSkill}
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
            customization={customization}
            onCustomizationChange={handleCustomizationChange}
          />
          
          <div className="flex-1 p-6">
            <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
              <ResumePreview 
                resumeData={resumeData}
                template={selectedTemplate}
                customization={customization}
              />
            </SortableContext>
          </div>
        </div>
      </DndContext>
    </div>
  );
}