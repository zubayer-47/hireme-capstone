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
        LinkedInUrl: ${profile.linkedInUrl},
        githubUrl: ${profile.githubUrl},
        objective: ${profile.objective}
      },
      PROJECTS: 
      ${projects.map((project) => (
        `Name: ${project.name}, 
        Description: ${project.descriptions.map((desc) => (
          `${desc}`
        ))}`
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
        Location: ${exp.location},
        Dates: ${exp.startDate} - ${exp.endDate}, 
        Description: ${exp.descriptions.map((desc) => (
          `${desc}`
        ))}`
    ))}
      ,
      EDUCATION:
      ${education.map((edu) => (
        `School: ${edu.school}, 
        Degree: ${edu.degree}, 
        Location: ${edu.location}, 
        Dates: ${edu.startDate} - ${edu.endDate}, 
        `
    ))}
      `;

    return userResumePrompt;
}