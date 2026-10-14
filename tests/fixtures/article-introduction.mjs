import React from 'react';
import { renderToString } from 'react-dom/server';
export const introductionCases = [
  {name:'simple H1 followed by H2',title:'Title',markdown:'# Title\n\n## Section\n\nBody.',body:['Section','Body.'],levels:[1,2],plain:true},
  {name:'H1 preserves inline bold and italic',title:'Bold Italic',markdown:'# **Bold** *Italic*\n\nLead.\n\n## Section\n\nBody.',lead:/Lead\./,inline:/<strong>Bold<\/strong> <em>Italic<\/em>/,body:['Section'],levels:[1,2]},
  {name:'adjacent lead retains inline formatting only',title:'Title',markdown:'# Title\n\n**Lead** with *emphasis* and \x60code\x60.\n\n## Section\n\nLater paragraph.',lead:/<strong>Lead<\/strong>/,body:['Later paragraph.'],levels:[1,2]},
  {name:'H1 followed immediately by H2 cannot backtrack to a later H1',title:'Title',markdown:'# Title\n\n## Overview\n\nOverview text.\n\n# Later\n\nLater text.',body:['Overview text.','<h1 id="later"','Later text.'],levels:[1,2,1],plain:true},
  {name:'all four authored heading levels stay intact',title:'One',markdown:'# One\n\nLead.\n\n## Two\n\n### Three\n\n#### Four\n\nBody.',lead:/Lead\./,body:['<h2','<h3','<h4','Body.'],levels:[1,2,3,4]},
  {name:'ampersands and HTML entities use escaped React text',title:'Research & Development ©',markdown:'# Research &amp; Development &copy;\n\n## Next\n\nBody.',body:['Next'],plain:true},
  {name:'Unicode and emoji are preserved',title:'✏️ 日本語 — Réi',markdown:'# ✏️ 日本語 — Réi\n\nHello 🌍.\n\n## Next',lead:/Hello 🌍/,body:['Next'],plain:true},
  {name:'fenced heading markup stays code',title:'Title',markdown:'# Title\n\n~~~html\n<h1>Literal</h1>\n## Code heading\n~~~\n\n## Real section',body:['&#x3C;h1>Literal&#x3C;/h1>','## Code heading','Real section'],levels:[1,2]},
  {name:'missing lead does not consume a list',title:'Title',markdown:'# Title\n\n- First\n- Second\n\n## Next',body:['<ul>','First','Second','Next'],levels:[1,2]},
  {name:'malicious raw HTML stays sanitized in every fragment',title:'Safe title',markdown:'# Safe *title*\n\n<script>alert(2)</script>\n\n## Section\n\n[bad](javascript:alert%281%29)\n\n<img src="/safe.webp" onerror="alert(3)">',body:['Section'],levels:[1,2],inline:/<em>title<\/em>/},
  {name:'linked title preserves the safe inline link',title:'Safe Title',markdown:'# [Safe](/items) Title\n\nLead.\n\n## Section',lead:/Lead\./,inline:/href="\/items"/,body:['Section'],levels:[1,2]},
  {name:'raw video is not introductory prose',title:'Title',markdown:'# Title\n\n<video controls src="https://evil.test/invalid.mp4"></video>\n\n## Section',body:['Section'],levels:[1,2]},
  {name:'lead-free document contains only its title',title:'Title',markdown:'# Title',plain:true,levels:[1]},
  {name:'section-first document is never promoted',title:'Section',markdown:'## Section\n\nParagraph.',body:['Section','Paragraph.'],levels:[2]},
];
export function IntroductionDocument({title,introduction}) {
  return React.createElement('article',null,
    React.createElement('header',null,
      React.createElement('h1',{id:introduction.titleId,...(introduction.titleHtml?{dangerouslySetInnerHTML:{__html:introduction.titleHtml}}:{})},introduction.titleHtml?undefined:introduction.titleText??title),
      introduction.leadHtml?React.createElement('div',{className:'article-summary',dangerouslySetInnerHTML:{__html:introduction.leadHtml}}):null),
    React.createElement('div',{className:'editorial-prose',dangerouslySetInnerHTML:{__html:introduction.bodyHtml}}));
}
export function renderIntroductionMarkup(props) {return renderToString(React.createElement(IntroductionDocument,props));}
