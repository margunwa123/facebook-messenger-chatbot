import { db } from "@/core/database";
import { birthdayCardResponse, getDaysLeftUntil, isBirthdayValid } from "@/helper/birthday";
import { sendMessage } from "@/services/messenger.service";
import { isSayingNo, isSayingYes } from "@/helper/nlp";
import { createOrFindUser } from "@/helper/user";
import { User } from "@prisma/client";
import { RequestHandler, response } from "express"

const interceptChallenge: RequestHandler = (req, res) => {
	// Parse the query params
	let mode = req.query["hub.mode"];
	let token = req.query["hub.verify_token"];
	let challenge = req.query["hub.challenge"];

	if (mode && token) {
		// Check the mode and token sent is correct
		if (mode === "subscribe" && token === process.env.WEBHOOK_TOKEN) {
			// if the token is correct, verify it
			console.log('WEBHOOK VERIFIED');
			return res.status(200).send(challenge);
		}
		else {
			return res.sendStatus(403);
		}
	}
	return res.sendStatus(400);
}

const interceptEvent: RequestHandler = async (req, res) => {
	const body: MessengerBody = req.body;

	if (body.object === 'page') {
		for (const entry of body.entry) {
			let webhook_event = entry.messaging[0]

			const user = req.user;
			if (webhook_event.message) {
				await handleMessage(user, webhook_event.message)
			}
			else if (webhook_event.postback) {
				await handlePostback(user, webhook_event.postback)
			}
		}
		res.status(200).send("EVENT_RECEIVED")
	}
	else {
		res.sendStatus(404)
	}
}

const handleMessage = async (user: User, message: WebhookEventMessage) => {
	const sender_id = user.id

	try {
		await db.message.create({
			data: {
				id: message.mid,
				sender_id,
				message: message.text
			}
		})
	}
	catch (err) {
		return
	}

	// USER FIRST CONTACT
	if (user.regist_step === 0) {
		const err = await sendMessage(sender_id, "Hi, can you please tell us your name?")
		if (err) return;
		await db.user.update({
			where: { id: sender_id },
			data: {
				regist_step: 1
			}
		})
	}
	// USER SUBMIT USERNAME
	else if (user.regist_step === 1) {
		const firstName = message.text;
		if (firstName.trim() === '') {
			await sendMessage(sender_id, "You sent us an empty string :(, please tell us your name")
			return;
		}
		const err = await sendMessage(sender_id, `Hello ${firstName}!, May you provide us your birthday in YYYY-MM-DD format?`)
		if (err) return;
		await db.user.update({
			where: { id: sender_id },
			data: {
				name: firstName,
				regist_step: 2
			}
		})
	}
	// USER SUBMIT THEIR BIRTHDAY
	else if (user.regist_step === 2) {
		const birthday = message.text;
		if (!isBirthdayValid(birthday)) {
			await sendMessage(sender_id, "The birthday format is invalid. Please provide us with valid birthday")
			return;
		}
		const err = await sendMessage(sender_id, birthdayCardResponse)
		if (err) return;
		await db.user.update({
			where: { id: sender_id },
			data: {
				birthday,
				regist_step: 3
			}
		})
	}
	// USER SAYS YES / NO
	// USER SUBMIT THEIR BIRTHDAY
	else if (user.regist_step === 3) {
		const text = message.text;
		if (isSayingNo(text)) {
			const err = await sendMessage(sender_id, `Goodbye 👋`)
			if (err) return
		}
		else if (isSayingYes(text)) {
			const err = await sendMessage(sender_id, `There are ${getDaysLeftUntil(user.birthday)} days left until your next birthday`)
			if (err) return
		}
		else {
			const err = await sendMessage(sender_id, `I didn't quite get that... can you repeat?`)
			if (err) return
		}

		await db.user.update({
			where: { id: sender_id },
			data: {
				regist_step: 4
			}
		})
	}
	else if (user.regist_step === 4) {
		const err = await sendMessage(sender_id, birthdayCardResponse)
		if (err) return
		await db.user.update({
			where: { id: sender_id },
			data: {
				regist_step: 3
			}
		})
	}
}

const handlePostback = async (user: User, postback: WebhookEventPostback) => {
	let payload = postback.payload;

	// set the response based on the postback payload
	if (payload === "yes") {
		await sendMessage(user.id, {
			text: `There are ${getDaysLeftUntil(
				user.birthday
			)} days until your next birthday`,
		})
	} else if (payload === "no") {
		await sendMessage(user.id, {
			text: "Goodbye 👋",
		})
	}
}

const webhookController = {
	interceptChallenge,
	interceptEvent
}

export default webhookController