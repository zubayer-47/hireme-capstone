import { v } from "convex/values";
/* -------------------------------------------------------------------------- */
/*                                   Resume                                   */
/* -------------------------------------------------------------------------- */
export const Profile = v.object({
    name: v.string(),
    role: v.string(),
    email: v.string(),
    phone: v.string(),
    objective: v.string(),
    linkedInUrl: v.string(),
    githubUrl: v.optional(v.string()),
})

export const Projects = v.object({
    url: v.string(),
    name: v.string(),
    role: v.string(),
    date: v.string(),
    industry: v.string(),
    descriptions: v.array(v.string()),
});

export const Skills = v.object({
    heading: v.string(),
    featuredSkills: v.array(v.string()),
});

export const WorkExperience = v.object({
    title: v.string(),
    company: v.string(),
    endDate: v.string(),
    startDate: v.string(),
    location: v.string(),
    descriptions: v.array(v.string()),
});

export const Education = v.object({  
    school: v.string(),
    degree: v.string(),
    location: v.string(),
    endDate: v.string(),
    startDate: v.string(),
})

/* -------------------------------------------------------------------------- */
/*                                Applications                                */
/* -------------------------------------------------------------------------- */
export const ApplicationStatus = v.union(
    v.literal("applied"),
    v.literal("interviewed"),
    v.literal("offered"),
    v.literal("rejected"),
)
