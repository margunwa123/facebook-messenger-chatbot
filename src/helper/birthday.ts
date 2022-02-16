

const month31 = [1, 3, 5, 7, 8, 10, 12]

const isLeapYear = (year: number): boolean => {
	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

export const isBirthdayValid = (birthday: string) => {
	try {
		const [year, month, day] = birthday.split('-').map(item => Number(item))
		const isYearValid = year > 1900 && year < new Date().getFullYear()
		const isMonthValid = month >= 1 && month <= 12;
		let isDayValid = true;
		if (month === 2) {
			if (isLeapYear(year)) {
				isDayValid = day >= 1 && day <= 29
			}
			else {
				isDayValid = day >= 1 && day <= 28
			}
		}
		else if (month31.includes(month)) {
			isDayValid = day >= 1 && day <= 31
		}
		else {
			isDayValid = day >= 1 && day <= 30
		}
		return isYearValid && isMonthValid && isDayValid;
	}
	catch (err) {
		return false
	}
}

const dayInMillis = 86400 * 1000

export const getDaysLeftUntil = (birthday: string): number => {
	try {
		const now = new Date();
		const [_, month, day] = birthday.split('-').map(item => Number(item))
		let nextBirthday: Date;
		const nextBdayIsThisYear = (now.getMonth() + 1) < month || (now.getMonth() + 1) === month && now.getDate() < day
		if (nextBdayIsThisYear) {
			nextBirthday = new Date(`${now.getFullYear()}-${month}-${day}`)
		}
		else {
			nextBirthday = new Date(`${now.getFullYear() + 1}-${month}-${day}`)
		}
		const msDifference = nextBirthday.getTime() - now.getTime()
		const dayDifference = Math.ceil(msDifference / dayInMillis)
		return (dayDifference)
	}
	catch (err) {
		return 0
	}
}

export const birthdayCardResponse = {
	attachment: {
		type: "template",
		payload: {
			template_type: "generic",
			elements: [
				{
					title:
						"Do you want to know how many days are left until your birthday?",
					subtitle: "Tap a button to answer.",
					image_url:
						"https://thumbs.dreamstime.com/b/birthday-cake-decorated-colorful-sprinkles-ten-candles-colorful-birthday-cake-sprinkles-ten-candles-blue-142412983.jpg",
					buttons: [
						{
							type: "postback",
							title: "Yes!",
							payload: "yes",
						},
						{
							type: "postback",
							title: "No!",
							payload: "no",
						},
					],
				},
			],
		},
	}
}