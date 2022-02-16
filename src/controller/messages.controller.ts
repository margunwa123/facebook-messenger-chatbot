import { db } from "@/core/database";
import { RequestHandler } from "express"

const getAll: RequestHandler = async (_, res) => {
	try {
		const messages = await db.message.findMany();
		return res.status(200).send(messages)
	}
	catch (err) {
		console.error(err);
		return res.sendStatus(500)
	}
}

const getById: RequestHandler = async (req, res) => {
	try {
		const id = req.params.id;
		if (!id) {
			return res.status(400).send("id not defined")
		}
		const message = await db.message.findUnique({
			where: {
				id
			}
		});
		if (!message) {
			return res.status(400).send("id invalid")
		}
		return res.status(200).send(message)
	}
	catch (err) {
		console.error(err);
		return res.sendStatus(500)
	}

}

const messagesController = {
	getAll,
	getById
}

export default messagesController