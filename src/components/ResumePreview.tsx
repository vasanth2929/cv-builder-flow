import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Mail, Phone, MapPin, Globe } from "lucide-react";
import { ResumeData } from "../types/resume";
import { cn } from "@/lib/utils";

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: string;
}

interface SortableSectionProps {
  section: any;
  template: string;
}

function SortableSection({ section, template }: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        "group relative",
        isDragging && "opacity-50 scale-95"
      )}
    >
      <div
        {...listeners}
        className="absolute -left-6 top-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10"
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>
      
      <ResumeSection section={section} template={template} />
    </div>
  );
}

function ResumeSection({ section, template }: { section: any; template: string }) {
  const baseClasses = "mb-6";
  const headerClasses = getTemplateHeaderClasses(template);
  const contentClasses = "mt-3";

  switch (section.type) {
    case "skills":
      return (
        <div className={baseClasses}>
          <h2 className={headerClasses}>{section.title}</h2>
          <div className={cn(contentClasses, "flex flex-wrap gap-2")}>
            {section.content.skills?.map((skill: string) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      );

    case "experience":
      return (
        <div className={baseClasses}>
          <h2 className={headerClasses}>{section.title}</h2>
          <div className={contentClasses}>
            {section.content.experiences?.map((exp: any) => (
              <div key={exp.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-foreground">{exp.title}</h3>
                  <span className="text-sm text-muted-foreground">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {exp.company} • {exp.location}
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case "education":
      return (
        <div className={baseClasses}>
          <h2 className={headerClasses}>{section.title}</h2>
          <div className={contentClasses}>
            {section.content.education?.map((edu: any) => (
              <div key={edu.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                  <span className="text-sm text-muted-foreground">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {edu.school} • {edu.location}
                  {edu.gpa && <span> • GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

function getTemplateHeaderClasses(template: string) {
  const base = "text-lg font-bold pb-2 border-b-2";
  
  switch (template) {
    case "modern":
      return cn(base, "border-primary text-primary");
    case "classic":
      return cn(base, "border-foreground text-foreground");
    case "creative":
      return cn(base, "border-accent text-accent");
    default:
      return cn(base, "border-primary text-primary");
  }
}

export function ResumePreview({ resumeData, template }: ResumePreviewProps) {
  const { personalInfo, sections } = resumeData;

  return (
    <div className="flex justify-center">
      <Card className="w-[8.5in] min-h-[11in] bg-resume-paper shadow-elegant p-8 print:shadow-none">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {personalInfo.fullName}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {personalInfo.email}
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {personalInfo.phone}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {personalInfo.location}
            </div>
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                {personalInfo.website}
              </div>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <SortableSection
                key={section.id}
                section={section}
                template={template}
              />
            ))}
        </div>
      </Card>
    </div>
  );
}