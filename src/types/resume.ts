export type SectionType = "skills" | "experience" | "education" | "projects" | "certifications";

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  summary?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface ResumeSection {
  id: string;
  type: SectionType;
  title: string;
  order: number;
  content: {
    skills?: string[];
    experiences?: Experience[];
    education?: Education[];
    projects?: Project[];
    certifications?: Certification[];
  };
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  sections: ResumeSection[];
}

export interface Template {
  id: string;
  name: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}