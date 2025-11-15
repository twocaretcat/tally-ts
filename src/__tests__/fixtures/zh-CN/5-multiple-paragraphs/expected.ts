import type { ExpectedOutputMap } from '../../../types.ts';

const expectedOutputMap: ExpectedOutputMap = {
	graphemes: {
		total: 93,
		by: {
			spaces: {
				total: 0,
			},
			letters: {
				// 人人在任何地方有权被承认在法律前的人格法律之前人人平等并有权享受法律的平等保护不受任何歧视人人有权享受平等保护以免受违反本宣言的任何歧视行为以及煽动这种歧视的任何行为之害
				total: 85,
			},
			digits: {
				total: 0,
			},
			punctuation: {
				total: 6,
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
	// Word segmentation can be ambiguous
	// Segmentation suggested by GPT-5:
	// 人人 / 在 / 任何 / 地方 / 有权 / 被 / 承认 / 在 / 法律 / 前 / 的 / 人格 / 。
	// 法律 / 之 / 前 / 人人 / 平等 / ， / 并 / 有权 / 享受 / 法律 / 的 / 平等 / 保护 / ，
	// 不受 / 任何 / 歧视 / 。
	// 人人 / 有权 / 享受 / 平等 / 保护 / ，
	// 以免 / 受 / 违反 / 本 / 宣言 / 的 / 任何 / 歧视 / 行为 / 以及 / 煽动 / 这种 / 歧视 / 的 / 任何 / 行为 / 之 / 害 / 。
	// ICU 77.1's segmentation is used as a baseline here
	words: {
		total: 48,
	},
	sentences: {
		total: 3,
	},
};

export default expectedOutputMap;
