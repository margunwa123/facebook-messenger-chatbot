import { isSayingNo, isSayingYes } from "../src/helper/nlp"

describe("Test isSayingYes function", () => {
	// date input, expected result
	let inputs: [string, boolean][] = [
		["no", false],
		["nope", false],
		["not", false],
		["what", false],
		["for sure not", false],
		["of course yes", false],
		["of course", true],
		["yes", true],
		["yeah", true],
		["yep", true],
	]

	for (const [input, expected] of inputs) {
		it(`should return ${expected} for input ${input}`, () => {
			expect(isSayingYes(input)).toBe(expected);
		});
	}
});

describe("Test isSayingNo function", () => {
	// date input, expected result
	let inputs: [string, boolean][] = [
		["what", false],
		["for sure not", false],
		["of course yes", false],
		["of course", false],
		["yes", false],
		["yeah", false],
		["yep", false],
		["no", true],
		["nah", true],
		["nope", true],
	]

	for (const [input, expected] of inputs) {
		it(`should return ${expected} for input ${input}`, () => {
			expect(isSayingNo(input)).toBe(expected);
		});
	}
});