import summaryController from "@/controller/summary.controller";
import { Router } from "express";

const summaryRoutes = Router()

// GET /summary
// Get user and their messages
summaryRoutes.get("/", summaryController.getSummary)

export default summaryRoutes