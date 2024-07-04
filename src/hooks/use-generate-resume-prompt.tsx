"use client";

import { useResumeStore } from "@/store/resume-store";

export const useGenerateResumePrompt = () => {
    const {
        profile,
        projects,
        skills,
        experiences,
        education
    } = useResumeStore();

    const userResumePrompt = `
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

    return userResumePrompt;
}