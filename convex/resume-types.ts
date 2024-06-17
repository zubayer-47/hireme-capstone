import { v } from "convex/values";

export const Profile = v.object({
    name: v.string(),
    role: v.string(),
    email: v.string(),
    phone: v.string(),
    location: v.string(),
    objective: v.string(),
    githubUrl: v.string(),
    linkedInUrl: v.string(),
})

export const Projects = v.object({
    name: v.string(),
    url: v.string(),
    descriptions: v.string(),
});

export const Skills = v.object({
    heading: v.string(),
    featuredSkills: v.string(),
});

export const WorkExperience = v.object({
    school: v.string(),
    degree: v.string(),
    gpa: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    descriptions: v.string()
});

