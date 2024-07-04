"use node";

import { v } from "convex/values";
import { internal } from "./_generated/api";
import { action, MutationCtx, QueryCtx } from "./_generated/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
    firstPrompt, 
    secondPrompt, 
    thirdPrompt, 

} from "./prompt";

const llm = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generateResults = action({
    args: {
        jobDescription: v.string(),
        userResumePrompt: v.string(),
    },
    handler: async (ctx, { 
        jobDescription,
        userResumePrompt 
    }) => {
        const model = llm.getGenerativeModel({
            model: "gemini-1.5-flash", 
            generationConfig: {
                temperature: 0
            }
        });

        const prompt = `
            ${firstPrompt}

            **Job Description:**
            ${jobDescription}

            ${secondPrompt}

            **User's Resume:**
            ${userResumePrompt}

            ${thirdPrompt}
        `

        const output = await model.generateContent(prompt);

        const response = output.response;
        console.log(response.text())
    }
})
