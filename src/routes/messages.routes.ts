import messagesController from "@/controller/messages.controller";
import { Router } from "express";

const messagesRoutes = Router()

// GET /messages
// List all messages received from users
messagesRoutes.get("/", messagesController.getAll)

// GET /messages/:id
// Get a single message by its ID
messagesRoutes.get("/:id", messagesController.getById)

export default messagesRoutes