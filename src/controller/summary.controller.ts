import { db } from "@/core/database";
import { RequestHandler } from "express"

const getSummary: RequestHandler = async (_, res) => {
	try {
		const summary = await db.user.findMany({
			select: {
				name: true,
				id: true,
				messages: true
			},
		})
		return res.status(200).send(summary)
	}
	catch (err) {
		return res.sendStatus(500);
	}
}

const summaryController = {
	getSummary
}

export default summaryController