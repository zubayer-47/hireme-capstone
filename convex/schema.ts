import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";
import { Profile } from "./types";


export default defineSchema({
    users: defineTable({
        name: v.string(),
        tokenIdentifier: v.string()
    }).index("by_token", ["tokenIdentifier"]),

    resume: defineTable({
        documentName: v.string(),
        profile: Profile,
            
    })
})