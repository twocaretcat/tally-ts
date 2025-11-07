<!-- Project Header -->
<div align="center">
	<h1 class="projectName">
		<a href="https://tally.johng.io" title="tally-ts">
			<img class="projectLogo" src="docs/logo.svg" alt="Project logo" title="Project logo" width="256">
		</a>
	</h1>
	<p class="projectBadges info">
		<img src="https://johng.io/badges/category/Library.svg" alt="Project category" title="Project category">
		<img src="https://img.shields.io/github/languages/top/twocaretcat/tally-ts.svg" alt="Language" title="Language">
		<img src="https://img.shields.io/github/repo-size/twocaretcat/tally-ts.svg" alt="Repository size" title="Repository size">
		<a href="LICENSE"><img src="https://img.shields.io/github/license/twocaretcat/tally-ts.svg" alt="Project license" title="Project license"/></a>
		<a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/semantic--release-conventionalcommits-e10079?logo=semantic-release" alt="Semantic Release" title="Semantic Release"/></a>
	</p>
	<p class="projectBadges status">
		<a href="https://github.com/twocaretcat/tally-ts/releases/latest"><img src="https://img.shields.io/github/v/release/twocaretcat/tally-ts.svg" alt="Latest release" title="Latest release"/></a>
		<a href="https://jsr.io/@twocaretcat/tally-ts"><img src="https://jsr.io/badges/@twocaretcat/tally-ts" alt="View package on JSR" title="View package on JSR" /></a>
		<a href="https://jsr.io/@twocaretcat/tally-ts"><img src="https://jsr.io/badges/@twocaretcat/tally-ts/score" alt="View package on JSR" title="View package on JSR" /></a>
		<a href="https://www.npmjs.com/package/@twocaretcat/tally-ts"><img src="https://img.shields.io/npm/v/@twocaretcat/tally-ts" alt="View package on npmjs" title="View package on npmjs"/></a>
	</p>
	<p class="projectDesc">
		A TypeScript word counting library. Count the number of characters, words, sentences, paragraphs, and lines in your text instantly with tally-ts
	</p>
	<br/>
</div>

## 👋 About

> [!NOTE]
> We use the terms _**graphemes**_ and _**characters**_ interchangeably in this README, although technically we are
> counting Unicode grapheme clusters rather than Unicode characters.

**tally-ts** is a TypeScript library that uses modern APIs like `Intl.Segmenter` to count the number of characters,
words, paragraphs, and lines in the input. It can also show breakdowns for different types of characters like letters,
digits, spaces, punctuation, and symbols/special characters.

### Features

- **🧮 View text metrics:** Count the number of characters, words, sentences, paragraphs, and lines in your text.
- **📊 View character composition:** View the number of spaces, digits, letters, punctuation, and symbols/special
  characters in the input.
- **🌍 Multilingual support:** Uses `Intl.Segmenter` for accurate word and character segmentation across many languages
  and scripts.
- **👨🏻‍💻 Open-source:** Know how to code? Help make **tally-ts** better by contributing to the project on GitHub, or copy
  it and make your own version!

### Use Cases

- **📚 Students & Educators:** Check essay lengths and assignment limits quickly and accurately.
- **✍️ Writers & Bloggers:** Track writing progress and optimize structure for readability.
- **📄 Legal & Business Professionals:** Ensure documents meet required character or word counts.
- **📱 Social Media Managers:** Stay within platform limits for tweets, posts, and bios.
- **🧪 Developers & Testers:** Analyze input strings and view line counts for code and data.
- **🌐 SEO Specialists:** Optimize content length for meta descriptions, headings, and body text.

## 📦 Installation

> [!TIP]
> JSR has some advantages if you're using TypeScript or Deno:
>
> - It ships typed, modern ESM code by default
> - No need for separate type declarations
> - Faster, leaner installs without extraneous files
>
> You can use JSR with your favorite package manager.

This package is available on both [JSR](https://jsr.io/@twocaretcat/tally-ts) and
[npm](https://www.npmjs.com/package/@twocaretcat/tally-ts). Install it using your preferred package manager:

<details>
<summary>🦕 Deno</summary>

```bash
deno add jsr:@twocaretcat/tally-ts     # JSR (recommended)
```

```bash
deno add npm:@twocaretcat/tally-ts     # npm
```

</details>

<details>
<summary>🥖 Bun</summary>

```bash
bunx jsr add @twocaretcat/tally-ts     # JSR
```

```bash
bun add @twocaretcat/tally-ts          # npm
```

</details>

<details>
<summary>🟢 npm</summary>

```bash
npx jsr add @twocaretcat/tally-ts      # JSR
```

```bash
npm install @twocaretcat/tally-ts      # npm
```

</details>

<details>
<summary>🟧 pnpm</summary>

```bash
pnpm i jsr:@twocaretcat/tally-ts       # JSR
```

```bash
pnpm add @twocaretcat/tally-ts         # npm
```

</details>

<details>
<summary>🧶 yarn</summary>

```bash
yarn add jsr:@twocaretcat/tally-ts     # JSR
```

```bash
yarn add @twocaretcat/tally-ts         # npm
```

</details>

<details>
<summary>🖇 vlt</summary>

```bash
vlt install jsr:@twocaretcat/tally-ts  # JSR
```

```bash
vlt install @twocaretcat/tally-ts      # npm
```

</details>

## 🕹️ Usage

> [!WARNING]
> There may be slight variations between the counts generated by **tally-ts** and other libraries due to differences in
> how they are implemented.
>
> Languages like Chinese that do not have clearly defined words may have inaccurate word counts due to the segmentation
> algorithm used. If you need consistent or linguistically precise segmentation, use a dedicated tool like
> [Jieba](https://github.com/fxsjy/jieba), [Stanford Segmenter](https://nlp.stanford.edu/software/segmenter.shtml), or
> [pkuseg](https://github.com/lancopku/pkuseg-python) instead.

To get started, import the `Tally` class and create a new instance of it with the locale you want to count in:

```ts
import { Tally } from 'tally-ts';

const tally = new Tally('en');
```

If you don't specify a locale, it will default to `en`.

Individual methods are available for each count type. If you don't need to count everything, these methods will be
faster.

### Sentences & Words

Use individual methods to get counts for sentences and words:

```ts
tally.countWords('How are you?');
// → { total: 3 }

tally.countSentences('¿Como estas?');
// → { total: 1 }
```

### Graphemes

You can get the number of graphemes (characters) like so:

```ts
tally.countGraphemes('Hello world!');
// → {
//     total: 12,
//     by: {
//       spaces: { total: 1 },
//       letters: { total: 10 },
//       digits: { total: 0 },
//       punctuation: { total: 1 },
//       symbols: { total: 0 },
//     },
//     related: {
//       paragraphs: { total: 1 },
//       lines: { total: 1 },
//     }
//   }
```

This method has some extra features. You can access breakdown counts of the graphemes by type:

```ts
const result = tally.countGraphemes('Hi there!');

console.debug(result.by);
// → {
//     spaces: { total: 1 },
//     letters: { total: 7 },
//     digits: { total: 0 },
//     punctuation: { total: 1 },
//     symbols: { total: 0 }
//   }
```

As well as related features that were computed at the same time:

```ts
console.debug(result.related);
// → {
//     paragraphs: { total: 1 },
//     lines: { total: 1 }
//   }
```

### Kitchen Sink

To get all counts at once, use the `countAll()` method:

```ts
const all = tally.countAll(`Hello world!\n\nThis is a test.`);

console.debug(all);
/* →
{
  graphemes: {
    total: 27,
    by: {
      spaces: { total: 4 },
      letters: { total: 20 },
      digits: { total: 0 },
      punctuation: { total: 1 },
      symbols: { total: 0 },
    },
    related: {
      paragraphs: { total: 2 },
      lines: { total: 3 },
    }
  },
  words: { total: 5 },
  sentences: { total: 2 },
  paragraphs: { total: 2 },
  lines: { total: 3 }
}
*/
```

### Legacy

> [!WARNING]
> **Deprecated:** The legacy implementation is no longer maintained and it has limited support for languages other than
> English. Use the class-based `Tally` API instead if possible.

The legacy implementation exposes a single function, `getCounts()`, that can be used to get the number of characters,
words, sentences, paragraphs, lines, spaces, letters, digits, and symbols at once:

```ts
import { getCounts } from 'tally-ts/legacy';

const counts = await getCounts(`Hello world!\n\nThis is a test.`);

console.debug(counts);
/* →
{
  characters: 27,
  words: 5,
  sentences: 2,
  paragraphs: 2,
  lines: 3,
  spaces: 4,
  letters: 20,
  digits: 0,
  symbols: 1
}
*/
```

You can provide an optional locale to improve segmentation accuracy for non-English text:

```ts
const counts = await getCounts(`Hello world!\n\nThis is a test.`, 'de-DE');
```

Note that the this only affects the segmentation of characters. If your language doesn't use spaces to separate words or
uses letters outside of the ASCII range, for example, you will still not get accurate results. For multilingual
counting, use the class-based `Tally` API instead.

## 🧠 Implementation Details

> [!NOTE]
> In this section, we refer to words, graphemes, spaces, lines, etc. as **_tokens_** for simplicity.

Here's some more details about how **tally-ts** does its magic.

### Algorithm

The class-based implementation uses `Intl.Segmenter` for locale-aware text segmentation at three granularities:

- **grapheme** with `countGraphemes()`
- **word** with `countWords()`
- **sentence** with `countSentences()`

Each segmenter operates independently, and the results are combined when using `countAll()`.

The counting functions are implemented as single-pass parsers for performance reasons. Each grapheme in the input string
is classified using Unicode General Categories (e.g., `\p{L}`, `\p{Nd}`, `\p{Zs}`), providing accurate results for all
languages and scripts supported by the platform’s ICU data.

Here’s how counts are determined for each token type:

| Count Type      | Description                                                                                                                                                                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **grapheme**    | A **user-perceived character** as defined by `Intl.Segmenter` with `granularity: "grapheme"`. Multi-codepoint characters (e.g., emojis, accented letters, combined scripts) are counted as one. **Examples:** `a`, `é`, `😊`, `👩‍🚀`, `貓`.                                                         |
| **word**        | Counted using `Intl.Segmenter` with `granularity: "word"`. Each segment where `isWordLike` is `true` increments the word count. This is locale-aware and works for non-Latin scripts (e.g., Chinese, Arabic). **Examples:** `"Hello world" → 2`, `"你好世界" → 1`.                                  |
| **sentence**    | Counted using `Intl.Segmenter` with `granularity: "sentence"`. Each non-empty segment increments the sentence count. Works for punctuation and locale rules (e.g., handling `¿` and `！`).                                                                                                          |
| **space**       | A grapheme that matches the Unicode **Space Separator** category (`\p{Zs}`). Includes ordinary spaces and non-breaking spaces. **Examples:** `' '`, `\u00A0`.                                                                                                                                       |
| **letter**      | A grapheme in the Unicode **Letter** category (`\p{L}`). Includes characters from all alphabets. **Examples:** `A`, `ß`, `д`, `あ`, `م`.                                                                                                                                                            |
| **digit**       | A grapheme in the Unicode **Decimal Digit** category (`\p{Nd}`). Works across scripts (e.g., Arabic-Indic, Devanagari). **Examples:** `0`, `९`, `٢`.                                                                                                                                                |
| **punctuation** | A grapheme in the Unicode **Punctuation** category (`\p{P}`). **Examples:** `.`, `,`, `!`, `¿`, `“”`.                                                                                                                                                                                               |
| **symbol**      | A grapheme in the Unicode **Symbol** category (`\p{S}`). Includes math, currency, emoji, and miscellaneous symbols. **Examples:** `+`, `$`, `©`, `🔥`, `™`.                                                                                                                                         |
| **line**        | Determined by newline graphemes (`'\n'`). Each newline increments the line count. A final line is counted even if the text doesn’t end with a newline, unless the input is empty, in which case the line count is 0.                                                                                |
| **paragraph**   | A non-empty, non-newline string, separated from other paragraphs by one or more newline characters. A trailing paragraph is counted even if the text doesn’t end with a newline, unless the input is empty, in which case the paragraph count is 0. **Example:** `"Hello\n\nWorld"` → 2 paragraphs. |

### Legacy

The legacy implementation exposes a single function, `getCounts()`, that can be used to get the number of characters,
words, sentences, paragraphs, lines, spaces, letters, digits, and symbols at once.

#### Algorithm

The counting function is implemented as a single-pass parser for performance reasons. State transitions (sentence
terminator → letter, letter → space, etc.) are used to determine when to increment the counts for each token type.

The following characters are used to separate tokens:

- **Space:** `' '`
- **Newline:** `\n`
- **End Mark:** `.`, `!`, `?`

**End of Input** can also be considered a separator because words, sentences, paragraphs, and lines at the end of the
input are counted even if not specifically terminated. For example, `Something` is counted as a word, sentence,
paragraph, and line.

Here is an overview of how we determine the counts for each token type:

| Count Type    | Description                                                                                                                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **character** | A Unicode **grapheme cluster** (user-perceived character), as determined by `Intl.Segmenter`. Using this method, Emojis and other multi-codepoint characters are counted as a single character. **Examples:** `a`, `2`, `!`, `🔥`, `貓` |
| **word**      | A contiguous sequence of one or more **letters or digits** followed by a **space**, **end mark**, or **newline**. Symbols by themselves are not considered words. **Examples:** `space`, `Whoa!`, `newline\n`, `42`.                    |
| **sentence**  | A contiguous sequence of one or more **words** followed by an **end mark**. **Example:** `Hello, world!`, `20 93.`.                                                                                                                     |
| **paragraph** | A contiguous sequence of one or more **sentences** followed by a **newline**. **Examples:** `The quick brown cat jumps over the lazy dog\n`, `Hello world! Bye world!\n`, `42\n`.                                                       |
| **space**     | A literal space character (`' '`). Other whitespace (ex. tabs, newlines) are not included.                                                                                                                                              |
| **letter**    | A character in the ASCII ranges A–Z or a–z. **Examples:** `A`, `j`, `z`.                                                                                                                                                                |
| **digit**     | A character in the ASCII range 0-9. **Examples:** `0`, `5`, `9`.                                                                                                                                                                        |
| **symbol**    | A non-letter, non-digit, non-space, non-newline character. This includes emojis, symbols, punctuation, and most whitespace. **Examples:** `,`, `%`, `#`, `😊`, `貓`, `\t`.                                                              |
| **line**      | A literal newline character (`\n`).                                                                                                                                                                                                     |

## 🤝 Contributing

Pull requests, bug reports, feature requests, and other kinds of contributions are greatly appreciated. See
[the contribution guide](docs/CONTRIBUTING.md) for more details.

## 🧾 License

Copyright © 2025 [John Goodliff](https://johng.io/r/tally-ts).

This project is licensed under the MIT license. See the [LICENSE](LICENSE) for more details.

## 🖇️ Related

### Recommended

- **👤 [Tally Chrome Extension](https://github.com/twocaretcat/Tally-Extension)**: A Chrome extension to easily count
  the number of words, characters, and paragraphs on any site

### Used By

- **👤 [Tally](https://github.com/twocaretcat/Tally)**: A free online tool to count the number of characters, words,
  paragraphs, and lines in your text. **Tally** uses this library to compute counts

### Alternatives

- **🌐 [Alfaaz](https://github.com/thecodrr/alfaaz)**: An alternative multilingual word counting library with less
  features, but faster execution

## 💕 Funding

Find this project useful? [Sponsoring me](https://johng.io/funding) will help me cover costs and **_commit_** more time
to open-source.

If you can't donate but still want to contribute, don't worry. There are many other ways to help out, like:

- 📢 reporting (submitting feature requests & bug reports)
- 👨‍💻 coding (implementing features & fixing bugs)
- 📝 writing (documenting & translating)
- 💬 spreading the word
- ⭐ starring the project

I appreciate the support!
