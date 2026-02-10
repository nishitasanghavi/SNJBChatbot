import type { Express } from "express";
import { type Server } from "http";
import { streamResponse } from "./chatbot";
import { chatRequestSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/chat", async (req, res) => {
    const parsed = chatRequestSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: "Message is required" });
    }

    const { message, history } = parsed.data;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    try {
      for await (const chunk of streamResponse(message, history)) {
        res.write(`data: ${JSON.stringify(chunk)}\n\n`);
      }
    } catch (error) {
      console.error("Streaming error:", error);
      res.write(`data: ${JSON.stringify({ type: "text", content: "Sorry, something went wrong. Please try again." })}\n\n`);
      res.write(`data: ${JSON.stringify({ type: "done", quickReplies: [] })}\n\n`);
    }

    res.end();
  });

  return httpServer;
}
