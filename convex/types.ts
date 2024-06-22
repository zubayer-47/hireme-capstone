import { v } from "convex/values";
/* -------------------------------------------------------------------------- */
/*                                   Resume                                   */
/* -------------------------------------------------------------------------- */
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
    url: v.string(),
    name: v.string(),
    descriptions: v.string(),
});

export const Skills = v.object({
    heading: v.string(),
    featuredSkills: v.string(),
});

export const WorkExperience = v.object({
    title: v.string(),
    company: v.string(),
    endDate: v.string(),
    startDate: v.string(),
    descriptions: v.string(),
});

export const Education = v.object({  
    gpa: v.string(),
    school: v.string(),
    degree: v.string(),
    endDate: v.string(),
    startDate: v.string(),
    descriptions: v.string()
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
