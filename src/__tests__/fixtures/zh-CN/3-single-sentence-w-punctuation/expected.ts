import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 19,
		by: {
			spaces: {
				total: 0,
			},
			letters: {
				total: 17,
			},
			digits: {
				total: 0,
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
	// Segmentation suggested by GPT-5:
	// | Segment | Type        | Meaning              |
	// | ------- | ----------- | -------------------- |
	// | 以前      | adverb      | before / in the past |
	// | 讀       | verb        | study / attend       |
	// | 高中      | noun        | high school          |
	// | 的       | particle    | (linking modifier)   |
	// | 時候      | noun        | time / when          |
	// | ，       | punctuation | —                    |
	// | 我       | pronoun     | I / me               |
	// | 每天      | adverb      | every day            |
	// | 早上      | noun        | morning              |
	// | 六點      | noun phrase | six o’clock          |
	// | 起床      | verb        | get up               |
	// | 。       | punctuation | —                    |
	words: {
		total: 10,
	},
	sentences: {
		total: 1,
	},
};

export default expectedOutputMap;
