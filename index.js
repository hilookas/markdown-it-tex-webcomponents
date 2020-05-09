'use strict';

const texmath = require('markdown-it-texmath');
const { escapeHtml } = require('markdown-it/lib/common/utils');

function load(md, options) {
  options = options || {};
  const tag = options.tag || 'tex';

  const delimiters = 'myDollars';

  texmath.rules[delimiters] = {
    inline: [
      {
        name: 'tex_inline',
        rex: /\$(\S[^$\r\n]*?[^\s\\]{1}?)\$/gy,
        tmpl: '<' + tag + ' inline>$1</' + tag + '>',
        tag: '$',
        pre: texmath.$_pre,
        post: texmath.$_post,
      },
      {
        name: 'tex_single',
        rex: /\$([^$\s\\]{1}?)\$/gy,
        tmpl: '<' + tag + ' inline>$1</' + tag + '>',
        tag: '$',
        pre: texmath.$_pre,
        post: texmath.$_post,
      },
    ],
    block: [
      {
        name: 'tex_block',
        rex: /\${2}([^$]*?)\${2}/gmy,
        tmpl: '<' + tag + '>$1</' + tag + '>\n',
        tag: '$$',
      },
    ],
  };

  md.use(texmath, {
    engine: {
      renderToString() {
        return 'No need to render here.';
      }
    },
    delimiters
  });

  for (let rule of texmath.rules[delimiters].inline) {
    md.renderer.rules[rule.name] = (tokens, idx) =>
      rule.tmpl.replace(
        /\$1/,
        escapeHtml(tokens[idx].content)
      );
  }

  for (let rule of texmath.rules[delimiters].block) {
    md.renderer.rules[rule.name] = (tokens, idx) =>
      rule.tmpl
        .replace(
          /\$1/,
          escapeHtml(tokens[idx].content)
        );
  }
}

module.exports = load;
