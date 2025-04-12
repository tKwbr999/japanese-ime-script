<div align="center">

# 📝 japanese-ime-script 📝

**日本語入力時の IME 変換中および変換確定直後の Enter キーによる誤送信を防止する UserScript**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/UserScript-lightgrey">

</div>

## ✨ 機能

- 日本語 IME での入力変換中に `Enter` キーを押しても、フォームが送信されるのを防ぎます。
- IME 変換確定直後（未変換状態で `Enter` を押した場合も含む）の `Enter` キーによる誤送信を防ぎます。
  - `textarea` 要素内では改行として動作します。
  - その他の入力要素 (`input[type="text"]`, `[contenteditable="true"]`) では `Enter` キーを無効化します。
- `Cmd + Enter` または `Ctrl + Enter` で意図的にフォームを送信できます。

## 🚀 インストール

1.  **UserScript マネージャーのインストール:**
    お使いのブラウザに以下のいずれかの拡張機能をインストールしてください。
    - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Edge, Safari, Opera)
    - [Greasemonkey](https://www.greasespot.net/) (Firefox)
    - Violentmonkey (Chrome, Firefox, Edge, Opera)
2.  **スクリプトのインストール:**
    以下のリンクをクリックしてスクリプトをインストールします。
    - [インストールリンク](https://github.com/tKwbr999/japanese-ime-script/raw/main/script.js)

## 🔧 使い方

インストール後、ウェブページのテキストエリアや入力フィールドで日本語入力を行う際に自動的に有効になります。

- **通常入力:** IME 変換中に `Enter` を押しても送信されません。変換確定後の `Enter` も誤送信を防ぎます。
- **送信:** 送信したい場合は `Cmd + Enter` (Mac) または `Ctrl + Enter` (Windows/Linux) を押してください。

## 🤝 貢献

バグ報告や機能提案は [GitHub Issues](https://github.com/tKwbr999/japanese-ime-script/issues) までお願いします。プルリクエストも歓迎します。

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。（※ LICENSE ファイルがまだないため、後で追加してください）

---

_関連 Zenn 記事:_ https://zenn.dev/tkwbr999/articles/67714125877fa7
