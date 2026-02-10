import { z } from "zod";

export const chatMessageSchema = z.object({
  id: z.string(),
  content: z.string(),
  sender: z.enum(["user", "bot"]),
  timestamp: z.string(),
  quickReplies: z.array(z.string()).optional(),
});

export const conversationMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

export const chatRequestSchema = z.object({
  message: z.string().min(1),
  history: z.array(conversationMessageSchema).optional().default([]),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ConversationMessage = z.infer<typeof conversationMessageSchema>;

export type InsertUser = { username: string; password: string };
export type User = { id: string; username: string; password: string };
