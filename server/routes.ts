import type { Express } from "express";
import { type Server } from "http";
import { getResponse } from "./chatbot";
import { chatRequestSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/chat", (req, res) => {
    const parsed = chatRequestSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = getResponse(parsed.data.message);
    return res.json(response);
  });

  return httpServer;
}
