'use strict';

const MarkdownIt = require('markdown-it');
const componentizedTexPlugin = require('.');

function assert(condition) {
  if (!condition) {
    throw new Error();
  }
}

function test() {
  for (const case_ of cases) {
    case_[1]()
  }
  console.info('OK.');
}

const cases = [
  [ 'case1', () => {
    const md = (new MarkdownIt())
      .use(componentizedTexPlugin, { tag: 'my-tex' });
    
    // should works well
    assert(
      md.render('$\\frac$\n\n$$\n1+1\n$$')
      ===
      '<p><my-tex inline>\\frac</my-tex></p>\n<my-tex>\n1+1\n</my-tex>\n'
    );
  } ],
];

test();
