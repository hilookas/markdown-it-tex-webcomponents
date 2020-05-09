# markdown-it-tex-webcomponents

[markdown-it](https://github.com/markdown-it/markdown-it) 解析器的插件，基于 [markdown-it-texmath](https://github.com/goessner/markdown-it-texmath) 制作，支持将 block TeX，inline TeX 组件化。便于之后使用 Vue 等框架解析。

## 安装

`npm i markdown-it-tex-webcomponents`

## API

```javascript
const md = require('markdown-it')()
  .use(require('markdown-it-tex-webcomponents'), { tag: 'my-tex' });
```

- `tag`：组件化后的标签名称

以下内容：

````text
$\frac$

$$
\frac
$$
````

该插件会转换为：

```html
<p><my-tex inline>\frac</my-tex></p>
<my-tex>
\frac
</my-tex>
```

## 样例

```javascript
const md = require('markdown-it')()
  .use(require('markdown-it-tex-webcomponents'), { tag: 'my-tex' });

console.dir(md.render('$\\frac$\n\n$$\n1+1\n$$'));

/* output

<p><my-tex inline>\\frac</my-tex></p>
<my-tex>
1+1
</my-tex>

*/
```

更多样例可以参见 `test.js` 文件。

## 协议

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020, lookas