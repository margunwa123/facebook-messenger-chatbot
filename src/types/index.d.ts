type MessengerBody = {
	object: string,
	entry: MessengerEntry[]
}

type MessengerEntry = {
	id: string,
	time: number,
	messaging: WebhookEvent[]
}

type WebhookEvent = {
	sender: { id: string },
	recipient: { id: string },
	timestamp: number,
	message?: WebhookEventMessage,
	postback?: WebhookEventPostback
}

type WebhookEventPostback = {
	payload: string
}

type WebhookEventMessage = {
	mid: string,
	text: string
}