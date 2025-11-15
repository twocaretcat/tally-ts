import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 73,
		by: {
			spaces: {
				total: 13,
			},
			letters: {
				// Cuandoyoestabaenelinstitutomelevantabaalastodaslasmañanas
				total: 57,
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
		total: 14,
	},
	sentences: {
		total: 1,
	},
};

export default expectedOutputMap;
