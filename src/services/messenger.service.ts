import axios from "axios"

export const sendMessage = async (sender_id: string, _response: string | any): Promise<string | null> => {
	console.log(`Sending message ${_response} to ${sender_id}`)
	const response = typeof _response === "string" ? { text: _response } : _response

	try {
		await axios.post("https://graph.facebook.com/v2.6/me/messages", {
			recipient: {
				id: sender_id
			},
			message: response
		}, {
			params: {
				access_token: process.env.PAGE_ACCESS_TOKEN
			}
		})
		console.log("Message sent")
		return null
	}
	catch (err) {
		console.log(err);
		return "Error sending the message"
	}
}