import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 63,
		by: {
			spaces: {
				total: 10,
			},
			letters: {
				// DamalsimGymnasiumbinichjedenMorgenumUhraufgestanden
				total: 51,
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
		total: 11,
	},
	sentences: {
		total: 1,
	},
};

export default expectedOutputMap;
