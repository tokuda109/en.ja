---
layout: post
title: "An Introduction to the CSS Flexbox Module"
date: 2012-07-20 00:37:52
---

CSS, despite its relatively low perceived skill ceiling, always seems to have a killer feature up its sleeve.
メディアクエリーはどのようにレスポンシブレイアウトを可能にし、フロントエンド開発に革命を起こしたか記憶にありますか?
今回、CSS3で新しく追加されたフレックスボックスという新しいレイアウトモードについて紹介したいと思います。
ウズウズしていることでしょう。ではやってみましょう。

## CSSフレックスボックスのサポート

[CSSフレックスボックスの仕様](http://www.w3.org/TR/css3-flexbox/)は現在ワーキングドラフトなので**仕様が変更される**かもしれません。
このチュートリアルのサンプルは、フレックスボックスの仕様に追随するためにブラウザのフレックスボックスの実装が変更され、将来的に動かなくなる可能性があります。
このチュートリアルの目的は、CSSフレックスボックスの基本的なところを理解してもらうためにウェブページにおける使い方のデモを紹介することです。

> このチュートリアルは簡潔にするためにウェブキットベースのブラウザのみ対応し、ベンダープリフィックスを使わないサンプルを使用するので注意して下さい。
  フレックスボックスモジュールをサポートしているブラウザの一覧は[caniuse.com](http://caniuse.com/flexbox)を参照して下さい。
  プロジェクトでプリフィックスを知りたい場合は必要に応じて参照して下さい。

## レイアウトモードの背景

CSSフレックスボックスは本質的にはレイアウトのモードのことです。
CSSにはレイアウトのモードは既に存在していて、長い間使われてきました。
レイアウトのモードの例の一つとして**ブロック**(display: block)があります。
ブロックレイアウトはドキュメント全体のスタイルを定義する素晴らしい方法で、ほとんどの要素は[デフォルトでブロックレベルの要素](https://developer.mozilla.org/en/HTML/Block-level_elements)としてブラウザに扱われます。
これらは文章や`div`のような一般的な要素を含んでいます。

ブロック要素ではない要素もあって、それらは多分**インライン要素**だと思います。
アンカータグ、インプットタグ、ストロングタグは[インラインレベル要素](http://en.wikipedia.org/wiki/HTML_element#Inline_elements)です。
Chromeの[開発者ツール](https://developers.google.com/chrome-developer-tools/)は、開発者が明示的に設定していないCSSプロパティや値が要素に対してどのように適用されているかを“[computed style](https://developers.google.com/chrome-developer-tools/docs/elements-styles#computed_style)”で表示させることができます。

ここではJavaScriptの[window.getComputedStyle](https://developer.mozilla.org/en/DOM/window.getComputedStyle)メソッドを使って要素のcomputed styleにアクセスする簡単なティップスを紹介します。

    var elem = document.querySelector('h1#someId');
    window.getComputedStyle(elem).display; //block

ブロックやインラインのレイアウトモードがある一方、CSSにはテーブルやポジションによるレイアウトもあります。
レイアウトモードについて今回扱うのは、ウェブページのレイアウトをするときにフレキシビリティさをよりあげるために使われるフレックスボックスは新しいレイアウトモードだからです。

フレックスボックスレイアウトは、アイテムをレイアウトするための記述のルールを簡単にするためにシンプルなテクニックを提供しています。

## フレックスボックスはどのように使うのですか?

要素を強制的にフレックスボックスレイアウトにするために、displayプロパティに`flexbox`という値を指定します。

    #container {
      display: flexbox;
    }

デフォルトで、フレックスボックスはブロックレベルの要素です。
インラインレベルの要素として定義することも可能です。

    #container {
      display: inline-flexbox;
    }

ポジションをコントロールしたい子要素の**親要素**にフレックスボックスレイアウト適用したい場合は、上の例と同様にして下さい。
[簡単なライブサンプル](http://jsbin.com/imuson/edit#html,live)を見てみましょう。

    <ul>
      <li>An item</li>
      <li>Another item</li>
      <li>The last item</li>
    </ul>

    ul {
      /* Old Syntax */
      display: -webkit-box;

      /* New Syntax */
      display: -webkit-flexbox;
    }

リストアイテムの要素は水平に展開されていて、今まで`float: left`を使っているなら、それらの要素のレンダリング結果がとても似ていることに気づいたと思います。
リストアイテムの要素は**フレックスボックスのアイテム**として参照することが可能です。

> 注意: フレックスボックスの直接の子孫はポジションを決められています。
  例として、`position: absolute`を使った場合、フレックスボックスのアイテムではなくなり配置が崩れます。

![Very basic example](http://d2o0t5hpnwv4c1.cloudfront.net/2071_cssflexbox/simple-example.png)

アイテム(リストアイテムの要素)が水平に展開(展開する方向は、メインの軸として知られています)されていること気づいたかもしれません。
幸運にも展開する方向はコントロールする(なので、メインの軸と考えることができます)ことができ、フロートを使わなくてもいいようになります!

## Exploring flex-direction

フレックスボックスのアイテムをレイアウトする場合に、`flex-direction`プロパティで方向を指定することが可能です。
プロパティは値として、`row、row-reverse、column、column-reverse`を指定することができます。
デフォルトの値は`row`になっています。

上の例と近い記述を使う場合、もう一つバリューペアとして([flex-direction: column](http://jsbin.com/ubugej/2/edit))という値をCSSプロパティを追加することができます。

    ul {
      -webkit-flex-direction: column;
    }

![Very basic example](http://d2o0t5hpnwv4c1.cloudfront.net/2071_cssflexbox/flex-direction-example.png)

同じような結果が得られたら次に進んで`flex-direction`プロパティの`column`という値を`column-reverse`に変更してみて下さい。
カラムレイアウトで表示されているフレックスボックスのアイテムがどうなったか分かるでしょう。順番が逆になりました。

## flex-wrapでラップする

By default, a flexbox is single-line.
One which cannot contain its children may overflow using the flex-wrap property;
we can instruct the flexbox to become multi-line, in which case the flexbox items can wrap over.
flex-wrap accepts the values, nowrap (the default value), wrap & wrap-reverse.

![Very basic example](http://d2o0t5hpnwv4c1.cloudfront.net/2071_cssflexbox/flex-direction-example.png)

Notice how, in the demo, the items ‘wrap’ over, since they cannot be contained within their small 100px parent.
Using the developer tools, try toggling the overflow: hidden and -webkit-flex-wrap bits.
Without the flex-wrap and overflow properties, the items overflow their parent.

以下に示しているとおり、`flex-direction`と`flex-wrap`には簡略化されて使いやすいプロパティがあります。

    flex-direction: row;
    flex-wrap: nowrap;

    //Using the two values above with the flex-flow shorthand we get:
    flew-flow: row nowrap;

    //flex-direction: column; flex-wrap: wrap;
    flex-flow: column wrap;

## 簡単なサンプル

確かに素晴らしい見た目ではありませんが、この[サンプルのメニュー](http://jsbin.com/aqunam/edit#html,live)はフレックスボックスの使用例をいくつかデモをするためのものです。

- ラッピングをデモするためにフレックスボックスに`300px`の幅でセットしました。
- メニューの一般的な事例は、モバイルフレンドリーなメニューとするためにメディアクエリーを使うところに`flex-direction: column`をつかうことは意味があるかもしれません。

![Boring menu](http://d2o0t5hpnwv4c1.cloudfront.net/2071_cssflexbox/boring-menu.png)

何がいい事かというと、[この事例](http://jsbin.com/aqunam/3/edit)のように可能な限り使えるスペースを使ってフレックスボックスのアイテムを広がるようにすることです。
これはflexプロパティによるものです。

![Boring menu](http://d2o0t5hpnwv4c1.cloudfront.net/2071_cssflexbox/slightly-better-menu.png)

## Flexing

> Flexingは拡大可能なスペースまで広げるためにwidthやheightを変更するためのコンテナの機能です。

`flex`プロパティはすばらしい機能で、それまでは難しかった新しいことができます。

このプロパティでアイテムに推奨するサイズを設定することができます。
flexプロパティは、flexbox自体に適用されているわけではなく、flexboxのアイテムに適用されるということ覚えておいて下さい。
ブラウザはflexboxのアイテムのサイズを**基本的に一行ずつ**設定しようとします。
その結果、アイテムの空いているスペースの残りを均等に分配しようとします。
[メニューのサンプル](http://jsbin.com/aqunam/3/edit)を見ているなら、フレックスボックスのアイテムのcomputed styleのwidthを確認するために開発者ツールを起動して下さい。そうすると**78px**となっているでしょう。
検証してみましょう。

![The rcomputed width of a flexbox item](http://d2o0t5hpnwv4c1.cloudfront.net/2071_cssflexbox/computed-style-menu-width.png)

*フレックスボックスのアイテムの幅が`60px`が優先されると思って設定したのにどのようなしくみで増えたのだろう?*と、もしかすると驚いたかもしれません。

![The rcomputed width of a flexbox item](http://d2o0t5hpnwv4c1.cloudfront.net/2071_cssflexbox/flexbox-item-computed-style.jpg)

- In the first line, there are three items, which should be around 60pxflex property (that’s a total of 180px).
- フレックスボックス全体の幅は`300px`です。そして`180px`を引くと`120px`になるが実際には空いているスペースが`120px`もないことがわかります。
- 個々のフレックスボックスのアイテムは`10px`の`margin-right`がかかっています。3つのアイテムのトータルで`30px`で、空いているスペースが残り`90px`あります。
- しかしちょっと待って。
  個々のアイテムには`5px`のpaddingもかかっています。上、右、下、左に`5px`のpaddingがかかっているということです。
- 個々のアイテムには`border: 1px solid black`がかかっています。
  左右に`1px`ずつです。個々のアイテムにトータルで2pxずつかかっているので3アイテムなので`6px`になります。
  空いているスペースが`54px`残っています。
- 空いているスペースの`54px`で、一列に並ぶように3つのアイテムに均等に`18px`ずつ分配します。
  `60px`で設定したのに実際に適用されるスタイルが`78px`に変換されるのは、なぜだろうと感じているかもしれません。

推測できると思いますが、最後の行(‘Contact us’のアイテム)はフレックスボックスの幅全体に引き伸ばされています。

フレックスボックスのアイテム異なる幅が与えられています。
2つのアイテムの間の空いているスペースを埋める際に
Flexbox items can be given different widths;
an item with a flex of 2 is said to be twice as flexible as an item with a flex of 1.
So, when it comes to distributing free space between the two items, the item with a flex of 1 will be given half the space that the item with a flex of 2 receives.

## 並べ替え

フレックスボックスは、ドキュメント内に表示される順番に関わらず、CSSを使ってアイテムの順番を並べ替える簡単な方法があります。
簡単な[サンプル](http://jsbin.com/upiyoy/edit#html,live)があります。

以下のように記述してみます。

    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>

    ul {
      display: -webkit-flexbox;
    }

    ul li:nth-child(1) {
      -webkit-flex-order: 2;
    }

[nth-child](https://developer.mozilla.org/en/CSS/:nth-child)という擬似クラスを使って最初のリストアイテムの要素を対象にし、それからflex-orderプロパティを適用します。
フレックスボックスのアイテムはデフォルトでorder 0になっています。
最初のリストアイテムをorder 2にすることで、ブラウザはitem 2と3を最初に表示し、次にitem 1が続くでしょう。

## 整列

flex-packプロパティを使うことでメインとなる軸に沿って、フレックスボックスのアイテムを整列させることができます。
このプロパティは値として以下のものが指定できます。

- start
- end
- center
- justify
- distribute

このチュートリアルのデモはいくつかの異なる位置のサンプルを紹介しています。

The demo for this tutorial provides some examples of the different types of alignment.
Looking at the jsbin example, we can see that the items have only been centered on one axis: the main axis.
This is essentially the axis upon which the flexbox items are placed.

flex-directionプロパティを調整することで方向を変えることができます。
カラムに設定することで、メインの軸を変わったのがわかると思います。
軸をクロスさせて位置に影響をあたえるためには、flex-alignを使うことが可能です。

## アイテムのセンタリング

    <div class="flexbox">
      <p>I should be centered</p>
    </div>

    .flexbox {
      display: -webkit-flexbox;
      -webkit-flex-pack: center;
      -webkit-flex-align: center;
      width: 50%;
      height: 100px;
      background: orange;
    }

    .flexbox p {
      border: 1px solid green;
      padding: 5px;
    }

困惑したら[ライブデモ](http://jsbin.com/upumiw/edit#html,live)でチェックしてみて下さい。

## 参考文献

- [flexiejs](http://flexiejs.com/)はフレックスボックスの機能をクロスブラウザ対応にします。
- [Modernizr](http://modernizr.com/)は[フレックスボックスがサポート](http://modernizr.com/docs/#flexbox)されているかをチェックすることができます。
- [html5rocks](http://www.html5rocks.com/)には[フレックスボックスのチュートリアル](http://www.html5rocks.com/en/tutorials/flexbox/quick/)があります。
- Alex Russell, who works on Google Chrome, has an interesting set of CSS classes for using flexbox.
- inserthtmlにはフレックスボックスの仕様に関する興味深い[チュートリアル](http://www.inserthtml.com/2012/05/css3-flex-box-specification-change-layout-design/)があります。
- [Stunning CSS3](http://www.stunningcss3.com/code/index.html)という本にはフレックスボックスの章があります。

読んで頂いてありがとうございます。そしてベンダープリフィックスをフレックスボックスモジュールをサポートしているブラウザの一覧を[caniuse.com](http://caniuse.com/flexbox)で確認してみて下さい。
