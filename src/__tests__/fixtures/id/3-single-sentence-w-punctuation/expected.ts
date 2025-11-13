import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 50,
		by: {
			spaces: {
				total: 8,
			},
			letters: {
				// Saatmasihpelajarsayabangunjamsetiappagi
				total: 39,
			},
			digits: {
				total: 1,
			},
			punctuation: {
				total: 2,
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
