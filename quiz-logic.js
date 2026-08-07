/* ==============================================
   IT スキルアップクイズ - ロジック
   1000問(5カテゴリ×200問)からランダムに100問を出題
   各問題に解説文付き
============================================== */

/* ---- 要素取得 ---- */
const startScreen = document.getElementById(`start-screen`);
const quizScreen = document.getElementById(`quiz-screen`);
const resultScreen = document.getElementById(`result-screen`);

const startBtn = document.getElementById(`start-btn`);
const restartBtn = document.getElementById(`restart-btn`);
const resultText = document.getElementById(`result-text`);
const resultSubtext = document.getElementById(`result-subtext`);
const questionText = document.getElementById(`question-text`);
const progressLabel = document.getElementById(`progress-label`);
const progressFill = document.getElementById(`progress-fill`);
const categoryBadge = document.getElementById(`category-badge`);
const scoreBadge = document.getElementById(`score-badge`);
const answersContainer = document.getElementById(`answers`);
const explanationBox = document.getElementById(`explanation-box`);
const explanationText = document.getElementById(`explanation-text`);
const nextBtn = document.getElementById(`next-btn`);
const categoryButtons = document.querySelectorAll(`.category-btn`);
const progressSummaryValue = document.getElementById(`progress-summary-value`);
const progressSummaryFill = document.getElementById(`progress-summary-fill`);
const reviewBtn = document.getElementById(`review-btn`);
const historyList = document.getElementById(`history-list`);
const shareX = document.getElementById(`share-x`);
const shareLine = document.getElementById(`share-line`);
const resumeBanner = document.getElementById(`resume-banner`);
const resumeBannerDetail = document.getElementById(`resume-banner-detail`);
const resumeBtn = document.getElementById(`resume-btn`);
const discardResumeBtn = document.getElementById(`discard-resume-btn`);
const pauseBtn = document.getElementById(`pause-btn`);

/* ---- 問題データ(全1000問・5カテゴリ×200問・解説文付き) ---- */
const categories = [
  {
    name: "HTML & CSS",
    color: "#3D5AFE",
    questions: [
    {"question":"HTML文書の先頭に書く宣言は?","choices":["<!DOCTYPE html>","<html-type>","<!HTML5>","<meta html>"],"answer":0,"explanation":"ブラウザにHTML5文書であることを伝える宣言です。"},
    {"question":"HTML文書全体を囲む最上位のタグは?","choices":["<html>","<body>","<head>","<doc>"],"answer":0,"explanation":"文書全体を<head>と<body>を含めて包む要素です。"},
    {"question":"ページのメタ情報を記述する場所は?","choices":["<head>","<body>","<meta-info>","<info>"],"answer":0,"explanation":"文字コードやタイトルなど画面に表示されない情報を書く場所です。"},
    {"question":"ページの表示内容を記述する場所は?","choices":["<body>","<head>","<content>","<main-body>"],"answer":0,"explanation":"実際にブラウザ画面に表示される内容を書く場所です。"},
    {"question":"ブラウザのタブに表示されるタイトルを指定するタグは?","choices":["<title>","<head-title>","<caption>","<name>"],"answer":0,"explanation":"<head>内に記述し、タブやブックマークの名称になります。"},
    {"question":"文字コードを指定するmetaタグの書き方は?","choices":["<meta charset=\"UTF-8\">","<meta encode=\"UTF-8\">","<meta lang=\"UTF-8\">","<meta code=\"UTF-8\">"],"answer":0,"explanation":"charset属性でUTF-8などの文字コードを宣言します。"},
    {"question":"外部CSSファイルを読み込むタグは?","choices":["<link>","<style>","<css>","<import>"],"answer":0,"explanation":"rel=\"stylesheet\"と組み合わせて使う自己終了タグです。"},
    {"question":"外部JavaScriptファイルを読み込むタグは?","choices":["<script>","<js>","<code>","<link>"],"answer":0,"explanation":"src属性でファイルパスを指定します。"},
    {"question":"見出しの中で最も重要度が低いタグは?","choices":["<h6>","<h1>","<h0>","<hsmall>"],"answer":0,"explanation":"h1〜h6のうち数字が大きいほど重要度は下がります。"},
    {"question":"段落を表すタグは?","choices":["<p>","<para>","<text>","<line>"],"answer":0,"explanation":"文章のまとまりを表すブロックレベル要素です。"},
    {"question":"リンクを作成するタグは?","choices":["<a>","<link>","<href>","<url>"],"answer":0,"explanation":"href属性でリンク先を指定します。"},
    {"question":"画像を表示するタグは?","choices":["<img>","<picture-src>","<image>","<src>"],"answer":0,"explanation":"src属性で画像パス、alt属性で代替テキストを指定します。"},
    {"question":"順序なしリストを作るタグは?","choices":["<ul>","<ol>","<list>","<dl>"],"answer":0,"explanation":"箇条書き(・)のリストを作ります。"},
    {"question":"順序ありリストを作るタグは?","choices":["<ol>","<ul>","<list-num>","<dl>"],"answer":0,"explanation":"番号付きのリストを作ります。"},
    {"question":"リストの各項目を表すタグは?","choices":["<li>","<item>","<row>","<li-item>"],"answer":0,"explanation":"ul/olの中で使う項目タグです。"},
    {"question":"表全体を囲むタグは?","choices":["<table>","<tab>","<grid>","<data-table>"],"answer":0,"explanation":"表(テーブル)全体を囲む親要素です。"},
    {"question":"表の1行を表すタグは?","choices":["<tr>","<td>","<th>","<row>"],"answer":0,"explanation":"table rowの略で、1行分のセルをまとめます。"},
    {"question":"表のデータセルを表すタグは?","choices":["<td>","<tr>","<th>","<cell>"],"answer":0,"explanation":"table dataの略で、通常の数値・文字データを入れます。"},
    {"question":"表の見出しセルを表すタグは?","choices":["<th>","<td>","<tr>","<head>"],"answer":0,"explanation":"table headerの略で、見出しセルを太字中央寄せで表示します。"},
    {"question":"フォーム全体を囲むタグは?","choices":["<form>","<input-group>","<fieldset>","<field>"],"answer":0,"explanation":"action属性やmethod属性を持つ入力フォームの親要素です。"},
    {"question":"1行のテキスト入力欄を作るタグは?","choices":["<input>","<textarea>","<field>","<text>"],"answer":0,"explanation":"type属性で入力の種類を切り替えられます。"},
    {"question":"複数行のテキスト入力欄を作るタグは?","choices":["<textarea>","<input>","<multitext>","<textbox>"],"answer":0,"explanation":"複数行の自由記述欄を作ります。"},
    {"question":"フォームの送信ボタンなどを作るタグは?","choices":["<button>","<submit>","<action>","<click>"],"answer":0,"explanation":"type属性でsubmit/resetなどの動作を指定できます。"},
    {"question":"プルダウンメニューを作るタグは?","choices":["<select>","<dropdown>","<option-list>","<menu>"],"answer":0,"explanation":"内部にoptionタグを複数配置します。"},
    {"question":"select要素の中で選択肢を表すタグは?","choices":["<option>","<item>","<select-item>","<choice>"],"answer":0,"explanation":"value属性で送信される値を指定します。"},
    {"question":"入力欄に説明を付けるためのタグは?","choices":["<label>","<caption>","<title>","<desc>"],"answer":0,"explanation":"for属性でinputのidと紐付けます。"},
    {"question":"ページ上部の共通ヘッダー領域を表す意味的タグは?","choices":["<header>","<head>","<top>","<banner>"],"answer":0,"explanation":"サイトロゴやナビゲーションを配置する領域です。"},
    {"question":"ページ下部の共通フッター領域を表す意味的タグは?","choices":["<footer>","<bottom>","<foot>","<end>"],"answer":0,"explanation":"著作権表示や連絡先などを配置する領域です。"},
    {"question":"サイト内のナビゲーション部分を表すタグは?","choices":["<nav>","<menu>","<navigation>","<links>"],"answer":0,"explanation":"主要なリンク集をまとめる意味的タグです。"},
    {"question":"ページの主要コンテンツを表すタグは?","choices":["<main>","<content>","<body-main>","<core>"],"answer":0,"explanation":"1ページに1つだけ使うことが推奨される要素です。"},
    {"question":"独立した内容のまとまりを表すタグは?","choices":["<article>","<section>","<block>","<content>"],"answer":0,"explanation":"単独で配信・再利用できるコンテンツに使います。"},
    {"question":"文書内の一区切りを表す汎用的な意味的タグは?","choices":["<section>","<article>","<div>","<part>"],"answer":0,"explanation":"見出しを伴う一区切りのセクションに使います。"},
    {"question":"本文とは別に補足的な情報を表すタグは?","choices":["<aside>","<note>","<sub>","<extra>"],"answer":0,"explanation":"サイドバーや余談的な内容に使います。"},
    {"question":"画像や図とキャプションをまとめるタグは?","choices":["<figure>","<image-box>","<picture>","<gallery>"],"answer":0,"explanation":"図表とその説明文をセットで扱います。"},
    {"question":"figure要素内でキャプションを表すタグは?","choices":["<figcaption>","<caption>","<figtitle>","<desc>"],"answer":0,"explanation":"figure要素の中で使うキャプション専用タグです。"},
    {"question":"動画を再生するタグは?","choices":["<video>","<movie>","<media>","<play>"],"answer":0,"explanation":"controls属性で再生コントロールを表示できます。"},
    {"question":"音声を再生するタグは?","choices":["<audio>","<sound>","<music>","<voice>"],"answer":0,"explanation":"音声ファイルを再生するための要素です。"},
    {"question":"video/audio要素に複数のファイル形式を指定するタグは?","choices":["<source>","<track>","<media-src>","<file>"],"answer":0,"explanation":"複数の候補ファイルをブラウザに提示できます。"},
    {"question":"他のHTML文書を埋め込むタグは?","choices":["<iframe>","<embed-page>","<frame>","<include>"],"answer":0,"explanation":"別ページを現在のページ内に表示します。"},
    {"question":"JavaScriptで自由に描画できる図形領域を作るタグは?","choices":["<canvas>","<draw>","<svg-box>","<graphic>"],"answer":0,"explanation":"JavaScriptから座標を指定して描画するための領域です。"},
    {"question":"ベクター画像を直接記述できるタグは?","choices":["<svg>","<vector>","<canvas>","<image-vec>"],"answer":0,"explanation":"拡大しても劣化しないベクター画像を記述します。"},
    {"question":"画面サイズに応じて画像を出し分けるタグは?","choices":["<picture>","<img-set>","<responsive-img>","<source-img>"],"answer":0,"explanation":"source要素と組み合わせて複数画像を切り替えます。"},
    {"question":"クリックで開閉できる折りたたみUIを作るタグは?","choices":["<details>","<toggle>","<accordion>","<collapse>"],"answer":0,"explanation":"open属性で開閉状態を制御できます。"},
    {"question":"details要素の見出し部分を表すタグは?","choices":["<summary>","<title>","<header>","<label>"],"answer":0,"explanation":"クリックすると開閉するタイトル部分です。"},
    {"question":"モーダルダイアログを表す標準タグは?","choices":["<dialog>","<modal>","<popup>","<alert-box>"],"answer":0,"explanation":"showModal()等のJSメソッドで表示制御します。"},
    {"question":"作業の進捗を視覚的に表すタグは?","choices":["<progress>","<meter>","<bar>","<loading>"],"answer":0,"explanation":"value属性とmax属性で進捗割合を表します。"},
    {"question":"一定範囲内の値を表すタグは?","choices":["<meter>","<progress>","<range>","<gauge>"],"answer":0,"explanation":"min/max/optimumなどで範囲内の値を視覚化します。"},
    {"question":"日時を機械可読な形式で表すタグは?","choices":["<time>","<date>","<datetime>","<clock>"],"answer":0,"explanation":"datetime属性で機械が解釈できる日時形式を付与します。"},
    {"question":"テキストをハイライト表示するタグは?","choices":["<mark>","<highlight>","<em>","<strong>"],"answer":0,"explanation":"検索結果の強調などに使われます。"},
    {"question":"注釈的で重要度の低い文章を表すタグは?","choices":["<small>","<sub>","<footnote>","<minor>"],"answer":0,"explanation":"免責事項や著作権表記などに使われます。"},
    {"question":"意味的に強い重要性を持たせるタグは?","choices":["<strong>","<b>","<em>","<important>"],"answer":0,"explanation":"重要な警告などに使う意味的な強調タグです。"},
    {"question":"文章に強調(アクセント)を付けるタグは?","choices":["<em>","<i>","<strong>","<mark>"],"answer":0,"explanation":"斜体表示になりますが意味的な強調を表します。"},
    {"question":"改行を挿入するタグは?","choices":["<br>","<newline>","<lb>","<nl>"],"answer":0,"explanation":"終了タグを持たない自己終了型のタグです。"},
    {"question":"水平線を挿入するタグは?","choices":["<hr>","<line>","<divider>","<hline>"],"answer":0,"explanation":"話題の区切りを視覚的に示します。"},
    {"question":"長い引用文を表すタグは?","choices":["<blockquote>","<quote>","<cite>","<q>"],"answer":0,"explanation":"ブロックとして表示される長文の引用に使います。"},
    {"question":"短いインライン引用を表すタグは?","choices":["<q>","<blockquote>","<cite>","<quote>"],"answer":0,"explanation":"文中に埋め込む短い引用に使います。"},
    {"question":"作品名などの出典を表すタグは?","choices":["<cite>","<q>","<source>","<ref>"],"answer":0,"explanation":"書籍名や作品タイトルなどの出典を示します。"},
    {"question":"プログラムのソースコードを表すタグは?","choices":["<code>","<pre>","<script-text>","<src>"],"answer":0,"explanation":"コードの一部であることを意味的に示します。"},
    {"question":"空白や改行をそのまま表示する整形済みテキストのタグは?","choices":["<pre>","<code>","<raw>","<plain>"],"answer":0,"explanation":"スペースや改行が入力通りに表示されます。"},
    {"question":"略語や頭字語を表すタグは?","choices":["<abbr>","<acronym-new>","<short>","<abbrev>"],"answer":0,"explanation":"title属性で正式名称を補足できます。"},
    {"question":"連絡先情報をまとめるタグは?","choices":["<address>","<contact>","<info>","<footer-info>"],"answer":0,"explanation":"執筆者や連絡先情報を意味的に示します。"},
    {"question":"機械可読な値を人間可読な表現と併記するタグは?","choices":["<data>","<value>","<meta-data>","<span-data>"],"answer":0,"explanation":"value属性に機械向けの値を持たせます。"},
    {"question":"描画されないテンプレート内容を保持するタグは?","choices":["<template>","<hidden>","<draft>","<placeholder>"],"answer":0,"explanation":"JavaScriptから複製して使うひな形を保持します。"},
    {"question":"Web Componentsで差し込み位置を指定するタグは?","choices":["<slot>","<insert>","<placeholder>","<gap>"],"answer":0,"explanation":"カスタム要素内でコンテンツの差し込み場所を定義します。"},
    {"question":"JavaScript無効時に表示する内容を指定するタグは?","choices":["<noscript>","<fallback>","<no-js>","<alt-script>"],"answer":0,"explanation":"JavaScriptが無効な環境向けの代替表示に使います。"},
    {"question":"特定の要素をグローバルに一意識別する属性は?","choices":["id","class","name","key"],"answer":0,"explanation":"同じページ内で重複してはいけない識別子です。"},
    {"question":"CSSやJSから複数要素をまとめて指定するための属性は?","choices":["class","id","group","tag"],"answer":0,"explanation":"同じクラス名を複数要素に付けて共通指定できます。"},
    {"question":"要素に直接CSSを書き込む属性は?","choices":["style","css","design","format"],"answer":0,"explanation":"インラインスタイルとしてその場でCSSを指定します。"},
    {"question":"aタグでリンク先を指定する属性は?","choices":["href","src","link","url"],"answer":0,"explanation":"リンク先URLを指定する属性です。"},
    {"question":"imgタグで画像の代替テキストを指定する属性は?","choices":["alt","title","text","caption"],"answer":0,"explanation":"画像が表示できない場合や読み上げ時に使われます。"},
    {"question":"画像や部品の読み込み元を指定する属性は?","choices":["src","href","path","link"],"answer":0,"explanation":"ファイルの取得元パスを指定します。"},
    {"question":"リンクを新しいタブで開くtarget属性の値は?","choices":["_blank","_new","_top","_window"],"answer":0,"explanation":"現在のタブとは別の新しいタブ・ウィンドウで開きます。"},
    {"question":"input要素の入力種別を指定する属性は?","choices":["type","kind","input-type","mode"],"answer":0,"explanation":"text、email、numberなど入力の種類を指定します。"},
    {"question":"フォーム部品の名前(送信キー)を指定する属性は?","choices":["name","id","key","label"],"answer":0,"explanation":"サーバーに送信される際のキー名になります。"},
    {"question":"入力欄にヒントを薄く表示する属性は?","choices":["placeholder","hint","default","example"],"answer":0,"explanation":"入力前に薄いグレーで例を表示します。"},
    {"question":"入力を必須にする属性は?","choices":["required","must","mandatory","need"],"answer":0,"explanation":"未入力のまま送信しようとするとエラーになります。"},
    {"question":"入力欄を操作不可にする属性は?","choices":["disabled","readonly","locked","inactive"],"answer":0,"explanation":"操作も送信もされない無効状態にします。"},
    {"question":"チェックボックスやラジオボタンを選択済みにする属性は?","choices":["checked","selected","active","on"],"answer":0,"explanation":"初期状態でチェック済みにする属性です。"},
    {"question":"画面表示時に自動でフォーカスを当てる属性は?","choices":["autofocus","focus","autostart","onload-focus"],"answer":0,"explanation":"ページ読み込み時に自動でカーソルが入ります。"},
    {"question":"要素の文書言語を指定する属性は?","choices":["lang","language","locale","dir"],"answer":0,"explanation":"スクリーンリーダーや翻訳ツールの判定に使われます。"},
    {"question":"文字の方向(右から左など)を指定する属性は?","choices":["dir","direction","align","flow"],"answer":0,"explanation":"アラビア語など右から左に書く言語に使います。"},
    {"question":"任意の独自データを要素に付与する属性の接頭辞は?","choices":["data-","custom-","user-","meta-"],"answer":0,"explanation":"JavaScriptから独自のデータを取得する際に使います。"},
    {"question":"アクセシビリティ情報を付与する属性の接頭辞は?","choices":["aria-","access-","a11y-","role-"],"answer":0,"explanation":"スクリーンリーダー向けの補助情報を付与します。"},
    {"question":"要素を要素を非表示にするグローバル属性は?","choices":["hidden","display-none","invisible","collapse"],"answer":0,"explanation":"どのHTML要素にも使える汎用的な非表示属性です。"},
    {"question":"キーボードでのフォーカス順序を制御する属性は?","choices":["tabindex","focus-order","keyorder","tabstop"],"answer":0,"explanation":"Tabキーでの移動順序を制御できます。"},
    {"question":"すべての要素を対象にするCSSセレクタは?","choices":["*","#all",".all","%"],"answer":0,"explanation":"ページ内のすべての要素に一致します。"},
    {"question":"クラス名を指定するCSSセレクタの記号は?","choices":[".","#","@","&"],"answer":0,"explanation":"class属性の値の前に付けて指定します。"},
    {"question":"ID名を指定するCSSセレクタの記号は?","choices":["#",".","*","$"],"answer":0,"explanation":"id属性の値の前に付けて指定します。"},
    {"question":"特定の属性を持つ要素を選ぶセレクタの書き方は?","choices":["[属性名]","(属性名)","{属性名}","<属性名>"],"answer":0,"explanation":"角括弧で属性名や属性値を指定します。"},
    {"question":"ある要素の直下の子要素だけを選ぶ結合子は?","choices":[">","+","~"," "],"answer":0,"explanation":"孫要素には適用されない直下限定の指定です。"},
    {"question":"直後の兄弟要素だけを選ぶ結合子は?","choices":["+",">","~","-"],"answer":0,"explanation":"同じ親を持つ直後の1つの要素だけに一致します。"},
    {"question":"以降のすべての兄弟要素を選ぶ結合子は?","choices":["~","+",">","="],"answer":0,"explanation":"同じ親を持つ後続のすべての兄弟に一致します。"},
    {"question":"マウスが乗った状態のスタイルを指定する疑似クラスは?","choices":[":hover",":active",":focus",":visited"],"answer":0,"explanation":"マウスカーソルが要素上にある間だけ適用されます。"},
    {"question":"クリックされている瞬間のスタイルを指定する疑似クラスは?","choices":[":active",":hover",":focus",":checked"],"answer":0,"explanation":"ボタンなどを押し込んでいる瞬間に適用されます。"},
    {"question":"フォーム部品にフォーカスがある時のスタイルを指定する疑似クラスは?","choices":[":focus",":hover",":active",":target"],"answer":0,"explanation":"入力欄が選択されている間だけ適用されます。"},
    {"question":"n番目の子要素を指定する疑似クラスは?","choices":[":nth-child()",":child()",":index()",":at()"],"answer":0,"explanation":"数式や数値で位置を指定できます。"},
    {"question":"最初の子要素を指定する疑似クラスは?","choices":[":first-child",":first",":start",":first-of()"],"answer":0,"explanation":"親要素内で最初の子要素にのみ一致します。"},
    {"question":"最後の子要素を指定する疑似クラスは?","choices":[":last-child",":last",":end",":final"],"answer":0,"explanation":"親要素内で最後の子要素にのみ一致します。"},
    {"question":"チェック済みの状態を指定する疑似クラスは?","choices":[":checked",":selected",":active",":on"],"answer":0,"explanation":"チェックボックスやラジオボタンの選択状態に適用されます。"},
    {"question":"特定条件に一致しない要素を選ぶ疑似クラスは?","choices":[":not()",":except()",":exclude()",":skip()"],"answer":0,"explanation":"括弧内のセレクタに一致しない要素を選びます。"},
    {"question":"要素の直前に仮想的な内容を挿入する疑似要素は?","choices":["::before","::after","::pre","::first-line"],"answer":0,"explanation":"contentプロパティと組み合わせて使う疑似要素です。"},
    {"question":"要素の直後に仮想的な内容を挿入する疑似要素は?","choices":["::after","::before","::post","::last-line"],"answer":0,"explanation":"要素の内容の後ろに仮想的な要素を追加します。"},
    {"question":"テキストの最初の1文字を指定する疑似要素は?","choices":["::first-letter","::first-char","::initial","::first-line"],"answer":0,"explanation":"段落の先頭文字だけを装飾する際に使います。"},
    {"question":"要素の外側の余白を指定するプロパティは?","choices":["margin","padding","border","gap"],"answer":0,"explanation":"隣接する要素との間隔を作ります。"},
    {"question":"要素の内側の余白を指定するプロパティは?","choices":["padding","margin","spacing","inset"],"answer":0,"explanation":"枠線と内容の間の余白を作ります。"},
    {"question":"要素の枠線を指定するプロパティは?","choices":["border","outline","frame","edge"],"answer":0,"explanation":"太さ・線種・色をまとめて指定できます。"},
    {"question":"枠線の外側に描かれる線を指定するプロパティは?","choices":["outline","border","shadow","ring"],"answer":0,"explanation":"レイアウトの幅に影響を与えない装飾線です。"},
    {"question":"要素の幅を指定するプロパティは?","choices":["width","size-x","length","horizontal"],"answer":0,"explanation":"要素の横方向のサイズを指定します。"},
    {"question":"要素の高さを指定するプロパティは?","choices":["height","size-y","vertical","depth"],"answer":0,"explanation":"要素の縦方向のサイズを指定します。"},
    {"question":"paddingとborderをwidthに含める指定は?","choices":["box-sizing: border-box","box-sizing: content-box","box-model: full","width-mode: strict"],"answer":0,"explanation":"widthに指定した値の中にpadding/borderが収まります。"},
    {"question":"要素に影を付けるプロパティは?","choices":["box-shadow","drop-shadow","shadow","text-shadow"],"answer":0,"explanation":"ぼかしや色を指定してドロップシャドウを作れます。"},
    {"question":"要素の表示形式をブロック・インライン等で切り替えるプロパティは?","choices":["display","position","visibility","float"],"answer":0,"explanation":"要素のレイアウト上の振る舞いを決めます。"},
    {"question":"要素を画面上の特定位置に固定して常に表示する position 値は?","choices":["fixed","absolute","relative","static"],"answer":0,"explanation":"スクロールしても画面上の同じ位置に留まります。"},
    {"question":"親要素を基準に配置する position 値は?","choices":["absolute","fixed","static","sticky"],"answer":0,"explanation":"position: relativeの親要素を基準に配置されます。"},
    {"question":"スクロールに応じて固定/追従が切り替わる position 値は?","choices":["sticky","fixed","absolute","relative"],"answer":0,"explanation":"指定した位置まではrelative、それ以降はfixedのように振る舞います。"},
    {"question":"要素を横に回り込ませるプロパティは?","choices":["float","position","display","align"],"answer":0,"explanation":"画像にテキストを回り込ませる際などに使われます。"},
    {"question":"floatの回り込みを解除するプロパティは?","choices":["clear","float: none","reset","unfloat"],"answer":0,"explanation":"回り込みによる崩れを防ぐために使います。"},
    {"question":"重なった要素の前後関係を指定するプロパティは?","choices":["z-index","layer","order","depth"],"answer":0,"explanation":"数値が大きいほど手前に表示されます。"},
    {"question":"はみ出た内容の表示方法を指定するプロパティは?","choices":["overflow","clip","display","resize"],"answer":0,"explanation":"hiddenやscrollなどの値で制御します。"},
    {"question":"要素を柔軟な横並び・縦並びレイアウトにするdisplay値は?","choices":["flex","grid","block","table"],"answer":0,"explanation":"子要素を柔軟に並べる1次元レイアウトです。"},
    {"question":"Flexboxで主軸の方向を指定するプロパティは?","choices":["flex-direction","flex-align","flex-flow-only","flex-order"],"answer":0,"explanation":"row(横並び)かcolumn(縦並び)かを指定します。"},
    {"question":"Flexboxで主軸方向の揃え方を指定するプロパティは?","choices":["justify-content","align-items","align-content","flex-align"],"answer":0,"explanation":"主軸方向の余白や配置を制御します。"},
    {"question":"Flexboxで交差軸方向の揃え方を指定するプロパティは?","choices":["align-items","justify-content","justify-items","flex-align"],"answer":0,"explanation":"主軸と垂直な方向の配置を制御します。"},
    {"question":"Flexboxで折り返しの有無を指定するプロパティは?","choices":["flex-wrap","flex-direction","flex-flow","wrap-content"],"answer":0,"explanation":"収まらない場合に折り返すかどうかを指定します。"},
    {"question":"Flex子要素の伸びやすさを指定するプロパティは?","choices":["flex-grow","flex-shrink","flex-basis","flex-size"],"answer":0,"explanation":"余った余白をどれだけ引き受けるか指定します。"},
    {"question":"Flex子要素の縮みやすさを指定するプロパティは?","choices":["flex-shrink","flex-grow","flex-basis","flex-min"],"answer":0,"explanation":"領域が足りない時にどれだけ縮むか指定します。"},
    {"question":"要素間の間隔を一括指定できるプロパティは?","choices":["gap","spacing","margin-between","space"],"answer":0,"explanation":"flex/gridのアイテム間の隙間を指定します。"},
    {"question":"二次元のグリッドレイアウトを作るdisplay値は?","choices":["grid","flex","table","columns"],"answer":0,"explanation":"行と列の両方を扱える2次元レイアウトです。"},
    {"question":"グリッドの列構成を指定するプロパティは?","choices":["grid-template-columns","grid-columns","grid-cols","columns"],"answer":0,"explanation":"列の数や幅を定義します。"},
    {"question":"グリッドの行構成を指定するプロパティは?","choices":["grid-template-rows","grid-rows","grid-row-set","rows"],"answer":0,"explanation":"行の数や高さを定義します。"},
    {"question":"使用するフォントの種類を指定するプロパティは?","choices":["font-family","font-type","font-name","typeface"],"answer":0,"explanation":"複数のフォント候補をカンマ区切りで指定できます。"},
    {"question":"文字の太さを指定するプロパティは?","choices":["font-weight","font-bold","text-weight","weight"],"answer":0,"explanation":"数値(400や700など)やboldで指定します。"},
    {"question":"文字を斜体にするプロパティは?","choices":["font-style","text-style","italic","font-slant"],"answer":0,"explanation":"italicやobliqueの値で斜体にします。"},
    {"question":"行の高さを指定するプロパティは?","choices":["line-height","row-height","text-height","leading"],"answer":0,"explanation":"行間の広さを調整します。"},
    {"question":"文字間隔を指定するプロパティは?","choices":["letter-spacing","char-spacing","text-spacing","kerning"],"answer":0,"explanation":"文字と文字の間隔を調整します。"},
    {"question":"テキストの水平方向の配置を指定するプロパティは?","choices":["text-align","align-text","text-position","horizontal-align"],"answer":0,"explanation":"left/center/right/justifyなどを指定します。"},
    {"question":"下線や取り消し線を指定するプロパティは?","choices":["text-decoration","text-style","text-line","decoration"],"answer":0,"explanation":"underlineやline-throughなどの装飾線を指定します。"},
    {"question":"文字を大文字/小文字に変換するプロパティは?","choices":["text-transform","text-case","case","font-case"],"answer":0,"explanation":"見た目上の表示だけを変換し元の文字列は変わりません。"},
    {"question":"長いテキストを省略記号で切り詰めるプロパティは?","choices":["text-overflow","text-clip","overflow-text","truncate"],"answer":0,"explanation":"overflow:hiddenとの併用が必要です。"},
    {"question":"テキストの折り返しを禁止するwhite-spaceの値は?","choices":["nowrap","pre","normal","no-break"],"answer":0,"explanation":"1行に収まらなくても改行されません。"},
    {"question":"文字色を指定するプロパティは?","choices":["color","text-color","font-color","ink"],"answer":0,"explanation":"テキストの色を指定します。"},
    {"question":"背景色を指定するプロパティは?","choices":["background-color","bg-color","back-color","fill"],"answer":0,"explanation":"要素の背景の塗りつぶし色を指定します。"},
    {"question":"背景画像を指定するプロパティは?","choices":["background-image","background-src","bg-img","image"],"answer":0,"explanation":"url()関数で画像パスを指定します。"},
    {"question":"要素全体の不透明度を指定するプロパティは?","choices":["opacity","alpha","transparency","visible-level"],"answer":0,"explanation":"0が完全透明、1が完全不透明です。"},
    {"question":"赤緑青と透明度を指定できるカラー関数は?","choices":["rgba()","hsl()","rgb-a()","colorAlpha()"],"answer":0,"explanation":"4つ目の引数で透明度(アルファ値)を指定できます。"},
    {"question":"色相・彩度・明度で色を指定する関数は?","choices":["hsl()","rgba()","rgb()","hsv()"],"answer":0,"explanation":"直感的に色味や明るさを調整しやすい指定方法です。"},
    {"question":"状態変化を滑らかにするCSSプロパティは?","choices":["transition","animation","smooth","ease"],"answer":0,"explanation":"hover等の状態変化にアニメーション効果を付けます。"},
    {"question":"キーフレームを使った本格的なアニメーションを定義するルールは?","choices":["@keyframes","@animation","@transition","@motion"],"answer":0,"explanation":"0%から100%まで細かく状態を指定できます。"},
    {"question":"要素を回転・拡大縮小・移動させるプロパティは?","choices":["transform","transition","position-change","move"],"answer":0,"explanation":"レイアウトに影響を与えずに視覚的な変形ができます。"},
    {"question":"親要素のフォントサイズを基準にする相対単位は?","choices":["em","rem","px","vw"],"answer":0,"explanation":"親要素の文字サイズを基準とした相対値です。"},
    {"question":"ルート要素のフォントサイズを基準にする相対単位は?","choices":["rem","em","%","vh"],"answer":0,"explanation":"html要素の文字サイズを基準とするため管理しやすい単位です。"},
    {"question":"画面幅に対する割合を表す単位は?","choices":["vw","vh","em","rem"],"answer":0,"explanation":"ビューポート幅の1%を1単位とします。"},
    {"question":"画面高さに対する割合を表す単位は?","choices":["vh","vw","em","%"],"answer":0,"explanation":"ビューポート高さの1%を1単位とします。"},
    {"question":"画面サイズごとにスタイルを切り替えるCSSの仕組みは?","choices":["メディアクエリ","レスポンシブタグ","ビューポートAPI","画面判定関数"],"answer":0,"explanation":"画面幅などの条件に応じて異なるCSSを適用します。"},
    {"question":"メディアクエリを記述するルールは?","choices":["@media","@screen","@responsive","@viewport"],"answer":0,"explanation":"条件式と適用したいCSSをまとめて記述します。"},
    {"question":"小さい画面のスタイルを基本に設計する考え方は?","choices":["モバイルファースト","デスクトップファースト","タブレット優先","固定レイアウト"],"answer":0,"explanation":"スマホ向けを基本とし大画面向けに拡張していく考え方です。"},
    {"question":"画面サイズに応じて異なる画像を読み込むimg属性は?","choices":["srcset","sizes-only","responsive-src","media-src"],"answer":0,"explanation":"複数の解像度の画像候補を指定できます。"},
    {"question":"画像に代替テキストを付ける主な目的は?","choices":["スクリーンリーダー等でのアクセシビリティ向上","画像の読み込み速度向上","SEO以外への効果はない","ブラウザの互換性確保のみ"],"answer":0,"explanation":"画像が見えない環境でも内容を伝えられます。"},
    {"question":"キーボード操作時のフォーカス表示に使う疑似クラスは?","choices":[":focus-visible",":focus-only",":keyboard",":tab-focus"],"answer":0,"explanation":"マウス操作では表示せずキーボード操作時のみ表示します。"},
    {"question":"OSのダークモード設定を検知するメディア特性は?","choices":["prefers-color-scheme","prefers-dark","color-mode","dark-mode"],"answer":0,"explanation":"OS側の設定に応じてCSSを切り替えられます。"},
    {"question":"アニメーションを減らす設定を検知するメディア特性は?","choices":["prefers-reduced-motion","reduce-animation","motion-safe","no-motion"],"answer":0,"explanation":"動きに敏感な利用者への配慮に使われます。"},
    {"question":"スクリーンリーダー向けに要素の役割を明示する仕組みは?","choices":["ARIAロール","altタグ","titleタグ","labelタグのみ"],"answer":0,"explanation":"role属性などで要素の役割を明示的に伝えます。"},
    {"question":"文字色と背景色の見やすさの基準を示す指標は?","choices":["コントラスト比","彩度比","解像度比","明度差のみ"],"answer":0,"explanation":"数値が大きいほど視認性が高いとされます。"},
    {"question":"同じCSSプロパティが競合した際、優先度を決める仕組みは?","choices":["詳細度(スペシフィシティ)","記述順序のみ","ファイルサイズ","アルファベット順"],"answer":0,"explanation":"セレクタの種類や数によって優先度が決まります。"},
    {"question":"他のスタイルより強制的に優先させる宣言は?","choices":["!important","!force","!priority","!override"],"answer":0,"explanation":"詳細度を無視して最優先で適用されます。"},
    {"question":"親要素のスタイルが子要素に伝わる仕組みは?","choices":["継承","カスケード","詳細度","オーバーライド"],"answer":0,"explanation":"colorやfont-familyなど一部プロパティで発生します。"},
    {"question":"ブラウザごとの初期スタイルの差をなくす手法は?","choices":["CSSリセット/ノーマライズ","ベンダープレフィックス","ポリフィル","トランスパイル"],"answer":0,"explanation":"ブラウザ標準のデフォルトスタイルを打ち消します。"},
    {"question":"クラス名の命名規則の一つ「Block Element Modifier」の略称は?","choices":["BEM","OOCSS","SMACSS","ITCSS"],"answer":0,"explanation":"Block__Element--Modifierの形式で命名します。"},
    {"question":"CSSで独自の変数を定義する記法は?","choices":["--カスタムプロパティ","$変数","@変数","%変数"],"answer":0,"explanation":"ハイフン2つで始まる名前で値を再利用できます。"},
    {"question":"CSSで数値計算を行う関数は?","choices":["calc()","math()","compute()","calcValue()"],"answer":0,"explanation":"異なる単位同士でも計算ができます。"},
    {"question":"複数の値の中から最小値を採用する関数は?","choices":["min()","max()","clamp()","least()"],"answer":0,"explanation":"指定した値のうち最も小さいものが適用されます。"},
    {"question":"最小値・基準値・最大値を1つで指定できる関数は?","choices":["clamp()","range()","limit()","between()"],"answer":0,"explanation":"レスポンシブなサイズ指定によく使われます。"},
    {"question":"ブラウザに描画の変更を事前通知して最適化するプロパティは?","choices":["will-change","optimize","pre-render","gpu-hint"],"answer":0,"explanation":"アニメーション対象を事前に伝え描画を最適化します。"},
    {"question":"要素へのクリック等のイベントを無視させるプロパティは?","choices":["pointer-events: none","display: none","user-select: none","disabled: true"],"answer":0,"explanation":"指定した要素へのマウス操作を素通りさせます。"},
    {"question":"マウスカーソルの形状を指定するプロパティは?","choices":["cursor","pointer","mouse-style","hover-icon"],"answer":0,"explanation":"pointerやnot-allowedなど様々な形状を指定できます。"},
    {"question":"テキストの選択をできなくするプロパティは?","choices":["user-select: none","select: off","text-select: false","no-select: true"],"answer":0,"explanation":"ドラッグによるテキスト選択を防ぎます。"},
    {"question":"要素の大きさをユーザーが変更できるようにするプロパティは?","choices":["resize","adjustable","scalable","flexible-size"],"answer":0,"explanation":"右下などにドラッグハンドルが表示されます。"},
    {"question":"要素の幅と高さの比率を保つCSSプロパティは?","choices":["aspect-ratio","ratio","size-ratio","proportion"],"answer":0,"explanation":"動画や画像の縦横比を保つ際によく使われます。"},
    {"question":"画面サイズではなく親要素のサイズに応じてスタイルを切り替える仕組みは?","choices":["コンテナクエリ","エレメントクエリ旧称のみ","親要素メディアクエリ","レイアウトクエリ"],"answer":0,"explanation":"コンポーネント単位でレスポンシブ対応できます。"},
    {"question":"囲み文字(引用符)を自動生成するCSS要素は?","choices":["quotes プロパティ","quote-mark プロパティ","text-quote プロパティ","content-quote プロパティ"],"answer":0,"explanation":"::beforeや::afterと組み合わせて引用符を挿入します。"},
    {"question":"リスト項目の記号(マーカー)を指定するプロパティは?","choices":["list-style","marker-style","bullet-style","item-style"],"answer":0,"explanation":"円・数字・非表示などマーカーの種類を指定します。"},
    {"question":"改ページ位置を制御するCSSプロパティ群の総称は?","choices":["break-before / break-after","page-split","print-break","column-break-only"],"answer":0,"explanation":"主に印刷時のページ区切りを制御します。"},
    {"question":"複数列レイアウトの列数を指定するプロパティは?","choices":["column-count","columns-number","col-count","multi-column"],"answer":0,"explanation":"新聞のような段組みレイアウトを作れます。"},
    {"question":"SVGの塗りつぶし色を指定するCSSプロパティは?","choices":["fill","color","background","svg-color"],"answer":0,"explanation":"SVG図形の内部の色を指定します。"},
    {"question":"SVGの線の色を指定するCSSプロパティは?","choices":["stroke","border","outline","line-color"],"answer":0,"explanation":"SVG図形の輪郭線の色を指定します。"},
    {"question":"要素にぼかし効果などを適用するCSSプロパティは?","choices":["filter","effect","blur-effect","visual-filter"],"answer":0,"explanation":"blur()やgrayscale()等の視覚効果を適用します。"},
    {"question":"背景要素にぼかしをかける効果でよく使われるプロパティは?","choices":["backdrop-filter","background-blur","blur-background","glass-effect"],"answer":0,"explanation":"すりガラスのような効果を作る際に使われます。"},
    {"question":"要素を等間隔にグリッド配置する際、行と列のどちらも自動調整する単位は?","choices":["fr","auto-unit","flex-unit","grid-unit"],"answer":0,"explanation":"残りのスペースを比率で分配する単位です。"},
    {"question":"Webフォントを読み込む際に使うCSSルールは?","choices":["@font-face","@import-font","@typeface","@web-font"],"answer":0,"explanation":"フォントファイルの場所とフォント名を紐付けます。"},
    {"question":"特定要素以外にスタイルを継承させない指定方法は?","choices":["all: unset","reset: true","inherit: none","style: clear"],"answer":0,"explanation":"指定した要素のすべてのプロパティを初期値に戻します。"},
    {"question":"疑似クラス :is() の主な利点は?","choices":["複数セレクタをまとめて簡潔に書ける","詳細度を必ず0にできる","アニメーションを高速化する","レイアウトを自動生成する"],"answer":0,"explanation":"似たセレクタを1つにまとめてコードを簡潔にできます。"},
    {"question":"input要素で数値専用の入力欄を作るtype属性値は?","choices":["number","numeric","int","digit"],"answer":0,"explanation":"数値の増減ボタンが表示されることがあります。"},
    {"question":"input要素で日付選択用の入力欄を作るtype属性値は?","choices":["date","calendar","datetime-local のみ","day"],"answer":0,"explanation":"ブラウザ標準のカレンダーUIが表示されます。"},
    {"question":"input要素でメールアドレス専用の入力欄を作るtype属性値は?","choices":["email","mail","address","text-mail"],"answer":0,"explanation":"簡易的な形式チェックが自動で行われます。"},
    {"question":"input要素でパスワード入力欄を作るtype属性値は?","choices":["password","secret","hidden-text","pass"],"answer":0,"explanation":"入力文字が伏字で表示されます。"},
    {"question":"フォーム部品をグループ化して枠で囲むタグは?","choices":["<fieldset>","<group>","<form-group>","<box>"],"answer":0,"explanation":"関連する入力項目を視覚的にまとめます。"},
    {"question":"fieldset要素の見出しを表すタグは?","choices":["<legend>","<caption>","<title>","<label>"],"answer":0,"explanation":"fieldsetの内容を説明する見出しになります。"},
    {"question":"画像圧縮に優れた次世代フォーマットの一つは?","choices":["WebP","BMP","TIFF","ICO"],"answer":0,"explanation":"従来形式より軽量でありながら高画質を保てます。"},
    {"question":"透過をサポートする代表的な画像フォーマットは?","choices":["PNG","JPEG","BMP","TIFF"],"answer":0,"explanation":"背景を透明にできるロスレス圧縮形式です。"},
    {"question":"写真のような多色画像に向く圧縮画像フォーマットは?","choices":["JPEG","PNG","GIF","SVG"],"answer":0,"explanation":"非可逆圧縮により高い圧縮率を実現します。"},
    ]
  },
  {
    name: "JavaScript / プログラミング",
    color: "#00B37E",
    questions: [
    {"question":"JavaScriptで再代入も再宣言もできない変数を宣言するキーワードは?","choices":["const","let","var","final"],"answer":0,"explanation":"再代入するとエラーになる定数宣言用のキーワードです。"},
    {"question":"JavaScriptでブロックスコープを持ち再代入可能な変数を宣言するキーワードは?","choices":["let","const","var","static"],"answer":0,"explanation":"var と違い{}の中だけで有効なスコープを持ちます。"},
    {"question":"巻き上げ(hoisting)の影響を受けやすい古い変数宣言キーワードは?","choices":["var","let","const","def"],"answer":0,"explanation":"関数スコープしか持たず巻き上げ時にundefinedで初期化されます。"},
    {"question":"文字列を表すJavaScriptのデータ型は?","choices":["string","text","char","str"],"answer":0,"explanation":"\"\"や''、``で囲んで表現する文字の並びです。"},
    {"question":"真偽値を表すJavaScriptのデータ型は?","choices":["boolean","bool","logic","flag"],"answer":0,"explanation":"trueまたはfalseの2値のみを取ります。"},
    {"question":"値が存在しないことを意図的に表すJavaScriptの値は?","choices":["null","undefined","NaN","void"],"answer":0,"explanation":"「値がないこと」を意図的に代入する際に使う値です。"},
    {"question":"変数が宣言されたが値が代入されていない状態を表す値は?","choices":["undefined","null","NaN","empty"],"answer":0,"explanation":"宣言のみで初期化されていない変数の既定値です。"},
    {"question":"数値でない計算結果を表すJavaScriptの特殊な値は?","choices":["NaN","undefined","null","Infinity"],"answer":0,"explanation":"0/0のような不正な計算結果に使われる特殊値です。"},
    {"question":"変数のデータ型を調べる演算子は?","choices":["typeof","instanceof","typeOf()","kindof"],"answer":0,"explanation":"\"string\"や\"number\"などの文字列を返します。"},
    {"question":"オブジェクトが特定のクラスのインスタンスか調べる演算子は?","choices":["instanceof","typeof","isInstance","classOf"],"answer":0,"explanation":"プロトタイプチェーンを辿って判定します。"},
    {"question":"型変換を行わずに値と型の両方を比較する演算子は?","choices":["===","==","=","!="],"answer":0,"explanation":"型が異なる場合は常にfalseを返します。"},
    {"question":"型変換を行った上で値を比較する演算子は?","choices":["==","===","!==","="],"answer":0,"explanation":"数値の\"1\"と文字列の\"1\"のような比較でtrueになります。"},
    {"question":"条件式を1行で書ける三項演算子の記号は?","choices":["? :","if-else()","=> :","? ->"],"answer":0,"explanation":"条件 ? 真の場合 : 偽の場合という形式で書きます。"},
    {"question":"左辺がnullまたはundefinedの時だけ右辺を返す演算子は?","choices":["??","||","&&","?."],"answer":0,"explanation":"OR演算子(||)と異なり0や\"\"では右辺を返しません。"},
    {"question":"プロパティがnull/undefinedでも安全にアクセスできる演算子は?","choices":["?.","??","!.","->"],"answer":0,"explanation":"undefinedやnullのプロパティアクセスでエラーを防ぎます。"},
    {"question":"配列やオブジェクトの中身を個別の変数に展開する記法は?","choices":["分割代入","スプレッド構文のみ","テンプレートリテラル","アロー構文"],"answer":0,"explanation":"変数名と対応する値を1行で取り出せます。"},
    {"question":"配列やオブジェクトを展開してコピー・結合する記法の記号は?","choices":["...","**","::","->"],"answer":0,"explanation":"配列やオブジェクトのコピーや結合にもよく使われます。"},
    {"question":"関数の残りの引数をまとめて配列で受け取る記法は?","choices":["残余引数(rest parameters)","可変長配列","オプション引数","デフォルト引数"],"answer":0,"explanation":"引数の数が不定な関数を作る際に使われます。"},
    {"question":"引数が渡されなかった場合の初期値を設定する機能は?","choices":["デフォルト引数","残余引数","オプション引数","暗黙引数"],"answer":0,"explanation":"呼び出し時に省略された引数にのみ適用されます。"},
    {"question":"バッククォートで囲み変数を埋め込める文字列記法は?","choices":["テンプレートリテラル","文字列結合演算子","フォーマット文字列","エスケープ文字列"],"answer":0,"explanation":"式の埋め込みや複数行の文字列に便利です。"},
    {"question":"functionキーワードを使わない短い関数定義の記法は?","choices":["アロー関数","ラムダ式","無名クラス","即時関数"],"answer":0,"explanation":"通常の関数よりthisの扱いが異なります。"},
    {"question":"定義と同時にすぐ実行される関数の呼び方は?","choices":["IIFE(即時実行関数式)","コールバック関数","高階関数","ジェネレータ関数"],"answer":0,"explanation":"グローバルスコープを汚さずに1回だけ実行したい時に使います。"},
    {"question":"他の関数に引数として渡される関数を指す用語は?","choices":["コールバック関数","IIFE","ジェネレータ関数","静的関数"],"answer":0,"explanation":"高階関数の代表的な使い方の一つです。"},
    {"question":"関数を引数に取る、または関数を返す関数を指す用語は?","choices":["高階関数","再帰関数","純粋関数","無名関数"],"answer":0,"explanation":"map/filter/reduceなどが該当します。"},
    {"question":"関数が自分自身を呼び出す処理方式は?","choices":["再帰","反復","委譲","継承"],"answer":0,"explanation":"同じ処理をループの代わりに繰り返す手法です。"},
    {"question":"内側の関数が外側のスコープの変数を覚え続ける仕組みは?","choices":["クロージャ","スコープチェーンのみ","巻き上げ","プロトタイプ"],"answer":0,"explanation":"外側の関数が終了した後も変数を参照し続けられます。"},
    {"question":"実行前に変数・関数の宣言が巻き上げられる仕組みは?","choices":["ホイスティング(巻き上げ)","クロージャ","スコープチェーン","遅延評価"],"answer":0,"explanation":"varは宣言のみが巻き上げられ値はundefinedになります。"},
    {"question":"関数内で呼び出し元のオブジェクトを指すキーワードは?","choices":["this","self","current","owner"],"answer":0,"explanation":"通常の関数では呼び出し方によってthisの中身が変わります。"},
    {"question":"thisの参照先を固定して新しい関数を作るメソッドは?","choices":["bind","call","apply","fix"],"answer":0,"explanation":"アロー関数のthisを固定する代わりにはなりません。"},
    {"question":"thisを指定しつつ関数を即座に呼び出すメソッドは?","choices":["call","bind","apply","invoke"],"answer":0,"explanation":"bindと異なりその場で関数を実行します。"},
    {"question":"配列引数の形でthisと引数を渡して関数を呼び出すメソッドは?","choices":["apply","call","bind","spread-call"],"answer":0,"explanation":"apply/callとほぼ同じですが引数の渡し方が異なります。"},
    {"question":"配列の末尾に要素を追加するメソッドは?","choices":["push","pop","shift","unshift"],"answer":0,"explanation":"元の配列自体が変更される破壊的メソッドです。"},
    {"question":"配列の末尾から要素を取り出すメソッドは?","choices":["pop","push","shift","unshift"],"answer":0,"explanation":"取り出した要素は配列から削除されます。"},
    {"question":"配列の先頭から要素を取り出すメソッドは?","choices":["shift","pop","push","unshift"],"answer":0,"explanation":"先頭の要素が削除され残りが前に詰められます。"},
    {"question":"配列の先頭に要素を追加するメソッドは?","choices":["unshift","shift","push","pop"],"answer":0,"explanation":"unshiftは先頭に追加するため既存要素の位置がずれます。"},
    {"question":"配列の各要素を変換した新しい配列を作るメソッドは?","choices":["map","forEach","filter","reduce"],"answer":0,"explanation":"元の配列は変更されず新しい配列が返されます。"},
    {"question":"配列の各要素に対して処理を実行するが新しい配列を返さないメソッドは?","choices":["forEach","map","filter","reduce"],"answer":0,"explanation":"戻り値がないため単なる繰り返し処理に使われます。"},
    {"question":"条件に合う要素だけを抽出した新しい配列を作るメソッドは?","choices":["filter","map","find","some"],"answer":0,"explanation":"元の配列は変更されません。"},
    {"question":"配列を1つの値にまとめ上げるメソッドは?","choices":["reduce","map","filter","fold"],"answer":0,"explanation":"配列やオブジェクトなど単一の値にまとめます。"},
    {"question":"条件に合う最初の要素を1つ返すメソッドは?","choices":["find","filter","some","includes"],"answer":0,"explanation":"見つからない場合はundefinedを返します。"},
    {"question":"条件に合う最初の要素のインデックスを返すメソッドは?","choices":["findIndex","indexOf","find","search"],"answer":0,"explanation":"見つからない場合は-1を返します。"},
    {"question":"配列に特定の値が含まれるか調べるメソッドは?","choices":["includes","contains","has","exists"],"answer":0,"explanation":"真偽値(true/false)で結果を返します。"},
    {"question":"配列内で少なくとも1つが条件を満たすか調べるメソッドは?","choices":["some","every","any","filter"],"answer":0,"explanation":"1つでも条件を満たせばtrueを返します。"},
    {"question":"配列のすべての要素が条件を満たすか調べるメソッドは?","choices":["every","some","all","each"],"answer":0,"explanation":"1つでも条件を満たさなければfalseを返します。"},
    {"question":"配列の一部を切り出して新しい配列を返すメソッドは?","choices":["slice","splice","cut","extract"],"answer":0,"explanation":"元の配列は変更されません。"},
    {"question":"配列の要素を削除・置換・挿入する破壊的メソッドは?","choices":["splice","slice","cut","replace"],"answer":0,"explanation":"元の配列自体を直接書き換える破壊的メソッドです。"},
    {"question":"配列を並び替えるメソッドは?","choices":["sort","order","arrange","rank"],"answer":0,"explanation":"デフォルトでは文字列として昇順に並び替えます。"},
    {"question":"配列の順序を逆にするメソッドは?","choices":["reverse","flip","invert","back"],"answer":0,"explanation":"元の配列自体を書き換える破壊的メソッドです。"},
    {"question":"複数の配列を1つに結合するメソッドは?","choices":["concat","merge","join","combine"],"answer":0,"explanation":"スプレッド構文でも同様の結合ができます。"},
    {"question":"配列を文字列に連結するメソッドは?","choices":["join","concat","toString-only","merge"],"answer":0,"explanation":"区切り文字を指定しない場合はカンマで連結されます。"},
    {"question":"多次元配列を平坦化するメソッドは?","choices":["flat","flatten","unwrap","spreadArray"],"answer":0,"explanation":"入れ子になった配列を1階層減らします。"},
    {"question":"配列かどうかを判定する静的メソッドは?","choices":["Array.isArray","typeof array","Array.check","isArrayType"],"answer":0,"explanation":"true/falseを返す静的メソッドです。"},
    {"question":"オブジェクトのキー一覧を配列で取得するメソッドは?","choices":["Object.keys","Object.values","Object.entries","Object.list"],"answer":0,"explanation":"for...inとは異なり配列を返すため扱いやすいです。"},
    {"question":"オブジェクトの値一覧を配列で取得するメソッドは?","choices":["Object.values","Object.keys","Object.entries","Object.data"],"answer":0,"explanation":"値の一覧だけが必要な場合に使われます。"},
    {"question":"オブジェクトのキーと値のペアを配列で取得するメソッドは?","choices":["Object.entries","Object.keys","Object.values","Object.pairs"],"answer":0,"explanation":"分割代入と組み合わせてよく使われます。"},
    {"question":"複数のオブジェクトを1つに結合するメソッドは?","choices":["Object.assign","Object.merge","Object.combine","Object.extend"],"answer":0,"explanation":"同名プロパティは後から指定した方で上書きされます。"},
    {"question":"オブジェクトを変更不可(凍結)にするメソッドは?","choices":["Object.freeze","Object.lock","Object.seal-only","Object.const"],"answer":0,"explanation":"凍結後にプロパティを追加・変更しようとしても無視されます。"},
    {"question":"文字列の一部を切り出すメソッドは?","choices":["slice","cut","part","extract"],"answer":0,"explanation":"開始位置と終了位置を指定して部分文字列を得ます。"},
    {"question":"文字列を指定の区切り文字で配列に分割するメソッドは?","choices":["split","divide","separate","parts"],"answer":0,"explanation":"区切り文字を空文字にすると1文字ずつの配列になります。"},
    {"question":"文字列の前後の空白を除去するメソッドは?","choices":["trim","strip","clean","clip"],"answer":0,"explanation":"全角スペースは対象外である点に注意が必要です。"},
    {"question":"文字列をすべて大文字に変換するメソッドは?","choices":["toUpperCase","upper","capitalize","toCapital"],"answer":0,"explanation":"元の文字列は変更されず新しい文字列が返されます。"},
    {"question":"文字列をすべて小文字に変換するメソッドは?","choices":["toLowerCase","lower","toSmall","minimize"],"answer":0,"explanation":"元の文字列は変更されません。"},
    {"question":"文字列内の一部を置換するメソッドは?","choices":["replace","swap","change","substitute"],"answer":0,"explanation":"第一引数を正規表現にすると全置換も可能です。"},
    {"question":"文字列に特定の文字列が含まれるか調べるメソッドは?","choices":["includes","contains","hasString","search-only"],"answer":0,"explanation":"大文字小文字を区別して判定します。"},
    {"question":"文字列を指定回数繰り返すメソッドは?","choices":["repeat","duplicate","multiply","loop"],"answer":0,"explanation":"元の文字列は変更されません。"},
    {"question":"文字列の先頭を指定文字で埋めて長さを揃えるメソッドは?","choices":["padStart","padEnd","fillStart","leftPad-only"],"answer":0,"explanation":"文字数を揃えて桁を合わせたい時などに使われます。"},
    {"question":"オブジェクトや配列をJSON文字列に変換するメソッドは?","choices":["JSON.stringify","JSON.parse","JSON.encode","JSON.toText"],"answer":0,"explanation":"APIへのデータ送信やlocalStorageへの保存前によく使われます。"},
    {"question":"JSON文字列をJavaScriptオブジェクトに変換するメソッドは?","choices":["JSON.parse","JSON.stringify","JSON.decode","JSON.toObject"],"answer":0,"explanation":"サーバーから受け取ったJSON文字列の解析に使われます。"},
    {"question":"例外が発生しうる処理を囲むブロックは?","choices":["try","catch","finally","throw"],"answer":0,"explanation":"tryブロック内でエラーが発生するとcatchに処理が移ります。"},
    {"question":"例外を捕まえて処理するブロックは?","choices":["catch","try","finally","throw"],"answer":0,"explanation":"エラーオブジェクトを受け取り対応する処理を書きます。"},
    {"question":"例外の有無にかかわらず必ず実行されるブロックは?","choices":["finally","catch","try","always"],"answer":0,"explanation":"リソースの後始末(クリーンアップ)などに使われます。"},
    {"question":"意図的に例外を発生させる命令は?","choices":["throw","raise","error","fail"],"answer":0,"explanation":"独自のエラーメッセージを持つオブジェクトを投げられます。"},
    {"question":"厳格なエラーチェックを有効にする宣言は?","choices":["\"use strict\"","\"strict mode\"","#strict","@strict"],"answer":0,"explanation":"暗黙的な型変換など曖昧な挙動が禁止されます。"},
    {"question":"非同期処理の結果を表現するオブジェクトは?","choices":["Promise","Async","Future","Deferred"],"answer":0,"explanation":"成功(resolve)または失敗(reject)の状態を表現します。"},
    {"question":"Promiseが成功した時に呼ばれるメソッドは?","choices":["then","resolve","success","done"],"answer":0,"explanation":"thenの中でさらに次の処理をつなげられます。"},
    {"question":"Promiseが失敗した時に呼ばれるメソッドは?","choices":["catch","fail","reject-only","error"],"answer":0,"explanation":"エラー処理をtry/catchの代わりに使えます。"},
    {"question":"複数のPromiseすべての完了を待つメソッドは?","choices":["Promise.all","Promise.race","Promise.any","Promise.wait"],"answer":0,"explanation":"1つでも失敗するとその時点でエラーとして扱われます。"},
    {"question":"複数のPromiseのうち最初に完了したものを返すメソッドは?","choices":["Promise.race","Promise.all","Promise.first","Promise.any"],"answer":0,"explanation":"最初に成功・失敗どちらでも結果を確定した方が採用されます。"},
    {"question":"async関数内でPromiseの完了を待つキーワードは?","choices":["await","async","yield","wait"],"answer":0,"explanation":"async関数の中でのみ使用できます。"},
    {"question":"関数を非同期関数として宣言するキーワードは?","choices":["async","await","defer","promise"],"answer":0,"explanation":"戻り値は自動的にPromiseでラップされます。"},
    {"question":"一定時間後に一度だけ処理を実行する関数は?","choices":["setTimeout","setInterval","delay","wait"],"answer":0,"explanation":"1回限りの遅延実行に使われます。"},
    {"question":"一定間隔で繰り返し処理を実行する関数は?","choices":["setInterval","setTimeout","repeat","loopTimer"],"answer":0,"explanation":"IDを保持しておき停止する際に使います。"},
    {"question":"setIntervalによる繰り返しを止める関数は?","choices":["clearInterval","stopInterval","cancelInterval","endInterval"],"answer":0,"explanation":"setIntervalが返すIDを指定して停止します。"},
    {"question":"IDを指定してDOM要素を取得するメソッドは?","choices":["document.getElementById","document.getById","document.find","document.selectId"],"answer":0,"explanation":"見つからない場合はnullを返します。"},
    {"question":"CSSセレクタで最初に一致するDOM要素を取得するメソッドは?","choices":["document.querySelector","document.getElement","document.find","document.select"],"answer":0,"explanation":"複数一致する場合でも最初の1つだけが返されます。"},
    {"question":"CSSセレクタで一致するすべてのDOM要素を取得するメソッドは?","choices":["document.querySelectorAll","document.getAllElements","document.selectAll","document.findAll"],"answer":0,"explanation":"戻り値は配列に似たNodeListです。"},
    {"question":"要素にイベント処理を登録するメソッドは?","choices":["addEventListener","onEvent","bindEvent","attachEvent-only"],"answer":0,"explanation":"複数のイベントリスナーを同じ要素に登録できます。"},
    {"question":"登録したイベント処理を解除するメソッドは?","choices":["removeEventListener","detachEvent","unbindEvent","clearEvent"],"answer":0,"explanation":"登録時と同じ関数の参照が必要です。"},
    {"question":"フォーム送信やリンククリックの既定動作を止めるメソッドは?","choices":["preventDefault","stopDefault","cancelDefault","blockDefault"],"answer":0,"explanation":"リンクの遷移やフォームの再読み込みを止めます。"},
    {"question":"イベントが親要素へ伝わるのを止めるメソッドは?","choices":["stopPropagation","preventDefault","stopBubble-only","cancelEvent"],"answer":0,"explanation":"子要素で発生したイベントが親要素に伝わらなくなります。"},
    {"question":"新しいDOM要素を生成するメソッドは?","choices":["document.createElement","document.newElement","document.makeElement","document.addElement"],"answer":0,"explanation":"生成した時点ではまだ画面に表示されていません。"},
    {"question":"生成した要素を親要素の子として追加するメソッドは?","choices":["appendChild","addChild","insertChild","attachChild"],"answer":0,"explanation":"appendChildで実際に画面へ挿入されます。"},
    {"question":"要素のクラス一覧を操作するプロパティは?","choices":["classList","classNames","classArray","styleList"],"answer":0,"explanation":"add/remove/toggleなどのメソッドを持ちます。"},
    {"question":"変数の値の有無や真偽を暗黙的に判定できる状態を指す用語は?","choices":["truthy/falsy","boolean-cast","auto-type","implicit-bool"],"answer":0,"explanation":"0や空文字、nullなどはfalsyとして扱われます。"},
    {"question":"ES6で導入されたクラスを定義するキーワードは?","choices":["class","struct","object","type"],"answer":0,"explanation":"従来のfunctionによるコンストラクタのシンタックスシュガーです。"},
    {"question":"クラスの初期化処理を記述する特殊メソッドは?","choices":["constructor","init","new","setup"],"answer":0,"explanation":"newでインスタンス化した際に自動で呼ばれます。"},
    {"question":"クラス継承を行うキーワードは?","choices":["extends","inherits","implements","derives"],"answer":0,"explanation":"子クラスは親クラスのプロパティやメソッドを引き継ぎます。"},
    {"question":"親クラスのメソッドやconstructorを呼び出すキーワードは?","choices":["super","parent","base","root"],"answer":0,"explanation":"子クラスのconstructor内で最初に呼ぶ必要があります。"},
    {"question":"インスタンスを作らずクラスから直接呼べるメソッドを定義するキーワードは?","choices":["static","class-level","shared","global"],"answer":0,"explanation":"インスタンスごとではなくクラス自体に紐づくメソッドです。"},
    {"question":"オブジェクトのプロパティ取得時に処理を挟む仕組みは?","choices":["getter(get)","setter(set)のみ","proxy","accessor-only"],"answer":0,"explanation":"値を返す前に処理を挟みたい場合に使われます。"},
    {"question":"オブジェクトのプロパティ設定時に処理を挟む仕組みは?","choices":["setter(set)","getter(get)のみ","proxy","mutator-only"],"answer":0,"explanation":"値を代入する前に処理を挟みたい場合に使われます。"},
    {"question":"重複のない値の集合を扱うES6のデータ構造は?","choices":["Set","Map","Array","List"],"answer":0,"explanation":"同じ値を2回追加しても1つとして扱われます。"},
    {"question":"任意の型をキーにできるキーと値のペアを扱うES6のデータ構造は?","choices":["Map","Set","Object","Array"],"answer":0,"explanation":"キーに文字列以外のオブジェクトも使用できます。"},
    {"question":"オブジェクトをキーにでき、メモリ管理に有利な弱参照マップは?","choices":["WeakMap","Map","WeakSet","SoftMap"],"answer":0,"explanation":"通常のMapと違いキーへの参照がガベージコレクションを妨げません。"},
    {"question":"オブジェクトへの操作を横取りしてカスタム処理を行える仕組みは?","choices":["Proxy","Reflect","Symbol","Wrapper"],"answer":0,"explanation":"get/set/deleteなどの操作を横取りできます。"},
    {"question":"一意性が保証されるプリミティブ型は?","choices":["Symbol","String","Number","Boolean"],"answer":0,"explanation":"同じ名前を作っても常に別の値として扱われます。"},
    {"question":"処理を一時停止・再開できる特殊な関数は?","choices":["ジェネレータ関数","非同期関数","純粋関数","再帰関数"],"answer":0,"explanation":"yieldで一時停止し次の呼び出しで再開します。"},
    {"question":"ジェネレータ関数内で値を返しつつ一時停止するキーワードは?","choices":["yield","return","await","pause"],"answer":0,"explanation":"呼び出し側からnext()が呼ばれるまで処理が止まります。"},
    {"question":"for...of文が主に反復処理するのは?","choices":["配列などの反復可能オブジェクトの値","オブジェクトのキー","オブジェクトのメソッド","文字列の長さ"],"answer":0,"explanation":"Map/Set/配列など反復可能なオブジェクトに使われます。"},
    {"question":"for...in文が主に反復処理するのは?","choices":["オブジェクトの列挙可能なキー","配列の値のみ","文字列の文字コード","関数の引数"],"answer":0,"explanation":"継承されたプロパティも列挙される点に注意が必要です。"},
    {"question":"複数の条件分岐を値ごとに書ける制御構文は?","choices":["switch文","if-else連結のみ","case文単体","match文"],"answer":0,"explanation":"複数のif-else文より読みやすく書ける場合があります。"},
    {"question":"switch文で条件に一致しない場合の処理を書く節は?","choices":["default","else","otherwise","fallback"],"answer":0,"explanation":"どのcaseにも一致しない場合の処理を書きます。"},
    {"question":"条件を満たす間くり返し処理するループ文は?","choices":["while文","for文のみ","switch文","if文"],"answer":0,"explanation":"条件を満たさなくなった時点でループを抜けます。"},
    {"question":"最低1回は必ず処理を実行してから条件判定するループ文は?","choices":["do...while文","while文","for文","repeat文"],"answer":0,"explanation":"条件判定より先に処理が実行される点が特徴です。"},
    {"question":"モジュールから機能を公開するキーワードは?","choices":["export","expose","public","share"],"answer":0,"explanation":"複数の機能を1つのモジュールから公開できます。"},
    {"question":"他モジュールの機能を読み込むキーワードは?","choices":["import","require-only","include","use"],"answer":0,"explanation":"名前付きエクスポートとデフォルトエクスポートの両方に対応します。"},
    {"question":"モジュールの既定のエクスポートを示すキーワードは?","choices":["export default","export main","export primary","export root"],"answer":0,"explanation":"1モジュールにつき1つだけ指定できます。"},
    {"question":"Node.js(CommonJS)でモジュールを読み込む関数は?","choices":["require()","import()のみ","include()","load()"],"answer":0,"explanation":"ES ModulesのimportとはシンタックスやCommonJSの互換性が異なります。"},
    {"question":"Node.jsでモジュールの公開内容を指定するオブジェクトは?","choices":["module.exports","module.public","export.default","module.share"],"answer":0,"explanation":"exportされた内容をここに設定します。"},
    {"question":"Node.jsのパッケージ管理設定ファイルは?","choices":["package.json","config.json","node.config","deps.json"],"answer":0,"explanation":"依存パッケージやスクリプトコマンドを管理します。"},
    {"question":"文字列パターンの検索・置換に使う機能は?","choices":["正規表現","テンプレートリテラル","スプレッド構文","分割代入"],"answer":0,"explanation":"パターンにマッチする部分の検索・抽出・置換ができます。"},
    {"question":"正規表現を作成するリテラル記法の記号は?","choices":["/pattern/","#pattern#","%pattern%","\"pattern\""],"answer":0,"explanation":"スラッシュで囲んでパターンを記述します。"},
    {"question":"コールバック地獄を解消する目的で導入された仕組みは?","choices":["Promise","setTimeout","クロージャ","IIFE"],"answer":0,"explanation":"ネストしたコールバックの可読性低下を解消します。"},
    {"question":"非同期処理のキューを管理しシングルスレッドで並行処理を実現する仕組みは?","choices":["イベントループ","マルチスレッド","コールスタックのみ","ガベージコレクション"],"answer":0,"explanation":"タスクキューとコールスタックの仕組みで実現されています。"},
    {"question":"使われなくなったメモリを自動的に解放する仕組みは?","choices":["ガベージコレクション","メモリキャッシュ","スタック解放","ヒープ整理"],"answer":0,"explanation":"参照されなくなったオブジェクトのメモリを解放します。"},
    {"question":"関数呼び出しの実行順を管理する仕組みは?","choices":["コールスタック","イベントループ","ヒープ","キュー"],"answer":0,"explanation":"LIFO(後入れ先出し)の構造で管理されます。"},
    {"question":"値そのものがコピーされる代入方式は?","choices":["値渡し","参照渡し","ポインタ渡し","共有渡し"],"answer":0,"explanation":"数値や文字列などプリミティブ型で発生します。"},
    {"question":"オブジェクトや配列の代入で使われる、参照先を共有する方式は?","choices":["参照渡し","値渡し","コピー渡し","複製渡し"],"answer":0,"explanation":"オブジェクトや配列などの代入で発生します。"},
    {"question":"同じ入力に対して常に同じ出力を返し副作用を持たない関数は?","choices":["純粋関数","高階関数","再帰関数","非同期関数"],"answer":0,"explanation":"テストしやすく予測可能なコードになります。"},
    {"question":"関数の外部状態を変更するなどの影響を指す用語は?","choices":["副作用","純粋性","再帰性","非同期性"],"answer":0,"explanation":"デバッグを難しくする要因になることがあります。"},
    {"question":"処理の計算量の増え方を表す表記法は?","choices":["Big O記法","アルゴリズム係数","計算密度","処理速度指数"],"answer":0,"explanation":"入力サイズの増加に対する処理時間の伸び方を表します。"},
    {"question":"データ量が増えても処理時間が一定であることを表す計算量は?","choices":["O(1)","O(n)","O(n^2)","O(log n)"],"answer":0,"explanation":"データ量に関わらず処理時間が変わりません。"},
    {"question":"データ量に比例して処理時間が増えることを表す計算量は?","choices":["O(n)","O(1)","O(n^2)","O(log n)"],"answer":0,"explanation":"配列を1つずつ調べる線形探索などが該当します。"},
    {"question":"後入れ先出し(LIFO)の性質を持つデータ構造は?","choices":["スタック","キュー","リスト","ツリー"],"answer":0,"explanation":"pushとpopで操作するのが一般的です。"},
    {"question":"先入れ先出し(FIFO)の性質を持つデータ構造は?","choices":["キュー","スタック","配列固定長のみ","ヒープ"],"answer":0,"explanation":"enqueueとdequeueで操作するのが一般的です。"},
    {"question":"各要素が次の要素への参照を持つ線形データ構造は?","choices":["連結リスト","配列","ハッシュテーブル","スタック"],"answer":0,"explanation":"配列と異なりメモリ上で連続している必要がありません。"},
    {"question":"親子関係を持つ階層的なデータ構造は?","choices":["木構造(ツリー)","キュー","スタック","連結リスト"],"answer":0,"explanation":"木構造やDOMツリーが代表例です。"},
    {"question":"キーから高速に値を検索できるデータ構造は?","choices":["ハッシュテーブル","連結リスト","スタック","木構造"],"answer":0,"explanation":"内部的にはハッシュ関数で格納位置を決めます。"},
    {"question":"隣接する要素を比較・交換して並び替える単純なソートは?","choices":["バブルソート","クイックソート","マージソート","ヒープソート"],"answer":0,"explanation":"データ量が多いと計算量が大きくなりやすいソートです。"},
    {"question":"ソート済み配列で中央値と比較しながら探索する方法は?","choices":["二分探索","線形探索","ハッシュ探索","深さ優先探索"],"answer":0,"explanation":"データが事前にソートされている必要があります。"},
    {"question":"データを分割・整理しながら値を保持したい場合に基本となる型を持つ概念は?","choices":["データ構造","アルゴリズム","デザインパターン","フレームワーク"],"answer":0,"explanation":"用途に応じて配列・連結リスト・木構造などが選ばれます。"},
    {"question":"問題を解くための手順そのものを指す用語は?","choices":["アルゴリズム","データ構造","コンパイラ","インタプリタ"],"answer":0,"explanation":"同じアルゴリズムでも実装言語やデータ構造で速度が変わります。"},
    {"question":"ソースコードを事前に機械語へ変換する処理系は?","choices":["コンパイラ","インタプリタ","エディタ","デバッガ"],"answer":0,"explanation":"実行前にすべて変換するため実行速度は速い傾向にあります。"},
    {"question":"ソースコードを1行ずつ実行しながら解釈する処理系は?","choices":["インタプリタ","コンパイラ","リンカ","アセンブラ"],"answer":0,"explanation":"変換と実行が同時に行われる処理系です。"},
    {"question":"オブジェクト指向の三大要素の一つで、内部詳細を隠す考え方は?","choices":["カプセル化","継承","多態性","抽象化"],"answer":0,"explanation":"プロパティやメソッドを外部から直接操作できないようにします。"},
    {"question":"オブジェクト指向で親クラスの性質を子クラスが引き継ぐ考え方は?","choices":["継承","カプセル化","多態性","委譲"],"answer":0,"explanation":"親クラスの機能を再利用しつつ拡張できます。"},
    {"question":"同じ操作名で異なる型に応じた振る舞いをさせる考え方は?","choices":["ポリモーフィズム(多態性)","カプセル化","継承","抽象化"],"answer":0,"explanation":"同名のメソッドでも呼び出し元の型に応じて動作が変わります。"},
    {"question":"繰り返し登場する設計上の典型解を型として整理したものは?","choices":["デザインパターン","アルゴリズム","フレームワーク","ライブラリ"],"answer":0,"explanation":"シングルトンやファクトリーなどが代表例です。"},
    {"question":"インスタンスを1つしか作らないことを保証するデザインパターンは?","choices":["シングルトンパターン","ファクトリーパターン","オブザーバーパターン","デコレーターパターン"],"answer":0,"explanation":"グローバルな設定管理などによく使われます。"},
    {"question":"オブジェクトの生成処理を専用のメソッドに任せるデザインパターンは?","choices":["ファクトリーパターン","シングルトンパターン","ストラテジーパターン","アダプターパターン"],"answer":0,"explanation":"生成ロジックを1箇所にまとめられます。"},
    {"question":"小さな単位の処理が正しく動くか検証するテストは?","choices":["単体テスト(ユニットテスト)","結合テスト","受け入れテスト","負荷テスト"],"answer":0,"explanation":"バグを早期に発見しやすくする効果があります。"},
    {"question":"複数のモジュールを組み合わせて正しく動くか検証するテストは?","choices":["結合テスト","単体テスト","静的解析","回帰テスト"],"answer":0,"explanation":"複数の部品を組み合わせた際の不具合を検出します。"},
    {"question":"テストを先に書いてから実装を進める開発手法は?","choices":["テスト駆動開発(TDD)","ウォーターフォール開発","ペアプログラミングのみ","モブプログラミング"],"answer":0,"explanation":"実装より先にテストコードを書く進め方です。"},
    {"question":"同じような処理を繰り返し書かない設計原則の略称は?","choices":["DRY原則","KISS原則","YAGNI原則","SOLID原則"],"answer":0,"explanation":"重複コードは修正漏れの原因になりやすいとされます。"},
    {"question":"「シンプルに保て」を意味する設計原則の略称は?","choices":["KISS原則","DRY原則","YAGNI原則","SRP原則"],"answer":0,"explanation":"複雑な実装より単純な実装を優先する考え方です。"},
    {"question":"「今必要ない機能は作るな」を意味する原則の略称は?","choices":["YAGNI原則","DRY原則","KISS原則","OCP原則"],"answer":0,"explanation":"将来使うかもしれない機能を先回りして作らない考え方です。"},
    {"question":"オブジェクト指向設計の5原則をまとめた略称は?","choices":["SOLID原則","DRY原則","KISS原則","CLEAN原則"],"answer":0,"explanation":"単一責任・開放閉鎖・リスコフの置換などから構成されます。"},
    {"question":"1つのクラスは1つの責任のみ持つべきとする原則は?","choices":["単一責任の原則","開放閉鎖の原則","依存性逆転の原則","インターフェース分離の原則"],"answer":0,"explanation":"クラスが複数の責任を持つと変更の影響範囲が広がりやすくなります。"},
    {"question":"コードを整理し内部構造を改善しつつ外部の振る舞いを変えない作業は?","choices":["リファクタリング","デバッグ","コンパイル","デプロイ"],"answer":0,"explanation":"外部の挙動を変えずに内部だけを整理します。"},
    {"question":"プログラムの不具合の原因を特定・修正する作業は?","choices":["デバッグ","リファクタリング","ビルド","レビュー"],"answer":0,"explanation":"原因の切り分けにログ出力やブレークポイントが使われます。"},
    {"question":"コードを実際に実行せずに問題を検出する手法は?","choices":["静的解析","動的解析","単体テスト","負荷テスト"],"answer":0,"explanation":"実行せずコードを解析して問題を見つけます。"},
    {"question":"コードの見た目を整えるためのツール(自動整形)を指す用語は?","choices":["フォーマッタ","リンター","コンパイラ","デバッガ"],"answer":0,"explanation":"インデントや改行など見た目の一貫性を保ちます。"},
    {"question":"コードの潜在的な問題を検出するツールを指す用語は?","choices":["リンター","フォーマッタ","バンドラ","トランスパイラ"],"answer":0,"explanation":"未使用変数や潜在的なバグを検出します。"},
    {"question":"複数のJSファイルを1つにまとめるツールの総称は?","choices":["バンドラ","リンター","フォーマッタ","パッケージャのみ"],"answer":0,"explanation":"読み込み速度の向上やファイル数削減に役立ちます。"},
    {"question":"新しい構文のコードを古い環境向けに変換するツールは?","choices":["トランスパイラ","バンドラ","リンター","デバッガ"],"answer":0,"explanation":"ブラウザの互換性を保つために使われます。"},
    {"question":"型注釈を追加したJavaScriptのスーパーセット言語は?","choices":["TypeScript","CoffeeScript","Dart","ActionScript"],"answer":0,"explanation":"コンパイル時に型のミスマッチを検出できます。"},
    {"question":"TypeScriptで変数に型を指定する記法は?","choices":["変数名: 型","変数名<型>","型 変数名","変数名 as 型のみ"],"answer":0,"explanation":"コロンの後ろに型名を書きます。"},
    {"question":"オブジェクトの形を定義するTypeScriptの機能は?","choices":["interface","class-only","struct","shape"],"answer":0,"explanation":"クラスと似ていますが実装を持たない点が異なります。"},
    {"question":"配列の分割代入で余った要素をまとめて受け取る記法は?","choices":["レスト構文","スプレッド構文のみ","デフォルト構文","テンプレート構文"],"answer":0,"explanation":"配列の分割代入でも同様の記法が使えます。"},
    {"question":"オブジェクトのプロパティ名を変数から動的に決める記法は?","choices":["computed property name","dynamic key","variable property","flex key"],"answer":0,"explanation":"[]で囲んで式を書くことで動的にキー名を決められます。"},
    {"question":"分割代入で取り出す変数に初期値を設定する記法は?","choices":["デフォルト値付き分割代入","レスト構文","スプレッド構文","オプショナル構文"],"answer":0,"explanation":"分割代入時にundefinedだった場合のみ適用されます。"},
    {"question":"配列やオブジェクトのプロパティ名を短縮して書けるES6の記法は?","choices":["プロパティの短縮記法","アロー関数","テンプレートリテラル","分割代入"],"answer":0,"explanation":"変数名とプロパティ名が同じ場合に省略できます。"},
    {"question":"非同期処理の完了・失敗にかかわらず実行されるPromiseのメソッドは?","choices":["finally","then","catch","always"],"answer":0,"explanation":"成功・失敗どちらの後処理も1箇所にまとめられます。"},
    {"question":"配列の全要素が空かどうかを直接判定する標準プロパティは?","choices":["length === 0 で判定","isEmpty()","empty プロパティ","count() === 0"],"answer":0,"explanation":"length === 0で判定するのが一般的な方法です。"},
    {"question":"厳密には存在しないオブジェクトのプロパティにアクセスした時の値は?","choices":["undefined","null","NaN","エラーになる"],"answer":0,"explanation":"存在しないプロパティにアクセスしてもエラーにはなりません。"},
    {"question":"配列やオブジェクトの深いコピーと浅いコピーの違いに関係する概念は?","choices":["参照渡しと値渡し","同期と非同期","型変換","スコープチェーン"],"answer":0,"explanation":"浅いコピーはネストした部分の参照を共有します。"},
    {"question":"変数のスコープ(有効範囲)が関数単位になるのはどの宣言方法?","choices":["var","let","const","全て同じ"],"answer":0,"explanation":"var固有の性質です。"},
    {"question":"変数のスコープがブロック単位になる宣言方法は?","choices":["let / const","var","function","global"],"answer":0,"explanation":"letとconstに共通する性質です。"},
    {"question":"関数宣言と関数式の違いとして正しいのは?","choices":["関数宣言は巻き上げられるが関数式は巻き上げられにくい","関数式は必ずアロー関数である","関数宣言はthisを持たない","関数式は再帰できない"],"answer":0,"explanation":"関数式は代入が完了するまで参照できません。"},
    {"question":"アロー関数の大きな特徴として正しいのは?","choices":["独自のthisを持たず外側のthisを引き継ぐ","必ず即時実行される","引数を受け取れない","戻り値を必ず返さない"],"answer":0,"explanation":"呼び出し元のオブジェクトに応じてthisが変わることがありません。"},
    {"question":"配列の空判定によく使われるlengthプロパティの型は?","choices":["数値(number)","文字列(string)","真偽値(boolean)","オブジェクト"],"answer":0,"explanation":"0の場合もfalsyになるため慎重な判定が必要です。"},
    {"question":"文字列の指定位置の文字を取得するメソッドは?","choices":["charAt","getChar","charOf","letterAt"],"answer":0,"explanation":"インデックスを指定して1文字だけ取得します。"},
    {"question":"文字列内で特定文字列の位置を検索するメソッドは?","choices":["indexOf","search-only","position","findChar"],"answer":0,"explanation":"見つからない場合は-1を返します。"},
    {"question":"数値を文字列に変換するメソッドは?","choices":["toString","toText","String-only","asText"],"answer":0,"explanation":"整数から文字列への変換によく使われます。"},
    {"question":"文字列や数値をブール値へ明示的に変換する関数は?","choices":["Boolean()","toBool()","asBoolean()","Bool()"],"answer":0,"explanation":"truthy/falsyの判定結果に基づいて変換されます。"},
    {"question":"小数点以下を切り捨てて整数にするMathメソッドは?","choices":["Math.floor","Math.round","Math.ceil","Math.trunc のみ"],"answer":0,"explanation":"小数点以下を切り捨てて小さい方の整数にします。"},
    {"question":"小数点以下を切り上げて整数にするMathメソッドは?","choices":["Math.ceil","Math.floor","Math.round","Math.int"],"answer":0,"explanation":"小数点以下を切り上げて大きい方の整数にします。"},
    {"question":"四捨五入して整数にするMathメソッドは?","choices":["Math.round","Math.floor","Math.ceil","Math.fix"],"answer":0,"explanation":"0.5以上で繰り上げ、未満で切り捨てます。"},
    {"question":"0以上1未満のランダムな数値を返すメソッドは?","choices":["Math.random","Math.rand","Random.next","Math.pick"],"answer":0,"explanation":"1は含まれない点に注意が必要です。"},
    {"question":"複数の数値の中から最大値を返すメソッドは?","choices":["Math.max","Math.min","Math.top","Math.highest"],"answer":0,"explanation":"引数の中から最も大きい値を返します。"},
    {"question":"複数の数値の中から最小値を返すメソッドは?","choices":["Math.min","Math.max","Math.low","Math.least"],"answer":0,"explanation":"引数の中から最も小さい値を返します。"},
    {"question":"配列の要素数を数値で保持するプロパティは?","choices":["length","size","count","total"],"answer":0,"explanation":"呼び出さずに参照できるプロパティです。"},
    {"question":"オブジェクトのプロパティを削除する演算子は?","choices":["delete","remove","unset","clear"],"answer":0,"explanation":"オブジェクトのキーとその値を同時に削除します。"},
    {"question":"変数がオブジェクトのプロパティとして存在するか調べる演算子は?","choices":["in演算子","has演算子","exists演算子","contains演算子"],"answer":0,"explanation":"継承されたプロパティも含めて判定される点に注意が必要です。"},
    {"question":"反復可能オブジェクトを配列に変換する簡単な方法の一つは?","choices":["スプレッド構文で展開する","toString()を呼ぶ","JSON.parse()する","Number()で変換する"],"answer":0,"explanation":"配列以外の反復可能オブジェクトを配列に変換できます。"},
    {"question":"非同期関数が例外を投げた場合、呼び出し側で捕まえる方法は?","choices":["try...catchまたはcatch()","if文のみ","switch文","throw文単体"],"answer":0,"explanation":"async関数内であればtry...catchでそのまま捕まえられます。"},
    {"question":"配列の要素をコピーして新しい配列にする浅いコピー方法の一つは?","choices":["スプレッド構文 […array]","for文で書き換える","delete演算子","typeof演算子"],"answer":0,"explanation":"元の配列と参照を共有しないコピーが作られます。"},
    {"question":"オブジェクトのプロパティが読み取り専用になるよう部分的に制限するメソッドは?","choices":["Object.freeze","Object.lock","Object.readonly","Object.protect"],"answer":0,"explanation":"変更しようとしても無視されるか、厳格モードではエラーになります。"},
    {"question":"配列やオブジェクトが空であることを直接示す真偽値プロパティを持つかというと?","choices":["持たないため自分でlengthやkeysで判定する","isEmptyプロパティを持つ","emptyメソッドを持つ","null判定だけで十分"],"answer":0,"explanation":"標準では持たないため自前で判定ロジックを書く必要があります。"},
    {"question":"プログラムの実行速度や再利用性の高さを重視して書き直す作業を指す用語は?","choices":["リファクタリング","デバッグ","ドキュメンテーション","テスト駆動開発"],"answer":0,"explanation":"外部から見た挙動を変えずに内部の質を高める作業です。"},
    ]
  },
  {
    name: "ネットワーク・インフラ",
    color: "#F2994A",
    questions: [
    {"question":"Webページを取得する際に使う基本的なHTTPメソッドは?","choices":["GET","POST","PUT","DELETE"],"answer":0,"explanation":"最も基本的な、データを取得するためのメソッドです。"},
    {"question":"サーバーに新しいデータを送信して作成する際のHTTPメソッドは?","choices":["POST","GET","HEAD","OPTIONS"],"answer":0,"explanation":"サーバー側に新しいリソースを作成する際に使われます。"},
    {"question":"リソースを丸ごと更新する際のHTTPメソッドは?","choices":["PUT","PATCH","POST","GET"],"answer":0,"explanation":"リソース全体を送信データで置き換えます。"},
    {"question":"リソースの一部だけを更新する際のHTTPメソッドは?","choices":["PATCH","PUT","POST","UPDATE"],"answer":0,"explanation":"送信したフィールドだけを部分的に更新します。"},
    {"question":"リソースを削除する際のHTTPメソッドは?","choices":["DELETE","REMOVE","CLEAR","DROP"],"answer":0,"explanation":"指定したリソースをサーバーから削除します。"},
    {"question":"レスポンスボディなしでヘッダー情報だけ取得するHTTPメソッドは?","choices":["HEAD","GET","TRACE","CONNECT"],"answer":0,"explanation":"ヘッダーだけ確認したい時に通信量を抑えられます。"},
    {"question":"サーバーが対応しているHTTPメソッドを確認する際に使うメソッドは?","choices":["OPTIONS","HEAD","TRACE","CHECK"],"answer":0,"explanation":"実際にリクエストを送らず対応状況を確認できます。"},
    {"question":"HTTPステータスコードで200が意味するのは?","choices":["リクエスト成功","リダイレクト","クライアントエラー","サーバーエラー"],"answer":0,"explanation":"最も一般的に返される成功のステータスコードです。"},
    {"question":"HTTPステータスコードで201が意味するのは?","choices":["新規リソースの作成成功","更新成功のみ","認証失敗","見つからない"],"answer":0,"explanation":"POSTでリソースが新規作成された時に返されます。"},
    {"question":"HTTPステータスコードで204が意味するのは?","choices":["内容なし(処理は成功)","見つからない","認証必要","禁止"],"answer":0,"explanation":"削除処理の成功時などによく使われます。"},
    {"question":"HTTPステータスコードで301が意味するのは?","choices":["恒久的リダイレクト","一時的リダイレクト","未変更","不正なリクエスト"],"answer":0,"explanation":"検索エンジンの評価が新しいURLに引き継がれます。"},
    {"question":"HTTPステータスコードで302が意味するのは?","choices":["一時的リダイレクト","恒久的リダイレクト","成功","未認証"],"answer":0,"explanation":"URLは変わらず一時的に別の場所へ案内されます。"},
    {"question":"HTTPステータスコードで304が意味するのは?","choices":["未変更(キャッシュ利用可)","見つからない","サーバーエラー","禁止"],"answer":0,"explanation":"ブラウザにキャッシュの再利用を促すコードです。"},
    {"question":"HTTPステータスコードで400が意味するのは?","choices":["不正なリクエスト","認証が必要","アクセス禁止","見つからない"],"answer":0,"explanation":"リクエストの形式そのものに誤りがある場合です。"},
    {"question":"HTTPステータスコードで401が意味するのは?","choices":["認証が必要","アクセス禁止","見つからない","不正なリクエスト"],"answer":0,"explanation":"ログインしていない状態でのアクセス時に返されます。"},
    {"question":"HTTPステータスコードで403が意味するのは?","choices":["アクセス禁止","認証が必要","見つからない","タイムアウト"],"answer":0,"explanation":"権限はあってもアクセスが許可されていない場合です。"},
    {"question":"HTTPステータスコードで404が意味するのは?","choices":["ページが見つからない","サーバーエラー","禁止","認証必要"],"answer":0,"explanation":"最もよく見るエラーの一つで、URLの誤りが原因になりがちです。"},
    {"question":"HTTPステータスコードで405が意味するのは?","choices":["許可されていないメソッド","見つからない","サーバーエラー","タイムアウト"],"answer":0,"explanation":"許可されていないHTTPメソッドでアクセスした場合です。"},
    {"question":"HTTPステータスコードで408が意味するのは?","choices":["リクエストタイムアウト","見つからない","禁止","認証必要"],"answer":0,"explanation":"サーバーからの応答が一定時間なかった場合です。"},
    {"question":"HTTPステータスコードで429が意味するのは?","choices":["リクエストが多すぎる","見つからない","サーバーエラー","禁止"],"answer":0,"explanation":"レート制限にかかった際に返されるコードです。"},
    {"question":"HTTPステータスコードで500が意味するのは?","choices":["サーバー内部エラー","クライアントエラー","見つからない","リダイレクト"],"answer":0,"explanation":"サーバー側の内部処理で問題が発生した場合の総称です。"},
    {"question":"HTTPステータスコードで502が意味するのは?","choices":["不正なゲートウェイ応答","認証必要","見つからない","禁止"],"answer":0,"explanation":"上流サーバーから不正な応答を受け取った場合です。"},
    {"question":"HTTPステータスコードで503が意味するのは?","choices":["サービス利用不可","見つからない","禁止","認証必要"],"answer":0,"explanation":"メンテナンス中や過負荷時によく返されます。"},
    {"question":"HTTPステータスコードで504が意味するのは?","choices":["ゲートウェイタイムアウト","見つからない","禁止","認証必要"],"answer":0,"explanation":"上流サーバーからの応答待ちでタイムアウトした場合です。"},
    {"question":"HTTPの標準ポート番号は?","choices":["80","443","21","22"],"answer":0,"explanation":"暗号化なしの通信で一般的に使われるポートです。"},
    {"question":"HTTPSの標準ポート番号は?","choices":["443","80","25","110"],"answer":0,"explanation":"暗号化された通信で一般的に使われるポートです。"},
    {"question":"FTPで使われる標準ポート番号は?","choices":["21","20","22","25"],"answer":0,"explanation":"データ転送用と制御用で異なるポートが使われます。"},
    {"question":"SSHで使われる標準ポート番号は?","choices":["22","21","23","25"],"answer":0,"explanation":"暗号化された遠隔操作の通信に使われます。"},
    {"question":"SMTP(メール送信)で使われる標準ポート番号は?","choices":["25","110","143","587のみ"],"answer":0,"explanation":"受信用のPOP3やIMAPとはポートが異なります。"},
    {"question":"DNSで使われる標準ポート番号は?","choices":["53","80","443","21"],"answer":0,"explanation":"ドメイン名の名前解決に使われるポートです。"},
    {"question":"HTTPSの「S」が意味するものは?","choices":["Secure(暗号化された通信)","Server","System","Standard"],"answer":0,"explanation":"通信内容が第三者に読み取られないよう暗号化されます。"},
    {"question":"Web通信を暗号化する仕組みとして広く使われるプロトコルは?","choices":["TLS(旧SSL)","FTP","SMTP","Telnet"],"answer":0,"explanation":"証明書を使って通信経路を暗号化する仕組みです。"},
    {"question":"ドメイン名をIPアドレスに変換する仕組みは?","choices":["DNS","DHCP","NAT","VPN"],"answer":0,"explanation":"人間が覚えやすい名前を機械が扱う数値に変換します。"},
    {"question":"DNSレコードでドメインとIPv4アドレスを結びつけるレコードは?","choices":["Aレコード","CNAMEレコード","MXレコード","TXTレコード"],"answer":0,"explanation":"最も基本的で頻繁に使われるDNSレコードです。"},
    {"question":"DNSレコードで別名(エイリアス)を設定するレコードは?","choices":["CNAMEレコード","Aレコード","NSレコード","PTRレコード"],"answer":0,"explanation":"複数のサブドメインを1つの実体に集約できます。"},
    {"question":"DNSレコードでメールサーバーを指定するレコードは?","choices":["MXレコード","Aレコード","CNAMEレコード","SOAレコード"],"answer":0,"explanation":"優先順位を指定して複数台設定することもできます。"},
    {"question":"DNSレコードで任意の文字列情報(認証情報など)を格納するレコードは?","choices":["TXTレコード","Aレコード","MXレコード","PTRレコード"],"answer":0,"explanation":"ドメイン所有権の確認などにもよく利用されます。"},
    {"question":"IPv4アドレスの表記で使われる区切り文字は?","choices":["ピリオド(.)","コロン(:)","ハイフン(-)","スラッシュ(/)"],"answer":0,"explanation":"4つの数値をピリオドで区切って表記します。"},
    {"question":"IPv6アドレスの表記で使われる区切り文字は?","choices":["コロン(:)","ピリオド(.)","ハイフン(-)","カンマ(,)"],"answer":0,"explanation":"128ビットのアドレスを16進数とコロンで表記します。"},
    {"question":"IPv4アドレスが不足する問題を解決するために作られた次世代規格は?","choices":["IPv6","IPv5","IPv4.5","IPnext"],"answer":0,"explanation":"従来のアドレス数の限界を大幅に拡張しています。"},
    {"question":"ネットワーク機器にMACアドレスを割り当てるレイヤーの名称は?","choices":["データリンク層","物理層","ネットワーク層","アプリケーション層"],"answer":0,"explanation":"物理的な接続を担うイーサネット等が該当する層です。"},
    {"question":"IPアドレスを扱う通信モデルの層は?","choices":["ネットワーク層","物理層","セッション層","プレゼンテーション層"],"answer":0,"explanation":"経路選択(ルーティング)を担当する層です。"},
    {"question":"通信を7つの階層に分けたモデルの名称は?","choices":["OSI参照モデル","TCP/IPモデルのみ","ISOモデル","IEEEモデル"],"answer":0,"explanation":"各層が独立して役割分担する考え方のモデルです。"},
    {"question":"コネクション型で信頼性の高い通信を提供するプロトコルは?","choices":["TCP","UDP","ICMP","ARP"],"answer":0,"explanation":"通信の順序保証や再送制御を行います。"},
    {"question":"コネクションレスで高速だが信頼性を保証しないプロトコルは?","choices":["UDP","TCP","HTTP","FTP"],"answer":0,"explanation":"リアルタイム性が求められる用途で使われます。"},
    {"question":"ネットワーク機器の生存確認などに使われるプロトコルは?","choices":["ICMP","TCP","UDP","ARP"],"answer":0,"explanation":"pingコマンドなどで利用されているプロトコルです。"},
    {"question":"IPアドレスからMACアドレスを調べるプロトコルは?","choices":["ARP","ICMP","DNS","DHCP"],"answer":0,"explanation":"同一ネットワーク内でのアドレス解決に使われます。"},
    {"question":"端末に自動的にIPアドレスを割り当てるプロトコルは?","choices":["DHCP","ARP","DNS","NAT"],"answer":0,"explanation":"手動設定の手間を省く仕組みです。"},
    {"question":"プライベートIPアドレスとグローバルIPアドレスを変換する仕組みは?","choices":["NAT","DNS","DHCP","VPN"],"answer":0,"explanation":"限られたグローバルIPを有効活用できます。"},
    {"question":"インターネット経由で安全な仮想の専用線を構築する技術は?","choices":["VPN","NAT","DNS","CDN"],"answer":0,"explanation":"公衆回線でも安全性の高い通信を実現します。"},
    {"question":"不正アクセスを遮断するためにネットワークの境界に設置する仕組みは?","choices":["ファイアウォール","ロードバランサー","CDN","プロキシのみ"],"answer":0,"explanation":"許可されない通信のみを遮断するよう設定できます。"},
    {"question":"クライアントとサーバーの間に立って通信を中継する仕組みは?","choices":["プロキシサーバー","DNSサーバー","メールサーバー","FTPサーバー"],"answer":0,"explanation":"キャッシュや匿名化などの目的でも利用されます。"},
    {"question":"アクセスを複数のサーバーに分散させる仕組みは?","choices":["ロードバランサー","ファイアウォール","プロキシ","CDN専用"],"answer":0,"explanation":"1台に負荷が集中するのを防ぎます。"},
    {"question":"コンテンツを世界各地の拠点にキャッシュして配信を高速化する仕組みは?","choices":["CDN","VPN","NAT","DHCP"],"answer":0,"explanation":"利用者に近い拠点から配信するため表示が速くなります。"},
    {"question":"ブラウザがサーバーから受け取ったデータを保持し再表示を高速化する仕組みは?","choices":["キャッシュ","セッション","クッキー","トークン"],"answer":0,"explanation":"同じリソースへの再リクエストを減らせます。"},
    {"question":"ログイン状態などを保つためブラウザに保存される小さなデータは?","choices":["Cookie","Session-only","Token-only","Cache-only"],"answer":0,"explanation":"ブラウザ側に保存され、リクエストごとに自動送信されます。"},
    {"question":"サーバー側でユーザーの状態を一時的に保持する仕組みは?","choices":["セッション","クッキーのみ","キャッシュのみ","トークンのみ"],"answer":0,"explanation":"サーバー側にログイン情報などの状態を保持します。"},
    {"question":"認証情報を安全にやり取りするための署名付きトークン形式は?","choices":["JWT","CSV","XML単体","YAML単体"],"answer":0,"explanation":"署名により改ざんの検知が可能です。"},
    {"question":"外部サービスへのアクセス権限を委譲する仕組みは?","choices":["OAuth","SSL","DNS","NAT"],"answer":0,"explanation":"パスワードを直接渡さずに権限だけを渡せます。"},
    {"question":"サーバーとクライアント間で双方向・常時接続の通信を実現する技術は?","choices":["WebSocket","HTTP/1.0","FTP","SMTP"],"answer":0,"explanation":"チャットや通知などリアルタイム性の高い用途で使われます。"},
    {"question":"URLの構成要素でプロトコル部分を指すのは?","choices":["スキーム(例: https)","ホスト","パス","クエリ"],"answer":0,"explanation":"httpやhttpsといった通信方式を示します。"},
    {"question":"URLでサーバーの場所を示す部分は?","choices":["ホスト名","スキーム","パス","フラグメント"],"answer":0,"explanation":"ドメイン名やIPアドレスがここに入ります。"},
    {"question":"URLで「?」以降に付くパラメータ部分の名称は?","choices":["クエリパラメータ","パス","フラグメント","ポート"],"answer":0,"explanation":"複数指定する場合は&で区切ります。"},
    {"question":"URLで「#」以降に付くページ内位置を示す部分の名称は?","choices":["フラグメント","クエリ","ホスト","スキーム"],"answer":0,"explanation":"ページ内リンクやSPAのルーティングに使われます。"},
    {"question":"リソースの設計思想としてHTTPメソッドとURLで操作を表すAPIの設計様式は?","choices":["REST","SOAP","RPCのみ","CORBA"],"answer":0,"explanation":"GET/POST/PUT/DELETEなどのHTTPメソッドに対応させます。"},
    {"question":"1つのエンドポイントに対して必要なデータだけを問い合わせできるAPIの技術は?","choices":["GraphQL","REST限定","SOAP限定","FTPのみ"],"answer":0,"explanation":"必要なフィールドだけ取得できるため通信量を抑えられます。"},
    {"question":"APIへのアクセス回数を一定時間内に制限する仕組みは?","choices":["レート制限","キャッシュ","ロードバランシング","圧縮"],"answer":0,"explanation":"過剰なアクセスからサーバーを守る目的で使われます。"},
    {"question":"異なるオリジン間でのリソース共有を制御する仕組みは?","choices":["CORS","CSRF","XSS","SSL"],"answer":0,"explanation":"許可されたオリジン以外からのアクセスをブロックします。"},
    {"question":"アプリを1つの巨大なプログラムとして構築する構成は?","choices":["モノリシック構成","マイクロサービス構成","サーバーレス構成","分散構成"],"answer":0,"explanation":"小規模なアプリでは開発・デプロイが単純になります。"},
    {"question":"アプリを小さな独立したサービスの集合として構築する構成は?","choices":["マイクロサービス","モノリシック","モノレポ","モジュラーモノリス"],"answer":0,"explanation":"サービスごとに独立してデプロイ・スケールできます。"},
    {"question":"サーバー管理を意識せずコードの実行に集中できる構成は?","choices":["サーバーレス","モノリシック","オンプレミス","ベアメタル"],"answer":0,"explanation":"利用した分だけ課金される料金体系が一般的です。"},
    {"question":"利用者側でインフラを自前で構築・保有・運用する形態は?","choices":["オンプレミス","クラウド","サーバーレス","エッジ"],"answer":0,"explanation":"設備投資が不要な一方、運用の自由度が下がる面もあります。"},
    {"question":"サーバーやストレージなどのインフラをサービスとして提供する形態は?","choices":["IaaS","PaaS","SaaS","FaaS"],"answer":0,"explanation":"OSやミドルウェアの管理から解放されます。"},
    {"question":"アプリの実行環境や開発基盤をサービスとして提供する形態は?","choices":["PaaS","IaaS","SaaS","DaaS"],"answer":0,"explanation":"実行環境の構築負担を軽減できます。"},
    {"question":"完成したソフトウェアをインターネット経由で提供する形態は?","choices":["SaaS","IaaS","PaaS","IaaSのみ"],"answer":0,"explanation":"インストール不要でどこからでも利用できます。"},
    {"question":"アプリケーションとその実行環境をひとまとめにして可搬性を高める技術は?","choices":["コンテナ(Docker等)","仮想マシンのみ","ベアメタルサーバー","クラスタリングのみ"],"answer":0,"explanation":"環境ごとの差異を減らし可搬性を高めます。"},
    {"question":"複数のコンテナの起動・管理・スケーリングを自動化する仕組みは?","choices":["Kubernetes","Docker単体","Git","Nginx単体"],"answer":0,"explanation":"多数のコンテナを効率よく運用するために使われます。"},
    {"question":"コードの変更を検知して自動でビルド・テストを行う仕組みは?","choices":["継続的インテグレーション(CI)","継続的デリバリー単体","デプロイメントのみ","モニタリングのみ"],"answer":0,"explanation":"バグの早期発見に役立ちます。"},
    {"question":"テスト済みの変更を自動的に本番環境へ反映する仕組みは?","choices":["継続的デプロイメント(CD)","継続的インテグレーションのみ","バージョン管理","静的解析"],"answer":0,"explanation":"人手を介さず安全にリリースを行えます。"},
    {"question":"ネットワークの遅延時間を表す指標は?","choices":["レイテンシ","スループット","帯域幅","ジッター単体"],"answer":0,"explanation":"数値が小さいほど応答が速いことを示します。"},
    {"question":"一定時間に転送できるデータ量を表す指標は?","choices":["スループット","レイテンシ","パケットロス","TTL"],"answer":0,"explanation":"数値が大きいほど大量のデータをやり取りできます。"},
    {"question":"通信可能な最大データ転送量の理論値を表す用語は?","choices":["帯域幅","レイテンシ","スループット","ホップ数"],"answer":0,"explanation":"実際の速度は他の要因でこれより低くなることが多いです。"},
    {"question":"データが目的地に届くまでに経由するルーター数を表す用語は?","choices":["ホップ数","帯域幅","レイテンシ","TTL"],"answer":0,"explanation":"数値が大きいほど遠い経路を通っていることを示します。"},
    {"question":"パケットが破棄されずに転送され続ける寿命(回数制限)を表す値は?","choices":["TTL","MTU","MSS","RTT"],"answer":0,"explanation":"ループ発生時にパケットが無限に転送され続けるのを防ぎます。"},
    {"question":"1つのパケットで転送できる最大サイズを表す値は?","choices":["MTU","TTL","RTT","ホップ数"],"answer":0,"explanation":"これを超えるサイズはフラグメント化(分割)されます。"},
    {"question":"パケット往復にかかる時間を表す指標は?","choices":["RTT(往復遅延時間)","TTL","MTU","帯域幅"],"answer":0,"explanation":"数値が小さいほど応答が速いと判断できます。"},
    {"question":"ネットワークをより小さな単位に分割する技術は?","choices":["サブネッティング","ルーティングのみ","NATのみ","VPN単体"],"answer":0,"explanation":"管理・運用のしやすさやセキュリティ向上に役立ちます。"},
    {"question":"宛先までの経路を決定する処理は?","choices":["ルーティング","スイッチング","ブリッジング","キャッシング"],"answer":0,"explanation":"複数の経路がある場合は最適な経路が選ばれます。"},
    {"question":"同一ネットワーク内で機器同士を接続する装置は?","choices":["スイッチ","ルーター","モデム","ハブ専用のみ"],"answer":0,"explanation":"データリンク層で動作する機器です。"},
    {"question":"異なるネットワーク間の通信を中継する装置は?","choices":["ルーター","スイッチ","リピーター","アクセスポイントのみ"],"answer":0,"explanation":"ネットワーク層で動作し経路選択を行う機器です。"},
    {"question":"ネットワーク機器に一意に割り当てられる物理アドレスは?","choices":["MACアドレス","IPアドレスのみ","ポート番号","ホスト名"],"answer":0,"explanation":"製造時に機器へ割り当てられ通常は変更されません。"},
    {"question":"クラウドサービスの利用状況に応じて課金される料金モデルは?","choices":["従量課金制","固定料金制のみ","定額制のみ","買い切り制のみ"],"answer":0,"explanation":"初期投資を抑えられる反面、使いすぎるとコストが増えます。"},
    {"question":"サーバーの利用状況を監視し障害を早期に発見する活動は?","choices":["モニタリング","デプロイ","プロビジョニング","スケーリングのみ"],"answer":0,"explanation":"障害の予兆を早期に検知する目的があります。"},
    {"question":"アクセス増加に応じてサーバー台数や性能を増やす対応は?","choices":["スケーリング","モニタリング","キャッシング","ルーティング"],"answer":0,"explanation":"垂直・水平どちらの方向でも対応できます。"},
    {"question":"サーバーの台数を増やして負荷分散する拡張方式は?","choices":["スケールアウト","スケールアップ","ダウンサイジング","縮退運転"],"answer":0,"explanation":"1台あたりの負荷を下げつつ全体の処理能力を上げます。"},
    {"question":"サーバー1台の性能(CPU/メモリ)を強化する拡張方式は?","choices":["スケールアップ","スケールアウト","ロードシェア","水平分散"],"answer":0,"explanation":"台数を増やさずに済むためシンプルですが限界があります。"},
    {"question":"メールを送信する際に使われるプロトコルは?","choices":["SMTP","POP3","IMAP","FTP"],"answer":0,"explanation":"25番ポートが標準的に使われます。"},
    {"question":"メールをサーバーからダウンロードして削除する方式のプロトコルは?","choices":["POP3","SMTP","IMAP","SNMP"],"answer":0,"explanation":"取得後は基本的にサーバー側からデータが消えます。"},
    {"question":"メールをサーバー上で管理し複数端末から同期できるプロトコルは?","choices":["IMAP","POP3","SMTP","FTP"],"answer":0,"explanation":"複数端末で同じメール状態を共有できます。"},
    {"question":"ファイルをサーバーとやり取りするための古典的なプロトコルは?","choices":["FTP","HTTP限定","SMTP","DNS"],"answer":0,"explanation":"現在はHTTPやクラウドストレージに置き換わりつつあります。"},
    {"question":"暗号化された安全なファイル転送を行うプロトコルは?","choices":["SFTP","FTP(平文)","HTTP","Telnet"],"answer":0,"explanation":"通信経路上での盗聴や改ざんを防ぎます。"},
    {"question":"遠隔のコンピュータを安全に操作するためのプロトコルは?","choices":["SSH","Telnet(平文)","FTP","RDPのみ"],"answer":0,"explanation":"公開鍵認証などにより高い安全性を確保できます。"},
    {"question":"暗号化されず通信内容が盗聴されやすい古い遠隔操作プロトコルは?","choices":["Telnet","SSH","SFTP","HTTPS"],"answer":0,"explanation":"現在は非推奨とされることが多いプロトコルです。"},
    {"question":"ネットワーク機器の状態を監視・管理するためのプロトコルは?","choices":["SNMP","SMTP","NTP","ARP"],"answer":0,"explanation":"障害の早期発見や設定変更に利用されます。"},
    {"question":"ネットワーク上の時刻を同期するためのプロトコルは?","choices":["NTP","SNMP","DHCP","DNS"],"answer":0,"explanation":"複数サーバー間でのログ時刻整合性を保つのに役立ちます。"},
    {"question":"リクエストヘッダーでブラウザ情報を伝える項目は?","choices":["User-Agent","Content-Type","Host のみ","Referer のみ"],"answer":0,"explanation":"サーバー側でアクセス解析等に利用されることがあります。"},
    {"question":"送信するデータの形式(MIMEタイプ)を示すHTTPヘッダーは?","choices":["Content-Type","User-Agent","Accept のみ","Host のみ"],"answer":0,"explanation":"サーバーが正しく処理方法を判断するために使われます。"},
    {"question":"リクエスト元のページURLを伝えるHTTPヘッダーは?","choices":["Referer","Host","Origin のみ","Location のみ"],"answer":0,"explanation":"アクセス元のページを分析する際に使われます。"},
    {"question":"リダイレクト先のURLを伝えるレスポンスヘッダーは?","choices":["Location","Referer","Host","Origin のみ"],"answer":0,"explanation":"POSTでリソース作成後などによく使われます。"},
    {"question":"キャッシュの有効期限などを制御するHTTPヘッダーは?","choices":["Cache-Control","Content-Length のみ","Set-Cookie のみ","ETag のみ"],"answer":0,"explanation":"max-ageなどのディレクティブで期限を指定します。"},
    {"question":"リソースのバージョン識別に使われるHTTPヘッダーは?","choices":["ETag","Cache-Control","Content-Type","Host"],"answer":0,"explanation":"変更がなければ304を返しキャッシュを再利用させられます。"},
    {"question":"サーバーがCookieを発行する際に使うレスポンスヘッダーは?","choices":["Set-Cookie","Cookie","Session-Set のみ","Auth-Token のみ"],"answer":0,"explanation":"クライアントはこのCookieを次回以降のリクエストで送信します。"},
    {"question":"認証情報をリクエストヘッダーで送る際に使う項目は?","choices":["Authorization","Auth のみ","Token のみ","Credential のみ"],"answer":0,"explanation":"Bearerトークンなどの形式でよく使われます。"},
    {"question":"常時HTTPS接続を強制するセキュリティヘッダーは?","choices":["Strict-Transport-Security","X-Frame-Options のみ","Content-Security-Policy のみ","X-XSS-Protection のみ"],"answer":0,"explanation":"ブラウザからのアクセスをすべてHTTPS化させます。"},
    {"question":"クリックジャッキング対策として使われるHTTPヘッダーは?","choices":["X-Frame-Options","Strict-Transport-Security","ETag","Referer-Policy のみ"],"answer":0,"explanation":"iframeでの埋め込み許可・拒否を制御します。"},
    {"question":"実行可能なスクリプトの読み込み元を制限するHTTPヘッダーは?","choices":["Content-Security-Policy","X-Frame-Options","Cache-Control","Set-Cookie"],"answer":0,"explanation":"XSS攻撃のリスクを軽減する効果があります。"},
    {"question":"モバイル通信網の高速な次世代規格として広く知られるのは?","choices":["5G","4G LTEが最新","3G","Wi-Fi 6"],"answer":0,"explanation":"従来の規格より高速・低遅延・多接続が特徴です。"},
    {"question":"無線LANの通信規格の総称として使われるのは?","choices":["Wi-Fi","Bluetooth","NFC","LTE"],"answer":0,"explanation":"複数の規格(802.11シリーズ等)を包含する総称です。"},
    {"question":"近距離無線通信でイヤホンなどの接続によく使われる規格は?","choices":["Bluetooth","Wi-Fi","Ethernet","USB-C(有線)"],"answer":0,"explanation":"消費電力が少なく近距離向けの規格です。"},
    {"question":"有線LAN接続で広く使われる規格の総称は?","choices":["Ethernet","Wi-Fi","Bluetooth","5G"],"answer":0,"explanation":"高速で安定した有線接続に使われます。"},
    {"question":"サーバー証明書を発行し通信の信頼性を担保する機関は?","choices":["認証局(CA)","レジストラのみ","ISPのみ","DNSサーバーのみ"],"answer":0,"explanation":"信頼できる証明書を発行することで暗号化通信を保証します。"},
    {"question":"ドメイン名の登録・管理を行う事業者は?","choices":["レジストラ","認証局のみ","ISPのみ","CDN事業者のみ"],"answer":0,"explanation":"取得・更新・移管などの手続きを扱います。"},
    {"question":"利用者にインターネット接続を提供する事業者の略称は?","choices":["ISP","CA","CDN","SaaS事業者"],"answer":0,"explanation":"回線契約とインターネット接続を提供します。"},
    {"question":"クラウド環境でネットワークやリソースを事前に自動構築する作業は?","choices":["プロビジョニング","モニタリングのみ","デプロイのみ","バックアップのみ"],"answer":0,"explanation":"手作業によるミスや構築時間を削減できます。"},
    {"question":"システムをコードとして記述し構成管理する考え方の略称は?","choices":["IaC(Infrastructure as Code)","CI/CDのみ","DevOpsのみ","SREのみ"],"answer":0,"explanation":"構成をコードとして管理し再現性を高めます。"},
    {"question":"開発と運用が協力してリリースを高速化する文化・考え方は?","choices":["DevOps","Agile単体","Scrum単体","Waterfallのみ"],"answer":0,"explanation":"リリース頻度と品質向上の両立を目指します。"},
    {"question":"利用者の近くでデータ処理を行い遅延を減らす考え方は?","choices":["エッジコンピューティング","クラウドコンピューティングのみ","グリッドコンピューティングのみ","分散処理のみ"],"answer":0,"explanation":"CDNやIoTなどの分野で活用が進んでいます。"},
    {"question":"障害が発生しても全体が停止しない設計思想を指す用語は?","choices":["冗長化・高可用性","単一障害点設計のみ","スケールダウンのみ","縮退運転のみ"],"answer":0,"explanation":"1箇所の障害がサービス全体を止めないようにします。"},
    {"question":"システム全体を止める唯一の弱点となる箇所を指す用語は?","choices":["単一障害点(SPOF)","冗長構成","高可用性構成","分散構成"],"answer":0,"explanation":"ここが壊れるとシステム全体が停止するリスクがあります。"},
    {"question":"システムが継続して正常稼働できる度合いを示す指標は?","choices":["可用性","拡張性","保守性のみ","移植性のみ"],"answer":0,"explanation":"数値が高いほど停止時間が短いことを示します。"},
    {"question":"システムの利用増加にどれだけ柔軟に対応できるかを示す指標は?","choices":["拡張性(スケーラビリティ)","可用性のみ","機密性のみ","完全性のみ"],"answer":0,"explanation":"アクセス増加時にどれだけ柔軟に対応できるかを示します。"},
    {"question":"定期的にデータを複製して障害に備える作業は?","choices":["バックアップ","スケーリングのみ","モニタリングのみ","キャッシングのみ"],"answer":0,"explanation":"障害発生時にデータを失わないための備えです。"},
    {"question":"災害時などにシステムを復旧させるための計画の略称は?","choices":["BCP(事業継続計画)","SLA単体","KPIのみ","RFCのみ"],"answer":0,"explanation":"平常時から復旧手順や体制を整備しておきます。"},
    {"question":"サービス提供者と利用者間で品質保証を約束する契約の略称は?","choices":["SLA(サービス品質保証)","BCPのみ","NDAのみ","MOUのみ"],"answer":0,"explanation":"稼働率などの数値目標が明記されることが多いです。"},
    {"question":"同時に処理できる接続数など負荷への耐性を確認するテストは?","choices":["負荷テスト","単体テストのみ","静的解析のみ","回帰テストのみ"],"answer":0,"explanation":"想定される最大アクセス数への耐性を確認します。"},
    {"question":"本番環境に近い環境で最終確認を行うテストの段階は?","choices":["ステージング環境でのテスト","開発環境のみ","ローカル環境のみ","サンドボックスのみ"],"answer":0,"explanation":"問題があれば本番反映前に発見できます。"},
    {"question":"アプリの動作を検証するための本番同等の準備環境は?","choices":["ステージング環境","本番環境のみ","テスト用サーバーは不要","開発者のPCのみ"],"answer":0,"explanation":"実データに近いデータで最終確認が行えます。"},
    {"question":"複数のサーバーを1つのまとまりとして扱う構成は?","choices":["クラスタ構成","単体構成のみ","分散構成という別名のみ","モノリシック構成"],"answer":0,"explanation":"1台の故障が全体に影響しにくい構成になります。"},
    {"question":"サーバー機器を提供するデータセンター等の物理拠点を指す用語は?","choices":["データセンター","オフィス","リージョンという意味のみ","ゾーンという意味のみ"],"answer":0,"explanation":"サーバーの設置・運用を専門に行う施設です。"},
    {"question":"クラウド事業者が世界各地に用意する地理的な提供拠点は?","choices":["リージョン","データセンターと同義のみ","ゾーンと同義のみ","エッジのみ"],"answer":0,"explanation":"障害発生時の被害範囲を限定する目的もあります。"},
    {"question":"通信の盗聴を防ぐために行う代表的な対策は?","choices":["通信の暗号化","圧縮","キャッシュ","冗長化のみ"],"answer":0,"explanation":"暗号化により盗聴されても内容を読み取られにくくなります。"},
    {"question":"パスワードなどをハッシュ化して保存する主な目的は?","choices":["漏洩時に元の値を推測されにくくするため","通信速度を上げるため","検索を高速化するため","圧縮率を上げるため"],"answer":0,"explanation":"元のパスワードが漏洩しても中身は分からなくなります。"},
    {"question":"APIキーやパスワードをコードに直接書かず環境変数等で管理する理由は?","choices":["機密情報の漏洩リスクを下げるため","処理速度を上げるため","文字コードを統一するため","デザインを統一するため"],"answer":0,"explanation":"ソースコードの公開時に情報が漏れるのを防ぎます。"},
    {"question":"リクエストとレスポンスの往復1回だけで完結しない継続的通信の代表例は?","choices":["WebSocketによるリアルタイム通信","通常のGETリクエスト","DNS問い合わせ","静的ファイルの配信"],"answer":0,"explanation":"通常のHTTP通信とは異なり接続を維持し続けます。"},
    {"question":"ネットワーク上の通信内容を解析・記録するツールの総称は?","choices":["パケットキャプチャツール","リンター","フォーマッタ","バンドラ"],"answer":0,"explanation":"通信のデバッグやトラブルシューティングに使われます。"},
    {"question":"サーバーの応答時間やエラー率などを可視化する仕組みは?","choices":["監視ダッシュボード","バージョン管理システム","静的サイトジェネレータ","パッケージマネージャ"],"answer":0,"explanation":"問題の早期発見や傾向把握に役立ちます。"},
    {"question":"APIのバージョンをURLパスやヘッダーで管理する目的は?","choices":["後方互換性を保ちながら仕様変更するため","通信速度を上げるため","セキュリティを完全に不要にするため","デザインを統一するため"],"answer":0,"explanation":"利用者に影響を与えずに仕様変更を進められます。"},
    {"question":"複数のリクエストをまとめて1回の通信で処理する手法は?","choices":["バッチ処理・リクエストのまとめ送信","ポーリングのみ","ロングポーリングのみ","ストリーミングのみ"],"answer":0,"explanation":"通信回数を減らしオーバーヘッドを削減できます。"},
    {"question":"一定間隔でサーバーに問い合わせて更新を確認する方式は?","choices":["ポーリング","プッシュ通知のみ","WebSocketのみ","ロードバランシング"],"answer":0,"explanation":"実装が簡単な反面、リアルタイム性はやや劣ります。"},
    {"question":"サーバー側から能動的にクライアントへ通知を送る仕組みは?","choices":["プッシュ通知","ポーリングのみ","リクエスト送信のみ","キャッシュ更新のみ"],"answer":0,"explanation":"サーバー側から即座に変化を伝えられます。"},
    {"question":"サーバーがイベント発生時にテキストストリームで通知するWeb技術は?","choices":["Server-Sent Events","WebSocketのみ","Ajaxのみ","gRPCのみ"],"answer":0,"explanation":"WebSocketより軽量で片方向通信に向いています。"},
    {"question":"ページ全体を再読み込みせず一部だけ非同期にデータ更新する手法は?","choices":["Ajax","SSR単体","CSR単体","SSGのみ"],"answer":0,"explanation":"ページ遷移なしで一部だけ更新できます。"},
    {"question":"サーバー側でHTMLを生成してから返す描画方式は?","choices":["サーバーサイドレンダリング(SSR)","クライアントサイドレンダリングのみ","静的サイト生成のみ","エッジレンダリングのみ"],"answer":0,"explanation":"初回表示速度やSEOに有利とされます。"},
    {"question":"ブラウザ側のJavaScriptで画面を描画する方式は?","choices":["クライアントサイドレンダリング(CSR)","サーバーサイドレンダリングのみ","静的生成のみ","プリレンダリングのみ"],"answer":0,"explanation":"サーバー負荷を抑えつつ動的な操作感を実現できます。"},
    {"question":"ビルド時にあらかじめHTMLを生成しておく手法は?","choices":["静的サイト生成(SSG)","SSRのみ","CSRのみ","ISRのみ限定"],"answer":0,"explanation":"アクセスのたびにHTMLを再生成しないため高速です。"},
    {"question":"システム構成図で処理の流れを表す代表的な図の種類は?","choices":["シーケンス図","円グラフ","ヒートマップ","ヒストグラム"],"answer":0,"explanation":"時系列に沿った処理の流れを表現します。"},
    {"question":"サーバーの冗長構成でメイン機が故障した際、予備機に自動的に切り替える仕組みは?","choices":["フェイルオーバー","ロールバックのみ","ロードバランシングのみ","スケールアウトのみ"],"answer":0,"explanation":"サービス停止時間を最小限に抑えられます。"},
    {"question":"リリースに問題があった際、直前の状態に戻す作業は?","choices":["ロールバック","フェイルオーバーのみ","デプロイのみ","コミットのみ"],"answer":0,"explanation":"問題の影響範囲を最小限に抑える対応です。"},
    {"question":"新機能を一部のユーザーにだけ段階的に公開する手法は?","choices":["カナリアリリース","ビッグバンリリースのみ","ロールバックのみ","ブルーグリーンのみと限定しない"],"answer":0,"explanation":"問題があれば影響を最小限に抑えつつ検証できます。"},
    {"question":"新旧2つの本番環境を用意し切り替えでリリースする手法は?","choices":["ブルーグリーンデプロイメント","カナリアリリースのみ","ローリングアップデートのみ","ホットフィックスのみ"],"answer":0,"explanation":"ダウンタイムなしで切り替えができる利点があります。"},
    {"question":"サーバーを順番に少しずつ新バージョンへ入れ替える手法は?","choices":["ローリングアップデート","ブルーグリーンのみ","カナリアのみ","ビッグバンのみ"],"answer":0,"explanation":"1台ずつ切り替えるためサービスを止めずに更新できます。"},
    {"question":"緊急の不具合修正のためにすぐさま適用するリリースは?","choices":["ホットフィックス","メジャーリリースのみ","マイナーリリースのみ","定期リリースのみ"],"answer":0,"explanation":"通常のリリースサイクルより優先度高く適用されます。"},
    {"question":"バージョン番号「メジャー.マイナー.パッチ」の考え方の名称は?","choices":["セマンティックバージョニング","カレンダーバージョニングのみ","ハッシュバージョニングのみ","ランダムバージョニングのみ"],"answer":0,"explanation":"互換性の破壊有無で番号の意味が変わります。"},
    {"question":"リリース日をもとにバージョン番号を付ける方式は?","choices":["カレンダーバージョニング","セマンティックバージョニングのみ","ハッシュ番号のみ","連番のみ限定"],"answer":0,"explanation":"日付ベースなので更新頻度が分かりやすくなります。"},
    {"question":"ネットワーク機器やサーバーの障害を常時監視し通知するサービスの総称は?","choices":["監視・アラートサービス","バージョン管理サービス","パッケージ配信サービス","デザインツール"],"answer":0,"explanation":"障害の早期発見と迅速な対応につながります。"},
    {"question":"複数のデータセンター間でデータを分散して保持する仕組みは?","choices":["分散ストレージ","単一ストレージのみ","ローカルキャッシュのみ","一時ファイルのみ"],"answer":0,"explanation":"1拠点の障害でもデータを失いにくくなります。"},
    {"question":"システムの応答速度や安定性など非機能的な品質要件を指す用語は?","choices":["非機能要件","機能要件のみ","業務要件のみ","受け入れ基準のみ"],"answer":0,"explanation":"性能や信頼性など機能以外の品質を扱います。"},
    {"question":"利用者が実際に求める機能や動作を定義した要件は?","choices":["機能要件","非機能要件のみ","運用要件のみ","保守要件のみ"],"answer":0,"explanation":"利用者から見た「できること」を定義します。"},
    {"question":"同一のリクエストを何度実行しても結果が変わらない性質を指す用語は?","choices":["冪等性(べきとうせい)","非同期性","再帰性","遅延評価"],"answer":0,"explanation":"決済処理など重要な操作の安全性に関わります。"},
    {"question":"HTTPメソッドのうちGETが一般的に持つとされる性質は?","choices":["安全でデータを変更しない","必ずデータを作成する","必ずデータを削除する","必ずログインが必要になる"],"answer":0,"explanation":"副作用を伴わないためキャッシュしやすい性質です。"},
    {"question":"サーバー間の通信でリクエストの正当性を検証する仕組みの一つは?","choices":["APIキーによる認証","画面のデザイン確認","フォントの検証","画像の圧縮確認"],"answer":0,"explanation":"漏洩・改ざんへの対策として利用されます。"},
    {"question":"ブラウザとサーバー間でやり取りされる暗号化された通信の鍵交換に関わる仕組みは?","choices":["TLSハンドシェイク","DNSルックアップのみ","ARP解決のみ","NATのみ"],"answer":0,"explanation":"公開鍵暗号を使って安全に鍵を共有します。"},
    {"question":"証明書の有効性をブラウザが確認する際に利用する情報の一つは?","choices":["発行元の認証局と有効期限","画面の解像度","サーバーのCPU使用率","ページの文字数"],"answer":0,"explanation":"有効期限切れや不正な証明書は警告が表示されます。"},
    {"question":"1つのサーバーに複数のドメインを共存させ、ホスト名で振り分ける仕組みは?","choices":["バーチャルホスト","マルチテナントのみ","ロードバランシングのみ","CDNのみ"],"answer":0,"explanation":"限られたIPアドレスでも多数のサイトを運用できます。"},
    {"question":"1つのシステム基盤を複数の顧客で共有しつつデータを分離する構成は?","choices":["マルチテナント構成","バーチャルホストのみ","シングルテナント構成のみ","オンプレミス構成のみ"],"answer":0,"explanation":"インフラコストを抑えつつ顧客ごとにデータを分離します。"},
    {"question":"利用者ごとに専用の環境を用意する構成は?","choices":["シングルテナント構成","マルチテナント構成のみ","共有ホスティングのみ","サーバーレスのみ"],"answer":0,"explanation":"セキュリティ要件が厳しい業種で選ばれやすい構成です。"},
    {"question":"Webサイトのドメイン全体を一括りにして扱う単位を指す用語は?","choices":["オリジン(スキーム・ホスト・ポートの組)","パスのみ","クエリのみ","フラグメントのみ"],"answer":0,"explanation":"プロトコル・ホスト・ポートの組み合わせで判定されます。"},
    {"question":"ネットワーク上で送信データを小さな単位に分割したものは?","choices":["パケット","フレームという別名のみ限定","セグメントという別名のみ限定","バイト列という意味のみ"],"answer":0,"explanation":"ネットワーク層で扱われるデータの基本単位です。"},
    {"question":"TCP層でのデータの単位を指す用語は?","choices":["セグメント","パケットという別名のみ限定","フレームという別名のみ限定","ビット列という意味のみ"],"answer":0,"explanation":"送信元・宛先ポート番号などの情報を含みます。"},
    {"question":"データリンク層でのデータの単位を指す用語は?","choices":["フレーム","パケットという別名のみ限定","セグメントという別名のみ限定","ペイロードのみ"],"answer":0,"explanation":"MACアドレスなどの情報を含みます。"},
    {"question":"HTTP/2で導入され複数のリクエストを1本の接続で並行処理できる仕組みは?","choices":["多重化(マルチプレキシング)","圧縮のみ","キャッシュのみ","リダイレクトのみ"],"answer":0,"explanation":"ページの読み込み速度向上に貢献します。"},
    {"question":"HTTP通信を高速化するためヘッダー情報を圧縮する技術は?","choices":["HPACK等のヘッダー圧縮","gzip限定のみ","Brotli限定のみ","Base64限定のみ"],"answer":0,"explanation":"繰り返し送信されるヘッダー情報の重複を減らします。"},
    {"question":"テキストデータを圧縮して転送量を減らす代表的な方式は?","choices":["gzip圧縮","Base64エンコードのみ","URLエンコードのみ","JSONシリアライズのみ"],"answer":0,"explanation":"画像は既に圧縮済みのため効果が薄いことが多いです。"},
    {"question":"バイナリデータをテキストとして安全にやり取りするための符号化方式は?","choices":["Base64","gzip限定のみ","UTF-8限定のみ","ASCII限定のみ"],"answer":0,"explanation":"メール添付ファイルなどにも使われる符号化方式です。"},
    {"question":"URLに使えない文字を安全な形式に変換する処理は?","choices":["URLエンコード","Base64エンコードのみ","gzip圧縮のみ","ハッシュ化のみ"],"answer":0,"explanation":"日本語や記号などをパーセントエンコードします。"},
    {"question":"サーバーがダウンした際に自動で別のサーバーに切り替える仕組みの総称は?","choices":["フェイルオーバー機構","スケールアップのみ","キャッシュ機構のみ","圧縮機構のみ"],"answer":0,"explanation":"サービス継続性の向上に直結します。"},
    {"question":"システムの稼働率を「99.9%」のように表す考え方の俗称は?","choices":["ナイン(9)の数で表す可用性","パーセンタイル分析のみ","SLIのみ限定","エラーバジェットのみ限定"],"answer":0,"explanation":"障害許容の目標値として使われることが多い表現です。"},
    {"question":"サービスの信頼性向上を専門に扱うエンジニアリング分野の略称は?","choices":["SRE(Site Reliability Engineering)","DevOpsと同一語のみ","QAのみ限定","CSのみ限定"],"answer":0,"explanation":"インフラの信頼性と開発速度の両立を目指します。"},
    {"question":"本番環境で発生した障害の原因究明と再発防止をまとめる報告書は?","choices":["ポストモーテム(振り返り報告書)","SLAのみ","KPIレポートのみ","議事録のみ"],"answer":0,"explanation":"再発防止策の検討にも役立ちます。"},
    {"question":"APIやサービスの仕様を第三者が理解できるようまとめた文書は?","choices":["APIドキュメント","コミットログのみ","テストコードのみ","デザインファイルのみ"],"answer":0,"explanation":"開発者が実装を進める際の参照資料になります。"},
    {"question":"サーバー証明書が正規のものかを検証する処理全般を指す用語は?","choices":["証明書検証","パケットキャプチャのみ","ポートスキャンのみ","ロードテストのみ"],"answer":0,"explanation":"中間者攻撃を防ぐための重要なプロセスです。"},
    {"question":"外部からの不正な侵入を検知する仕組みの略称は?","choices":["IDS(侵入検知システム)","IPS単体のみ","VPN単体のみ","WAF単体のみ"],"answer":0,"explanation":"不審な通信を検知し管理者に通知します。"},
    {"question":"検知だけでなく防御まで行う仕組みの略称は?","choices":["IPS(侵入防止システム)","IDS単体のみ","DNS単体のみ","CDN単体のみ"],"answer":0,"explanation":"検知した攻撃を自動的にブロックします。"},
    {"question":"Webアプリケーションへの攻撃を検知・遮断する専用の仕組みは?","choices":["WAF(Webアプリケーションファイアウォール)","IDS単体のみ","VPN単体のみ","NAT単体のみ"],"answer":0,"explanation":"SQLインジェクションやXSSなどを防ぎます。"},
    {"question":"大量のリクエストを送りつけてサービスを利用不能にする攻撃は?","choices":["DoS攻撃 / DDoS攻撃","フィッシング攻撃のみ","SQLインジェクションのみ","XSS攻撃のみ"],"answer":0,"explanation":"サービスを一時的に利用不能にすることを狙います。"},
    {"question":"複数の攻撃元から一斉に攻撃を行う分散型の妨害攻撃の略称は?","choices":["DDoS攻撃","DoS攻撃(単一)のみ","MITM攻撃のみ","総当たり攻撃のみ"],"answer":0,"explanation":"単一の攻撃元によるDoSより防御が難しいとされます。"},
    {"question":"サービス利用状況をリアルタイムで可視化するツールの一般的な呼び方は?","choices":["ダッシュボード","リポジトリのみ","パッケージレジストリのみ","コンパイラのみ"],"answer":0,"explanation":"経営層や運用チームが状況を一目で把握できます。"},
    {"question":"利用者数やアクセス数などのビジネス指標を追跡する仕組みは?","choices":["アクセス解析ツール","コンパイラのみ","リンターのみ","バンドラのみ"],"answer":0,"explanation":"サービス改善の意思決定に活用されます。"},
    {"question":"サービスの応答時間やエラー率など計測可能な指標を指す用語は?","choices":["メトリクス","ログという意味のみ限定","トレースという意味のみ限定","アラートという意味のみ限定"],"answer":0,"explanation":"サービスの健全性を数値で客観的に把握できます。"},
    {"question":"リクエストがシステム内をどう処理されたか追跡する仕組みは?","choices":["分散トレーシング","メトリクス収集のみ","ログ収集のみ限定","アラート通知のみ"],"answer":0,"explanation":"障害発生箇所の特定を容易にします。"},
    ]
  },
  {
    name: "セキュリティ",
    color: "#E64980",
    questions: [
    {"question":"Webページに悪意あるスクリプトを埋め込む攻撃手法は?","choices":["XSS(クロスサイトスクリプティング)","CSRF","SQLインジェクション","DNSスプーフィング"],"answer":0,"explanation":"入力フォームなどに悪意あるコードを埋め込む代表的な攻撃です。"},
    {"question":"ログイン済みユーザーに意図しないリクエストを送らせる攻撃は?","choices":["CSRF(クロスサイトリクエストフォージェリ)","XSS","SQLインジェクション","クリックジャッキング"],"answer":0,"explanation":"利用者が意図しない操作をさせられてしまう攻撃です。"},
    {"question":"不正なSQL文を入力欄経由で実行させる攻撃は?","choices":["SQLインジェクション","XSS","CSRF","バッファオーバーフロー"],"answer":0,"explanation":"データベースを不正に操作・閲覧される恐れがあります。"},
    {"question":"透明な要素を重ねてクリックを誤誘導する攻撃は?","choices":["クリックジャッキング","CSRF","XSS","フィッシング"],"answer":0,"explanation":"見た目と実際のクリック先をずらして誤操作を誘発します。"},
    {"question":"正規のサイトを装って個人情報をだまし取る手口は?","choices":["フィッシング","クリックジャッキング","CSRF","SQLインジェクション"],"answer":0,"explanation":"偽サイトに誘導しID・パスワードなどを盗みます。"},
    {"question":"通信の間に割り込んで盗聴・改ざんする攻撃の略称は?","choices":["MITM(中間者攻撃)","DDoS攻撃","ゼロデイ攻撃","リプレイ攻撃(別分類)"],"answer":0,"explanation":"暗号化していても内容を盗聴・改ざんされる恐れがあります。"},
    {"question":"自己増殖してファイルに寄生するマルウェアの種類は?","choices":["ウイルス","ワーム","トロイの木馬","ランサムウェア"],"answer":0,"explanation":"感染したファイルを開くことで他のファイルにも広がります。"},
    {"question":"ネットワークを介して自律的に自己増殖するマルウェアの種類は?","choices":["ワーム","ウイルス","スパイウェア","アドウェア"],"answer":0,"explanation":"人の操作を介さずネットワーク越しに拡散します。"},
    {"question":"無害なソフトを装って侵入するマルウェアの種類は?","choices":["トロイの木馬","ワーム","ウイルス","ボット"],"answer":0,"explanation":"インストール後に不正な動作を開始します。"},
    {"question":"データを暗号化して身代金を要求するマルウェアは?","choices":["ランサムウェア","スパイウェア","アドウェア","ワーム"],"answer":0,"explanation":"復号のための身代金を要求してくる悪質なマルウェアです。"},
    {"question":"利用者の情報を密かに収集して外部へ送信するマルウェアは?","choices":["スパイウェア","ランサムウェア","ワーム","ウイルス"],"answer":0,"explanation":"個人情報やログイン情報が盗まれる恐れがあります。"},
    {"question":"意図しない広告を大量に表示するマルウェアは?","choices":["アドウェア","スパイウェア","ランサムウェア","ルートキット"],"answer":0,"explanation":"利用者の閲覧を妨げたり不正収益を狙ったりします。"},
    {"question":"システムの深部に潜み管理者権限で不正動作を隠すマルウェアは?","choices":["ルートキット","アドウェア","ワーム","トロイの木馬"],"answer":0,"explanation":"検出や駆除が難しいことで知られています。"},
    {"question":"キー入力を記録して盗み取るマルウェアは?","choices":["キーロガー","ルートキット","アドウェア","スパイウェアと完全に別物"],"answer":0,"explanation":"パスワードなどの重要情報が盗まれる原因になります。"},
    {"question":"乗っ取られた多数の端末で構成される攻撃用ネットワークは?","choices":["ボットネット","VPN網","CDN網","サブネット"],"answer":0,"explanation":"DDoS攻撃などに悪用される踏み台の集合体です。"},
    {"question":"暗号化と復号に同じ鍵を使う方式は?","choices":["共通鍵暗号方式","公開鍵暗号方式","ハッシュ方式","電子署名方式"],"answer":0,"explanation":"処理速度は速いですが鍵の受け渡しに注意が必要です。"},
    {"question":"暗号化と復号に異なる鍵(公開鍵・秘密鍵)を使う方式は?","choices":["公開鍵暗号方式","共通鍵暗号方式","ハッシュ方式","対称鍵方式"],"answer":0,"explanation":"鍵配送問題を解決できる一方、処理は比較的重くなります。"},
    {"question":"広く使われる共通鍵暗号方式の代表的なアルゴリズムは?","choices":["AES","RSA","SHA-256","MD5"],"answer":0,"explanation":"高速で安全性が高く広く採用されています。"},
    {"question":"広く使われる公開鍵暗号方式の代表的なアルゴリズムは?","choices":["RSA","AES","SHA-256","Base64"],"answer":0,"explanation":"デジタル署名や鍵交換にも利用されます。"},
    {"question":"元のデータを復元できない一方向の変換方式は?","choices":["ハッシュ関数","共通鍵暗号","公開鍵暗号","エンコード"],"answer":0,"explanation":"パスワードの保存などに広く利用されています。"},
    {"question":"広く使われるハッシュ関数の一つで現在は脆弱とされているのは?","choices":["MD5","AES","RSA","TLS"],"answer":0,"explanation":"衝突が発見されており現在は非推奨とされています。"},
    {"question":"現在推奨されている安全性の高いハッシュ関数群は?","choices":["SHA-256などSHA-2系列","MD5系列のみ","Base64系列のみ","CRC32系列のみ"],"answer":0,"explanation":"データの改ざん検知などにも利用されます。"},
    {"question":"パスワードのハッシュ化時にランダムな値を加える技術は?","choices":["ソルト","ペッパーのみ限定","キー導出関数のみ限定","IVのみ限定"],"answer":0,"explanation":"同じパスワードでも異なるハッシュ値になるようにします。"},
    {"question":"本人であることを確認するプロセスは?","choices":["認証(Authentication)","認可(Authorization)","監査(Audit)","暗号化(Encryption)"],"answer":0,"explanation":"IDとパスワードの組み合わせで確認するのが一般的です。"},
    {"question":"認証された利用者に何が許可されるかを決めるプロセスは?","choices":["認可(Authorization)","認証(Authentication)","監査(Audit)","識別(Identification)"],"answer":0,"explanation":"権限がなければ認証を通過してもアクセスできません。"},
    {"question":"パスワードに加えてもう1つの要素で本人確認する仕組みは?","choices":["多要素認証(MFA/2FA)","シングルサインオンのみ","認可のみ","暗号化のみ"],"answer":0,"explanation":"パスワードが漏れても不正ログインを防ぎやすくなります。"},
    {"question":"1度のログインで複数のサービスを利用できる仕組みの略称は?","choices":["SSO(シングルサインオン)","MFAのみ","OAuthのみに限定","PKIのみに限定"],"answer":0,"explanation":"複数サービスごとにログインする手間を省けます。"},
    {"question":"外部サービスへのアクセス権限を安全に委譲するための標準規格は?","choices":["OAuth","SAMLのみに限定","LDAPのみに限定","Kerberosのみに限定"],"answer":0,"explanation":"パスワードそのものを渡さずに済むのが利点です。"},
    {"question":"考えられる組み合わせを総当たりで試すパスワード攻撃は?","choices":["ブルートフォース攻撃","辞書攻撃という別物のみ","レインボーテーブル攻撃のみ","フィッシング攻撃のみ"],"answer":0,"explanation":"文字数が多いほど解読に時間がかかります。"},
    {"question":"よく使われる単語リストを使ってパスワードを試す攻撃は?","choices":["辞書攻撃","ブルートフォース攻撃のみ","リプレイ攻撃のみ","ソーシャルエンジニアリングのみ"],"answer":0,"explanation":"よくあるパスワードほど短時間で破られやすくなります。"},
    {"question":"事前計算したハッシュ値の表を使って高速に解析する攻撃は?","choices":["レインボーテーブル攻撃","辞書攻撃のみ","ブルートフォース攻撃のみ","MITM攻撃のみ"],"answer":0,"explanation":"ソルトを使うことでこの攻撃を防ぎやすくなります。"},
    {"question":"人の心理的な隙をついて情報を引き出す攻撃手法の総称は?","choices":["ソーシャルエンジニアリング","フィッシングのみに限定","なりすましのみに限定","スプーフィングのみに限定"],"answer":0,"explanation":"技術的な対策だけでは防ぎきれない場合があります。"},
    {"question":"修正パッチが存在しない未知の脆弱性を突く攻撃は?","choices":["ゼロデイ攻撃","ブルートフォース攻撃のみ","リプレイ攻撃のみ","DoS攻撃のみ"],"answer":0,"explanation":"事前の対策が難しく被害が大きくなりやすい攻撃です。"},
    {"question":"ソフトウェアの脆弱性情報を一意な番号で管理する国際的な仕組みは?","choices":["CVE","CVSSのみに限定","OWASPのみに限定","NISTのみに限定"],"answer":0,"explanation":"CVE番号として世界共通で識別されます。"},
    {"question":"脆弱性の深刻度を数値で評価する共通基準は?","choices":["CVSS","CVEのみに限定","ISO27001のみに限定","PCI DSSのみに限定"],"answer":0,"explanation":"スコアが高いほど緊急度の高い対応が求められます。"},
    {"question":"Web関連の代表的な脆弱性をまとめたリストを公開する団体は?","choices":["OWASP","IETFのみに限定","W3Cのみに限定","ISOのみに限定"],"answer":0,"explanation":"OWASP Top 10などのリストが広く参照されています。"},
    {"question":"システムやアプリの弱点そのものを指す用語は?","choices":["脆弱性","エクスプロイト","インシデント","リスク評価"],"answer":0,"explanation":"放置すると攻撃に悪用される可能性があります。"},
    {"question":"脆弱性を実際に悪用するための攻撃コードや手法を指す用語は?","choices":["エクスプロイト","脆弱性そのもの","インシデント","パッチ"],"answer":0,"explanation":"脆弱性があっても実際に悪用されなければ被害は出ません。"},
    {"question":"セキュリティ上の問題が実際に発生した事象を指す用語は?","choices":["インシデント","脆弱性","エクスプロイト","パッチ"],"answer":0,"explanation":"脆弱性やエクスプロイトの結果として発生します。"},
    {"question":"許可された専門家がシステムへの侵入を試みて弱点を洗い出すテストは?","choices":["ペネトレーションテスト","ユニットテストのみ","負荷テストのみ","静的解析のみ"],"answer":0,"explanation":"実際に攻撃を模擬して弱点を発見します。"},
    {"question":"必要最小限の権限だけを与えるセキュリティ原則は?","choices":["最小権限の原則","多層防御の原則のみ","ゼロトラストの原則のみ","職務分離の原則のみ"],"answer":0,"explanation":"万一侵害されても被害範囲を最小限に抑えられます。"},
    {"question":"複数の防御層を重ねて突破を難しくする考え方は?","choices":["多層防御(Defense in Depth)","最小権限の原則のみ","ゼロトラストのみ","サンドボックスのみ"],"answer":0,"explanation":"1つの層が破られても他の層で防御できます。"},
    {"question":"内部・外部を問わずすべての通信を信頼しない前提で検証する考え方は?","choices":["ゼロトラストモデル","多層防御のみ","最小権限のみ","境界防御モデルのみ"],"answer":0,"explanation":"内部ネットワークだからといって無条件に信頼しません。"},
    {"question":"隠しておくことだけに頼る危険な安全対策の考え方は?","choices":["security by obscurity(隠蔽によるセキュリティ)","多層防御","最小権限の原則","ゼロトラストモデル"],"answer":0,"explanation":"仕組みを知られると簡単に突破されてしまいます。"},
    {"question":"不審なプログラムを隔離された環境で安全に実行・検証する仕組みは?","choices":["サンドボックス","ファイアウォールのみ","VPNのみ","WAFのみ"],"answer":0,"explanation":"実環境に影響を与えずに動作を確認できます。"},
    {"question":"パスワード入力を人間かどうか判定するために使われる仕組みは?","choices":["CAPTCHA","2FAのみに限定","SSOのみに限定","WAFのみに限定"],"answer":0,"explanation":"自動化された不正ログイン試行の防止に役立ちます。"},
    {"question":"攻撃者をおびき寄せて手口を観察するために設置する偽のシステムは?","choices":["ハニーポット","サンドボックスのみ","ファイアウォールのみ","IDSのみに限定"],"answer":0,"explanation":"実際の被害を防ぎつつ手口の分析ができます。"},
    {"question":"想定される脅威を洗い出し対策を検討する活動は?","choices":["脅威モデリング","ペネトレーションテストのみ","脆弱性診断のみ","監査ログ確認のみ"],"answer":0,"explanation":"事前に弱点を把握し優先度をつけて対策できます。"},
    {"question":"組織のセキュリティ運用を専門に担う部門・チームの略称は?","choices":["SOC(セキュリティオペレーションセンター)","SREのみに限定","QAのみに限定","CSIRTと完全に同一のみ"],"answer":0,"explanation":"24時間体制で監視を行うことが多いです。"},
    {"question":"インシデント発生時に対応する専門チームの略称は?","choices":["CSIRT","SOCと完全に同一のみ","SREのみに限定","DevOpsのみに限定"],"answer":0,"explanation":"被害の封じ込めと復旧を専門的に担当します。"},
    {"question":"誰が・いつ・何を行ったかを記録し後から検証できるようにする仕組みは?","choices":["監査ログ","キャッシュログのみ","アクセス解析のみ","デバッグログのみ"],"answer":0,"explanation":"不正アクセスの調査や説明責任の履行に役立ちます。"},
    {"question":"Cookieに付与しJavaScriptからのアクセスを禁止するフラグは?","choices":["HttpOnly","Secureのみ","SameSiteのみ","Path属性のみ"],"answer":0,"explanation":"XSSによるCookie盗難を防ぐ効果があります。"},
    {"question":"Cookieに付与しHTTPS通信でのみ送信させるフラグは?","choices":["Secure","HttpOnlyのみ","SameSiteのみ","Domain属性のみ"],"answer":0,"explanation":"通信の盗聴によるCookie漏洩を防ぎます。"},
    {"question":"Cookieがクロスサイトで送信されるかを制御する属性は?","choices":["SameSite","Secureのみ","HttpOnlyのみ","Expiresのみ"],"answer":0,"explanation":"CSRF対策としても効果があります。"},
    {"question":"リクエストが正規のフォームから送信されたか検証するために埋め込む値は?","choices":["CSRFトークン","セッションIDのみに限定","APIキーのみに限定","JWTのみに限定"],"answer":0,"explanation":"推測されにくいランダムな値が使われます。"},
    {"question":"異なるオリジン間のスクリプトによる干渉を防ぐブラウザの基本方針は?","choices":["同一オリジンポリシー","CORSのみに限定","CSPのみに限定","SOP以外の名称のみ"],"answer":0,"explanation":"別オリジンのスクリプトから直接データを読めなくします。"},
    {"question":"特定のオリジンからのアクセスを許可・制限する仕組みは?","choices":["CORS","CSPのみに限定","SOPのみに限定","WAFのみに限定"],"answer":0,"explanation":"必要なオリジンだけ明示的に許可します。"},
    {"question":"読み込み可能なスクリプトやリソースの送信元を制限するHTTPヘッダーは?","choices":["Content-Security-Policy","X-Frame-Optionsのみ限定","Strict-Transport-Securityのみ限定","Referrer-Policyのみ限定"],"answer":0,"explanation":"XSS対策として有効なヘッダーです。"},
    {"question":"リファラー情報の送信範囲を制御するHTTPヘッダーは?","choices":["Referrer-Policy","Content-Security-Policyのみ限定","X-Frame-Optionsのみ限定","Set-Cookieのみ限定"],"answer":0,"explanation":"個人情報を含むURLが外部サイトへ漏れるのを防げます。"},
    {"question":"OSのファイルパス指定を悪用し許可外のファイルへアクセスする攻撃は?","choices":["ディレクトリトラバーサル","SQLインジェクションのみ","XSSのみ","CSRFのみ"],"answer":0,"explanation":"「../」などを使い意図しないファイルにアクセスします。"},
    {"question":"確保したメモリ領域を超えてデータを書き込ませる攻撃は?","choices":["バッファオーバーフロー","ディレクトリトラバーサルのみ","SQLインジェクションのみ","CSRFのみ"],"answer":0,"explanation":"古典的だが今も注意が必要な脆弱性です。"},
    {"question":"外部から受け取ったデータをそのまま安全でない形でオブジェクト化する脆弱性は?","choices":["安全でないデシリアライゼーション","XSSのみ","CSRFのみ","クリックジャッキングのみ"],"answer":0,"explanation":"信頼できない入力をそのまま復元すると危険です。"},
    {"question":"XML文書の外部実体参照を悪用する攻撃の略称は?","choices":["XXE攻撃","XSS攻撃のみ","CSRF攻撃のみ","SSRF攻撃のみ"],"answer":0,"explanation":"外部ファイルの読み込みを通じて機密情報が漏れることがあります。"},
    {"question":"サーバー自身に内部リソースへのリクエストを送らせる攻撃の略称は?","choices":["SSRF攻撃","XXE攻撃のみ","CSRF攻撃のみ","XSS攻撃のみ"],"answer":0,"explanation":"内部の管理画面などへ不正にアクセスされる恐れがあります。"},
    {"question":"適切に設定されていないサーバー設定を突かれる脆弱性の分類は?","choices":["セキュリティの設定ミス","認可の不備という別分類のみ","認証の不備という別分類のみ","暗号化の不備という別分類のみ"],"answer":0,"explanation":"初期設定のまま運用すると狙われやすくなります。"},
    {"question":"本来アクセスできないはずのデータへ到達できてしまう不備は?","choices":["アクセス制御の不備","暗号化の不備のみ","設定ミスのみ","ログ不備のみ"],"answer":0,"explanation":"認可(権限確認)の実装漏れが主な原因です。"},
    {"question":"暗号化されるべき重要情報が平文のまま扱われる問題は?","choices":["機密データの露出","アクセス制御の不備のみ","設定ミスのみ","認証の不備のみ"],"answer":0,"explanation":"暗号化の実装漏れが典型的な原因です。"},
    {"question":"権限を持たないはずのユーザーが管理者権限などを得てしまう攻撃は?","choices":["権限昇格(Privilege Escalation)","セッションハイジャックのみ","リプレイ攻撃のみ","クリックジャッキングのみ"],"answer":0,"explanation":"最悪の場合システム全体を制御される恐れがあります。"},
    {"question":"有効なセッションIDを盗んで正規ユーザーになりすます攻撃は?","choices":["セッションハイジャック","権限昇格のみ","フィッシングのみ","リプレイ攻撃のみ"],"answer":0,"explanation":"公共Wi-Fiなどでは特にリスクが高まります。"},
    {"question":"正規の通信データを再送信して不正に処理させる攻撃は?","choices":["リプレイ攻撃","セッションハイジャックのみ","権限昇格のみ","MITM攻撃のみに限定"],"answer":0,"explanation":"通信内容を保存しておき後から悪用します。"},
    {"question":"DNSの応答を偽装して不正なサイトへ誘導する攻撃は?","choices":["DNSスプーフィング(キャッシュポイズニング)","ARPスプーフィングのみ","IPスプーフィングのみ","MACスプーフィングのみ"],"answer":0,"explanation":"フィッシングサイトへ誘導される被害につながります。"},
    {"question":"ローカルネットワーク内でMACアドレス情報を偽装する攻撃は?","choices":["ARPスプーフィング","DNSスプーフィングのみ","IPスプーフィングのみ","セッションハイジャックのみ"],"answer":0,"explanation":"同一セグメント内での通信傍受に使われます。"},
    {"question":"送信元IPアドレスを偽装して身元を隠す手法は?","choices":["IPスプーフィング","DNSスプーフィングのみ","ARPスプーフィングのみ","MACスプーフィングのみ"],"answer":0,"explanation":"アクセス制限の回避などに悪用されることがあります。"},
    {"question":"組織の取引先や委託先を経由して侵入される攻撃の分類は?","choices":["サプライチェーン攻撃","内部不正のみ","ゼロデイ攻撃のみ","DDoS攻撃のみ"],"answer":0,"explanation":"信頼関係を悪用され気づきにくいのが特徴です。"},
    {"question":"組織内部の人間による意図的な情報漏洩や妨害行為の総称は?","choices":["インサイダー脅威","サプライチェーン攻撃のみ","ゼロデイ攻撃のみ","外部委託リスクのみ"],"answer":0,"explanation":"外部からの攻撃より発見が遅れやすい傾向があります。"},
    {"question":"重要なネットワークを他と物理的に切り離す対策は?","choices":["ネットワークの分離(セグメンテーション)","多要素認証のみ","暗号化のみ","監査ログのみ"],"answer":0,"explanation":"インターネット経由の攻撃を物理的に遮断できます。"},
    {"question":"本番データの一部を偽の値に置き換えて開発・テストに使う手法は?","choices":["データマスキング","データ暗号化のみに限定","データ圧縮のみ","データバックアップのみ"],"answer":0,"explanation":"開発環境に本物の個人情報を持ち込むリスクを減らせます。"},
    {"question":"実データを別の代替値(トークン)に置き換えて保護する技術は?","choices":["トークナイゼーション","データマスキングという同義語のみ","ハッシュ化という同義語のみ","暗号化という同義語のみ"],"answer":0,"explanation":"漏洩しても元のデータには戻せません。"},
    {"question":"通信経路上のデータを保護する暗号化を指す用語は?","choices":["転送中のデータ暗号化(暗号化通信)","保存データの暗号化のみに限定","処理中のデータ暗号化のみに限定","圧縮のみに限定"],"answer":0,"explanation":"盗聴されても内容を読み取られにくくなります。"},
    {"question":"サーバーやディスクに保存されているデータを保護する暗号化を指す用語は?","choices":["保存データの暗号化","転送中のデータ暗号化のみに限定","処理中のデータ暗号化のみに限定","キャッシュのみに限定"],"answer":0,"explanation":"物理的な盗難時にもデータを保護できます。"},
    {"question":"暗号鍵の生成・保管・更新・廃棄を適切に行う一連の管理を指す用語は?","choices":["鍵管理(キーマネジメント)","証明書発行のみに限定","パスワードポリシーのみに限定","アクセス制御のみに限定"],"answer":0,"explanation":"鍵の漏洩は暗号化全体の安全性を脅かします。"},
    {"question":"デジタル証明書を発行・管理する公開鍵基盤の略称は?","choices":["PKI","CAのみに限定","SSLのみに限定","TLSのみに限定"],"answer":0,"explanation":"証明書の発行から失効までを一元的に管理します。"},
    {"question":"送信者が本人であることと改ざんがないことを証明する仕組みは?","choices":["電子署名","電子証明書という別物のみ","ハッシュ関数という別物のみ","共通鍵暗号という別物のみ"],"answer":0,"explanation":"改ざんがあれば署名検証で検知できます。"},
    {"question":"指紋や顔などの身体的特徴を用いる認証方式の総称は?","choices":["生体認証","多要素認証という同義語のみ","多段階認証という同義語のみ","所持認証という別分類のみ"],"answer":0,"explanation":"パスワードと組み合わせた多要素認証にも使われます。"},
    {"question":"IDとパスワードだけに頼らず「知識・所持・生体」を組み合わせる考え方は?","choices":["多要素認証","シングルサインオンのみ","認可のみ","暗号化のみ"],"answer":0,"explanation":"どれか1つが破られても他の要素で防げます。"},
    {"question":"セキュリティ更新プログラムを適用し脆弱性を塞ぐ作業は?","choices":["パッチ適用(セキュリティアップデート)","バックアップのみに限定","監査のみに限定","暗号化のみに限定"],"answer":0,"explanation":"未適用のままだと既知の攻撃に狙われやすくなります。"},
    {"question":"個人情報の取り扱いに関する代表的なEUの規則の略称は?","choices":["GDPR","PCI DSSのみに限定","HIPAAのみに限定","SOXのみに限定"],"answer":0,"explanation":"違反時には高額な制裁金が科されることがあります。"},
    {"question":"クレジットカード情報の取り扱いに関する国際的なセキュリティ基準は?","choices":["PCI DSS","GDPRのみに限定","ISO27001のみに限定","NISTのみに限定"],"answer":0,"explanation":"カード情報を扱う事業者は準拠が求められます。"},
    {"question":"情報セキュリティマネジメントに関する国際規格は?","choices":["ISO/IEC 27001","PCI DSSのみに限定","GDPRのみに限定","SOC2のみに限定"],"answer":0,"explanation":"PDCAサイクルによる継続的改善が特徴です。"},
    {"question":"端末(PCやスマホ)そのものを保護するセキュリティ対策の総称は?","choices":["エンドポイントセキュリティ","ネットワークセキュリティのみに限定","クラウドセキュリティのみに限定","物理セキュリティのみに限定"],"answer":0,"explanation":"紛失・盗難対策やマルウェア対策が含まれます。"},
    {"question":"ウイルスなどの既知の脅威をパターン照合で検出するソフトの総称は?","choices":["アンチウイルスソフト","ファイアウォールのみ","IDSのみに限定","WAFのみに限定"],"answer":0,"explanation":"未知の脅威には対応しづらい面があります。"},
    {"question":"新種のマルウェアを振る舞いから検知する手法は?","choices":["ヒューリスティック検知(振る舞い検知)","パターンマッチングのみに限定","シグネチャ検知のみに限定","ホワイトリスト方式のみに限定"],"answer":0,"explanation":"シグネチャにない新種の脅威にも対応しやすくなります。"},
    {"question":"既知のマルウェアの特徴パターンと照合して検知する手法は?","choices":["シグネチャ検知","ヒューリスティック検知のみに限定","サンドボックス解析のみに限定","ゼロトラスト検証のみに限定"],"answer":0,"explanation":"既知の脅威には高速かつ正確に対応できます。"},
    {"question":"許可したものだけを実行・通過させる考え方は?","choices":["ホワイトリスト方式","ブラックリスト方式のみに限定","グレーリスト方式のみに限定","オープン方式のみに限定"],"answer":0,"explanation":"未知の脅威をブロックしやすい一方、利便性は下がります。"},
    {"question":"禁止するものだけを列挙して他を許可する考え方は?","choices":["ブラックリスト方式","ホワイトリスト方式のみに限定","ゼロトラスト方式のみに限定","最小権限方式のみに限定"],"answer":0,"explanation":"新しい脅威への対応が後手になりやすい面があります。"},
    {"question":"従業員に情報セキュリティの知識を習得させる取り組みは?","choices":["セキュリティ教育・意識向上研修","ペネトレーションテストのみに限定","脆弱性診断のみに限定","監査のみに限定"],"answer":0,"explanation":"人為的ミスによる被害を減らす効果が期待できます。"},
    {"question":"データ漏洩などの事故が起きた際、公表・報告する対応の総称は?","choices":["インシデント対応・情報開示","バックアップのみに限定","暗号化のみに限定","監視のみに限定"],"answer":0,"explanation":"信頼回復のためにも迅速な対応が求められます。"},
    {"question":"無線LANの暗号化規格として現在推奨される新しい規格は?","choices":["WPA3","WEP","WPA(初代)","暗号化なし運用"],"answer":0,"explanation":"128ビット鍵長でより強固な暗号化を採用しています。"},
    {"question":"無線LANの暗号化規格の中で脆弱性が多く非推奨とされるのは?","choices":["WEP","WPA2","WPA3","802.1X"],"answer":0,"explanation":"現在では多くの環境で使用が避けられています。"},
    {"question":"通過させるパケットをルールに基づき単純に許可・拒否するファイアウォール方式は?","choices":["パケットフィルタリング型","ステートフルインスペクション型のみ限定","アプリケーションゲートウェイ型のみ限定","WAF型のみ限定"],"answer":0,"explanation":"設定が単純な反面、なりすましなどには弱い面があります。"},
    {"question":"通信の状態(セッション)を考慮して判定するファイアウォール方式は?","choices":["ステートフルインスペクション型","パケットフィルタリング型のみ限定","サーキットレベル型のみ限定","プロキシ型のみ限定"],"answer":0,"explanation":"より高度な攻撃を検知できる反面、負荷はやや高くなります。"},
    {"question":"外部から受け取った入力値が想定通りか検証する処理は?","choices":["入力バリデーション","出力エンコードのみ限定","サニタイズという同義語のみ","エスケープという同義語のみ"],"answer":0,"explanation":"不正な値やSQLインジェクションなどを未然に防ぎます。"},
    {"question":"画面表示前に特殊文字を無害な形式に変換する処理は?","choices":["出力エスケープ(エンコード)","入力バリデーションのみ限定","認可処理のみ限定","監査ログ記録のみ限定"],"answer":0,"explanation":"XSS対策として欠かせない処理です。"},
    {"question":"開発の初期段階からセキュリティを組み込む設計思想は?","choices":["セキュリティ・バイ・デザイン","プライバシー・バイ・デザインという別概念のみ","ゼロトラストという別概念のみ","多層防御という別概念のみ"],"answer":0,"explanation":"後から対策を追加するより手戻りが少なくなります。"},
    {"question":"設計段階から個人情報保護を組み込む考え方は?","choices":["プライバシー・バイ・デザイン","セキュリティ・バイ・デザインという別概念のみ","ゼロトラストという別概念のみ","データマスキングという別概念のみ"],"answer":0,"explanation":"収集する個人情報を必要最小限にとどめる考え方も含みます。"},
    {"question":"特定の個人を識別できないようデータを加工する処理は?","choices":["匿名化","暗号化という別処理のみ","トークナイゼーションという別処理のみ","バックアップという別処理のみ"],"answer":0,"explanation":"元に戻せないため安全性が高い一方、分析用途には不向きな場合があります。"},
    {"question":"元の情報に戻せる形で個人を特定しにくくする処理は?","choices":["仮名化","匿名化という完全に同じ処理のみ","暗号化という完全に同じ処理のみ","圧縮という完全に同じ処理のみ"],"answer":0,"explanation":"必要に応じて元の情報と照合できる余地を残します。"},
    {"question":"組織のセキュリティ対策状況を第三者が確認・評価する活動は?","choices":["セキュリティ監査","ペネトレーションテストという同義語のみ","脆弱性診断という同義語のみ","脅威モデリングという同義語のみ"],"answer":0,"explanation":"社内評価だけでなく客観性の担保にもつながります。"},
    {"question":"業界基準や法律への準拠状況を指す用語は?","choices":["コンプライアンス","ガバナンスという同義語のみ","監査という同義語のみ","ポリシーという同義語のみ"],"answer":0,"explanation":"取引先からの信頼確保にも影響します。"},
    {"question":"情報をどれだけの期間保持するかを定めた方針は?","choices":["データ保持ポリシー","アクセス制御ポリシーのみ限定","パスワードポリシーのみ限定","バックアップポリシーのみ限定"],"answer":0,"explanation":"不要になったデータを適切に廃棄する目的もあります。"},
    {"question":"組織のセキュリティ攻撃を模擬して防御側を試す専門チームは?","choices":["レッドチーム","ブルーチームという逆の役割のみ","パープルチームという別の役割のみ","SOCという別の役割のみ"],"answer":0,"explanation":"実際の攻撃者視点で弱点を発見します。"},
    {"question":"組織の防御・検知・対応を担う専門チームは?","choices":["ブルーチーム","レッドチームという逆の役割のみ","パープルチームという別の役割のみ","CSIRTと完全に同一のみ"],"answer":0,"explanation":"レッドチームの攻撃を検知・対応する役割を担います。"},
    {"question":"攻撃側と防御側が連携して知見を共有する取り組みは?","choices":["パープルチーム演習","レッドチーム演習のみ限定","ブルーチーム演習のみ限定","ペネトレーションテストのみ限定"],"answer":0,"explanation":"お互いの視点を共有し防御力を高めます。"},
    {"question":"外部の研究者に脆弱性発見の報奨金を支払う制度は?","choices":["バグバウンティ制度","ペネトレーションテストという同義語のみ","脆弱性診断という同義語のみ","セキュリティ監査という同義語のみ"],"answer":0,"explanation":"研究者に正規の調査ルートを提供する意味もあります。"},
    {"question":"見つけた脆弱性を公表前にまず開発元へ伝える倫理的な報告方針は?","choices":["責任ある開示(Responsible Disclosure)","即時公開方針のみ限定","無視方針のみ限定","非公開放置方針のみ限定"],"answer":0,"explanation":"利用者への影響を抑えつつ修正時間を確保できます。"},
    {"question":"組織内のパソコンやスマートフォンを一元管理する仕組みの略称は?","choices":["MDM(モバイルデバイス管理)","SIEMのみに限定","EDRのみに限定","IAMのみに限定"],"answer":0,"explanation":"紛失・盗難時の遠隔ロックなどにも使われます。"},
    {"question":"私物端末を業務に利用する運用方針の略称は?","choices":["BYOD","MDMのみに限定","SSOのみに限定","VPNのみに限定"],"answer":0,"explanation":"利便性向上の一方でセキュリティ管理が課題になります。"},
    {"question":"端末の不審な挙動を検知し対応する仕組みの略称は?","choices":["EDR(エンドポイント検知・対応)","MDMのみに限定","SIEMのみに限定","WAFのみに限定"],"answer":0,"explanation":"感染端末の隔離などにも活用されます。"},
    {"question":"組織全体のログを集約し相関分析して脅威を検知する仕組みの略称は?","choices":["SIEM","EDRのみに限定","MDMのみに限定","IDSのみに限定"],"answer":0,"explanation":"複数ログの相関分析で高度な攻撃を検知しやすくなります。"},
    {"question":"利用者IDとアクセス権限を一元管理する仕組みの略称は?","choices":["IAM(アイデンティティ・アクセス管理)","SIEMのみに限定","EDRのみに限定","MDMのみに限定"],"answer":0,"explanation":"退職者アカウントの権限管理などにも使われます。"},
    {"question":"攻撃者の動向や手口の情報を収集・分析する活動は?","choices":["脅威インテリジェンス","脅威モデリングという別概念のみ","ペネトレーションテストという別概念のみ","監査ログ分析という別概念のみ"],"answer":0,"explanation":"攻撃を未然に防ぐための予防的な取り組みです。"},
    {"question":"漏洩した認証情報を他サービスで試す攻撃は?","choices":["クレデンシャルスタッフィング","ブルートフォース攻撃という同義語のみ","辞書攻撃という同義語のみ","フィッシングという同義語のみ"],"answer":0,"explanation":"1つの漏洩が芋づる式の被害につながる危険な攻撃です。"},
    {"question":"複数サービスのパスワードを安全にまとめて管理するツールは?","choices":["パスワードマネージャー","シングルサインオンという同義語のみ","多要素認証という同義語のみ","暗号化ツールという同義語のみ"],"answer":0,"explanation":"1つのマスターパスワードだけ覚えれば済みます。"},
    {"question":"パスワードを使わず生体情報や端末で認証する新しい仕組みは?","choices":["パスキー(パスワードレス認証)","多要素認証という同義語のみ","シングルサインオンという同義語のみ","OAuthという同義語のみ"],"answer":0,"explanation":"フィッシングにも強いとされる新しい認証方式です。"},
    {"question":"パスワードレス認証を実現する国際的な標準規格は?","choices":["FIDO2 / WebAuthn","OAuth 2.0のみに限定","SAMLのみに限定","LDAPのみに限定"],"answer":0,"explanation":"生体認証や端末の鍵を利用して実現されます。"},
    {"question":"一定時間操作がない場合に自動的にログアウトさせる設定は?","choices":["セッションタイムアウト","アカウントロックのみ限定","パスワードポリシーのみ限定","多要素認証のみ限定"],"answer":0,"explanation":"離席時などの不正利用リスクを減らせます。"},
    {"question":"ログイン試行を一定回数失敗すると一時的に利用不可にする対策は?","choices":["アカウントロックアウト","セッションタイムアウトのみ限定","CAPTCHAという別対策のみ","IP制限という別対策のみ"],"answer":0,"explanation":"総当たり攻撃を防ぐ効果があります。"},
    {"question":"パスワードを安全に保存するために推奨される専用ハッシュ方式の一つは?","choices":["bcryptやArgon2などの鍵導出関数","MD5をそのまま使う方式のみ","Base64エンコードのみ","平文保存のみ"],"answer":0,"explanation":"平文保存より格段に安全性が高まります。"},
    {"question":"ハッシュ化の計算コストをわざと高めて解析を困難にする技術は?","choices":["キーストレッチング","ソルトという別技術のみ","ペッパーという別技術のみ","圧縮という別技術のみ"],"answer":0,"explanation":"総当たり攻撃にかかる時間を大幅に増やせます。"},
    {"question":"サイバー攻撃の痕跡を法的証拠として収集・分析する分野は?","choices":["デジタルフォレンジック","脅威インテリジェンスという別分野のみ","脆弱性診断という別分野のみ","監査という別分野のみ"],"answer":0,"explanation":"訴訟や捜査などの場面でも活用されます。"},
    {"question":"証拠の取り扱い経路を記録し改ざんがないことを証明する考え方は?","choices":["チェーン・オブ・カストディ(証拠保全の連鎖)","監査ログという別概念のみ","デジタル署名という別概念のみ","アクセス制御という別概念のみ"],"answer":0,"explanation":"証拠能力を法的に担保するために重要です。"},
    {"question":"インシデントの深刻度を段階分けして対応優先度を決める仕組みは?","choices":["インシデント重大度レベル分類","SLAという別概念のみ","KPIという別概念のみ","CVSSという別概念のみ"],"answer":0,"explanation":"限られたリソースを優先度の高い対応に割り振れます。"},
    {"question":"バックアップの基本原則として知られる「3-2-1ルール」の意味は?","choices":["3つのコピーを2種類の媒体に保存し1つは遠隔地に置く","3日毎に2回2箇所へバックアップする","3人が2つの鍵で1つの金庫を管理する","3世代分のログを2倍圧縮して1ファイルにまとめる"],"answer":0,"explanation":"1つは離れた場所に保管することでリスクを分散します。"},
    {"question":"暗号鍵を定期的に新しいものへ更新する作業は?","choices":["鍵のローテーション","鍵のバックアップという別作業のみ","鍵の共有という別作業のみ","鍵の圧縮という別作業のみ"],"answer":0,"explanation":"漏洩時の被害を長期化させないために重要です。"},
    {"question":"SSL/TLS証明書には有効期限があり、それを過ぎる前に行うべき作業は?","choices":["証明書の更新","証明書の削除のみ限定","証明書の共有のみ限定","証明書のバックアップのみ限定"],"answer":0,"explanation":"更新を怠るとブラウザに警告が表示されます。"},
    {"question":"HTTPS通信を常に強制しダウングレード攻撃を防ぐ仕組みは?","choices":["HSTS(HTTP Strict Transport Security)","CSPという別仕組みのみ","CORSという別仕組みのみ","SRIという別仕組みのみ"],"answer":0,"explanation":"httpへの誘導によるダウングレード攻撃を防げます。"},
    {"question":"HTTPSページ内にHTTPのリソースが混在する状態を指す用語は?","choices":["混合コンテンツ(Mixed Content)","クロスオリジンという別概念のみ","クリックジャッキングという別概念のみ","キャッシュポイズニングという別概念のみ"],"answer":0,"explanation":"ブラウザによっては警告が表示されることがあります。"},
    {"question":"外部から読み込むスクリプトが改ざんされていないか検証する仕組みは?","choices":["SRI(サブリソース完全性)","CSPという別仕組みのみ","CORSという別仕組みのみ","HSTSという別仕組みのみ"],"answer":0,"explanation":"CDN経由の改ざんリスクに対する防御策です。"},
    {"question":"送信ドメイン認証の一つで許可された送信元IPを定義する仕組みは?","choices":["SPF","DKIMという別仕組みのみ","DMARCという別仕組みのみ","TLSという別仕組みのみ"],"answer":0,"explanation":"送信元の詐称を検知しやすくします。"},
    {"question":"メールに電子署名を付与して改ざん検知を行う送信ドメイン認証は?","choices":["DKIM","SPFという別仕組みのみ","DMARCという別仕組みのみ","TLSという別仕組みのみ"],"answer":0,"explanation":"内容の改ざんも同時に検知できます。"},
    {"question":"SPFやDKIMの結果をもとに不正メールの扱いを組織が定義する仕組みは?","choices":["DMARC","SPFという別仕組みのみ","DKIMという別仕組みのみ","SSLという別仕組みのみ"],"answer":0,"explanation":"迷惑メール判定の精度向上にも寄与します。"},
    {"question":"迷惑メールを自動的に判定し隔離する仕組みの総称は?","choices":["スパムフィルター","ファイアウォールという別仕組みのみ","WAFという別仕組みのみ","IDSという別仕組みのみ"],"answer":0,"explanation":"件名や送信者の不審な特徴から判定されます。"},
    {"question":"興味本位で軽い気持ちで攻撃を行う技術力の低い攻撃者を指す俗称は?","choices":["スクリプトキディ","ハクティビストという別分類のみ","国家的攻撃者という別分類のみ","内部関係者という別分類のみ"],"answer":0,"explanation":"愉快犯的な動機で行われることが多いとされます。"},
    {"question":"政治的・社会的主張のためにサイバー攻撃を行う攻撃者を指す用語は?","choices":["ハクティビスト","スクリプトキディという別分類のみ","インサイダーという別分類のみ","サイバー犯罪者という一般名称のみ"],"answer":0,"explanation":"社会的メッセージの発信を目的とすることが多いです。"},
    {"question":"国家の支援を受けて高度な攻撃を行う組織を指す用語は?","choices":["国家支援型攻撃者(APTグループ等)","スクリプトキディという別分類のみ","ハクティビストという別分類のみ","内部関係者という別分類のみ"],"answer":0,"explanation":"長期間にわたり高度な手法で活動します。"},
    {"question":"長期間気づかれずに潜伏し標的を攻撃し続ける手口の総称は?","choices":["APT(高度で持続的な脅威)","DDoS攻撃という別概念のみ","ゼロデイ攻撃という別概念のみ","フィッシングという別概念のみ"],"answer":0,"explanation":"検知が難しく被害が長期化しやすいのが特徴です。"},
    {"question":"セキュリティ機器が正規の通信を誤って攻撃と判定してしまうことは?","choices":["誤検知(フォールスポジティブ)","見逃し(フォールスネガティブ)のみ","正検知のみ","過剰検知という別語のみ"],"answer":0,"explanation":"過剰な誤検知は運用負荷の増大につながります。"},
    {"question":"実際の攻撃をセキュリティ機器が見逃してしまうことは?","choices":["見逃し(フォールスネガティブ)","誤検知(フォールスポジティブ)のみ","正検知のみ","過検知という別語のみ"],"answer":0,"explanation":"見逃しは実害に直結するため特に注意が必要です。"},
    {"question":"ネットワークやシステムの弱点を網羅的に洗い出す診断作業は?","choices":["脆弱性診断","ペネトレーションテストという完全同義語のみ","監査という完全同義語のみ","脅威モデリングという完全同義語のみ"],"answer":0,"explanation":"優先順位をつけて対策できるようになります。"},
    {"question":"個人情報保護のため、利用目的をユーザーへ明示する法的な考え方は?","choices":["利用目的の明示・同意取得","匿名化のみに限定","暗号化のみに限定","監査のみに限定"],"answer":0,"explanation":"個人情報保護法などの法令に関わる考え方です。"},
    {"question":"セキュリティ対策として最新版のソフトウェアを保つ理由は?","choices":["既知の脆弱性を解消し攻撃対象を減らすため","動作を必ず高速化するため","デザインを刷新するためだけ","ライセンス費用を下げるためだけ"],"answer":0,"explanation":"既知の脆弱性を突かれるリスクを減らせます。"},
    {"question":"USBメモリなど外部記憶媒体経由の情報漏洩を防ぐ対策の一例は?","choices":["外部デバイスの利用制限","パスワードの使い回しのみ限定","証明書の共有のみ限定","監査ログの削除のみ限定"],"answer":0,"explanation":"デバイス制御ソフトで利用を制限する方法があります。"},
    {"question":"重要システムをインターネットから物理的に切り離す対策は?","choices":["エアギャップ","ネットワークセグメンテーションという別対策のみ","VPNという別対策のみ","ファイアウォールという別対策のみ"],"answer":0,"explanation":"外部からの侵入経路を物理的になくします。"},
    {"question":"セキュリティ対策として「知らせない」おとりの情報を仕込む手法は?","choices":["ハニートークン","ハニーポットという類似だが別概念のみ","サンドボックスという別概念のみ","ホワイトリストという別概念のみ"],"answer":0,"explanation":"実際にアクセスがあれば侵入の兆候として検知できます。"},
    {"question":"攻撃者を欺くための偽の資産・情報を配置する技術の総称は?","choices":["おとり技術(デセプションテクノロジー)","サンドボックスという別概念のみ","WAFという別概念のみ","IDSという別概念のみ"],"answer":0,"explanation":"攻撃者の行動を惑わせ検知にもつなげます。"},
    {"question":"重要情報へのアクセス権を複数人でチェックし合う統制の考え方は?","choices":["職務分離(内部統制)","最小権限の原則という別概念のみ","ゼロトラストという別概念のみ","多層防御という別概念のみ"],"answer":0,"explanation":"複数人の承認を必要とすることで不正を防ぎます。"},
    {"question":"セキュリティにおいて利用者への説明責任やログ保持を含む考え方は?","choices":["アカウンタビリティ(説明責任)","アベイラビリティという別概念のみ","コンフィデンシャリティという別概念のみ","インテグリティという別概念のみ"],"answer":0,"explanation":"インシデント対応時の信頼性確保にも関わります。"},
    {"question":"情報セキュリティの3要素(CIA)のうち「機密性」を指す語は?","choices":["Confidentiality","Integrity","Availability","Accountability"],"answer":0,"explanation":"Confidentialityの頭文字が由来です。"},
    {"question":"情報セキュリティの3要素(CIA)のうち「完全性」を指す語は?","choices":["Integrity","Confidentiality","Availability","Authenticity"],"answer":0,"explanation":"Integrityの頭文字が由来です。"},
    {"question":"情報セキュリティの3要素(CIA)のうち「可用性」を指す語は?","choices":["Availability","Confidentiality","Integrity","Accountability"],"answer":0,"explanation":"Availabilityの頭文字が由来です。"},
    {"question":"データが改ざんされていないことを保証する性質は?","choices":["完全性(Integrity)","機密性(Confidentiality)","可用性(Availability)","真正性という別概念のみ"],"answer":0,"explanation":"改ざん検知の仕組みなどによって保たれます。"},
    {"question":"必要な時に正しくサービスやデータへアクセスできる性質は?","choices":["可用性(Availability)","機密性(Confidentiality)","完全性(Integrity)","責任追跡性という別概念のみ"],"answer":0,"explanation":"障害対策や冗長化によって高められます。"},
    {"question":"許可された者だけが情報にアクセスできる性質は?","choices":["機密性(Confidentiality)","完全性(Integrity)","可用性(Availability)","真正性という別概念のみ"],"answer":0,"explanation":"アクセス制御や暗号化によって保たれます。"},
    {"question":"利用者になりすまし電話やメールで機密情報を聞き出す手口の一種は?","choices":["プリテキスティング(なりすまし)","ブルートフォース攻撃のみ","SQLインジェクションのみ","バッファオーバーフローのみ"],"answer":0,"explanation":"銀行員や上司を装うことが多い手口です。"},
    {"question":"USBメモリなどをわざと落として拾わせ実行させる攻撃手口は?","choices":["ベイティング(おとり攻撃)","テールゲーティングという別手口のみ","ショルダーハッキングという別手口のみ","ピギーバッキングという別手口のみ"],"answer":0,"explanation":"人の好奇心につけこむ心理的な攻撃手法です。"},
    {"question":"許可なく他人の後をついて入退室制限区域に侵入する手口は?","choices":["テールゲーティング","ベイティングという別手口のみ","ショルダーハッキングという別手口のみ","プリテキスティングという別手口のみ"],"answer":0,"explanation":"物理的なセキュリティの盲点を突く手口です。"},
    {"question":"背後から画面や入力を盗み見る行為を指す用語は?","choices":["ショルダーハッキング","テールゲーティングという別手口のみ","ベイティングという別手口のみ","プリテキスティングという別手口のみ"],"answer":0,"explanation":"パスワード入力などの様子を盗み見られる危険があります。"},
    {"question":"セキュリティ対策のコストと守るべき資産価値のバランスを検討する活動は?","choices":["リスクアセスメント","脅威モデリングという類似だが別概念のみ","脆弱性診断という別概念のみ","監査という別概念のみ"],"answer":0,"explanation":"すべてのリスクに万全の対策をとるのは非現実的です。"},
    {"question":"発生確率と影響度からリスクの大きさを評価する考え方は?","choices":["リスク評価(定量・定性評価)","脅威インテリジェンスという別概念のみ","脆弱性診断という別概念のみ","監査という別概念のみ"],"answer":0,"explanation":"限られた予算で優先順位をつけるために重要です。"},
    {"question":"特定できたリスクを受け入れる、低減する、移転する、回避するという4つの方針を指す用語は?","choices":["リスク対応の4分類","リスク評価という別概念のみ","脅威モデリングという別概念のみ","脆弱性診断という別概念のみ"],"answer":0,"explanation":"どの方針を選ぶかはリスクの性質によって異なります。"},
    {"question":"保険加入などでリスクの影響を第三者に移す対応方針は?","choices":["リスク移転","リスク回避のみ限定","リスク低減のみ限定","リスク受容のみ限定"],"answer":0,"explanation":"保険はこの代表的な手段の一つです。"},
    {"question":"対象となる業務自体をやめてリスクをなくす対応方針は?","choices":["リスク回避","リスク移転のみ限定","リスク低減のみ限定","リスク受容のみ限定"],"answer":0,"explanation":"リスクの根本原因そのものをなくす方法です。"},
    {"question":"対策を講じてリスクの発生確率や影響を小さくする対応方針は?","choices":["リスク低減","リスク回避のみ限定","リスク移転のみ限定","リスク受容のみ限定"],"answer":0,"explanation":"最も一般的に選ばれる現実的な対応方針です。"},
    {"question":"許容範囲内としてそのままリスクを受け入れる対応方針は?","choices":["リスク受容","リスク低減のみ限定","リスク回避のみ限定","リスク移転のみ限定"],"answer":0,"explanation":"許容できないリスクにはこの方針は取れません。"},
    {"question":"システムの設計書やソースコードを確認して脆弱性を洗い出す手法は?","choices":["コードレビュー・静的解析による脆弱性診断","ペネトレーションテストという別手法のみ","負荷テストという別手法のみ","ユーザーテストという別手法のみ"],"answer":0,"explanation":"実行前に問題を発見できるため手戻りが少なくなります。"},
    {"question":"アプリを実際に動かしながら脆弱性を検証する診断手法は?","choices":["動的解析(DAST)","静的解析(SAST)のみ限定","コードレビューのみ限定","ユニットテストのみ限定"],"answer":0,"explanation":"実際の挙動に基づくため実践的な結果が得られます。"},
    {"question":"ソースコードを実行せず解析して脆弱性を見つける手法の略称は?","choices":["SAST(静的アプリケーションセキュリティテスト)","DASTという別手法のみ","IASTという別手法のみ","RASPという別手法のみ"],"answer":0,"explanation":"開発の早い段階で問題を検出しやすくなります。"},
    {"question":"実行中のアプリを外部から攻撃的にテストする手法の略称は?","choices":["DAST(動的アプリケーションセキュリティテスト)","SASTという別手法のみ","IASTという別手法のみ","RASPという別手法のみ"],"answer":0,"explanation":"実際の攻撃に近い形でリスクを評価できます。"},
    {"question":"アプリ実行中に内部から自己防御・検知を行う技術の略称は?","choices":["RASP(実行時アプリケーション自己防御)","WAFという別技術のみ","IDSという別技術のみ","DASTという別技術のみ"],"answer":0,"explanation":"リアルタイムでの検知・防御に役立ちます。"},
    {"question":"使用しているオープンソースソフトの脆弱性を継続的に検査する活動は?","choices":["ソフトウェア構成分析(SCA)","静的解析という別活動のみ","動的解析という別活動のみ","ペネトレーションテストという別活動のみ"],"answer":0,"explanation":"既知の脆弱性を持つライブラリの利用を防ぎます。"},
    {"question":"アプリが依存するライブラリの一覧を明示した文書の略称は?","choices":["SBOM(ソフトウェア部品表)","SCAという別概念のみ","CVEという別概念のみ","CVSSという別概念のみ"],"answer":0,"explanation":"サプライチェーン攻撃対策としても注目されています。"},
    {"question":"利用者に見えない形で重要な処理が改ざんされていないか検証する仕組みは?","choices":["完全性検証(チェックサム・署名検証)","アクセス制御という別概念のみ","匿名化という別概念のみ","圧縮という別概念のみ"],"answer":0,"explanation":"署名検証などの技術が使われます。"},
    {"question":"パスワードを平文のままログに残してしまう不適切な運用の問題点は?","choices":["漏洩時にそのまま悪用されるリスクが高い","処理速度が遅くなるだけ","ファイルサイズが増えるだけ","デザインが崩れるだけ"],"answer":0,"explanation":"漏洩時にそのまま悪用される重大なリスクです。"},
    {"question":"本番環境の設定値や認証情報を安全に一元管理する仕組みは?","choices":["シークレット管理(Secrets Manager等)","バージョン管理システムという別概念のみ","パッケージ管理という別概念のみ","ログ管理という別概念のみ"],"answer":0,"explanation":"コードへの直書きを避けるために利用されます。"},
    {"question":"コンテナイメージに脆弱性がないか事前にスキャンする活動は?","choices":["コンテナイメージスキャン","ネットワークスキャンという別概念のみ","ポートスキャンという別概念のみ","脆弱性診断という同義語のみ限定"],"answer":0,"explanation":"本番稼働前にリスクを洗い出せます。"},
    {"question":"外部に開いているポートや稼働サービスを調査する行為は?","choices":["ポートスキャン","パケットキャプチャという別概念のみ","脆弱性診断という広い概念のみ","ペネトレーションテストという広い概念のみ"],"answer":0,"explanation":"攻撃者の事前調査にも使われる手法です。"},
    {"question":"セキュリティ更新が長期間提供されなくなった状態のソフトを指す用語は?","choices":["サポート終了(EOL)ソフトウェア","レガシーシステムという類似だが別概念のみ","オープンソースという別概念のみ","廃止予定APIという別概念のみ"],"answer":0,"explanation":"既知の脆弱性が放置されたままになりがちです。"},
    {"question":"古い技術基盤のまま運用され続けているシステムを指す用語は?","choices":["レガシーシステム","サポート終了ソフトという類似だが別概念のみ","モダナイズ済みシステムという逆概念のみ","クラウドネイティブという別概念のみ"],"answer":0,"explanation":"セキュリティリスクが高まりやすい状態です。"},
    {"question":"セキュリティ上の理由から段階的に新しい基盤へ移行する作業は?","choices":["モダナイゼーション(移行・刷新)","レガシー化という逆の作業のみ","サポート終了という別概念のみ","廃棄という別概念のみ"],"answer":0,"explanation":"計画的な移行によりリスクを抑えられます。"},
    {"question":"利用者の同意なくデータを外部に送信する挙動を指す用語は?","choices":["不正なデータ送信(情報漏洩の一形態)","キャッシュのみに限定","圧縮のみに限定","バックアップのみに限定"],"answer":0,"explanation":"意図しないデータ送信は重大な信頼問題になり得ます。"},
    {"question":"利用規約やプライバシーポリシーへの同意取得画面を一般的に指す用語は?","choices":["同意バナー・同意管理","アクセス制御のみに限定","監査ログのみに限定","暗号化のみに限定"],"answer":0,"explanation":"法令遵守の観点からも重要な画面です。"},
    {"question":"情報の重要度に応じてラベル付けし取り扱いルールを変える考え方は?","choices":["情報の分類・格付け","匿名化のみに限定","暗号化のみに限定","監査のみに限定"],"answer":0,"explanation":"重要情報ほど厳格な管理ルールが適用されます。"},
    {"question":"退職者のアカウントを速やかに無効化する運用が重要な理由は?","choices":["不要になった権限からの不正アクセスを防ぐため","サーバー費用を下げるためだけ","デザインを統一するためだけ","検索速度を上げるためだけ"],"answer":0,"explanation":"退職後もアカウントが残っていると不正利用のリスクがあります。"},
    {"question":"アクセス権限を定期的に見直し不要な権限を削除する活動は?","choices":["アクセス権の棚卸し","脆弱性診断という別活動のみ","脅威モデリングという別活動のみ","監査ログ削除という別活動のみ"],"answer":0,"explanation":"権限の肥大化(権限クリープ)を防ぐ効果があります。"},
    {"question":"セキュリティ対策の全体像を定めた組織の基本方針は?","choices":["情報セキュリティポリシー","SLAという別文書のみ","利用規約という別文書のみ","議事録という別文書のみ"],"answer":0,"explanation":"従業員が判断に迷わないための基準になります。"},
    {"question":"情報セキュリティの管理体制を継続的に改善する仕組みを指す略称は?","choices":["ISMS(情報セキュリティマネジメントシステム)","SOCという別概念のみ","SIEMという別概念のみ","CSIRTという別概念のみ"],"answer":0,"explanation":"第三者認証(ISO27001など)の基盤にもなります。"},
    {"question":"利用者が気づかぬうちに複数サイトの行動を追跡される技術の一例は?","choices":["トラッキングCookieなどのトラッキング技術","セッションCookieという別概念のみ","認証トークンという別概念のみ","CSRFトークンという別概念のみ"],"answer":0,"explanation":"広告配信の最適化などに利用されることがあります。"},
    {"question":"利用者のプライバシーを尊重し追跡を制限するブラウザ機能の総称は?","choices":["トラッキング防止機能","キャッシュ機能という別概念のみ","オートフィル機能という別概念のみ","拡張機能という別概念のみ"],"answer":0,"explanation":"利用者のプライバシー保護意識の高まりを反映しています。"},
    {"question":"セキュリティ事故発生時にまず行うべき初動対応の考え方は?","choices":["被害拡大の防止(封じ込め)と証拠保全","即座の全データ削除のみ限定","公表を一切行わない方針のみ限定","原因究明を後回しにする方針のみ限定"],"answer":0,"explanation":"被害の拡大を防ぎ、後の調査の土台を作ります。"},
    {"question":"パスワードの使い回しがセキュリティ上問題とされる主な理由は?","choices":["1つの漏洩が他サービスへの不正ログインにつながるため","入力の手間が増えるためだけ","文字数制限に引っかかるためだけ","サーバー負荷が増えるためだけ"],"answer":0,"explanation":"1つのサービスの漏洩が全サービスへの不正ログインにつながります。"},
    ]
  },
  {
    name: "開発ツール・IT実務用語",
    color: "#8854D0",
    questions: [
    {"question":"Gitでファイルの変更をステージングエリアに追加するコマンドは?","choices":["git add","git commit","git push","git stage"],"answer":0,"explanation":"コミット対象として変更をマークする操作です。"},
    {"question":"Gitでステージした変更を記録として確定するコマンドは?","choices":["git commit","git add","git save","git record"],"answer":0,"explanation":"メッセージを添えて変更履歴として記録します。"},
    {"question":"Gitでリモートリポジトリへ変更を送信するコマンドは?","choices":["git push","git pull","git fetch","git send"],"answer":0,"explanation":"チームメンバーと変更を共有する際に使います。"},
    {"question":"Gitでリモートの変更を取得しつつ手元に反映するコマンドは?","choices":["git pull","git push","git commit","git merge単体"],"answer":0,"explanation":"fetchとmergeを同時に行うコマンドです。"},
    {"question":"Gitでリモートの変更情報だけを取得するコマンドは?","choices":["git fetch","git pull","git push","git clone"],"answer":0,"explanation":"取得後に手動でマージする必要があります。"},
    {"question":"Gitでリポジトリを新規に複製するコマンドは?","choices":["git clone","git fork","git copy","git init のみ"],"answer":0,"explanation":"リモートの内容をまるごと手元に持ってきます。"},
    {"question":"Gitで新しいリポジトリを作成するコマンドは?","choices":["git init","git new","git create","git start"],"answer":0,"explanation":"既存フォルダをGit管理下に置く際に使います。"},
    {"question":"Gitで新しいブランチを作成するコマンドは?","choices":["git branch","git checkout単体","git switch単体","git fork"],"answer":0,"explanation":"作業を分けて安全に開発を進められます。"},
    {"question":"Gitでブランチを切り替えるコマンドは?","choices":["git checkout(またはgit switch)","git branch単体","git merge単体","git rebase単体"],"answer":0,"explanation":"作業ブランチを切り替える際に使います。"},
    {"question":"Gitで別ブランチの変更を現在のブランチに取り込むコマンドは?","choices":["git merge","git rebase単体のみ","git branch単体のみ","git diff単体のみ"],"answer":0,"explanation":"コンフリクトが起きる場合は手動解決が必要です。"},
    {"question":"Gitでコミット履歴を一直線に整理し直すコマンドは?","choices":["git rebase","git merge単体のみ","git squash単体のみ","git flatten単体のみ"],"answer":0,"explanation":"履歴が見やすくなる一方、共有ブランチでは注意が必要です。"},
    {"question":"Gitで作業中の変更を一時的に退避するコマンドは?","choices":["git stash","git pause単体のみ","git hold単体のみ","git backup単体のみ"],"answer":0,"explanation":"別の作業に切り替えたい時に便利です。"},
    {"question":"Gitで変更履歴を確認するコマンドは?","choices":["git log","git history単体のみ","git show単体のみ","git status単体のみ"],"answer":0,"explanation":"誰がいつ何を変更したか確認できます。"},
    {"question":"Gitで現在の作業状態(変更ファイル等)を確認するコマンドは?","choices":["git status","git log単体のみ","git diff単体のみ","git show単体のみ"],"answer":0,"explanation":"add前後の変更ファイルが分かりやすく表示されます。"},
    {"question":"Gitでファイルの変更差分を確認するコマンドは?","choices":["git diff","git status単体のみ","git log単体のみ","git show単体のみ"],"answer":0,"explanation":"add前とadd後で差分の対象が変わります。"},
    {"question":"Gitで特定のコミットの履歴を残しつつ変更を打ち消すコマンドは?","choices":["git revert","git reset単体のみ","git undo単体のみ","git delete単体のみ"],"answer":0,"explanation":"チーム開発で安全に変更を取り消せます。"},
    {"question":"Gitでコミット履歴自体を巻き戻すコマンドは?","choices":["git reset","git revert単体のみ","git undo単体のみ","git rollback単体のみ"],"answer":0,"explanation":"共有前のローカルコミットの修正によく使われます。"},
    {"question":"Gitで複数のコミットを1つにまとめる操作は?","choices":["スカッシュ(squash)","リベースという別操作のみ","マージという別操作のみ","チェリーピックという別操作のみ"],"answer":0,"explanation":"履歴を綺麗に保ちたい時に使われます。"},
    {"question":"Gitで特定のコミットだけを別ブランチに取り込む操作は?","choices":["チェリーピック(cherry-pick)","スカッシュという別操作のみ","リベースという別操作のみ","マージという別操作のみ"],"answer":0,"explanation":"バグ修正だけを別ブランチに反映したい時などに使います。"},
    {"question":"Gitで特定のバージョンにタグ(名前)を付けるコマンドは?","choices":["git tag","git label単体のみ","git version単体のみ","git release単体のみ"],"answer":0,"explanation":"リリースバージョンの管理に使われます。"},
    {"question":"複数人の変更が同じ箇所を編集した際に起きる問題は?","choices":["コンフリクト(競合)","リベースという別概念のみ","スカッシュという別概念のみ","フェッチという別概念のみ"],"answer":0,"explanation":"手動でどちらの変更を採用するか選ぶ必要があります。"},
    {"question":"GitHubなどで元のリポジトリを自分のアカウントに複製する機能は?","choices":["フォーク","クローンという類似だが別機能のみ","ブランチという別機能のみ","タグという別機能のみ"],"answer":0,"explanation":"自分の環境で自由に変更を試せます。"},
    {"question":"変更内容をレビューしてもらい本流に取り込んでもらう依頼の名称は?","choices":["プルリクエスト(Pull Request)","コミットという別概念のみ","フォークという別概念のみ","イシューという別概念のみ"],"answer":0,"explanation":"レビューを経てマージされるのが一般的な流れです。"},
    {"question":"バグ報告や機能要望などを管理する仕組みの名称は?","choices":["イシュー(Issue)","プルリクエストという別概念のみ","コミットという別概念のみ","リリースという別概念のみ"],"answer":0,"explanation":"進捗状況を可視化するためにも使われます。"},
    {"question":"コードの変更内容を他の開発者が確認・指摘する活動は?","choices":["コードレビュー","ペアプログラミングという類似だが別活動のみ","モブプログラミングという別活動のみ","リファクタリングという別活動のみ"],"answer":0,"explanation":"客観的な視点でバグや改善点を発見しやすくなります。"},
    {"question":"2人が1台のPCで役割を交代しながらコードを書く開発手法は?","choices":["ペアプログラミング","モブプログラミングという類似だが別手法のみ","コードレビューという別手法のみ","TDDという別手法のみ"],"answer":0,"explanation":"知識共有やレビューの手間を減らせる利点があります。"},
    {"question":"複数人が同時に1台の画面を見ながら開発する手法は?","choices":["モブプログラミング","ペアプログラミングという類似だが別手法のみ","コードレビューという別手法のみ","スクラムという別手法のみ"],"answer":0,"explanation":"複数人の知見をリアルタイムで統合できます。"},
    {"question":"Node.jsのパッケージ管理でよく使われるコマンドラインツールは?","choices":["npm","pip単体のみ","gem単体のみ","composer単体のみ"],"answer":0,"explanation":"依存パッケージのインストールなどに使われます。"},
    {"question":"Pythonのパッケージ管理でよく使われるコマンドラインツールは?","choices":["pip","npm単体のみ","gem単体のみ","cargo単体のみ"],"answer":0,"explanation":"仮想環境と組み合わせて使われることが多いです。"},
    {"question":"プロジェクトが依存するパッケージとバージョンを固定するファイルの役割は?","choices":["ロックファイル(package-lock.json等)","READMEという別ファイルの役割のみ","ライセンスファイルという別ファイルの役割のみ","設定ファイルという曖昧な役割のみ"],"answer":0,"explanation":"環境によって異なる挙動になるのを防ぎます。"},
    {"question":"プロジェクトの概要や使い方を説明する定番のファイル名は?","choices":["README","LICENSE単体のみ","CHANGELOG単体のみ","CONFIG単体のみ"],"answer":0,"explanation":"新規参加者が最初に読むべきドキュメントです。"},
    {"question":"ソフトウェアの利用条件を明記するファイルの名称は?","choices":["LICENSE","READMEという別ファイルのみ","CHANGELOGという別ファイルのみ","CONTRIBUTINGという別ファイルのみ"],"answer":0,"explanation":"再配布や改変の可否が明記されます。"},
    {"question":"バージョンごとの変更点をまとめて記録するファイルの名称は?","choices":["CHANGELOG","READMEという別ファイルのみ","LICENSEという別ファイルのみ","ROADMAPという別ファイルのみ"],"answer":0,"explanation":"利用者が更新内容を把握しやすくなります。"},
    {"question":"誰でも自由に使用・改変・再配布できるソフトウェアの総称は?","choices":["オープンソースソフトウェア","フリーウェアという厳密には別概念のみ","シェアウェアという別概念のみ","プロプライエタリソフトウェアという逆概念のみ"],"answer":0,"explanation":"企業や個人が無償で利用できることが多いです。"},
    {"question":"改変後のソースコードも同じライセンスで公開を求める代表的なライセンスは?","choices":["GPL","MITライセンスという別種類のみ","Apacheライセンスという別種類のみ","BSDライセンスという別種類のみ"],"answer":0,"explanation":"コピーレフト型ライセンスの代表例です。"},
    {"question":"商用利用も含め非常に緩やかな条件で再利用を許可する代表的なライセンスは?","choices":["MITライセンス","GPLという別種類のみ","AGPLという別種類のみ","コピーレフトという概念のみ"],"answer":0,"explanation":"改変後のコードを非公開にすることも認められます。"},
    {"question":"アジャイル開発で短い期間に区切って開発を繰り返す単位は?","choices":["スプリント","バックログという別概念のみ","マイルストーンという別概念のみ","リリースという別概念のみ"],"answer":0,"explanation":"1〜4週間程度の期間で区切られることが多いです。"},
    {"question":"実装すべき機能や要望を一覧化したリストを指す用語は?","choices":["プロダクトバックログ","スプリントという別概念のみ","ロードマップという別概念のみ","ガントチャートという別概念のみ"],"answer":0,"explanation":"優先順位をつけて並び替えられます。"},
    {"question":"チームで毎日短時間行う進捗共有ミーティングの通称は?","choices":["デイリースクラム(朝会)","レトロスペクティブという別会議のみ","スプリントプランニングという別会議のみ","キックオフという別会議のみ"],"answer":0,"explanation":"問題の早期発見にもつながります。"},
    {"question":"スプリント終了後にチームの進め方を振り返る会議は?","choices":["レトロスペクティブ(振り返り)","デイリースクラムという別会議のみ","スプリントプランニングという別会議のみ","レビュー会という同一名称のみ"],"answer":0,"explanation":"次回以降の改善につなげる目的があります。"},
    {"question":"利用者視点で機能要件を簡潔に記述する手法は?","choices":["ユーザーストーリー","ユースケースという類似だが別手法のみ","ペルソナという別手法のみ","ワイヤーフレームという別手法のみ"],"answer":0,"explanation":"「〜として、〜したい、なぜなら〜」の形式が一般的です。"},
    {"question":"タスクの相対的な大きさを見積もる際に使われる単位は?","choices":["ストーリーポイント","工数(人日)という別単位のみ","マイルストーンという別単位のみ","KPIという別単位のみ"],"answer":0,"explanation":"フィボナッチ数列に近い数値が使われることもあります。"},
    {"question":"チームが一定期間でこなせる作業量の実績を示す指標は?","choices":["ベロシティ","ストーリーポイントという別概念のみ","バーンダウンという別概念のみ","スプリントという別概念のみ"],"answer":0,"explanation":"次のスプリント計画の参考にされます。"},
    {"question":"残作業量の推移をグラフで示す図の名称は?","choices":["バーンダウンチャート","ガントチャートという別図のみ","カンバンボードという別図のみ","フローチャートという別図のみ"],"answer":0,"explanation":"横軸に日付、縦軸に残作業量を取ります。"},
    {"question":"タスクを「未着手・進行中・完了」等の列で可視化するボードは?","choices":["カンバンボード","バーンダウンチャートという別図のみ","ガントチャートという別図のみ","ロードマップという別図のみ"],"answer":0,"explanation":"To Do・進行中・完了のように列を分けます。"},
    {"question":"プロジェクトのスケジュールを棒グラフで示す図の名称は?","choices":["ガントチャート","カンバンボードという別図のみ","バーンダウンチャートという別図のみ","フローチャートという別図のみ"],"answer":0,"explanation":"開始日と終了日を視覚的に把握できます。"},
    {"question":"スクラムでチームと利害関係者の間に立ち要求を整理する役割は?","choices":["プロダクトオーナー","スクラムマスターという別役割のみ","開発チームという別役割のみ","ステークホルダーという別役割のみ"],"answer":0,"explanation":"開発チームとは別の視点で優先順位を判断します。"},
    {"question":"スクラムのプロセスが円滑に進むよう支援する役割は?","choices":["スクラムマスター","プロダクトオーナーという別役割のみ","開発チームという別役割のみ","テックリードという別役割のみ"],"answer":0,"explanation":"障害を取り除きチームの生産性を高めます。"},
    {"question":"最小限の機能で価値を検証するために作る製品を指す略称は?","choices":["MVP(実用最小限の製品)","PoC(概念実証)という類似だが別概念のみ","MMP(市場向け最小製品)という別概念のみ","KPIという別概念のみ"],"answer":0,"explanation":"完成度より価値検証を優先した製品です。"},
    {"question":"新技術やアイデアが実現可能かを検証する取り組みの略称は?","choices":["PoC(概念実証)","MVPという類似だが別概念のみ","MMPという別概念のみ","SLAという別概念のみ"],"answer":0,"explanation":"技術的な実現可能性の確認が主な目的です。"},
    {"question":"工程を順番に一度だけ進める伝統的な開発モデルは?","choices":["ウォーターフォールモデル","アジャイルモデルという逆概念のみ","スパイラルモデルという別概念のみ","スクラムという別概念のみ"],"answer":0,"explanation":"前工程に戻らないことを前提に進めます。"},
    {"question":"計画・設計・実装・テストを繰り返しながら改善する開発モデルは?","choices":["反復型(イテレーティブ)開発","ウォーターフォールモデルという別概念のみ","ビッグバン開発という別概念のみ","静的開発という別概念のみ"],"answer":0,"explanation":"変化への対応力が高いのが特徴です。"},
    {"question":"実際にコードを書く前に画面の大まかなレイアウトを設計する成果物は?","choices":["ワイヤーフレーム","モックアップという類似だが別段階のみ","プロトタイプという別段階のみ","ペルソナという別段階のみ"],"answer":0,"explanation":"文字や線だけでレイアウトの骨組みを示します。"},
    {"question":"見た目に近い形でデザインを再現した検討用の成果物は?","choices":["モックアップ","ワイヤーフレームという別段階のみ","プロトタイプという別段階のみ","ペルソナという別段階のみ"],"answer":0,"explanation":"デザインの方向性を確認する段階で使われます。"},
    {"question":"実際に操作できる試作品を作り検証する成果物は?","choices":["プロトタイプ","ワイヤーフレームという別段階のみ","モックアップという別段階のみ","ペルソナという別段階のみ"],"answer":0,"explanation":"操作性の検証やユーザーテストに活用されます。"},
    {"question":"典型的な利用者像を具体的に描いたユーザー分析手法は?","choices":["ペルソナ","カスタマージャーニーという別手法のみ","ワイヤーフレームという別手法のみ","ユーザーストーリーという別手法のみ"],"answer":0,"explanation":"仮想の人物像を設定してニーズを想像します。"},
    {"question":"利用者がサービスを使う一連の体験の流れを可視化する手法は?","choices":["カスタマージャーニーマップ","ペルソナという別手法のみ","ワイヤーフレームという別手法のみ","ユーザーストーリーという別手法のみ"],"answer":0,"explanation":"体験の中の課題や改善点を発見しやすくなります。"},
    {"question":"情報を利用者が探しやすいよう整理・構造化する設計分野は?","choices":["情報アーキテクチャ","UIデザインという類似だが別分野のみ","UXデザインという広い分野のみ","ビジュアルデザインという別分野のみ"],"answer":0,"explanation":"サイト構造やナビゲーション設計に関わります。"},
    {"question":"見た目や操作性など画面上の使いやすさを指す略称は?","choices":["UI(ユーザーインターフェース)","UXという別概念のみ","IAという別概念のみ","CXという別概念のみ"],"answer":0,"explanation":"見た目のデザインだけでなく操作感も含みます。"},
    {"question":"利用者が製品全体を通じて得る体験を指す略称は?","choices":["UX(ユーザーエクスペリエンス)","UIという別概念のみ","IAという別概念のみ","CXという別概念のみ"],"answer":0,"explanation":"満足度や印象も含めた広い概念です。"},
    {"question":"投資に対してどれだけ利益や成果が得られたかを示す指標は?","choices":["ROI(投資対効果)","KPIという別概念のみ","KGIという別概念のみ","SLAという別概念のみ"],"answer":0,"explanation":"数値で示すことで投資判断の材料になります。"},
    {"question":"目標達成度を測るための具体的な評価指標は?","choices":["KPI(重要業績評価指標)","KGIという上位概念のみ","ROIという別概念のみ","SLAという別概念のみ"],"answer":0,"explanation":"複数のKPIを組み合わせて評価することが多いです。"},
    {"question":"最終的に達成すべき目標そのものを示す指標は?","choices":["KGI(重要目標達成指標)","KPIという下位概念のみ","ROIという別概念のみ","OKRという類似だが別概念のみ"],"answer":0,"explanation":"複数のKPIの積み重ねで到達を目指します。"},
    {"question":"目標と主要な成果を組み合わせて管理する目標設定手法の略称は?","choices":["OKR","KPIという類似だが別手法のみ","KGIという類似だが別手法のみ","SMARTという類似だが別手法のみ"],"answer":0,"explanation":"GoogleなどIT企業を中心に広まった手法です。"},
    {"question":"データベースの各行を一意に識別するためのキーは?","choices":["主キー(プライマリキー)","外部キーという別概念のみ","候補キーという類似だが別概念のみ","複合キーという別概念のみ"],"answer":0,"explanation":"通常は自動採番される連番などが使われます。"},
    {"question":"別テーブルの主キーを参照して関連付けるキーは?","choices":["外部キー(フォーリンキー)","主キーという別概念のみ","インデックスという別概念のみ","ユニークキーという別概念のみ"],"answer":0,"explanation":"データの整合性を保つために使われます。"},
    {"question":"検索速度を高速化するためにデータベースに付与する仕組みは?","choices":["インデックス","ビューという別概念のみ","トリガーという別概念のみ","ストアドプロシージャという別概念のみ"],"answer":0,"explanation":"更新時のデータ不整合を防げます。"},
    {"question":"データの重複を排除し整合性を高めるテーブル設計手法は?","choices":["正規化","非正規化という逆の手法のみ","インデックス化という別手法のみ","シャーディングという別手法のみ"],"answer":0,"explanation":"更新のたびに複数箇所を書き換える必要があります。"},
    {"question":"検索性能向上のためあえてデータを重複させる設計手法は?","choices":["非正規化","正規化という逆の手法のみ","インデックス化という別手法のみ","レプリケーションという別手法のみ"],"answer":0,"explanation":"読み取り性能を優先する際に採用されます。"},
    {"question":"一連のデータベース操作をひとまとまりとして扱う単位は?","choices":["トランザクション","クエリという別概念のみ","セッションという別概念のみ","コミットという操作名のみ"],"answer":0,"explanation":"途中で失敗した場合は全体が取り消されます。"},
    {"question":"トランザクションが満たすべき4つの性質の略称は?","choices":["ACID特性","CRUDという別概念のみ","CAP定理という別概念のみ","BASE特性という別概念のみ"],"answer":0,"explanation":"Atomicity・Consistency・Isolation・Durabilityの略です。"},
    {"question":"トランザクションの変更内容を確定させる操作は?","choices":["コミット","ロールバックという逆の操作のみ","クエリという別概念のみ","インデックスという別概念のみ"],"answer":0,"explanation":"確定後は取り消せません。"},
    {"question":"トランザクションの変更を取り消して元に戻す操作は?","choices":["ロールバック","コミットという逆の操作のみ","クエリという別概念のみ","正規化という別概念のみ"],"answer":0,"explanation":"データベースを変更前の状態に戻します。"},
    {"question":"複数のテーブルを条件で結合して1つの結果として取得する操作は?","choices":["JOIN(結合)","UNIONという別操作のみ","GROUP BYという別操作のみ","INDEXという別操作のみ"],"answer":0,"explanation":"複数テーブルにまたがるデータをまとめて取得します。"},
    {"question":"両方のテーブルで一致する行だけを取得する結合方式は?","choices":["INNER JOIN","LEFT JOINという別方式のみ","RIGHT JOINという別方式のみ","FULL JOINという別方式のみ"],"answer":0,"explanation":"最も基本的で厳密な結合方式です。"},
    {"question":"左側テーブルの全行と、一致する右側の行を取得する結合方式は?","choices":["LEFT JOIN","INNER JOINという別方式のみ","RIGHT JOINという別方式のみ","CROSS JOINという別方式のみ"],"answer":0,"explanation":"右側に一致がなければNULLで埋められます。"},
    {"question":"SQLでデータを条件付きで検索する基本命令は?","choices":["SELECT","INSERTという別命令のみ","UPDATEという別命令のみ","DELETEという別命令のみ"],"answer":0,"explanation":"WHERE句で絞り込み条件を指定します。"},
    {"question":"SQLで新しいデータを追加する命令は?","choices":["INSERT","SELECTという別命令のみ","UPDATEという別命令のみ","DELETEという別命令のみ"],"answer":0,"explanation":"主キーを自動採番する設定と併用されることが多いです。"},
    {"question":"SQLで既存のデータを更新する命令は?","choices":["UPDATE","INSERTという別命令のみ","SELECTという別命令のみ","DELETEという別命令のみ"],"answer":0,"explanation":"複数カラムを一括で更新することもできます。"},
    {"question":"SQLでデータを削除する命令は?","choices":["DELETE","DROPという別命令のみ","REMOVEという別命令のみ","CLEARという別命令のみ"],"answer":0,"explanation":"条件を指定しないとすべての行が削除される点に注意が必要です。"},
    {"question":"SQLでテーブル自体を削除する命令は?","choices":["DROP TABLE","DELETEという行削除の命令のみ","TRUNCATEという別命令のみ","REMOVE TABLEという存在しない命令のみ"],"answer":0,"explanation":"テーブル定義ごと削除される点がDELETEと異なります。"},
    {"question":"SQLでテーブルの中身だけを高速に空にする命令は?","choices":["TRUNCATE","DROPという別命令のみ","DELETEという別命令のみ","CLEARという別命令のみ"],"answer":0,"explanation":"ロールバックが難しい点に注意が必要です。"},
    {"question":"検索結果を特定の条件でグループ化する句は?","choices":["GROUP BY","ORDER BYという別句のみ","WHEREという別句のみ","HAVINGという別句のみ"],"answer":0,"explanation":"集計関数(SUM/COUNT等)と組み合わせてよく使われます。"},
    {"question":"検索結果を並び替える句は?","choices":["ORDER BY","GROUP BYという別句のみ","WHEREという別句のみ","HAVINGという別句のみ"],"answer":0,"explanation":"ASC(昇順)/DESC(降順)を指定できます。"},
    {"question":"検索条件を指定する基本的な句は?","choices":["WHERE","GROUP BYという別句のみ","ORDER BYという別句のみ","HAVINGという別句のみ"],"answer":0,"explanation":"複数条件をANDやORでつなげられます。"},
    {"question":"グループ化した結果にさらに条件を付ける句は?","choices":["HAVING","WHEREという別句のみ","GROUP BYという別句のみ","ORDER BYという別句のみ"],"answer":0,"explanation":"WHEREとは異なりグループ化後の値に対して条件を指定します。"},
    {"question":"決まったスキーマを持たず柔軟にデータを扱うデータベースの総称は?","choices":["NoSQLデータベース","RDBMSという表形式データベースのみ","OLTPという処理形態のみ","OLAPという処理形態のみ"],"answer":0,"explanation":"大量データや柔軟なデータ構造の管理に向いています。"},
    {"question":"JSONのような文書構造でデータを保存するNoSQLの種類は?","choices":["ドキュメント指向データベース","キーバリュー型という別種類のみ","カラム指向という別種類のみ","グラフ型という別種類のみ"],"answer":0,"explanation":"1件のドキュメントに関連情報をまとめて格納できます。"},
    {"question":"キーと値の単純な組でデータを保存するNoSQLの種類は?","choices":["キーバリュー型データベース","ドキュメント指向という別種類のみ","カラム指向という別種類のみ","グラフ型という別種類のみ"],"answer":0,"explanation":"シンプルな構造で高速な読み書きが可能です。"},
    {"question":"ノード間の関係性を扱うのに適したNoSQLの種類は?","choices":["グラフ型データベース","ドキュメント指向という別種類のみ","キーバリュー型という別種類のみ","カラム指向という別種類のみ"],"answer":0,"explanation":"SNSの友人関係などの表現に適しています。"},
    {"question":"行と列からなる伝統的な表形式でデータを扱うデータベースの略称は?","choices":["RDBMS(関係データベース管理システム)","NoSQLという別種類のみ","ORMという別概念のみ","ETLという別概念のみ"],"answer":0,"explanation":"複雑な検索や整合性の担保に強みがあります。"},
    {"question":"同じデータを複数のサーバーに複製して可用性を高める仕組みは?","choices":["レプリケーション","シャーディングという別仕組みのみ","パーティショニングという別仕組みのみ","キャッシングという別仕組みのみ"],"answer":0,"explanation":"1台の障害時にも他のサーバーでサービスを継続できます。"},
    {"question":"データを複数のサーバーに分割して負荷を分散する仕組みは?","choices":["シャーディング","レプリケーションという別仕組みのみ","インデックス化という別仕組みのみ","正規化という別仕組みのみ"],"answer":0,"explanation":"大規模なデータ量にも対応しやすくなります。"},
    {"question":"複数のトランザクションが互いのロック解除を待ち続けて停止する状態は?","choices":["デッドロック","レースコンディションという類似だが別概念のみ","ダーティリードという別概念のみ","ファントムリードという別概念のみ"],"answer":0,"explanation":"デッドロック検出時は片方の処理が強制終了されることがあります。"},
    {"question":"ループ処理で関連データを1件ずつ追加取得し性能が悪化する問題は?","choices":["N+1問題","デッドロックという別問題のみ","デッドコードという別問題のみ","メモリリークという別問題のみ"],"answer":0,"explanation":"事前にまとめて取得することで回避できます。"},
    {"question":"オブジェクト指向のコードとリレーショナルDBを橋渡しする技術の略称は?","choices":["ORM(オブジェクト関係マッピング)","ETLという別概念のみ","ELTという別概念のみ","APIという別概念のみ"],"answer":0,"explanation":"SQLを直接書かずにオブジェクト操作でDB操作ができます。"},
    {"question":"データベース内であらかじめ定義しておく一連の処理手続きは?","choices":["ストアドプロシージャ","ビューという別概念のみ","トリガーという別概念のみ","インデックスという別概念のみ"],"answer":0,"explanation":"同じ処理を何度も再利用できます。"},
    {"question":"特定のイベント発生時に自動実行されるデータベースの仕組みは?","choices":["トリガー","ストアドプロシージャという別概念のみ","ビューという別概念のみ","インデックスという別概念のみ"],"answer":0,"explanation":"データ更新の通知処理などに使われます。"},
    {"question":"複雑なクエリ結果を仮想的なテーブルとして扱う仕組みは?","choices":["ビュー","インデックスという別概念のみ","トリガーという別概念のみ","スキーマという別概念のみ"],"answer":0,"explanation":"実データを持たずクエリ結果を都度取得します。"},
    {"question":"データベースのテーブル構造や制約の定義全体を指す用語は?","choices":["スキーマ","インデックスという別概念のみ","ビューという別概念のみ","トランザクションという別概念のみ"],"answer":0,"explanation":"データ型や制約、関係性なども含まれます。"},
    {"question":"テーブル同士の関係を図で表す設計図の名称は?","choices":["ER図(実体関連図)","フローチャートという別種類の図のみ","シーケンス図という別種類の図のみ","クラス図という別種類の図のみ"],"answer":0,"explanation":"データベース設計の初期段階で作成されます。"},
    {"question":"異なるシステム間でデータを抽出・変換・書き出す処理の略称は?","choices":["ETL(抽出・変換・格納)","ORMという別概念のみ","CRUDという別概念のみ","APIという別概念のみ"],"answer":0,"explanation":"データウェアハウスの構築などでよく使われます。"},
    {"question":"データの作成・読み取り・更新・削除という基本操作の略称は?","choices":["CRUD","ACIDという別概念のみ","ETLという別概念のみ","ORMという別概念のみ"],"answer":0,"explanation":"Create・Read・Update・Deleteの頭文字です。"},
    {"question":"演算処理を担うコンピュータの中枢部品の略称は?","choices":["CPU","GPU","RAM","SSD"],"answer":0,"explanation":"演算処理の速度がコンピュータ全体の性能に大きく影響します。"},
    {"question":"画像や映像の並列演算処理に特化した部品の略称は?","choices":["GPU","CPU","RAM","HDD"],"answer":0,"explanation":"機械学習の計算にも活用されています。"},
    {"question":"電源を切ると内容が消える主記憶装置の略称は?","choices":["RAM","ROM","SSD","HDD"],"answer":0,"explanation":"作業中のデータを一時的に保持します。"},
    {"question":"電源を切っても内容が保持される読み出し専用記憶装置の略称は?","choices":["ROM","RAM","SSD","キャッシュメモリ"],"answer":0,"explanation":"ファームウェアの格納などにも使われます。"},
    {"question":"回転する円盤にデータを記録する伝統的な補助記憶装置の略称は?","choices":["HDD","SSD","RAM","ROM"],"answer":0,"explanation":"読み書き速度は比較的遅めです。"},
    {"question":"半導体メモリを使い高速な読み書きが可能な補助記憶装置の略称は?","choices":["SSD","HDD","RAM","ROM"],"answer":0,"explanation":"衝撃に強く高速な読み書きが可能です。"},
    {"question":"CPUとメインメモリの速度差を埋めるための高速な小容量メモリは?","choices":["キャッシュメモリ","仮想メモリという別概念のみ","レジスタという別概念のみ","バッファという別概念のみ"],"answer":0,"explanation":"容量は小さいですが非常に高速です。"},
    {"question":"各部品を接続しコンピュータの土台となる基板は?","choices":["マザーボード","拡張カードという別部品のみ","電源ユニットという別部品のみ","ヒートシンクという別部品のみ"],"answer":0,"explanation":"各部品をつなぐ配線と拡張スロットを備えています。"},
    {"question":"電源投入直後にハードウェアを初期化する基本プログラムの略称は?","choices":["BIOS(またはUEFI)","OSという別概念のみ","ドライバという別概念のみ","ファームウェアの上位概念のみ"],"answer":0,"explanation":"起動時に各種デバイスの初期化を行います。"},
    {"question":"1秒あたりの処理回数を示すCPUの性能指標は?","choices":["クロック周波数","コア数という別指標のみ","キャッシュ容量という別指標のみ","スレッド数という別指標のみ"],"answer":0,"explanation":"数値が高いほど処理速度は速くなる傾向があります。"},
    {"question":"1つのCPUチップ内に搭載された独立した処理単位の数は?","choices":["コア数","クロック周波数という別指標のみ","スレッド数という近い概念のみ","キャッシュ容量という別指標のみ"],"answer":0,"explanation":"コア数が多いほど並列処理性能が高まります。"},
    {"question":"ハードウェアを制御する専用の小規模プログラムを指す用語は?","choices":["ファームウェア","ドライバという類似だが別概念のみ","BIOSという具体例の一つのみ","OSという上位概念のみ"],"answer":0,"explanation":"OSの一部として動作することが多いです。"},
    {"question":"OSが周辺機器を制御するために必要なソフトウェアは?","choices":["デバイスドライバ","ファームウェアという類似だが別概念のみ","カーネルという別概念のみ","シェルという別概念のみ"],"answer":0,"explanation":"プリンタなどの周辺機器の制御に使われます。"},
    {"question":"OSの中核でハードウェア資源を管理する部分は?","choices":["カーネル","シェルという別概念のみ","ドライバという別概念のみ","ファームウェアという別概念のみ"],"answer":0,"explanation":"メモリ管理やプロセス管理などを担います。"},
    {"question":"ユーザーの命令を受け付けてカーネルに橋渡しするインターフェースは?","choices":["シェル","カーネルという別概念のみ","ドライバという別概念のみ","ファームウェアという別概念のみ"],"answer":0,"explanation":"CUIの操作画面を提供します。"},
    {"question":"実行中のプログラムのインスタンスを指す用語は?","choices":["プロセス","スレッドという別単位のみ","タスクという曖昧な同義語のみ","ジョブという別単位のみ"],"answer":0,"explanation":"独立したメモリ空間を持ちます。"},
    {"question":"1つのプロセス内で並行して実行される処理単位は?","choices":["スレッド","プロセスという上位概念のみ","コアという別概念のみ","ジョブという別概念のみ"],"answer":0,"explanation":"軽量でメモリを共有しながら並行処理できます。"},
    {"question":"複数の処理を切り替えながら同時に実行しているように見せる仕組みは?","choices":["マルチタスク","マルチスレッドという類似だが別概念のみ","並列処理という類似だが別概念のみ","パイプライン処理という別概念のみ"],"answer":0,"explanation":"実際には短時間で処理を切り替えています。"},
    {"question":"実メモリ容量を超えて扱えるようにする仕組みは?","choices":["仮想メモリ","キャッシュメモリという別概念のみ","レジスタという別概念のみ","スワップという実現手段の一部のみ"],"answer":0,"explanation":"ディスクの一部をメモリの代わりに使用します。"},
    {"question":"ファイルやディレクトリを管理するOSの仕組みは?","choices":["ファイルシステム","レジストリという別概念のみ","カーネルという別概念のみ","シェルという別概念のみ"],"answer":0,"explanation":"階層構造でファイルを整理します。"},
    {"question":"あるファイルの実体を指し示すショートカットのような仕組みは?","choices":["シンボリックリンク","ハードリンクという類似だが別概念のみ","ショートカットという別OSの機能名のみ","エイリアスという別OSの機能名のみ"],"answer":0,"explanation":"複数の場所から同じファイルを参照できます。"},
    {"question":"OS上でプログラムの実行順序やCPU時間を割り当てる仕組みは?","choices":["スケジューラ","カーネルという上位概念のみ","シェルという別概念のみ","ドライバという別概念のみ"],"answer":0,"explanation":"優先度に応じて実行順序を決定します。"},
    {"question":"実行環境に依存する設定値をプログラム外部から渡す仕組みは?","choices":["環境変数","設定ファイルという類似だが別概念のみ","レジストリという別概念のみ","コマンドライン引数という別概念のみ"],"answer":0,"explanation":"OSやプログラミング言語によって扱いが異なります。"},
    {"question":"コマンドを入力してコンピュータを操作する画面の総称は?","choices":["ターミナル(コマンドライン)","GUIという逆の概念のみ","デスクトップという別概念のみ","コンソールという類似の別名称のみ"],"answer":0,"explanation":"ターミナルとも呼ばれます。"},
    {"question":"現在の作業ディレクトリを表示するコマンドは?","choices":["pwd","cd","ls","dir単体はWindows専用"],"answer":0,"explanation":"lsやcdと組み合わせてよく使われます。"},
    {"question":"ディレクトリの中身を一覧表示するコマンドは?","choices":["ls","pwd","cd","mkdir"],"answer":0,"explanation":"隠しファイルはオプションを付けないと表示されないことが多いです。"},
    {"question":"ディレクトリを移動するコマンドは?","choices":["cd","ls","pwd","mkdir"],"answer":0,"explanation":"1つ上の階層へは「cd ..」で戻れます。"},
    {"question":"新しいディレクトリを作成するコマンドは?","choices":["mkdir","cd","touch","rm"],"answer":0,"explanation":"再帰的に作成するオプションも用意されています。"},
    {"question":"新しい空のファイルを作成するコマンドは?","choices":["touch","mkdir","cat","echo単体"],"answer":0,"explanation":"既に存在する場合は更新日時のみ変わります。"},
    {"question":"ファイルやディレクトリを削除するコマンドは?","choices":["rm","del単体はWindows専用","clear","erase単体"],"answer":0,"explanation":"削除したファイルは環境によって復元が困難です。"},
    {"question":"ファイルの内容を表示するコマンドは?","choices":["cat","ls","pwd","mkdir"],"answer":0,"explanation":"標準出力にファイル内容を表示します。"},
    {"question":"コピー操作をショートカットキーで行う組み合わせは?","choices":["Ctrl+C","Ctrl+V","Ctrl+Z","Ctrl+X単体は切り取り"],"answer":0,"explanation":"選択範囲をクリップボードに複製します。"},
    {"question":"貼り付け操作をショートカットキーで行う組み合わせは?","choices":["Ctrl+V","Ctrl+C","Ctrl+Z","Ctrl+A単体は全選択"],"answer":0,"explanation":"クリップボードの内容をカーソル位置に挿入します。"},
    {"question":"直前の操作を取り消すショートカットキーの組み合わせは?","choices":["Ctrl+Z","Ctrl+C","Ctrl+V","Ctrl+S単体は保存"],"answer":0,"explanation":"複数回押すとさらに前の状態に戻れます。"},
    {"question":"コードの記述を色分けして見やすくするエディタ機能は?","choices":["シンタックスハイライト","オートコンプリートという別機能のみ","リンティングという別機能のみ","フォーマッティングという別機能のみ"],"answer":0,"explanation":"構文エラーの発見にも役立ちます。"},
    {"question":"入力途中のコードを予測して候補を表示するエディタ機能は?","choices":["オートコンプリート(コード補完)","シンタックスハイライトという別機能のみ","リファクタリング支援という別機能のみ","バージョン管理という別機能のみ"],"answer":0,"explanation":"開発効率を大きく向上させる機能です。"},
    {"question":"プログラムの実行を一時停止させ状態を確認する機能は?","choices":["ブレークポイント","ウォッチ式という近い機能のみ","ステップ実行という近い機能のみ","ログ出力という別機能のみ"],"answer":0,"explanation":"変数の中身などをその場で確認できます。"},
    {"question":"プログラムの不具合の原因を探るための専用ツールは?","choices":["デバッガ","リンターという別ツールのみ","フォーマッタという別ツールのみ","コンパイラという別ツールのみ"],"answer":0,"explanation":"ステップ実行などの機能も備えています。"},
    {"question":"画面遷移とデータ・表示ロジックを分離する代表的な設計パターンは?","choices":["MVC(Model-View-Controller)","MVVMという別パターンのみ","シングルトンという別パターンのみ","オブザーバーという別パターンのみ"],"answer":0,"explanation":"多くのフロントエンドフレームワークが採用しています。"},
    {"question":"View側の状態管理をデータバインディングで結びつける設計パターンは?","choices":["MVVM(Model-View-ViewModel)","MVCという別パターンのみ","MVPという別パターンのみ","ファクトリーという別パターンのみ"],"answer":0,"explanation":"Vue.jsなどのフレームワークで多く採用されています。"},
    {"question":"状態変化を通知して依存側に自動反映させるデザインパターンは?","choices":["オブザーバーパターン","ファクトリーパターンという別パターンのみ","シングルトンパターンという別パターンのみ","デコレーターパターンという別パターンのみ"],"answer":0,"explanation":"Publish/Subscribeパターンとも呼ばれます。"},
    {"question":"既存のオブジェクトに新しい機能を動的に追加するデザインパターンは?","choices":["デコレーターパターン","アダプターパターンという別パターンのみ","ストラテジーパターンという別パターンのみ","オブザーバーパターンという別パターンのみ"],"answer":0,"explanation":"元のクラスを変更せずに機能を拡張できます。"},
    {"question":"互換性のないインターフェースを変換して繋ぐデザインパターンは?","choices":["アダプターパターン","デコレーターパターンという別パターンのみ","ファサードパターンという別パターンのみ","プロキシパターンという別パターンのみ"],"answer":0,"explanation":"レガシーコードとの連携時によく使われます。"},
    {"question":"アルゴリズムを実行時に切り替え可能にするデザインパターンは?","choices":["ストラテジーパターン","アダプターパターンという別パターンのみ","オブザーバーパターンという別パターンのみ","コマンドパターンという別パターンのみ"],"answer":0,"explanation":"if分岐を減らしコードの見通しを良くします。"},
    {"question":"複雑なサブシステムへの単純な窓口を提供するデザインパターンは?","choices":["ファサードパターン","アダプターパターンという別パターンのみ","デコレーターパターンという別パターンのみ","プロキシパターンという別パターンのみ"],"answer":0,"explanation":"複雑さを隠蔽し使いやすいAPIを提供します。"},
    {"question":"他のオブジェクトの代理として処理を仲介するデザインパターンは?","choices":["プロキシパターン","ファサードパターンという別パターンのみ","アダプターパターンという別パターンのみ","デコレーターパターンという別パターンのみ"],"answer":0,"explanation":"アクセス制御やキャッシュ処理などに使われます。"},
    {"question":"オブジェクトの生成手順を段階的に分けて構築するデザインパターンは?","choices":["ビルダーパターン","ファクトリーパターンという類似だが別パターンのみ","プロトタイプパターンという別パターンのみ","シングルトンパターンという別パターンのみ"],"answer":0,"explanation":"複雑なオブジェクトの生成に向いています。"},
    {"question":"コレクションの要素に順にアクセスする方法を提供するデザインパターンは?","choices":["イテレータパターン","オブザーバーパターンという別パターンのみ","コマンドパターンという別パターンのみ","ストラテジーパターンという別パターンのみ"],"answer":0,"explanation":"配列やリストなど様々な構造に対応できます。"},
    {"question":"外部からクラスの依存関係を注入して疎結合にする設計手法の略称は?","choices":["DI(依存性注入)","ORMという別概念のみ","IoCの下位概念という説明が逆のみ","MVCという別概念のみ"],"answer":0,"explanation":"テストのしやすさや柔軟性が向上します。"},
    {"question":"テスト対象が依存する外部処理を偽物に置き換える技術の総称は?","choices":["モック(テストダブル)","スタブという類似だが別種類のみ","スパイという類似だが別種類のみ","フィクスチャという別概念のみ"],"answer":0,"explanation":"実際の外部サービスを使わずテストが行えます。"},
    {"question":"決まった値だけを返す簡易な代替オブジェクトを指す用語は?","choices":["スタブ","モックという類似だが別種類のみ","スパイという類似だが別種類のみ","フィクスチャという別概念のみ"],"answer":0,"explanation":"入力に関わらず固定値を返す単純な実装です。"},
    {"question":"呼び出し回数や引数を記録しつつ実際の処理も行うテストダブルは?","choices":["スパイ","モックという類似だが別種類のみ","スタブという類似だが別種類のみ","フェイクという類似だが別種類のみ"],"answer":0,"explanation":"呼び出しの検証を伴うテストに使われます。"},
    {"question":"テストがソースコードのどれだけを実行したかを示す割合は?","choices":["コードカバレッジ","テスト密度という別指標のみ","バグ率という別指標のみ","実行速度という別指標のみ"],"answer":0,"explanation":"数値が高いほどテストの網羅性が高いとされますが100%が万能ではありません。"},
    {"question":"修正によって既存の機能が壊れていないか確認するテストは?","choices":["リグレッションテスト(回帰テスト)","スモークテストという別テストのみ","受け入れテストという別テストのみ","負荷テストという別テストのみ"],"answer":0,"explanation":"意図しないバグの再発を防ぎます。"},
    {"question":"主要機能が最低限動作するかを素早く確認するテストは?","choices":["スモークテスト","リグレッションテストという別テストのみ","受け入れテストという別テストのみ","負荷テストという別テストのみ"],"answer":0,"explanation":"デプロイ後の簡易チェックとしてよく使われます。"},
    {"question":"実際の利用者の視点でシステム全体を通して検証するテストは?","choices":["E2Eテスト(エンドツーエンドテスト)","単体テストという別テストのみ","静的解析という別テストのみ","コードレビューという別テストのみ"],"answer":0,"explanation":"実際のユーザー操作に近い形で検証します。"},
    {"question":"納品前に発注者側が要件を満たしているか確認するテストは?","choices":["受け入れテスト","スモークテストという別テストのみ","単体テストという別テストのみ","静的解析という別テストのみ"],"answer":0,"explanation":"仕様通りの動作であるかを最終確認します。"},
    {"question":"内部構造を意識せず入出力だけに着目するテスト手法は?","choices":["ブラックボックステスト","ホワイトボックステストという逆の手法のみ","グレーボックステストという別手法のみ","静的解析という別手法のみ"],"answer":0,"explanation":"仕様書に基づいた入出力のテストが中心になります。"},
    {"question":"内部のロジックや構造を把握した上で行うテスト手法は?","choices":["ホワイトボックステスト","ブラックボックステストという逆の手法のみ","グレーボックステストという別手法のみ","受け入れテストという別手法のみ"],"answer":0,"explanation":"コードカバレッジの向上にも役立ちます。"},
    {"question":"境界となる値を重点的に検証するテスト設計技法は?","choices":["境界値分析","同値分割という近い技法のみ","デシジョンテーブルという別技法のみ","ペアワイズ法という別技法のみ"],"answer":0,"explanation":"境界を跨いだ不具合を発見しやすくなります。"},
    {"question":"同じ結果になる入力をグループ化してテストを効率化する技法は?","choices":["同値分割","境界値分析という近い技法のみ","デシジョンテーブルという別技法のみ","ペアワイズ法という別技法のみ"],"answer":0,"explanation":"テストケース数を削減しながら網羅性を保てます。"},
    {"question":"テストの合否を機械的に判定する検証コードを指す用語は?","choices":["アサーション","スタブという別概念のみ","モックという別概念のみ","フィクスチャという別概念のみ"],"answer":0,"explanation":"期待値と実際の値を比較して判定します。"},
    {"question":"テスト実行前に共通の準備データや状態を用意する仕組みは?","choices":["テストフィクスチャ","アサーションという別概念のみ","モックという別概念のみ","スタブという別概念のみ"],"answer":0,"explanation":"テストごとに同じ条件を再現しやすくなります。"},
    {"question":"コンピュータが情報を扱う際の基本的な2進数表現の最小単位は?","choices":["ビット","バイトという上位単位のみ","ワードという上位単位のみ","ニブルという別単位のみ"],"answer":0,"explanation":"0か1のいずれかの値を取ります。"},
    {"question":"8ビットをまとめた基本的なデータの単位は?","choices":["バイト","ビットという下位単位のみ","ワードという別単位のみ","ピクセルという別概念のみ"],"answer":0,"explanation":"コンピュータの基本的な処理単位として使われます。"},
    {"question":"英数字を数値に対応させる古くからの文字コード規格は?","choices":["ASCII","UTF-8という新しい規格のみ","Shift_JISという別規格のみ","EUC-JPという別規格のみ"],"answer":0,"explanation":"日本語などは表現できない制約があります。"},
    {"question":"世界中の文字を統一的に扱えるようにした文字コード規格は?","choices":["Unicode","ASCIIという古い規格のみ","Shift_JISという別規格のみ","EBCDICという別規格のみ"],"answer":0,"explanation":"絵文字や多言語対応にも利用されています。"},
    {"question":"半導体の集積率が一定期間で倍増するという経験則は?","choices":["ムーアの法則","アムダールの法則という別法則のみ","パーキンソンの法則という別法則のみ","ハインリッヒの法則という別法則のみ"],"answer":0,"explanation":"半導体産業の成長ペースを示す経験則として有名です。"},
    {"question":"手続きを順番に記述していくプログラミングのスタイルは?","choices":["手続き型プログラミング","関数型プログラミングという別スタイルのみ","オブジェクト指向プログラミングという別スタイルのみ","宣言型プログラミングという別スタイルのみ"],"answer":0,"explanation":"実行順序が明確で理解しやすい特徴があります。"},
    {"question":"副作用を避け関数の組み合わせで処理を記述するスタイルは?","choices":["関数型プログラミング","手続き型プログラミングという別スタイルのみ","オブジェクト指向プログラミングという別スタイルのみ","命令型プログラミングという別スタイルのみ"],"answer":0,"explanation":"テストや並列処理がしやすいとされています。"},
    {"question":"データと処理をオブジェクトとしてまとめて扱うスタイルは?","choices":["オブジェクト指向プログラミング","手続き型プログラミングという別スタイルのみ","関数型プログラミングという別スタイルのみ","アセンブリ型という存在しない用語のみ"],"answer":0,"explanation":"再利用性やメンテナンス性を高めやすい特徴があります。"},
    {"question":"ソースコードをコンパイルせずすぐに実行できる言語の特徴は?","choices":["スクリプト言語(インタプリタ型言語)","コンパイル型言語という逆特徴のみ","アセンブリ言語という別概念のみ","マークアップ言語という別概念のみ"],"answer":0,"explanation":"事前コンパイルが不要な分、実行速度はやや劣る傾向があります。"},
    {"question":"改善や修正が難しく複雑化した既存コードを指す通称は?","choices":["レガシーコード","ボイラープレートという別概念のみ","ハードコーディングという別概念のみ","スパゲッティコードという類似だが別呼称のみ"],"answer":0,"explanation":"改修コストが高くなりやすいコードを指します。"},
    {"question":"見通しの悪い複雑に絡み合ったコードを指す俗称は?","choices":["スパゲッティコード","ボイラープレートという別概念のみ","レガシーコードという類似だが別呼称のみ","デッドコードという別概念のみ"],"answer":0,"explanation":"可読性が低く保守が難しくなりがちです。"},
    {"question":"毎回同じように書く必要がある定型的なコードを指す用語は?","choices":["ボイラープレートコード","スパゲッティコードという別概念のみ","レガシーコードという別概念のみ","デッドコードという別概念のみ"],"answer":0,"explanation":"自動生成ツールなどで削減されることもあります。"},
    {"question":"将来の作業を見越して今は簡易な実装で済ませることで生じる負債の比喩は?","choices":["技術的負債","レガシーコードという類似だが別概念のみ","デッドコードという別概念のみ","ボイラープレートという別概念のみ"],"answer":0,"explanation":"後から返済(修正)する必要があるコストに例えられます。"},
    {"question":"呼び出されず使われていないコードを指す用語は?","choices":["デッドコード","レガシーコードという別概念のみ","スパゲッティコードという別概念のみ","ボイラープレートという別概念のみ"],"answer":0,"explanation":"削除しても動作に影響しないことが多いです。"},
    {"question":"特定のベンダー製品に依存しすぎて乗り換えが困難になる状態は?","choices":["ベンダーロックイン","技術的負債という別概念のみ","レガシー化という別概念のみ","サポート終了という別概念のみ"],"answer":0,"explanation":"契約変更のコストやリスクが高まります。"},
    {"question":"異なるシステムやソフトウェア同士がスムーズに連携できる性質は?","choices":["相互運用性(インターオペラビリティ)","可搬性(ポータビリティ)という近い概念のみ","拡張性(スケーラビリティ)という別概念のみ","保守性という別概念のみ"],"answer":0,"explanation":"標準規格に準拠することで実現しやすくなります。"},
    {"question":"異なる環境でも同じソフトウェアが動作できる性質は?","choices":["可搬性(ポータビリティ)","相互運用性という近い概念のみ","拡張性という別概念のみ","保守性という別概念のみ"],"answer":0,"explanation":"OSやハードウェアに依存しない設計が求められます。"},
    {"question":"新しいバージョンでも古い仕様のまま動作し続けられる性質は?","choices":["後方互換性","前方互換性という逆方向の概念のみ","相互運用性という別概念のみ","可搬性という別概念のみ"],"answer":0,"explanation":"新バージョンでも古い使い方がそのまま動作する性質です。"},
    {"question":"将来的に廃止予定であることを開発者に通知する仕組みは?","choices":["非推奨(deprecated)の表示","サポート終了(EOL)という結果状態のみ","レガシー化という結果状態のみ","リファクタリングという別概念のみ"],"answer":0,"explanation":"古いAPIをすぐ廃止せず移行期間を設ける配慮です。"},
    {"question":"汎用的な機能をまとめて再利用可能にしたプログラム部品の総称は?","choices":["ライブラリ","フレームワークという類似だが別概念のみ","モジュールという近い概念のみ","パッケージという近い概念のみ"],"answer":0,"explanation":"車輪の再発明を避け開発効率を高めます。"},
    {"question":"アプリの骨組みや設計の流れまで規定する開発基盤の総称は?","choices":["フレームワーク","ライブラリという類似だが別概念のみ","SDKという類似だが別概念のみ","IDEという別概念のみ"],"answer":0,"explanation":"設計思想に沿った実装が求められます。"},
    {"question":"特定のプラットフォーム向けの開発一式をまとめたツール群の略称は?","choices":["SDK(ソフトウェア開発キット)","APIという別概念のみ","IDEという別概念のみ","CLIという別概念のみ"],"answer":0,"explanation":"OSやモバイル向けなど対象環境ごとに提供されます。"},
    {"question":"異なるソフトウェア同士が機能をやり取りするための接点の略称は?","choices":["API","SDKという別概念のみ","GUIという別概念のみ","CLIという別概念のみ"],"answer":0,"explanation":"公開されたAPIを通じてデータや機能をやり取りします。"},
    {"question":"コマンド入力で操作する利用者インターフェースの略称は?","choices":["CLI(コマンドラインインターフェース)","GUIという逆の概念のみ","APIという別概念のみ","SDKという別概念のみ"],"answer":0,"explanation":"スクリプトによる自動化がしやすい利点があります。"},
    {"question":"アイコンやウィンドウなど視覚的に操作するインターフェースの略称は?","choices":["GUI(グラフィカルユーザーインターフェース)","CLIという逆の概念のみ","APIという別概念のみ","SDKという別概念のみ"],"answer":0,"explanation":"直感的な操作が可能な反面、自動化はやや不向きです。"},
    {"question":"プロジェクトの完了予定日や重要な区切りを示す用語は?","choices":["マイルストーン","デッドラインという類似だが別概念のみ","スプリントという別概念のみ","バックログという別概念のみ"],"answer":0,"explanation":"進捗管理の重要な節目として使われます。"},
    {"question":"プロジェクトで実施すべき作業を階層的に分解した図の名称は?","choices":["WBS(作業分解構成図)","ER図という別種類の図のみ","フローチャートという別種類の図のみ","ガントチャートという別種類の図のみ"],"answer":0,"explanation":"見積もりや担当割り当てがしやすくなります。"},
    {"question":"プロジェクトに関わり影響を受ける関係者を指す用語は?","choices":["ステークホルダー","プロダクトオーナーという特定役職のみ","スクラムマスターという特定役職のみ","クライアントという狭い概念のみ"],"answer":0,"explanation":"要求のすり合わせに関わる重要な立場です。"},
    {"question":"プロジェクトのリスクを洗い出し対策を講じる活動は?","choices":["リスクマネジメント","課題管理という近い概念のみ","変更管理という別概念のみ","品質管理という別概念のみ"],"answer":0,"explanation":"未然に問題を防ぐ効果があります。"},
    {"question":"仕様や要件の変更を適切な手順で管理するプロセスは?","choices":["変更管理","リスクマネジメントという別概念のみ","課題管理という別概念のみ","品質管理という別概念のみ"],"answer":0,"explanation":"影響範囲を事前に評価してから反映します。"},
    {"question":"成果物が要件や品質基準を満たしているか確認する活動は?","choices":["品質管理(QA)","リスクマネジメントという別概念のみ","変更管理という別概念のみ","課題管理という別概念のみ"],"answer":0,"explanation":"レビューやテストを通じて確認します。"},
    {"question":"プロジェクトの各作業に必要な人員や予算を割り当てる活動は?","choices":["リソース配分(資源管理)","リスクマネジメントという別概念のみ","品質管理という別概念のみ","変更管理という別概念のみ"],"answer":0,"explanation":"スケジュール遅延の防止にもつながります。"},
    {"question":"プロジェクト全体の完了に直結する一連の作業の連なりを指す用語は?","choices":["クリティカルパス","マイルストーンという別概念のみ","WBSという別概念のみ","ステークホルダーという別概念のみ"],"answer":0,"explanation":"遅延がプロジェクト全体に直結する重要な工程です。"},
    {"question":"要求事項を関係者からヒアリングして整理する活動は?","choices":["要件定義(要求収集)","リスクマネジメントという別概念のみ","品質管理という別概念のみ","変更管理という別概念のみ"],"answer":0,"explanation":"曖昧な要求のままでは手戻りが発生しやすくなります。"},
    ]
  },
];

/* ---- 状態管理 ---- */
let sessionQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let isAnswering = false;
let currentSessionCategory = "";

const QUESTIONS_PER_SESSION = 100;

/* Fisher-Yatesアルゴリズムで配列をシャッフル */
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/* 1問分の選択肢もシャッフルし、正解インデックスを再計算する */
function shuffleQuestionChoices(q) {
    const order = shuffleArray(q.choices.map((_, i) => i));
    return {
        id: q.id,
        question: q.question,
        choices: order.map(i => q.choices[i]),
        answer: order.indexOf(q.answer),
        explanation: q.explanation,
        category: q.category,
        categoryColor: q.categoryColor
    };
}

/* 全カテゴリを1つの配列(1000問)にまとめる */
const quizData = categories.flatMap(function (cat, catIndex) {
    return cat.questions.map(function (q, qIndex) {
        return {
            id: `${catIndex}-${qIndex}`,
            question: q.question,
            choices: q.choices,
            answer: q.answer,
            explanation: q.explanation,
            category: cat.name,
            categoryColor: cat.color
        };
    });
});

/* ---- 学習履歴・進捗管理(localStorage) ---- */
const STORAGE_KEY = "itSkillUpQuiz_progress_v1";
const HISTORY_LIMIT = 20;
const TOTAL_QUESTION_COUNT = quizData.length;

function loadProgressState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { masteredIds: [], wrongIds: [], history: [] };
        const parsed = JSON.parse(raw);
        return {
            masteredIds: Array.isArray(parsed.masteredIds) ? parsed.masteredIds : [],
            wrongIds: Array.isArray(parsed.wrongIds) ? parsed.wrongIds : [],
            history: Array.isArray(parsed.history) ? parsed.history : []
        };
    } catch (e) {
        // 保存データが壊れていた場合は初期状態にフォールバックする
        return { masteredIds: [], wrongIds: [], history: [] };
    }
}

function saveProgressState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        // プライベートモード等で保存できない場合は静かに諦める(機能停止させない)
    }
}

let progressState = loadProgressState();

/* 1問回答するたびに呼び出し、習得済み/苦手のセットを更新する */
function recordAnswer(questionId, isCorrect) {
    const masteredSet = new Set(progressState.masteredIds);
    const wrongSet = new Set(progressState.wrongIds);

    if (isCorrect) {
        masteredSet.add(questionId);
        wrongSet.delete(questionId);
    } else {
        wrongSet.add(questionId);
    }

    progressState.masteredIds = Array.from(masteredSet);
    progressState.wrongIds = Array.from(wrongSet);
    saveProgressState(progressState);
}

/* 1セッション終了時に履歴として記録する(最新HISTORY_LIMIT件のみ保持) */
function recordSessionResult(categoryLabel, sessionScore, sessionTotal) {
    const entry = {
        date: new Date().toISOString(),
        category: categoryLabel,
        score: sessionScore,
        total: sessionTotal,
        percentage: Math.round((sessionScore / sessionTotal) * 100)
    };
    progressState.history.unshift(entry);
    progressState.history = progressState.history.slice(0, HISTORY_LIMIT);
    saveProgressState(progressState);
}

function formatHistoryDate(isoString) {
    const d = new Date(isoString);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${d.getFullYear()}/${mm}/${dd} ${hh}:${min}`;
}

/* スタート画面の進捗サマリー・復習ボタン・履歴を最新状態に描画する */
function renderProgressSummary() {
    const masteredCount = progressState.masteredIds.length;
    const percentage = Math.round((masteredCount / TOTAL_QUESTION_COUNT) * 100);

    progressSummaryValue.textContent = `${masteredCount} / ${TOTAL_QUESTION_COUNT}問 (${percentage}%)`;
    progressSummaryFill.style.width = `${percentage}%`;

    const wrongCount = progressState.wrongIds.length;
    reviewBtn.textContent = `苦手問題を復習する(${wrongCount}問)`;
    reviewBtn.disabled = wrongCount === 0;

    renderHistoryList();
}

function renderHistoryList() {
    historyList.innerHTML = "";

    if (progressState.history.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "history-empty";
        emptyItem.textContent = "まだ学習履歴がありません。";
        historyList.appendChild(emptyItem);
        return;
    }

    progressState.history.forEach(function (entry) {
        const item = document.createElement("li");
        item.className = "history-item";
        item.innerHTML = `
            <span class="history-date">${formatHistoryDate(entry.date)}</span>
            <span class="history-category">${entry.category}</span>
            <span class="history-score">${entry.score} / ${entry.total} (${entry.percentage}%)</span>
        `;
        historyList.appendChild(item);
    });
}

/* 結果画面のSNSシェアリンクを、直前のセッション結果に合わせて更新する */
function updateShareLinks(sessionScore, sessionTotal, categoryLabel) {
    const shareText = `ITスキルアップクイズで${categoryLabel}に挑戦し、${sessionScore} / ${sessionTotal}問正解でした!`;
    const shareUrl = window.location.href;

    shareX.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    shareLine.href = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
}

/* ---- 中断・再開機能(localStorage) ---- */
const PAUSED_SESSION_KEY = "itSkillUpQuiz_pausedSession_v1";

/* 現在の出題状況をまるごと保存する。showQuestion()のたびに呼ばれる想定 */
function savePausedSession() {
    if (!sessionQuestions.length) return;

    const pausedSession = {
        sessionQuestions: sessionQuestions,
        currentQuestionIndex: currentQuestionIndex,
        score: score,
        category: currentSessionCategory,
        savedAt: new Date().toISOString()
    };

    try {
        localStorage.setItem(PAUSED_SESSION_KEY, JSON.stringify(pausedSession));
    } catch (e) {
        // 保存できない環境(プライベートモード等)では中断機能を静かに諦める
    }
}

/* 保存済みの中断セッションを読み込む。無効なデータはnullを返す */
function loadPausedSession() {
    try {
        const raw = localStorage.getItem(PAUSED_SESSION_KEY);
        if (!raw) return null;

        const parsed = JSON.parse(raw);
        const hasValidQuestions = Array.isArray(parsed.sessionQuestions) && parsed.sessionQuestions.length > 0;
        const hasValidIndex = typeof parsed.currentQuestionIndex === "number";

        if (!hasValidQuestions || !hasValidIndex) return null;
        // 全問回答済み(=最後まで終わっている)なら再開対象にしない
        if (parsed.currentQuestionIndex >= parsed.sessionQuestions.length) return null;

        return parsed;
    } catch (e) {
        return null;
    }
}

function clearPausedSession() {
    try {
        localStorage.removeItem(PAUSED_SESSION_KEY);
    } catch (e) {
        // 何もしない(削除に失敗しても致命的ではない)
    }
}

/* スタート画面の再開バナーを、保存済みデータの有無に応じて表示・更新する */
function renderResumeBanner() {
    const paused = loadPausedSession();

    if (!paused) {
        resumeBanner.classList.add("hidden");
        return;
    }

    const total = paused.sessionQuestions.length;
    const answeredCount = paused.currentQuestionIndex;
    resumeBannerDetail.textContent =
        `${paused.category} ・ 問題 ${answeredCount + 1} / ${total} から再開できます(現在のスコア: ${paused.score})`;
    resumeBanner.classList.remove("hidden");
}

/* ---- イベント登録 ---- */
startBtn.addEventListener("click", function () {
    startQuiz(null);
});

restartBtn.addEventListener("click", function () {
    // もう一度カテゴリを選び直せるようスタート画面に戻る
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});

reviewBtn.addEventListener("click", function () {
    if (progressState.wrongIds.length === 0) return;
    startQuiz(null, "review");
});

pauseBtn.addEventListener("click", function () {
    // 現在の出題状況はshowQuestion()のたびに自動保存済みなので、ここでは画面遷移のみ行う
    savePausedSession();

    quizScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");

    renderResumeBanner();
    renderProgressSummary();
});

resumeBtn.addEventListener("click", function () {
    const paused = loadPausedSession();
    if (!paused) {
        // 何らかの理由でデータが消えていた場合はバナーを更新して終了する
        renderResumeBanner();
        return;
    }

    sessionQuestions = paused.sessionQuestions;
    currentQuestionIndex = paused.currentQuestionIndex;
    score = paused.score;
    currentSessionCategory = paused.category;
    scoreBadge.textContent = `スコア: ${score}`;

    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    resultScreen.classList.add("hidden");

    showQuestion();
});

discardResumeBtn.addEventListener("click", function () {
    clearPausedSession();
    renderResumeBanner();
});

categoryButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
        startQuiz(btn.dataset.category);
    });
});

answersContainer.addEventListener("click", function (event) {
    const button = event.target.closest(".answer-btn");
    if (!button || isAnswering) return;

    isAnswering = true;

    const selectedIndex = Number(button.dataset.index);
    const currentQuestion = sessionQuestions[currentQuestionIndex];
    const correctIndex = currentQuestion.answer;
    const allButtons = document.querySelectorAll(".answer-btn");

    if (selectedIndex === correctIndex) {
        score++;
        button.classList.add("is-correct");
    } else {
        button.classList.add("is-wrong");
        allButtons[correctIndex].classList.add("is-correct");
    }

    recordAnswer(currentQuestion.id, selectedIndex === correctIndex);

    allButtons.forEach(function (b) {
        b.disabled = true;
    });

    scoreBadge.textContent = `スコア: ${score}`;

    // 解説を表示し、「次の問題へ」ボタンで進行を制御する
    explanationText.textContent = currentQuestion.explanation;
    explanationBox.classList.remove("hidden");
    explanationBox.classList.toggle("is-correct-box", selectedIndex === correctIndex);
    explanationBox.classList.toggle("is-wrong-box", selectedIndex !== correctIndex);
});

nextBtn.addEventListener("click", function () {
    currentQuestionIndex++;
    if (currentQuestionIndex < sessionQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
    isAnswering = false;
});

/* ---- メイン処理 ---- */
function startQuiz(categoryFilter, mode) {
    const sessionMode = mode === "review" ? "review" : "normal";

    // 復習モードでは「苦手問題(直近で間違えた問題)」のみを出題対象にする
    let sourcePool;
    if (sessionMode === "review") {
        const wrongIdSet = new Set(progressState.wrongIds);
        sourcePool = quizData.filter(function (q) { return wrongIdSet.has(q.id); });
    } else if (categoryFilter) {
        // カテゴリが指定されていればそのカテゴリの200問だけを対象にする
        sourcePool = quizData.filter(function (q) { return q.category === categoryFilter; });
    } else {
        sourcePool = quizData;
    }

    if (sourcePool.length === 0) {
        return;
    }

    // 復習モードは苦手問題をすべて出題し、それ以外は最大100問に制限する
    const sessionSize = sessionMode === "review"
        ? sourcePool.length
        : Math.min(QUESTIONS_PER_SESSION, sourcePool.length);

    // 対象プールの中から毎回ランダムに出題し、選択肢の順序もシャッフルする
    sessionQuestions = shuffleArray(sourcePool)
        .slice(0, sessionSize)
        .map(shuffleQuestionChoices);

    currentSessionCategory = sessionMode === "review"
        ? "苦手問題復習"
        : (categoryFilter || "全カテゴリ");

    currentQuestionIndex = 0;
    score = 0;
    scoreBadge.textContent = `スコア: 0`;

    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    resultScreen.classList.add("hidden");

    showQuestion();
}

function showQuestion() {
    isAnswering = false;
    const currentQuestion = sessionQuestions[currentQuestionIndex];

    categoryBadge.textContent = currentQuestion.category;
    categoryBadge.style.backgroundColor = currentQuestion.categoryColor;

    questionText.textContent = currentQuestion.question;

    explanationBox.classList.add("hidden");
    explanationBox.classList.remove("is-correct-box", "is-wrong-box");
    explanationText.textContent = "";

    const answerButtons = document.querySelectorAll(".answer-btn");
    answerButtons.forEach(function (button, index) {
        button.textContent = currentQuestion.choices[index];
        button.dataset.index = index;
        button.classList.remove("is-correct", "is-wrong");
        button.disabled = false;
    });

    const total = sessionQuestions.length;
    const current = currentQuestionIndex + 1;
    progressLabel.textContent = `問題 ${current} / ${total}`;
    progressFill.style.width = `${(currentQuestionIndex / total) * 100}%`;

    // 表示するたびに現在の出題状況を保存し、途中でブラウザを閉じても再開できるようにする
    savePausedSession();
}

function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const total = sessionQuestions.length;
    const percentage = Math.round((score / total) * 100);

    resultText.textContent = `${score} / ${total} 点`;

    let comment = "";
    if (percentage >= 90) {
        comment = "素晴らしい結果です！IT知識がしっかり身についています。";
    } else if (percentage >= 70) {
        comment = "好成績です。あと少しで得意分野と言えそうです。";
    } else if (percentage >= 50) {
        comment = "半分以上正解できました。復習を重ねてさらに伸ばしましょう。";
    } else {
        comment = "まずは基礎から一つずつ。挑戦を重ねるほど身についていきます。";
    }
    resultSubtext.textContent = comment;

    recordSessionResult(currentSessionCategory, score, total);
    updateShareLinks(score, total, currentSessionCategory);
    clearPausedSession(); // 最後まで終えたセッションは再開対象から外す
    renderProgressSummary();
    renderResumeBanner();
}

/* ---- 初期表示 ---- */
renderProgressSummary();
renderResumeBanner();
