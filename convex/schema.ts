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
        skills: v.optional(v.array(Skills)),
        profile: v.optional(Profile),
        projects: v.optional(v.array(Projects)),
        education: v.optional(v.array(Education)),
        workExperience: v.optional(v.array(WorkExperience)),
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
    }).index("by_userId", ["userId"]),

    results: defineTable({
        userId: v.id("users"),
        resumeId: v.id("resume"),
        jobDescriptionSummary: v.object({
            location: v.string(),
            jobPosition: v.string(),
            companyName: v.string(),
            salaryRange: v.string(),
            employmentType: v.string(),
            experienceLevel: v.string(),
            benefits: v.array(v.string()),
            educationalRequirement: v.string(),
            requiredSkills: v.array(v.string()),
            responsibilities: v.array(v.string()),
            preferredQualifications: v.array(v.string()),
        }),
        extractedKeywords: v.object ({
            highImportance: v.array(v.string()),
            mediumImportance: v.array(v.string()),
            lowImportance: v.array(v.string()),
        }),
        userFeedback: v.object({
            matchingElements: v.array(v.string()),
            missingElements: v.array(v.string()),
            suggestions: v.array(v.string())
        })
    }).index("by_user", ["userId"])
      .index("by_resumeId", ["resumeId"])
      .index("by_userId_resume_id", ["userId", "resumeId"]),

    
    feeds: defineTable({
        bio: v.string(),
        userId: v.id("users"),
        fileId: v.id("_storage"),
        fileUrl: v.string(),
        upvoteCount: v.number(),
        downvoteCount: v.number(),
        username: v.string(),
        tags: v.array(v.string()),
        comments: v.optional(v.array(v.object({
            commenterId: v.id("users"),
            comment: v.string(),
        })))
    })

})