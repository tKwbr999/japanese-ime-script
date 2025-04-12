// ==UserScript==
// @name        日本語IME誤送信防止スクリプト
// @namespace   https://github.com/tkwbr999
// @version     1.0.0
// @description 日本語入力時のIME変換中および変換確定直後のEnterキーによる誤送信を防止します
// @author      tkwbr999
// @match       *://*/*
// @grant       none
// @license     MIT
// @run-at      document-start
// ==/UserScript==

(function () {
  'use strict';

  // 対象となるフォーム要素を選択するためのセレクタ
  // 必要に応じて変更してください
  const FORM_ELEMENTS_SELECTOR = 'textarea, input[type="text"], [contenteditable="true"]';

  // 送信ボタンのセレクタ（必要に応じて変更）
  const SUBMIT_BUTTON_SELECTOR =
    'button[type="submit"], input[type="submit"], button.submit, button.send, button[data-action="submit"]';

  // JS制御のボタンの追加セレクタ（必要に応じて変更）
  const JS_BUTTON_SELECTOR =
    'button:not([type="button"]), .btn-submit, .submit-button, [aria-label="Send"], [data-testid="send"]';

  // 日本語IMEの変換中かどうかを追跡するフラグ
  let isComposing = false;

  // IMEの入力開始を検出
  document.addEventListener(
    'compositionstart',
    function () {
      isComposing = true;
    },
    { capture: true }
  );

  // IMEの入力終了を検出
  document.addEventListener(
    'compositionend',
    function () {
      isComposing = false;
    },
    { capture: true }
  );

  // フォーム送信または関連ボタンのクリックを処理する関数
  function handleSubmitAction(element) {
    // 最も近いフォームを探す
    const form = element.closest('form');

    if (form) {
      // フォームがある場合は送信イベントをディスパッチ
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      return;
    }

    // フォームがない場合、送信ボタンを探す
    let submitButton = null;

    // 標準の送信ボタンを探す
    submitButton = document.querySelector(SUBMIT_BUTTON_SELECTOR);

    // 見つからない場合はJS制御のボタンを探す
    if (!submitButton) {
      submitButton = document.querySelector(JS_BUTTON_SELECTOR);
    }

    // 要素が見つかったら段階的にイベントをトリガー
    if (submitButton) {
      // マウスダウン、マウスアップ、クリックの順に実行
      submitButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
      submitButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
      submitButton.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

      // タッチインターフェース用にタッチイベントも発火
      submitButton.dispatchEvent(new Event('touchstart', { bubbles: true, cancelable: true }));
      submitButton.dispatchEvent(new Event('touchend', { bubbles: true, cancelable: true }));
    }
  }

  // キー入力を捕捉
  document.addEventListener(
    'keydown',
    function (event) {
      // Enterキーが押された場合
      if (event.key === 'Enter') {
        // 入力要素内でのEnterキーを検出
        const isInputElement = event.target.matches(FORM_ELEMENTS_SELECTOR);

        // IME変換中は常にEnterキーをブロック
        if (isComposing || event.isComposing) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }

        // 入力要素内での通常のEnterキー押下をブロック（Cmd+Enterは許可）
        if (isInputElement && !event.metaKey && !event.ctrlKey) {
          event.preventDefault();
          event.stopPropagation();

          // 改行を挿入する場合はここでカスタム処理を行う
          // 例: カーソル位置に改行を挿入
          if (event.target.tagName.toLowerCase() === 'textarea') {
            const start = event.target.selectionStart;
            const end = event.target.selectionEnd;
            const value = event.target.value;
            event.target.value = value.substring(0, start) + '\n' + value.substring(end);
            event.target.selectionStart = event.target.selectionEnd = start + 1;
          }

          return false;
        }

        // Cmd+EnterまたはCtrl+Enterの場合はフォームを送信または関連ボタンをクリック
        if (isInputElement && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          handleSubmitAction(event.target);
          return false;
        }
      }
    },
    { capture: true }
  );

  // モバイルデバイス対応
  document.addEventListener(
    'beforeinput',
    function (event) {
      if (event.inputType === 'insertLineBreak' || event.inputType === 'insertParagraph') {
        // IME変換中または通常のEnter入力の場合はブロック
        if (isComposing || event.isComposing || !(event.metaKey || event.ctrlKey)) {
          event.preventDefault();
        }
      }
    },
    { capture: true }
  );
})();
