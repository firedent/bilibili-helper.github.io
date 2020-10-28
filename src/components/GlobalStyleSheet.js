/**
 * Author: DrowsyFlesh
 * Create: 2020/5/2
 * Description:
 */
import {createGlobalStyle} from 'styled-components';

export const GlobalStyleSheet = createGlobalStyle`
  html {
      --background-color: #fafafa;
      --font-color: #111;
      --font-color-white: #ececec;
	  --bilibili-blue: #23ade5;
	  --bilibili-pink: #fb7299;
	  --border-color: #f1f1f1;
	  --content-color: #555;
	  --pure-white: #fcfcfc;
  }
  
  h1, h2, h3, h4, h5, h6, p, ul, span {
    color: var(--font-color);
  }
  body {
    background: var(--background-color);
    color: var(--font-color);
  }
  *, body {
    margin: 0;
    padding: 0;
    font-family: system-ui, "PingFang SC", STHeiti, sans-serif;
  }
  
  @media (prefers-color-scheme: dark) {
    html {
      --background-color: rgb(28,28,28);
      --font-color: rgb(224, 224, 224);
      --font-color-white: #222222;
      --bilibili-blue: #1c7ea5;
      --bilibili-pink: #b54f6b;
      --border-color: #222;
      --content-color: #969696;
      --pure-white: #2b2b2b;
    }
  }

  .model-img {
    &:not([src]) {
      content: url("data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
      border: 1px solid var(--border-color);
      box-sizing: border-box;
    }
  }
  .dg.ac {
    z-index: 1001!important;
  }
`;
