---
title: ブラウザを作りたい
date: "2024-01-06"
category: tech
description: Rustでレンダリングエンジンを書いてみる、まずは大まかな方針
---

2023年3月に[CSSレンダリングの仕組みを題材としたLT登壇](/tomixyz-biography/ja/events/techfeed-14)を経験して以来、私はブラウザのレンダリングへの興味に取り憑かれている。

2023年はWebGL/GLSLでCSSフィルタと同様の処理を書いて、処理の重さを実感する…という遊びをずっとしていたが、そろそろ次のステップへ行きたい。

とはいえ、ブラウザ自作などと言い出した時点で既に深い沼の目の前に立っているので、せめて有意義な車輪の再発明にするために方針だけは決めておきたい。

## …メリットあるの？

### 興味を網羅できる

ブラウザを自作することで、今までずっと抱いていた多方面への憧れをすべて昇華できる気がする。

- Rustでなにか作りたい
- 言語Parserを作ってみたい
- ブラウザレンダリングの仕組みを知りたい
- ネットワークをきちんと勉強したい
- ブラウザのセキュリティをきちんと勉強したい

etc.

### 自発的に仕様を追いかける習慣ができる

正直仕様書を読むのは苦手だが、作る過程でうんざりするほどWebブラウザの仕様を読み返すことになる。

ブラウザ仕様を読み解く習慣と気力を養ってしまえば、今後新たな機能が増えたときにもキャッチアップが容易になるだろう。

内部実装のイメージがつかめれば、パフォーマンスの視点でブラウザ機能を語れるようになるかもしれないし、中の人の苦労を想像できるようになれば、FirefoxやSafariに愚痴を吐くこともなくなるかもしれない。

### エラーの出ない寛容さに甘えたくない

HTMLは、基本的にはエラーが出ない言語だ。

寛容なHTMLは誤りをできる限り補完してしまう。アクセシビリティやマシンリーダビリティに問題があるコードだとしても、問題点を指摘することもなく、表示はされてしまう。（あまりに壊滅的な構文間違いだと当然表示されないが）

HTMLパーサーの処理を学ぶことで、本来どんなHTMLが望まれるのか、深く理解することができると考えている。

### パフォーマンスのボトルネック要因を理解できる

知らず知らずのうちに、高負荷なCSSを書いてしまうことがある。

CSSパーサーの処理を学ぶことで、子孫セレクタの重さがわかるようになるだろうし、詳細度の計算にも詳しくなれるはず。

レンダリングの処理を学ぶことで、どんなCSSプロパティが重いのかもわかるようになるはず。

### ツールの開発や実装を読み解く際に参考になる

HTML/CSS問わず、言語Parserの実装を経験することで、linterやformatter、もしくはまだ存在しない何らかの便利ツールなどを開発する上での引き出しが増えると思う。

## 先人の背中

全工程を通して、次の記事がバイブルになる。

- [ブラウザの仕組み - webdev](https://web.dev/articles/howbrowserswork?hl=ja)
- [最新のウェブブラウザの詳細 - Chrome for Developers](https://developer.chrome.com/blog/inside-browser-part1?hl=ja)

そして、同じ情熱を抱え、素晴らしい成果と学習リソースを残した先人はたくさんいる。

- [Browser from Scratch](https://viethung.space/blog/2020/05/29/Browser-from-Scratch-Introduction/)
- [Let's build a browser engine!](https://limpet.net/mbrubeck/2014/08/08/toy-layout-engine-1.html)
- [Building a Rust Web Browser](https://joshondesign.com/2020/03/10/rust_minibrowser)
- [ちいさなWebブラウザを作ろう](https://browserbook.shift-js.info/)
- [puppy-browser - GitHub](https://github.com/lmt-swallow/puppy-browser)

## …どこまでやるつもり？

### HTML Parser を自作したい

[Browser from Scratch: HTML parsing](https://viethung.space/blog/2020/10/24/Browser-from-Scratch-HTML-parsing/)にはこう書かれている。

> But I hope that I inspired you to use Servo’s HTML parser instead of implementing it from scratch like me. If you somehow deranged enough to do what I did, I wish you the best of luck.

まあとりあえず、正気の沙汰ではない。仕様書の壮大な目次をみてほしい。

- [parsing.html - HTML Living Standard](https://html.spec.whatwg.org/multipage/parsing.html)

仕様書通りではなく、慎ましくHTMLのサブセットに絞って簡易的なParserを書くという選択肢もある。

とはいえ私の目的は仕組みを追いかけることなので、実装は概ね仕様通りに、きちんとステートマシンに基づいて自作したい。ガチでやるなら、次のサイトが参考になりそう。

- [htmlparser.info](https://htmlparser.info/#table-of-contents)

とはいえ、最初から全タグに対応しようとすると確実に挫折するので、レンダリングまでできるように通しで実装してから、少しずつ対応タグを増やしていくのが賢明だろう。

以下、願望メモ。

- ステートマシンによる言語解析の仕組みを理解したい
- HTMLの寛容さまで再現したい

### CSS Parser を自作したい

次のような目的で、アルゴリズムをちゃんと実装してみたい。

- CSSの詳細度計算をちゃんと理解したい
- セレクタによる負荷の違いを実装で実感したい

### レンダリング計算、これこそが主題

このプロセスを理解したくてブラウザを自作するようなものである。ここは手を抜きたくない。

### レンダリング結果をどこに描画するか

考え中。OpenGLでリアルに画面を作ってしまうか、画像を生成するだけにするか、etc.

HTML/CSSからPDFを生成できる！的なツールの開発として終わらせてもいいかもしれないけど、PDF自体いろいろと実装が厄介な気がする。

### JSを使えるようにするか

これも考え中。いろいろややこしそうな割に、学びが多いかと言われるとそうでもない気がするので、多分割愛する。

### ネットワーキング

HTTPあたりを再勉強する過程でやるかもしれない。やらないかもしれない。

## 最終的にどうしたいの？

私の目的は、Webサイト閲覧用の完全なブラウザを模倣することではない。

所詮、一番の目的は私自身のブラウザへの理解を深めることなので、作る過程で学びに満足してしまえば、開発をやめることもあるだろう。

ただ、最終的には、その道のりを何らかの形に落とし込みたいという野望は一応ある。

現実的なのは、ブラウザの仕組みをチュートリアル形式で学べるコンテンツの制作だろうか。「説明できない = 理解できていない」ということだと思うので、どこかで言語化することは必要だと思う。

## さて、これから…

どうなるかはわからないけど、とりあえずはじめてみよう。ぼちぼち…

- [Learn Browser's Work - tomixyz-biography](/tomixyz-biography/ja/projects/learn-browsers-work)
