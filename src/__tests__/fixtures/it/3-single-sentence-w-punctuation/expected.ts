import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 45,
		by: {
			spaces: {
				total: 7,
			},
			letters: {
				// Allesuperiorimialzavoalleognimattina
				total: 36,
			},
			digits: {
				total: 1,
			},
			punctuation: {
				total: 1,
			},
			symbols: {
				total: 0,
			},
		},
		related: {
			paragraphs: {
				total: 1,
			},
			lines: {
				total: 1,
			},
		},
	},
	words: {
		total: 8,
	},
	sentences: {
		total: 1,
	},
};

export default expectedOutputMap;
