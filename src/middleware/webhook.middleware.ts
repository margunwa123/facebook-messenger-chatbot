import { createOrFindUser } from "@/helper/user";
import { RequestHandler } from "express";

// Middleware that will supply req.user from webhook calls
export const userWebhookMiddleware: RequestHandler = async (req, res, next) => {
	const body: MessengerBody = req.body;

	if (body.object === 'page') {
		for (const entry of body.entry) {
			let webhook_event = entry.messaging[0]
			const sender_id = webhook_event.sender.id

			// create or find the user
			let user = await createOrFindUser(sender_id)

			if (!user) {
				return res.status(500).send("Internal server error")
			}
			req.user = user;
		}
	}

	next()
}