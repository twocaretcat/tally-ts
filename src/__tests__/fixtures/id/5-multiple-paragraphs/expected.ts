import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 198,
		by: {
			spaces: {
				total: 23,
			},
			letters: {
				// SetiaporangberhakataspenghidupankebebasandankeselamatanindividuTidakseorangpunbolehdiperbudakataudiperhambakanperbudakandanperdaganganbudakdalambentukapapunmestidilarang
				total: 169,
			},
			digits: {
				total: 0,
			},
			punctuation: {
				total: 4,
			},
			symbols: {
				total: 0,
			},
		},
		related: {
			paragraphs: {
				total: 2,
			},
			lines: {
				total: 3,
			},
		},
	},
	words: {
		total: 25,
	},
	sentences: {
		total: 2,
	},
};

export default expectedOutputMap;
