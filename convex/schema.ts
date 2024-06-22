import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";
import {
    Skills,
    Profile,
    Projects,
    Education,
    WorkExperience,
    ApplicationStatus
} from "./types";


export default defineSchema({
    users: defineTable({
        name: v.string(),
        tokenIdentifier: v.string()
    }).index("by_token", ["tokenIdentifier"]),

    resume: defineTable({
        userId: v.id("users"),
        documentName: v.string(),
        profile: v.optional(Profile),
        projects: v.optional(Projects),
        skills: v.optional(Skills),
        workExperience: v.optional(WorkExperience),
        education: v.optional(Education),
        score: v.optional(v.string()),
        aiFeedback: v.optional(v.string()), // Change this to have a custom object
    }).index("by_userId", ["userId"]),

    applications: defineTable({
        userId: v.id("users"),
        company: v.string(),
        jobLink: v.string(),
        jobTitle: v.string(),
        location: v.string(),
        dateApplied: v.string(),
        status: ApplicationStatus,
        notes: v.optional(v.string()),
        salary: v.optional(v.string()),
        recruiterInfo: v.optional(v.string()),
    }).index("by_userId", ["userId"])
})