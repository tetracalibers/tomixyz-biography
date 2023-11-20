---
articles:
  - ja/rehype-pretty-code-astro
  - ja/rehype-pretty-code-line-numbers
---

当サイトは[Astro](https://astro.build/)製だが、コードブロックのシンタックスハイライトは[Astroビルドインの機能](https://docs.astro.build/ja/guides/markdown-content/#%E3%82%B7%E3%83%B3%E3%82%BF%E3%83%83%E3%82%AF%E3%82%B9%E3%83%8F%E3%82%A4%E3%83%A9%E3%82%A4%E3%83%88)ではなく、Rehype Pretty Codeというrehypeプラグインを使っている。

- [Rehype Pretty Code](https://rehype-pretty-code.netlify.app/)

Rehype Pretty Codeは、[Shiki](https://github.com/shikijs/shiki)のシンタックスハイライトをMarkdown/MDXに簡単に適用できるプラグインだが、カスタマイズ性が非常に高い。

簡単なMarkdown拡張記法によって、ブロック全体、行ごと、特定の単語ごと、etc.にクラスを付与してくれるので、それを元に自分で好きなスタイルを当てることができる。
さらに、Visitor hooksという機能を使うことで、ASTを直接操作して、好きなようにHTMLを加工することもできる。

当サイトで導入した範囲で、Rehype Pretty Codeの活用法をチュートリアル形式で解説していく。
