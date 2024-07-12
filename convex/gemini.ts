"use node";

import { v } from "convex/values";
import { internal } from "./_generated/api";
import { action } from "./_generated/server";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import {
    firstPrompt,
    secondPrompt,
    thirdPrompt,
} from "./prompt";
import { ResultType } from "./types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    }
]

export const generateResults = action({
    args: {
        resumeId: v.id("resume"),
        jobDescription: v.string(),
        userResumePrompt: v.string(),
    },
    handler: async (ctx, {
        resumeId,
        jobDescription,
        userResumePrompt
    }) => {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            safetySettings,

            generationConfig: {
                topP: 0.95,
                topK: 64,
                temperature: 0,
                maxOutputTokens: 8192
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

        let result = await model.generateContent(prompt)

        const parsedResponse: ResultType = JSON.parse(result.response.text());

    }
})
