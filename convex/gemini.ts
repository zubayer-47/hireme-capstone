"use node";

import { v } from "convex/values";
import { internal } from "./_generated/api";
import { action, MutationCtx, QueryCtx } from "./_generated/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const llm = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generateResults = action({
    args: {
        jobDescription: v.string()
    },
    handler: async (ctx, { jobDescription }) => {
        const model = llm.getGenerativeModel({
            model: "gemini-1.5-flash", 
            generationConfig: {
                temperature: 0
            }
        });

        const response = await model.generateContent(``)
    }
})
