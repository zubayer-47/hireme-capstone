import { useResumeStore } from "@/store/resume-store";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const CSS_VARIABLES = {
  "--top-nav-bar-height": "3.5rem",
  "--resume-control-bar-height": "3rem",
  "--resume-padding": "1.5rem",
} as const;

export const getPxPerRem = () => {
  const bodyComputedStyle = getComputedStyle(
    document.querySelector("body")!
  ) as any;
  return parseFloat(bodyComputedStyle["font-size"]) || 16;
};

const {
  profile,
  projects,
  skills,
  experiences,
  education
} = useResumeStore();

export const userResumePrompt = `
PROFILE: {
  Name: ${profile.name},
  Role: ${profile.role},
  Email: ${profile.email},
  Phone: ${profile.phone},
  Location: ${profile.location},
  LinkedInUrl: ${profile.linkedInUrl},
  githubUrl: ${profile.githubUrl},
  objective: ${profile.objective}
},
PROJECTS: 
${projects.map((project) => (
  `Name: ${project.name}, 
  Description: ${project.descriptions}`
))}
,
SKILLS:
${skills.map((skill) => (
  `Heading: ${skill.heading}, 
  Skills: ${skill.featuredSkills}`
))}
,
EXPERIENCES:
${experiences.map((exp) => (
  `Company: ${exp.company}, 
  Title: ${exp.title}, 
  Dates: ${exp.startDate} - ${exp.endDate}, 
  Description: ${exp.descriptions}`
))}
,
EDUCATION:
${education.map((edu) => (
  `School: ${edu.school}, 
  Degree: ${edu.degree}, 
  GPA: ${edu.gpa}, 
  Dates: ${edu.startDate} - ${edu.endDate}, 
  Description: ${edu.descriptions}`
))}
`;