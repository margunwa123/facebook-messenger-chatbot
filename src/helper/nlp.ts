const kindOfYes = ["yes", "yeah", "yup", "yep", "sure", "totally", "ok", "you bet", "of course"];
const kindOfNo = ["no", "nope", "nah", "sorry", "not now", "no"];

export const isSayingYes = (text: string) => {
	return kindOfYes.includes(text.toLowerCase())
}

export const isSayingNo = (text: string) => {
	return kindOfNo.includes(text.toLowerCase())
}