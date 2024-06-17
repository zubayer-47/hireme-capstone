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
