import webhookController from "@/controller/webhook.controller";
import { userWebhookMiddleware } from "@/middleware/webhook.middleware";
import { Router } from "express";

const webhookRoutes = Router()

// GET /webhook
// Webhook that will be called for intercepting challenge (verification)
webhookRoutes.get("/", webhookController.interceptChallenge)

// POST /webhook
// Webhook that will be called when a user chat with facebook messenger
webhookRoutes.post("/", userWebhookMiddleware, webhookController.interceptEvent)

export default webhookRoutes