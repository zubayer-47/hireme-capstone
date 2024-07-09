import { z } from "zod";

export const createFeedSchema = z.object({
    bio: z.string().min(2).max(255),
    tags: z.array(z.string().min(2))
})