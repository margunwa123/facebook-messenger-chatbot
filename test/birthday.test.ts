import { isBirthdayValid } from "../src/helper/birthday"

describe("Test isBirthdayValid function", () => {
	// date input, expected result
	let inputs: [string, boolean][] = [
		["2020-11-00", false],
		["2020-11-32", false],
		["2020-00-01", false],
		["2020-13-01", false],
		["2020-02-30", false],
		["2019-02-29", false],
		["2020-02-29", true],
		["2005-02-13", true],
		["2005-12-31", true],
		["2005-08-31", true],
	]

	for (const [input, expected] of inputs) {
		it(`should return ${expected} for input ${input}`, () => {
			expect(isBirthdayValid(input)).toBe(expected);
		});
	}
});