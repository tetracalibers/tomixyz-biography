---
articles:
  - ja/learn-browsers-rendering-intro
  - ja/learn-browsers-rendering-dom
  - ja/learn-browsers-rendering-html
  - ja/learn-browsers-rendering-css
  - ja/learn-browsers-rendering-style
  - ja/learn-browsers-rendering-style-cascading
  - ja/learn-browsers-rendering-style-specificity
  - ja/learn-browsers-rendering-style-defaulting
---

ブラウザを構成する内部機能は多岐に渡る。

- [ブラウザの仕組み：インフラストラクチャの概要 - web.dev](https://web.dev/articles/howbrowserswork?hl=ja#high-level_infrastructure)

その中でも、レンダリングエンジンは「HTML/CSSをどう扱うか」を担っている。

> レンダリングエンジンの役割は、レンダリング、つまりリクエストされたコンテンツをブラウザ画面に表示することです。

私たちがHTML/CSSを書いた先にある、フロントエンドの専門領域に携わる者にとって最も身近なフェーズだと思っている。

このシリーズでは、ブラウザのレンダリングエンジンをRustで実装しながら、ブラウザの仕様や仕組みを追いかけていく。

事の発端と情熱の概要は、次のブログを参照…

- [ブラウザを作りたい - tomixyz-biography](/tomixyz-biography/ja/blog/2024-make-browser)
