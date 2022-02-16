import { RequestHandler } from "express";

// Log requests to console
export const loggerMiddleware: RequestHandler = (req, _, next) => {
	console.log(`${req.method} : ${req.originalUrl} at ${new Date().toISOString()}`)
	return next()
}