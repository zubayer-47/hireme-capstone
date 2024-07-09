import OpenAI from "openai";
import { v } from "convex/values";
import { ResultType } from "./types";
import { internal } from "./_generated/api";
import { action } from "./_generated/server";
import { firstPrompt, secondPrompt, thirdPrompt } from "./prompt";


const apiKey = process.env.OPENAI_API_KEY!;
const instructions = `
You are a helpful assistant and you are designed to assist users in building resumes tailored to specific job descriptions. 
The process is divided into three sequential tasks, each contributing to the final output: a JSON object combining job description analysis 
and resume improvement suggestions. Follow the detailed steps for each task to ensure comprehensive and accurate results.
`;

export const generateResults = action({
    args: {
        resumeId: v.id("resume"),
        jobDescription: v.string(),
        userResumePrompt: v.string(),
    },
    handler: async (ctx, { resumeId, jobDescription, userResumePrompt }) => {

        const openai = new OpenAI({ apiKey });

        try {
            const completion = await openai.chat.completions.create({
                temperature: 0.3,
                max_tokens: 4096,
                top_p: 0.95,
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: instructions },
                    { role: "user", content: firstPrompt },
                    { role: "user", content: `**JOB DESCRIPTION**\n${jobDescription}` },
                    { role: "user", content: secondPrompt },
                    { role: "user", content: `**User's Resume:**\n${userResumePrompt}` },
                    { role: "user", content: thirdPrompt }
                ],
                response_format: { type: "json_object" },
            });

            const messageContent = completion.choices[0].message.content;
            console.log(messageContent)
            if (messageContent) {
                const parsedResponse: ResultType = JSON.parse(messageContent);
                console.log(parsedResponse)
                await ctx.runMutation(internal.results.saveResults, {
                    resumeId,
                    jobDescriptionSummary: parsedResponse.jobDescriptionSummary,
                    extractedKeywords: {
                        highImportance: parsedResponse.extractedKeywords.highImportance,
                        mediumImportance: parsedResponse.extractedKeywords.mediumImportance,
                        lowImportance: parsedResponse.extractedKeywords.lowImportance,
                    },
                    userFeedback: parsedResponse.userFeedback,
                });
            } else {
                console.error("No content in the response from OpenAI");
            }
        } catch (err) {
            console.error("Error while generating results:", err);
        }
    }
});
