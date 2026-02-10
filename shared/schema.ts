import { z } from "zod";

export const chatMessageSchema = z.object({
  id: z.string(),
  content: z.string(),
  sender: z.enum(["user", "bot"]),
  timestamp: z.string(),
  quickReplies: z.array(z.string()).optional(),
});

export const chatRequestSchema = z.object({
  message: z.string().min(1),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;

export type InsertUser = { username: string; password: string };
export type User = { id: string; username: string; password: string };
