(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"+4mJ":function(e,t,a){"use strict";var o=a("svvH");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(a("cDcd")),i=a("MuoO"),l=o(a("vOnD")),n=o(a("5Epl")),s=l.default.span.attrs({className:"emoji"})`
  & img {
    width: 30px;
    margin: 0 3px;
  }
`;class c extends r.default.Component{constructor(e){super(e),this.state={url:e.emoji.emojiURLs[e.sign]}}render(){var e=this.props.sign;return r.default.createElement(s,null,r.default.createElement(n.default,{url:this.state.url,sign:e}))}}var d=(0,i.connect)(e=>{var t=e.emoji;return{emoji:t}})(c);t.default=d},"1ZZj":function(e,t,a){"use strict";var o=a("svvH");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(a("cDcd")),i=a("MuoO"),l=o(a("vOnD")),n=a("rY4l"),s=o(a("RXmK")),c=l.default.div`
  ol {
    //height: 180px;
    //border: 10px solid var(--border-color);
    padding: 10px;
    border-radius: 3px;
    //box-shadow: rgba(20,20,20,0.1) 0px 0px 10px;
    //background-color: var(--border-color);
    overflow: auto;
  }
  .tab-bar {
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
    .more-version-box {
      display: flex;
      position: relative;
      .more-version-btn {
        margin-bottom: 5px;
        margin-left: 3px;
        padding: 3px 8px;
        border: 1px solid var(--border-color);
        border-radius: 3px;
        align-self: flex-end;
        outline: none;
        user-select: none;
        cursor: pointer;
        transition: all 0.15s;
        &:hover {
          color: var(--bilibili-blue);
          border: 1px solid var(--bilibili-blue);
        }
        &:active, &.active {
          opacity: 1;
          background-color: var(--bilibili-blue);
          color: var(--background-color);
        }
        &[disabled] {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
      ul {
        position: absolute;
        top: calc(100% - 4px);
        right: 1px;
        width: max-content;
        padding: 5px 1px;
        border-radius: 3px;
        background-color: var(--pure-white);
        box-shadow: rgba(20, 20, 20, 0.1) 1px 1px 10px;
        z-index: 101;
        li {
          padding: 2px 10px;
          font-size: 12px;
          text-align: right;
          list-style: none;
          cursor: pointer;
          transition: all 0.1s;
          &:hover, &.active {
            background-color: var(--bilibili-blue);
            color: var(--pure-white);
          }
          img {
            width: 14px;
            margin-right: 3px;
            vertical-align: sub;
          }
        }
      }
    }
  }
  .tab-contents {}
  .info-item {
    margin-left: 20px;
    padding: 4px 0;
    font-size: 12px;
    text-indent: 5px;
    border-radius: 3px;
    //border-bottom: 1px solid var(--pure-white);
    border-bottom: 1px solid var(--border-color);
    &:last-of-type {
      border:none;
    }
    //&:hover, &.active {
    //  background-color: var(--bilibili-blue);
    //  color: var(--pure-white);
    //}
    i {
      margin: 0 3px;
      font-style: normal;
    }
    &::after {
      content: ';';
      display: inline;
    }
    &:last-of-type::after {
      content: '。';
    }
  }
`,d=l.default.button`
  position: relative;
  width: 200px;
  height: 50px;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 10px;
  box-sizing: border-box;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid var(--border-color);
  background-color: white;
  cursor: pointer;
  outline: none;
  transition: all 0.15s;
  &:last-of-type {
    margin-right: 0;
  }
  &:hover {
    color: var(--bilibili-blue);
    border: 1px solid var(--bilibili-blue);
  }
  &::after {
    display: block;
    position: absolute;
    bottom: -6px;
    left: calc(50% - 7.07px);
    width: 10px;
    height: 10px;
    border: 1px solid var(--bilibili-blue);
    border-top: none;
    border-left: none;
    transform: rotate(45deg);
  }
  &:not(.active)::after {
    background-color: white;
  }
  &:active::after, &.active::after {
    background-color: var(--pure-white);
  }
  &.active::after {
    content: ' ';
  }
  &:active, &.active {
    opacity: 1;
    border: 1px solid var(--bilibili-blue);
    background-color: var(--bilibili-blue);
    background: linear-gradient(90deg, var(--bilibili-blue), #45b8e6 100%);
    color: var(--background-color);
  }
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &.active span {
    top: -5px;
  }
  span {
    display: block;
    position: relative;
    top: 0;
    font-weight: normal;
    user-select: none;
  }
  .download-btn {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 3px;
    font-size: 10px;
    font-style: unset;
    background-color: var(--pure-white);
    color: var(--content-color);
    z-index: 1;
    transition: background-color 0.1s;
    &:hover {
      //box-shadow: rgba(20, 20, 20, 0.1) 1px 1px 10px;
      background-color: #eee;
    }
  }
`;class p extends r.default.Component{constructor(e){super(e),this.updateDownloads=(e=>{var t=_.find(e,e=>{e.version;var t=e.url;return t}).version,a=[],o=[],r=0;_.forEach(e,e=>{var t=e.url;t&&r<3?(r+=1,a.push(e)):o.push(e)}),this.setState({tabVersion:t,downloadThree:a,restVersion:o})}),this.handleOnClickTab=(e=>{this.setState({tabVersion:e})}),this.handleOnClickMoreVersion=(()=>{this.setState({showMoreVersion:!this.state.showMoreVersion})}),this.getVersionTypeString=(e=>{switch(e){case"store":return"Google Web Store";case"test":return"\u6d4b\u8bd5\u7248";default:return""}}),this.getVersionTypeIcon=(e=>{switch(e){case"store":return r.default.createElement("img",{src:"../static/icons/google_favicon.ico"});case"test":return"test ";default:return""}}),this.state={tabVersion:null,showMoreVersion:!1,downloadThree:null,restVersion:null}}componentDidMount(){var e=this.props.global,t=this.state,a=t.firstVersion,o=t.downloadThree,r=t.restVersion;!e.downloads||a||o||r||this.updateDownloads(e.downloads)}componentDidUpdate(e,t){var a=this.props.global,o=this.state,r=o.firstVersion,i=o.downloadThree,l=o.restVersion;!a.downloads||r||i||l||this.updateDownloads(a.downloads)}render(){var e=this.props.global,t=this.state,a=t.tabVersion,o=t.showMoreVersion,i=t.downloadThree,l=t.restVersion;return r.default.createElement(s.default,null,r.default.createElement(c,{id:"downloadArea"},r.default.createElement(n.Header,null,"\u4e0b\u8f7d\u52a9\u624b ~ DOWNLOAD",r.default.createElement("a",{href:"https://www.bilibili.com/video/av44808808",target:"_blank"},"\u529f\u80fd\u4ecb\u7ecd"),r.default.createElement("a",{href:"https://github.com/bilibili-helper/bilibili-helper/wiki/%E5%A6%82%E4%BD%95%E4%B8%8B%E8%BD%BD%E5%92%8C%E5%AE%89%E8%A3%85%EF%BC%9F#%E5%A6%82%E4%BD%95%E5%AE%89%E8%A3%85",target:"_blank"},"\u5b89\u88c5\u65b9\u6cd5"),r.default.createElement("p",{className:"sub-title"},"\u65e7\u7248\u672c\u4e0d\u63d0\u4f9b\u4e0b\u8f7d\u5730\u5740\u54df~")),r.default.createElement("div",{className:"tab-bar"},r.default.createElement("div",{className:"versions"},i&&i.map(e=>{var t=e.version,o=e.sign,i=e.url;return i&&r.default.createElement(d,{key:t,className:`download-btn ${t===a&&"active"}`,onClick:()=>this.handleOnClickTab(t)},r.default.createElement("span",null,this.getVersionTypeString(o)," ",t),t===a&&r.default.createElement("a",{href:i},r.default.createElement("i",{className:"download-btn"},"Click here to download")))})),r.default.createElement("div",{className:"more-version-box"},r.default.createElement("button",{className:`more-version-btn ${o&&"active"}`,onClick:this.handleOnClickMoreVersion},"More Version"),o&&r.default.createElement("ul",null,l&&l.map(e=>{var t=e.version,o=(e.url,e.sign);return r.default.createElement("li",{className:`${t===a&&"active"}`,key:t,onClick:()=>this.handleOnClickTab(t)},this.getVersionTypeIcon(o),t)})))),r.default.createElement("div",{className:"tab-contents"},e.downloads&&e.downloads.map(e=>{var t=e.version,o=(e.url,e.info);return a===t&&r.default.createElement("ol",{key:t},o.map((e,t)=>r.default.createElement("li",{key:t,className:"info-item",dangerouslySetInnerHTML:{__html:e[1]}})))}))))}}var u=(0,i.connect)(e=>{var t=e.global;return{global:t}})(p);t.default=u},"5BdJ":function(e,t,a){"use strict";var o=a("svvH");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(a("cDcd")),i=a("MuoO"),l=o(a("vOnD")),n=l.default.div`
  width: 800px;
  margin: 10px auto 30px;
  h3 {
    margin: 15px 0 20px;
    font-size: 16px;
    color: #212121;
    p {
      margin: 3px 0px;
      font-size: 12px;
      color: var(--content-color);
      font-weight: normal;
    }
  }
  .votes-list {
    margin-left: 10px;
    border-radius: 3px;
    overflow: hidden;
  }
  .mask {
    margin-left: 10px;
    color: var(--content-color);
  }
`,s=l.default.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  font-size: 14px;
  margin-bottom: 2px;
  padding: 7px 10px;
  width: calc(100% - 72px);
  border-radius: 3px;
  border-right: 1px solid var(--bilibili-pink);
  border-left: 1px solid var(--bilibili-pink);
  background-color: #f1f1f1;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${e=>{var t=e.likesum,a=e.like;return t?a/t*100:0}}%;
    border-radius: 0 3px 3px 0;
    background-color: var(--bilibili-pink);
    transition: width 0.3s;
  }
  &:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
  }
  &:hover {
    opacity: 0.8;
  }
  .topic {
    color: #000;
    z-index: 1;
  }
  .percent {
    position: absolute;
    top: 8px;
    right: -46px;
    font-size: 12px;
    color: var(--content-color);
  }
  .like-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    cursor: pointer;
    z-index: 1;
    button {
      margin-right: 20px;
      padding: 1px 10px;
      border: none;
      border-radius: 3px;
      font-size: 12px;
      background-color: var(--pure-white);
      color: var(--content-color);
      outline: none;
      cursor: pointer;
      &:last-of-type {
        margin-right: 0;
      }
      &[disabled] {
        cursor: not-allowed;
        opacity: 0.8;
      }
      &.like:hover, &.like[on='1'] {
        color: var(--bilibili-blue);
      }
      &.hate:hover, &.hate[on='1'] {
        color: var(--bilibili-pink);
      }
    }
  }
`;class c extends r.default.Component{constructor(e){super(e),this.handleOnClickLike=((e,t)=>{var a=this.props.comments.voteConfig.oid;this.setState({voting:!0}),this.props.dispatch({type:"comments/setLike",payload:{action:e,rpid:t,oid:a}}),setTimeout(()=>this.props.dispatch({type:"comments/fetchVotes"}),500),setTimeout(()=>this.setState({voting:!1}),2e3)}),this.handleOnClickHate=((e,t)=>{var a=this.props.comments.voteConfig.oid;this.setState({voting:!0}),this.props.dispatch({type:"comments/setHate",payload:{action:e,rpid:t,oid:a}}),setTimeout(()=>this.props.dispatch({type:"comments/fetchVotes"}),500),setTimeout(()=>this.setState({voting:!1}),2e3)}),this.renderVote=((e,t)=>{var a=t.rpid,o=t.content,i=t.action,l=t.like;return r.default.createElement(s,{key:a,className:"vote-block",likesum:e,like:l},r.default.createElement("span",{className:"topic"},o.message),r.default.createElement("div",{className:"like-box"},r.default.createElement("button",{disabled:this.state.voting,className:"like",on:1===i?"1":"0",onClick:()=>this.handleOnClickLike(Number(1!==i),a)},"LIKE"),r.default.createElement("button",{disabled:this.state.voting,className:"hate",on:2===i?"1":"0",onClick:()=>this.handleOnClickHate(Number(2!==i),a)},"HATE")),r.default.createElement("div",{className:"percent"},Number(e?l/e*100:0).toFixed(1),"%"))}),this.getVotes=(()=>{var e=[],t=this.props.comments,a=t.votes,o=t.replyMap;return a.rpidArray&&a.rpidArray.length>0&&(e=_.sortBy(a.rpidArray.map(e=>o[e].self),e=>{var t=e.like;return-t})),e}),this.state={voting:!1}}render(){var e=this.props,t=e.global,a=e.comments,o=this.getVotes(),i=_.reduce(a.votes.likeSum,(e,t)=>e+t);return r.default.createElement(n,null,r.default.createElement("h3",null,"\u65b0\u529f\u80fd\u6295\u7968 ~ VOTE",r.default.createElement("p",null,"\u4e3a\u5e0c\u671b\u6dfb\u52a0\u8fdb\u52a9\u624b\u7684\u529f\u80fd\u70b9\u8d5e\u5427~")),r.default.createElement("div",{className:"votes-list"},o.map(e=>this.renderVote(i,e))),!t.status.connected&&r.default.createElement("div",{className:"mask"},"~ \u5c1a\u672a\u8fde\u63a5\u52a9\u624b ~"))}}var d=(0,i.connect)(e=>{var t=e.comments,a=e.global;return{comments:t,global:a}})(c);t.default=d},"5Epl":function(e,t,a){"use strict";var o=a("svvH");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(a("kTL5")),i=o(a("jUZP")),l=a("MuoO"),n=o(a("cDcd"));class s extends n.default.Component{constructor(e){super(e);var t=e.sign,a=e.url;a&&this.props.dispatch({type:"image/fetch",payload:{url:a,sign:t}})}render(){var e=this.props,t=e.image,a=e.sign,o=(e.url,e.dispatch,e.className),l=(0,i.default)(e,["image","sign","url","dispatch","className"]);return n.default.createElement("img",(0,r.default)({className:["model-img",o].join(" "),key:a,src:t[a]||null},l))}}var c=(0,l.connect)(e=>{var t=e.image;return{image:t}})(s);t.default=c},"8wrG":function(e,t,a){"use strict";var o=a("svvH");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(a("quD3")),i=o(a("YLtl")),l=o(a("cDcd")),n=o(a("vOnD")),s=o(a("Bo8p")),c=o(a("R18Y")),d=o(a("wd/R")),p=a("MuoO"),u=o(a("5Epl")),g=o(a("+4mJ")),A=o(a("Pa8V")),m=a("ywEC"),h=o(a("RXmK")),b=a("f23f");d.default.locale("zh-cn");var f=n.default.div.attrs({className:"comment-area"})`
  position: relative;
  margin: 10px auto 50px;
  
  width: 800px;
  .no-reply {
    color: var(--content-color);
  }
  .more-comment-list-wrapper {
    position: relative;
    .loading-page-mask {
      position: absolute;
      top: -10px;
      right: -10px;
      bottom: -10px;
      left: -10px;
      min-height: 200px;
      border-radius: 3px;
      background-color: rgba(85, 85, 85, 0.5);
      color: var(--content-color);
      img {
        position: absolute;
        top: 50px;
        left: calc(50% - 50px);
        width: 100px;
        height: 100px;
        background-color: rgba(252, 252, 252, 0.8);
        border-radius: 3px;
      }
    }
  }
  .list-wrapper {
    position: relative;
  }
`,x=n.default.header.attrs({className:"comment-list-header"})`
  font-size: 20px;
  margin: 20px 10px 30px 0;
  color: #a9a7a7;
  p {
    margin: 3px 0px;
    font-size: 12px;
  }
`,v=n.default.div.attrs({className:"comment-item"})`
  display: flex;
  margin-bottom: 30px;
  &:last-of-type > .main{
    & > .content:last-of-type {
      border-bottom: none;
    }
    .replies-box {
      border-bottom: none;
    }
  }
  .user {
    width: 70px;
    flex-shrink: 0;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
  }
  .main {
    flex-grow: 1;
    .header {
      display: flex;
      line-height: 12px;
      margin: 0 10px 10px 0;
      & > * {
        margin-right: 10px;
        font-size: 12px;
        color: #999;
        text-decoration: unset;
        font-style: unset;
      }
      .top {
        margin-right: 8px;
        padding: 0 3px;
        border: 1px solid;
        border-radius: 3px;
        color: var(--bilibili-pink);
        transform: scale(0.9);
      }
      .username {
        font-weight: bold;
        color: #666;
        &.vip {
          color: #fb7299;
        }
      }
      .floor {
        flex-grow: 1;
        text-align: right;
        margin-right: 0;
        color: #ccc;
      }
      .moment {
      }
    }
    .content {
      padding: 0 10px 30px 0;
      position: relative;
      color: var(--content-color);
      border-bottom: 1px solid var(--border-color);
      font-size: 14px;
      pre {
        overflow-x: auto;
        white-space: pre-wrap;
        word-wrap: break-word;
        font-family: auto;
      }
      .toolbar {
        position: absolute;
        font-size: 10px;
        bottom: 3px;
        color: #bbb;
        .like-box {
          display: inline-block;
          user-select: none;
          span {
            margin-right: 20px;
            cursor: pointer;
            &.like:hover, &[on='1'] {
              color: var(--bilibili-blue);
            }
            &.hate:hover, &[on='1'] {
              color: var(--bilibili-pink);
            }
          }
        }
        .reply {
          padding: 3px 6px;
          border: none;
          border-radius: 3px;
          background-color: var(--background-color);
          color: var(--bilibili-blue);
          transform: scale(0.8);
          transition: all 0.15s;
          cursor: pointer;
          outline: none;
          user-select: none;
          &:hover, &[on='1'] {
            background-color: var(--bilibili-blue);
            color: var(--background-color);
          }
        }
      }
    }
    .replies-box {
      position: relative;
      padding-top: 30px;
      border-bottom: 1px solid var(--border-color);
      & > .replies > * {
        margin-bottom: 20px;
        &:nth-last-of-type(1) {
          border-bottom: none;
          .content {
            border-bottom: none;
          }
        }
        .user {
          width: 40px;
          img{
            width: 26px;
            height: 26px;
            flex-shrink: 0;
            transition: all 0.3s;
            &:hover {
              transform: scale(1.5);
            }
          }
        }
        .floor {
          color: #e6e6e6;
        } 
      }
      .loading-page-mask {
        img {
          top: calc(50% - 50px);
        }
      }
    }
  }
`,w=n.default.div`
  display: block;
  width: fit-content;
  margin: 0 auto 60px;
  padding: 3px 20px;
  border: none;
  border-radius: 3px;
  letter-spacing: 1px;
  font-size: 12px;
  background-color: var(--background-color);
  color: var(--content-color);
  outline: none;
  transition: all 0.15s;
  &:not([disabled]):hover {
    background-color: var(--bilibili-blue);
    color: var(--background-color);
    cursor: pointer;
  }
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    margin-top: -8px;
    position: absolute;
    left: 0;
    right: 0;
    background-color: var(--border-color);
    z-index: -1;
    cursor: pointer;
  }
  .replies-box & {
    margin-left: 20px;
    margin-bottom: 30px;
    margin-top: 20px;
    &::after {
      visibility: hidden;
    }
  } 
`,E=n.default.div.attrs({className:"page-navigation"})`
  display: flex;
  justify-content: center;
  & > a {
    text-decoration: none;
  }
  & .page-navigation-link {
    display: block;
    min-width: 20px;
    margin: 0 3px;
    padding: 5px 6px;
    text-align: center;
    letter-spacing: 1px;
    border: 1px solid #eee;
    border-radius: 5px;
    color: #333;
    user-select: none;
    transform: scale(0.8);
    cursor: pointer;
    &:not(.omit):hover {
      color: var(--bilibili-blue);
      border-color: var(--bilibili-blue);
      transition: all 0.3s;
    }
    &.omit {
      border: none;
      cursor: default;
    }
    &.now {
      border-color: var(--bilibili-blue);
      background-color: var(--bilibili-blue);
      color: var(--background-color);
      &:hover {
        color: var(--background-color);
      }
    }
  }
  .replies-box & {
    justify-content: left;
    & .page-navigation-link {
      margin: 0;
      border: none;
      background-color: transparent;
      &.now {
        color: var(--bilibili-blue);
      }
    }
  }
`;class B extends l.default.Component{constructor(e){var t;super(e),t=this,this.load=(()=>{var e=this.props,t=e.comments,a=e.dispatch,o=e.location,r=t.config,i=o.query,l=i.oid,n=void 0===l?r.oid:l,s=i.page,c=void 0===s?1:s,d=i.ptype,p=void 0===d?0:d,u=i.type,g={oid:n,[+p?"ps":"pn"]:c,type:u};a({type:"comments/load",payload:{query:g,ptype:+p}})}),this.calculateNavigationPageIndex=((e,t)=>{var a=new Array(t).fill(void 0).map((e,t)=>t),o=i.default.compact(a.map((t,a)=>{if(Math.abs(e-a-1)<=2)return a+1<=0?void 0:a+1}));return 1!==o[0]&&(o[0]>2&&o.unshift("-"),o.unshift(1)),o.length>1&&o[o.length-1]<t&&(t-o[o.length-1]>1&&o.push("-"),o.push(t)),o}),this.handleOnClickHots=(()=>{this.props.dispatch({type:"comments/fetchComment",payload:{sort:1}})}),this.handleOnClickLoadMoreReplies=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t.props.dispatch({type:"comments/fetchReply",payload:(0,r.default)({pn:1,ps:10},e)})},this.handleOnClickNavigation=(()=>{window.scrollTo(0,(0,b.cumulativeOffset)(this.moreCommentListWrapper).top-20)}),this.handleOnClickNavigationForReply=(e=>{var t=this[`reply-${e.root}`];t&&t.querySelector(".replies-box").scrollIntoView({behavior:"smooth",inline:"start"}),this.props.dispatch({type:"comments/fetchReply",payload:e})}),this.handleOnClickReply=(e=>{var t=e.uname,a=e.rpid;return this.setState({uname:t,rpid:a===this.state.rpid?null:a})}),this.handleOnClickLike=((e,t)=>{this.props.dispatch({type:"comments/setLike",payload:{action:e,rpid:t}})}),this.handleOnClickHate=((e,t)=>{this.props.dispatch({type:"comments/setHate",payload:{action:e,rpid:t}})}),this.renderContent=(e=>{var t=new RegExp(/(\[.*?\])/g),a=[],o=null,r=0;while(null!==(o=t.exec(e))){var i=o,n=i.index,s=o[0];a.push(e.substr(r,n-r)),r=n+s.length,a.push(l.default.createElement(g.default,{key:n,sign:s}))}return 0===a.length&&a.push(e),a}),this.renderLine=(e=>{var t=e.rpid,a=e.top,o=this.props.comments,r=o.config,i=o.status,n=this.props.comments.replyMap[t],s=n.self,c=s.action,p=s.content,g=s.member,h=s.floor,b=s.ctime,f=s.like,x=s.oid,E=s.root,B=this.state,k=B.uname,C=B.rpid,Q=g.avatar,D=g.mid,j=g.uname,I=g.level_info,y=g.vip,M=I.current_level,N=y.vipType,G=C===t,O=[],F=!1;return n.replies&&(F=n.needExpand&&!n.hasExpand,O=this.calculateNavigationPageIndex(n.page.num,n.pages)),l.default.createElement(v,{key:t,id:t,ref:e=>this[`reply-${t}`]=e},l.default.createElement("div",{className:"user"},l.default.createElement(u.default,{className:"avatar",url:Q,sign:D})),l.default.createElement("div",{className:"main"},l.default.createElement("div",{className:"header"},a&&l.default.createElement("span",{className:"top"},"TOP"),l.default.createElement("a",{className:`username ${N?"vip":""}`,href:`https://space.bilibili.com/${D}`,target:"_blank"},j),M&&l.default.createElement("span",{className:"level"},"Lv.",M),l.default.createElement("span",{className:"moment"},(0,d.default)(1e3*b).startOf("second").fromNow()),h&&l.default.createElement("span",{className:"floor"},"#",h)),l.default.createElement("div",{className:"content"},l.default.createElement("pre",null,this.renderContent(p.message)),l.default.createElement("div",{className:"toolbar"},l.default.createElement("div",{className:"like-box"},l.default.createElement("span",{className:"like",on:1===c?"1":"0",onClick:()=>this.handleOnClickLike(Number(1!==c),t)},"LIKE ",f||""),l.default.createElement("span",{className:"hate",on:2===c?"1":"0",onClick:()=>this.handleOnClickHate(Number(2!==c),t)},"HATE")),l.default.createElement("button",{className:"reply",on:G?"1":"0",onClick:()=>this.handleOnClickReply({uname:j,rpid:t})},"REPLY"))),G&&l.default.createElement(A.default,{root:E||t,parent:t,name:k}),n.replies&&n.replies.length>0&&l.default.createElement("div",{className:"replies-box"},l.default.createElement("div",{className:"replies"},n.replies.map(e=>this.renderLine(e))),F&&1===n.page.num&&l.default.createElement(w,{onClick:()=>this.handleOnClickLoadMoreReplies({root:t,oid:x})},"~ LOAD MORE ~"),!F&&n.pages>1&&this.renderPageNavigation({oid:r.oid,pageIndex:O,num:n.page.num,pages:n.pages,root:t,ptype:1}),i.comment.loadingRpid===t&&l.default.createElement("div",{className:"loading-page-mask"},l.default.createElement(u.default,{url:m.LOADING_IMAGE_URL,sign:"loading-gif"})))))}),this.renderPageNavigation=(e=>{var t=e.oid,a=e.pageIndex,o=e.num,r=e.pages,i=e.root,n=e.ptype,s=void 0===n?0:n,d=()=>{};return d=i?e=>this.handleOnClickNavigationForReply({pn:e,ps:10,sort:0,root:i}):e=>this.handleOnClickNavigation({pn:e}),l.default.createElement(E,null,a.length>2&&o>1&&l.default.createElement("span",{className:"page-navigation-link",onClick:()=>d(o-1)},"PREV"),a.map((e,a)=>{return l.default.createElement(c.default,{key:e+a,to:`?oid=${t}&page=${e}&ptype=${s}`},l.default.createElement("span",{className:`page-navigation-link ${"-"===e?"omit":""} ${o===e?"now":""}`,onClick:o!==e&&"-"!==e?()=>d(e):null},"-"!==e?e:"..."))}),a.length>2&&o<r&&l.default.createElement("span",{className:"page-navigation-link",onClick:()=>d(o+1)},"NEXT"))}),this.render=(()=>{var e=this.props,t=e.comments,a=e.user,o=e.global,i=this.state,n=i.mid,s=i.uname,c=t.data,d=t.config,p=t.status,g=c.page,b=c.hots,v=c.top,E=c.replies,B=void 0===E?[]:E,k=g.count,C=g.size,Q=g.acount,D=g.num,j=Math.ceil(k/C)||1,I=this.calculateNavigationPageIndex(D,j);return l.default.createElement(h.default,null,l.default.createElement(f,null,l.default.createElement(x,null,`${Q} \u8bc4\u8bba`,l.default.createElement("p",null,"\u672c\u8bc4\u8bba\u533a\u6765\u81ea\u54d4\u54e9\u54d4\u54e9\u5f39\u5e55\u7f51\u7684\u8bc4\u8bba\u7cfb\u7edf\uff0c\u8bf7\u9075\u5b88\u76f8\u5173\u6cd5\u5f8b\u6cd5\u89c4\u5e76\u5171\u540c\u7ef4\u62a4\u79e9\u5e8f")),l.default.createElement(A.default,{global:!0,receiver:{mid:n,uname:s}}),o.status.connected&&l.default.createElement(l.default.Fragment,null,0===Q&&!v&&!b&&!B&&!p.comment.loadPage&&l.default.createElement("div",{className:"no-reply"},"\u6ca1\u6709\u7559\u8a00\uff0c",!a.info&&"\u767b\u9646\u540e","\u5f00\u59cb\u8bc4\u8bba\u5427~"),0!==Q&&(v||b||B||p.comment.loadPage)&&l.default.createElement("div",{className:"more-comment-list-wrapper",ref:e=>this.moreCommentListWrapper=e},1===D&&v&&l.default.createElement("div",{className:"wrapper"},l.default.createElement("div",{id:"top",className:"comment-list"},this.renderLine((0,r.default)({},v,{top:!0}))),l.default.createElement(w,{disabled:!0},"IT'S A TOP COMMENT ABOVE")),1===D&&b&&l.default.createElement("div",{className:"list-wrapper"},l.default.createElement("div",{id:"hots",className:"comment-list"},b.map(e=>v?e.rpid!==v.rpid&&this.renderLine(e):this.renderLine(e))),l.default.createElement(w,{onClick:this.handleOnClickHots},"LOAD MORE HOT COMMENTS")),B&&l.default.createElement("div",{className:"list-wrapper"},l.default.createElement("div",{id:"comments",className:"comment-list"},B.map(e=>v?e.rpid!==v.rpid&&this.renderLine(e):this.renderLine(e))),this.renderPageNavigation({oid:d.oid,pageIndex:I,num:D,pages:j})),p.comment.loadPage&&l.default.createElement("div",{className:"loading-page-mask"},l.default.createElement(u.default,{url:m.LOADING_IMAGE_URL,sign:"loading-gif"}))))))}),this.state={uname:"",rpid:null}}componentDidMount(){this.load()}componentDidUpdate(e){this.props.location.query.page!==e.location.query.page&&"0"===e.location.query.ptype&&this.load()}}var k=(0,s.default)((0,p.connect)(e=>{var t=e.global,a=e.comments,o=e.user;return{global:t,comments:a,user:o}})(B));t.default=k},HjWF:function(e,t,a){"use strict";var o=a("svvH");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(a("cDcd")),i=o(a("vOnD")),l=i.default.div`
  width: 800px;
  height: 20px;
  margin: 20px auto;
  & > * {
    display: inline-block;
    margin-right: 5px;
    height: 20px;
  }
`;class n extends r.default.Component{constructor(e){super(e)}render(){return r.default.createElement(l,null,r.default.createElement("a",{href:"https://github.com/bilibili-helper/bilibili-helper/blob/master/LICENSE",target:"_blank"},r.default.createElement("img",{src:"https://img.shields.io/github/license/mashape/apistatus.svg?style=social",alt:"LICENSE"})),r.default.createElement("a",{href:"https://chrome.google.com/webstore/detail/kpbnombpnpcffllnianjibmpadjolanh",target:"_blank"},r.default.createElement("img",{src:"https://img.shields.io/chrome-web-store/v/kpbnombpnpcffllnianjibmpadjolanh.svg?style=social",alt:"Chrome Web Store"})),r.default.createElement("a",{href:"https://chrome.google.com/webstore/detail/kpbnombpnpcffllnianjibmpadjolanh",target:"_blank"},r.default.createElement("img",{src:"https://img.shields.io/chrome-web-store/d/kpbnombpnpcffllnianjibmpadjolanh.svg?style=social",alt:"Users"})),r.default.createElement("iframe",{src:"https://ghbtns.com/github-btn.html?user=bilibili-helper&repo=bilibili-helper&type=star&count=true",frameBorder:"0",scrolling:"0",width:"170px",height:"20px"}))}}t.default=n},Kvkj:function(e,t,a){"use strict";var o=a("svvH");Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"CommentArea",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(t,"HeaderArea",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"DownloadArea",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(t,"AnnouncementArea",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(t,"BadgeArea",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(t,"FeedbackArea",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"VoteArea",{enumerable:!0,get:function(){return d.default}}),Object.defineProperty(t,"Page",{enumerable:!0,get:function(){return p.default}}),Object.defineProperty(t,"FeedArea",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(t,"Header",{enumerable:!0,get:function(){return g.Header}});var r=o(a("8wrG")),i=o(a("jbW3")),l=o(a("1ZZj")),n=o(a("ZyJ2")),s=o(a("HjWF")),c=o(a("XeeE")),d=o(a("5BdJ")),p=o(a("RXmK")),u=o(a("oD3C")),g=a("rY4l")},Pa8V:function(e,t,a){"use strict";var o=a("svvH");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(a("quD3")),i=o(a("cDcd")),l=o(a("vOnD")),n=a("MuoO"),s=o(a("5Epl")),c=l.default.div.attrs({className:"comment-editor"})`
  position: relative;
  display: flex;
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--border-color);
  transform: scale(${e=>{var t=e.canUse;return t?1:.95}});
  z-index: 100;
  &:last-of-type {
    border-bottom: none;
  }
  .mask{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -20px;
    right: -20px;
    bottom: 20px;
    left: -20px;
    border-radius: 3px;
    background-color: rgba(85, 85, 85, 0.1);
    color: var(--content-color);
    user-select: none;
    z-index: 1;
  }
  
  .replies &, .main & {
    border-bottom: none;
    margin: 30px 0 10px;
    padding-bottom: 0;
    transform: scale(0.97);
    .header {
      width: 30px;
      img {
        width: 25px;
        height: 25px;
      }
    }
    .mask {
      top: -10px;
      right: -10px;
      bottom: -10px;
      left: -10px;
    }
  }
  .header {
    flex-shrink: 0;
    width: 120px;
    img {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      flex-shrink: 0;
    }
  }
  .main {
    flex-grow: 1;
    .send-box {
      display: flex;
      border-radius: 3px;
      overflow: hidden;
      button {
        width: 80px;
        border: none;
        font-size: 14px;
        background-color: var(--bilibili-blue);
        color: var(--background-color);
        cursor: pointer;
        outline: none;
        transition: all 0.15s;
        user-select: none;
        &:hover {
          opacity: 0.9;
        }
        &:active {
          opacity: 1;
        }
        &[disabled] {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }
    .toolbar {
      position: relative;
      .stickers-btn {
        padding: 3px 10px;
        border: 1px solid var(--border-color);
        border-radius: 3px;
        color: var(--content-color);
        cursor: pointer;
        outline: none;
        transition: all 0.1s;
        &:hover, &[open] {
          background-color: var(--bilibili-blue);
          color: var(--background-color);
        }
        &[disabled] {
          cursor: not-allowed;
          background-color: unset;
          color: var(--content-color);
          opacity: 0.2;
        }
      }
      .stickers-box {
        position: absolute;
        top: 24px;
        width: 388px;
        height: auto;
        border-radius: 3px;
        border: 1px solid var(--border-color);
        background-color: var(--pure-white);
        box-shadow: rgba(20, 20, 20, 0.1) 1px 1px 10px;
        z-index: 100;
        .stickers {
          height: 175px;
          padding: 5px;
          overflow: auto;
          &::-webkit-scrollbar {
            display: none;
          }
          .sticker {
            margin: 2px;
            padding: 4px 5px;
            border-radius: 3px;
            cursor: pointer;
            transition: all 0.3s;
            user-select: none;
            &:hover {
              background-color: var(--border-color);
            }
            &.text {
              display: inline-block;
              font-size: 12px;
            }
            &.img {
              width: 40px;
              height: 40px;
            }
          }
        }
        .stickers-nav {
          position: relative;
          display: flex;
          justify-content: space-between;
          background-color: var(--border-color);
          .tab-btn, img {
            display: block;
            margin: 2px;
            padding: 3px;
            width: 21px;
            height: 21px;
            line-height: 21px;
            border-radius: 3px;
            box-sizing: content-box;
            font-size: 12px;
            cursor: pointer;
            transition: background-color 0.3s;
            user-select: none;
            &[on="1"], &:hover {
              background-color: var(--background-color);
            }
          }
          .tab-btn {
            width: auto;
            padding: 3px 6px;
          }
          img {
            margin: 2px 3px;
            &:not([src]) {
              width: 27px;
              height: 27px;
              border: 1px solid var(--content-color);
              box-sizing: border-box;
            }
          }
        }
      }
      .send-error {
        padding: 3px 10px;
        display: inline-block;
        font-size: 12px;
        color: var(--bilibili-pink);
      }
    }
  }
  textarea {
    display: inline-block;
    width: 100%;
    height: 65px;
    padding: 5px 10px;
    line-height: normal;
    border-radius: 4px;
    border: 1px solid var(--border-color);
    font-size: 12px;
    box-sizing: border-box;
    background-color: var(--border-color);
    overflow: auto;
    color: #555;
    transition: all 0.15s;
    outline: none;
    resize: none;
    &:hover, &:focus-within {
      background-color: var(--pure-white);
    }
    &[disabled] {
      opacity: 0.2;
      background-color: var(--border-color);
      cursor: not-allowed;
    }
  }
`;class d extends i.default.Component{constructor(e){super(e),this.handleOnClickStickersBtn=(()=>{this.setState({on:!this.state.on}),this.state.on?this.textarea.blur():this.textarea.focus()}),this.handleOnClickStickerNavPrev=(()=>{var e=this.props.emoji.optionJSON,t=this.state.emojiNavigation,a=t.start,o=t.current,i=a-1;i<0&&(i=0);var l=o-1>0?o-1:0,n=l<a?i:a;this.setState({emojiNavigation:(0,r.default)({},this.state.emojiNavigation,{pid:e[l].pid||0,start:n,current:l})})}),this.handleOnClickStickerNavNext=(()=>{var e=this.props.emoji.optionJSON,t=this.state.emojiNavigation,a=t.start,o=t.current,i=t.length,l=a+1;l>=e.length&&(l=e.length-1);var n=o+1,s=n>a+i-1?l:a;this.setState({emojiNavigation:(0,r.default)({},this.state.emojiNavigation,{pid:e[n].pid||0,start:s,current:n})})}),this.handleOnClickStickerTab=((e,t)=>{this.setState({emojiNavigation:(0,r.default)({},this.state.emojiNavigation,{pid:e,current:t})})}),this.handleOnClickSticker=(e=>{var t=this.textarea.selectionStart,a=this.textarea.selectionEnd,o=this.textarea.value,r=o.substr(0,t),i=o.substr(a);this.textarea.value=r.concat(e,i),this.textarea.focus(),this.textarea.selectionEnd=r.length+e.length}),this.handleSendReply=(e=>{var t=e.root,a=void 0===t?null:t,o=e.parent,r=void 0===o?null:o,i=e.oid,l=void 0===i?null:i,n=this.props.name,s=this.textarea.value,c=n?`\u56de\u590d @${n} :${s}`:s,d=this.props.user.csrf;s&&this.props.dispatch({type:"comments/sendReply",payload:{root:a,parent:r,message:c,oid:l,csrf:d}}),this.setState({tempMessage:s},()=>{this.textarea.value=""})}),this.renderEmojis=((e,t)=>e.map(e=>{if(t)return i.default.createElement("span",{key:e,className:"sticker text",title:e,onClick:()=>this.handleOnClickSticker(e)},e);var a=e.url,o=e.name,r=e.remark;return i.default.createElement(s.default,{key:o,className:"sticker img",url:a,sign:o,remark:r,onClick:()=>this.handleOnClickSticker(o)})})),this.state={on:!1,emojiNavigation:{pid:0,start:0,length:7,current:0},tempMessage:null}}render(){var e=this.state,t=e.on,a=e.emojiNavigation,o=e.tempMessage,r=a.start,l=a.length,n=a.pid,d=a.current,p=this.props,u=p.comments,g=p.name,A=p.user,m=p.emoji,h=p.global,b=p.oid,f=p.parent,x=p.root,v=u.status.editor,w=v.error,E=v.sending,B=m.optionJSON,k=!!A.info,C=A.info||{},Q=C.face,D=C.uid;return i.default.createElement(c,{canUse:k},!k&&i.default.createElement("div",{className:"mask"},i.default.createElement("span",null,"~ ",!h.status.connected&&"\u672a\u8fde\u63a5\u52a9\u624b"," ",!k&&h.status.connected&&"\u5c1a\u672a\u767b\u5f55"," ~")),i.default.createElement("div",{className:"header"},k&&i.default.createElement(s.default,{className:"avatar",url:Q,sign:D})),i.default.createElement("div",{className:"main"},i.default.createElement("div",{className:"send-box"},i.default.createElement("textarea",{disabled:!k,ref:e=>this.textarea=e,placeholder:g&&!h?`\u56de\u590d @${g}`:"\u8bf7\u81ea\u89c9\u9075\u5b88\u4e92\u8054\u7f51\u76f8\u5173\u7684\u653f\u7b56\u6cd5\u89c4\uff0c\u4e25\u7981\u53d1\u5e03\u8272\u60c5\u3001\u66b4\u529b\u3001\u53cd\u52a8\u7684\u8a00\u8bba\u3002",defaultValue:w?o:""}),i.default.createElement("button",{disabled:E||!k,onClick:()=>this.handleSendReply({root:x,parent:f,oid:b})},"\u53d1\u9001")),i.default.createElement("div",{className:"toolbar"},i.default.createElement("button",{disabled:!k,className:"stickers-btn",onClick:this.handleOnClickStickersBtn,open:t},"STICKERS"),t&&i.default.createElement("div",{className:"stickers-box"},i.default.createElement("div",{className:"stickers"},B[d]&&this.renderEmojis(B[d].emojis,0===n)),i.default.createElement("div",{className:"stickers-nav"},r>0&&i.default.createElement("div",{className:"tab-btn",onClick:this.handleOnClickStickerNavPrev},"PREV"),B.map((e,t)=>{var a=e.pid,o=(e.emojis,e.pname,e.purl);if(t<r+l&&t>r-1)return i.default.createElement(s.default,{key:a,url:o,sign:`default-emoji-tab-${a}`,on:d===t?"1":"0",onClick:()=>this.handleOnClickStickerTab(a,t)})}),r+l<B.length&&i.default.createElement("div",{className:"tab-btn",onClick:this.handleOnClickStickerNavNext},"NEXT"))),w&&i.default.createElement("span",{className:"send-error"},w))))}}var p=(0,n.connect)(e=>{var t=e.user,a=e.emoji,o=e.comments,r=e.global;return{user:t,emoji:a,comments:o,global:r}})(d);t.default=p},RXmK:function(e,t,a){"use strict";var o=a("svvH");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(a("cDcd")),i=o(a("vOnD")),l=i.default.div`
    width: 800px;
    margin: 10px auto;
    padding: 0px 10px;
`;class n extends r.default.Component{constructor(e){super(e)}render(){return r.default.createElement(l,this.props,this.props.children)}}var s=n;t.default=s},RnhZ:function(e,t,a){var o={"./af":"K/tc","./af.js":"K/tc","./ar":"jnO4","./ar-dz":"o1bE","./ar-dz.js":"o1bE","./ar-kw":"Qj4J","./ar-kw.js":"Qj4J","./ar-ly":"HP3h","./ar-ly.js":"HP3h","./ar-ma":"CoRJ","./ar-ma.js":"CoRJ","./ar-sa":"gjCT","./ar-sa.js":"gjCT","./ar-tn":"bYM6","./ar-tn.js":"bYM6","./ar.js":"jnO4","./az":"SFxW","./az.js":"SFxW","./be":"H8ED","./be.js":"H8ED","./bg":"hKrs","./bg.js":"hKrs","./bm":"p/rL","./bm.js":"p/rL","./bn":"kEOa","./bn.js":"kEOa","./bo":"0mo+","./bo.js":"0mo+","./br":"aIdf","./br.js":"aIdf","./bs":"JVSJ","./bs.js":"JVSJ","./ca":"1xZ4","./ca.js":"1xZ4","./cs":"PA2r","./cs.js":"PA2r","./cv":"A+xa","./cv.js":"A+xa","./cy":"l5ep","./cy.js":"l5ep","./da":"DxQv","./da.js":"DxQv","./de":"tGlX","./de-at":"s+uk","./de-at.js":"s+uk","./de-ch":"u3GI","./de-ch.js":"u3GI","./de.js":"tGlX","./dv":"WYrj","./dv.js":"WYrj","./el":"jUeY","./el.js":"jUeY","./en-SG":"zavE","./en-SG.js":"zavE","./en-au":"Dmvi","./en-au.js":"Dmvi","./en-ca":"OIYi","./en-ca.js":"OIYi","./en-gb":"Oaa7","./en-gb.js":"Oaa7","./en-ie":"4dOw","./en-ie.js":"4dOw","./en-il":"czMo","./en-il.js":"czMo","./en-nz":"b1Dy","./en-nz.js":"b1Dy","./eo":"Zduo","./eo.js":"Zduo","./es":"iYuL","./es-do":"CjzT","./es-do.js":"CjzT","./es-us":"Vclq","./es-us.js":"Vclq","./es.js":"iYuL","./et":"7BjC","./et.js":"7BjC","./eu":"D/JM","./eu.js":"D/JM","./fa":"jfSC","./fa.js":"jfSC","./fi":"gekB","./fi.js":"gekB","./fo":"ByF4","./fo.js":"ByF4","./fr":"nyYc","./fr-ca":"2fjn","./fr-ca.js":"2fjn","./fr-ch":"Dkky","./fr-ch.js":"Dkky","./fr.js":"nyYc","./fy":"cRix","./fy.js":"cRix","./ga":"USCx","./ga.js":"USCx","./gd":"9rRi","./gd.js":"9rRi","./gl":"iEDd","./gl.js":"iEDd","./gom-latn":"DKr+","./gom-latn.js":"DKr+","./gu":"4MV3","./gu.js":"4MV3","./he":"x6pH","./he.js":"x6pH","./hi":"3E1r","./hi.js":"3E1r","./hr":"S6ln","./hr.js":"S6ln","./hu":"WxRl","./hu.js":"WxRl","./hy-am":"1rYy","./hy-am.js":"1rYy","./id":"UDhR","./id.js":"UDhR","./is":"BVg3","./is.js":"BVg3","./it":"bpih","./it-ch":"bxKX","./it-ch.js":"bxKX","./it.js":"bpih","./ja":"B55N","./ja.js":"B55N","./jv":"tUCv","./jv.js":"tUCv","./ka":"IBtZ","./ka.js":"IBtZ","./kk":"bXm7","./kk.js":"bXm7","./km":"6B0Y","./km.js":"6B0Y","./kn":"PpIw","./kn.js":"PpIw","./ko":"Ivi+","./ko.js":"Ivi+","./ku":"JCF/","./ku.js":"JCF/","./ky":"lgnt","./ky.js":"lgnt","./lb":"RAwQ","./lb.js":"RAwQ","./lo":"sp3z","./lo.js":"sp3z","./lt":"JvlW","./lt.js":"JvlW","./lv":"uXwI","./lv.js":"uXwI","./me":"KTz0","./me.js":"KTz0","./mi":"aIsn","./mi.js":"aIsn","./mk":"aQkU","./mk.js":"aQkU","./ml":"AvvY","./ml.js":"AvvY","./mn":"lYtQ","./mn.js":"lYtQ","./mr":"Ob0Z","./mr.js":"Ob0Z","./ms":"6+QB","./ms-my":"ZAMP","./ms-my.js":"ZAMP","./ms.js":"6+QB","./mt":"G0Uy","./mt.js":"G0Uy","./my":"honF","./my.js":"honF","./nb":"bOMt","./nb.js":"bOMt","./ne":"OjkT","./ne.js":"OjkT","./nl":"+s0g","./nl-be":"2ykv","./nl-be.js":"2ykv","./nl.js":"+s0g","./nn":"uEye","./nn.js":"uEye","./pa-in":"8/+R","./pa-in.js":"8/+R","./pl":"jVdC","./pl.js":"jVdC","./pt":"8mBD","./pt-br":"0tRk","./pt-br.js":"0tRk","./pt.js":"8mBD","./ro":"lyxo","./ro.js":"lyxo","./ru":"lXzo","./ru.js":"lXzo","./sd":"Z4QM","./sd.js":"Z4QM","./se":"//9w","./se.js":"//9w","./si":"7aV9","./si.js":"7aV9","./sk":"e+ae","./sk.js":"e+ae","./sl":"gVVK","./sl.js":"gVVK","./sq":"yPMs","./sq.js":"yPMs","./sr":"zx6S","./sr-cyrl":"E+lV","./sr-cyrl.js":"E+lV","./sr.js":"zx6S","./ss":"Ur1D","./ss.js":"Ur1D","./sv":"X709","./sv.js":"X709","./sw":"dNwA","./sw.js":"dNwA","./ta":"PeUW","./ta.js":"PeUW","./te":"XLvN","./te.js":"XLvN","./tet":"V2x9","./tet.js":"V2x9","./tg":"Oxv6","./tg.js":"Oxv6","./th":"EOgW","./th.js":"EOgW","./tl-ph":"Dzi0","./tl-ph.js":"Dzi0","./tlh":"z3Vd","./tlh.js":"z3Vd","./tr":"DoHr","./tr.js":"DoHr","./tzl":"z1FC","./tzl.js":"z1FC","./tzm":"wQk9","./tzm-latn":"tT3J","./tzm-latn.js":"tT3J","./tzm.js":"wQk9","./ug-cn":"YRex","./ug-cn.js":"YRex","./uk":"raLr","./uk.js":"raLr","./ur":"UpQW","./ur.js":"UpQW","./uz":"Loxo","./uz-latn":"AQ68","./uz-latn.js":"AQ68","./uz.js":"Loxo","./vi":"KSF8","./vi.js":"KSF8","./x-pseudo":"/X5v","./x-pseudo.js":"/X5v","./yo":"fzPg","./yo.js":"fzPg","./zh-cn":"XDpg","./zh-cn.js":"XDpg","./zh-hk":"SatO","./zh-hk.js":"SatO","./zh-tw":"kOpN","./zh-tw.js":"kOpN"};function r(e){var t=i(e);return a(t)}function i(e){var t=o[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}r.keys=function(){return Object.keys(o)},r.resolve=i,e.exports=r,r.id="RnhZ"},XeeE:function(e,t,a){"use strict";var o=a("svvH");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(a("cDcd")),i=o(a("vOnD")),l=a("rY4l"),n=i.default.div`
  width: 800px;
  margin: 10px auto;
  a {
    display: inline-block;
    margin: 3px 5px;
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 3px;
    text-decoration: none;
    background-color: #ef6c00;
    color: var(--pure-white);
    user-select: none;
    &:first-of-type {
      margin-left: 0;
    }
    &:hover {
      opacity: 0.9;
    }
    &:active {
      opacity: 1;
    }
    img, .github-svg {
      width: 15px;
      vertical-align: middle;
      fill: currentColor;
    }
  }
  .github {
    background-color: #222;
  }
  .qq {
    background-color: #11abff;
  }
  .comments {
    background-color: var(--bilibili-pink);
  }
  
`,s=()=>r.default.createElement(n,null,r.default.createElement(l.Header,null,"\u95ee\u9898\u53cd\u9988 ~ FEEDBACK",r.default.createElement("p",null,"\u8d76\u7d27\u7559\u8a00\u5427~\u60f3\u8bf4\u4ec0\u4e48\u90fd\u53ef\u4ee5~")),r.default.createElement("a",{className:"comments"},"\u300c\u8bc4\u8bba\u533a\u300d\u7559\u8a00"),r.default.createElement("a",{className:"github",href:"https://github.com/bilibili-helper/bilibili-helper/issues",target:"_blank"},"\u300cGithub\u300d\u4e0a\u53cd\u9988"),r.default.createElement("a",{href:"https://weibo.com/guguke",target:"_blank"},"\u300c\u5fae\u535a\u300d@\u557e\u5495\u5495www"),r.default.createElement("a",{href:"https://weibo.com/ruo0037",target:"_blank"},"\u300c\u5fae\u535a\u300d@\u6ca1\u7761\u9192\u7684\u8089\u554a"),r.default.createElement("a",{className:"qq"},"\u5728\u300cQQ\u7fa4548321019\u300d\u79c1\u804a \u8089\u8089"));t.default=s},ZyJ2:function(e,t,a){"use strict";var o=a("svvH");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(a("YLtl")),i=o(a("cDcd")),l=a("MuoO"),n=o(a("vOnD")),s=n.default.div`
  width: 800px;
  margin: 10px auto;
  h3 {
    margin: 15px 0 10px;
    font-size: 16px;
    color: #212121;
  }
  ul {
    padding: 5px 1px;
    border-radius: 3px;
    background-color: var(--pure-white);
    z-index: 101;
    li {
      padding: 7px 10px;
      font-size: 12px;
      list-style: none;
      //cursor: pointer;
      border-radius: 3px;
      border-bottom: 1px solid var(--border-color);
      transition: all 0.1s;
      &:last-of-type {
        border:none;
      }
      //&:hover, &.active {
      //  background-color: var(--bilibili-blue);
      //  color: var(--pure-white);
      //}
      &::after {
        content: ';';
        display: inline;
      }
      &:last-of-type::after {
        content: '。';
      }
      i {
        margin: 0 3px;
        font-style: normal;
      }
    }
  }
`;class c extends i.default.Component{constructor(e){super(e)}render(){var e=this.props.announcements;return i.default.createElement(s,{id:"announcement"},i.default.createElement("h3",null,"\u91cd\u8981\u516c\u544a ~ ANNOUNCEMENTS"),r.default.map(e.config,(e,t)=>"\u529f\u80fd\u5220\u9664\u987b\u77e5"===t&&i.default.createElement("div",{className:"item",key:t},i.default.createElement("ul",{className:"content"},e.map((e,t)=>i.default.createElement("li",{key:t,dangerouslySetInnerHTML:{__html:e}}))))))}}var d=(0,l.connect)(e=>{var t=e.announcements;return{announcements:t}})(c);t.default=d},jbW3:function(e,t,a){"use strict";var o=a("svvH");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(a("cDcd")),i=a("MuoO"),l=o(a("vOnD")),n=l.default.div.attrs({className:"header-box"})`
  position: relative;
  flex-shrink: 0;
  margin-bottom: 40px;
  padding-bottom: 0;
  height: 80px;
  min-width: 800px;
  background-color: var(--bilibili-pink);
  color: var(--background-color);
  padding: 50px 0px 20px;
  //overflow: hidden;
  &::after {
    content: '';
    display: block;
    margin-top: 10px;
    width: 100%;
    height: 20px;
    background-color: #fb7299;
    border-radius: 0 0 50% 50%;
  }
  & > * {
    display: block;
    max-width: 800px;
    margin: 0px auto;
    padding: 0px 10px;
  }
  .header-box {
    display: flex;
    justify-content: space-between;
    height: 80px;
    .title-box {
      h1 {
        font-size: 24px;
      }
      .version-box {
        height: 12px;
        line-height: 12px;
        text-indent: 2px;
        span {
          margin-right: 20px;
          line-height: 12px;
          font-size: 12px;
          font-weight: normal;
        }
      }
    }
    .action-box {
      display: flex;
      justify-content: flex-end;
      //align-items: center;
      .login-box {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        & > * {
          flex-grow: 0;
          width: max-content;
        }
        span {
          font-size: 12px;
          margin-top: 3px;
          text-align: right;
        }
        .login-btn {
          
        }
      }
    }
  }
  img {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    width: 100%;
    height: 37px;
    max-width: unset;
    margin: -1px 0 0;
    padding: 0;
  }
`,s=l.default.button`
  padding: 10px 40px;
  border-radius: 3px;
  font-size: 14px;
  letter-spacing: 2px;
  border: 1px solid var(--background-color);
  background-color: var(--bilibili-blue);
  color: var(--background-color);
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(35, 173, 229, 0.9);
  }
  &:active {
    background-color: var(--bilibili-blue);
  }
  &[disabled] {
    background-color: rgba(35, 173, 229, 0.5);
    cursor: not-allowed;
  }
`;class c extends r.default.Component{constructor(e){super(e),this.handleOnClickLogin=((e,t)=>{e||t?location.href=location.href:this.props.dispatch({type:"global/connectHelper"})})}render(){var e=this.props.global,t=e.status,a=t.connected,o=t.tryConnect,i=t.initializing;return r.default.createElement(r.default.Fragment,null,r.default.createElement(n,null,r.default.createElement("div",{className:"header-box"},r.default.createElement("div",{className:"title-box"},r.default.createElement("h1",null,"BILIBILI HELPER"),r.default.createElement("div",{className:"version-box"},e.config&&r.default.createElement("span",null,"Last: ",e.config.lastVersion),e.version&&r.default.createElement("span",null,"You: ",e.version))),r.default.createElement("div",{className:"action-box"},!a&&o?r.default.createElement("div",{className:"login-box"},r.default.createElement(s,{className:"login-btn",onClick:()=>this.handleOnClickLogin(a,o)},i&&"\u8fde\u63a5\u4e2d",!i&&!a&&!o&&"\u8fde\u63a5\u52a9\u624b",!i&&!a&&o&&"\u8fde\u63a5\u52a9\u624b\u5931\u8d25\uff0c\u70b9\u51fb\u5237\u65b0\u91cd\u8bd5"),!a&&o&&r.default.createElement("span",null,"\u5982\u679c\u60a8\u7684\u6d4f\u89c8\u5668\u672a\u5b89\u88c5\u52a9\u624b\u6216\u52a9\u624b\u7248\u672c\u5c0f\u4e8e 1.2.0.8\uff0c\u8fde\u63a5\u5c06\u4f1a\u5931\u8d25",r.default.createElement("br",null),"\u8bf7\u5b89\u88c5\u52a9\u624b\u6216\u8005\u66f4\u65b0\u81f3\u65b0\u7248\u672c")):null))))}}var d=(0,i.connect)(e=>{var t=e.global,a=e.user;return{global:t,user:a}})(c);t.default=d},oD3C:function(e,t,a){"use strict";var o=a("svvH");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(a("etV5")),i=o(a("5Epl")),l=o(a("cDcd")),n=a("MuoO"),s=o(a("vOnD")),c=a("rY4l"),d=o(a("RXmK")),p=a("c7k8"),u=(0,s.default)(d.default)`
  position: relative;
  img {
    position: absolute;
    top: 82px;
    right: 30px;
    width: 160px;
    opacity: 0.7;
    user-select: none;
    pointer-events: none;
    &:hover {
    }
  }
`,g=(0,s.default)(p.List)`
  border-radius: 3px;
  outline: none;
`,A=s.default.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 6px;
  font-size: 12px;
  box-sizing: border-box;
  border-bottom: 1px solid #fff;
  border-radius: 3px;
  background-color: var(--border-color);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: var(--background-color);
  }
  &.largeThanTen {
    color: var(--bilibili-pink);
  }
  &.largeThanFive {
    color: var(--bilibili-blue);
  }
  & > * {
    padding: 0 2px 0 5px;
    width: 100px;
    border-right: 1px solid white;
    &:last-of-type {
      border-right: none;
    }
  }
  .date {
  }
  .name {
    width: 60px;
    text-align: center;
  }
  .num {
    text-align: right;
    padding-right: 20px;
    width: 60px;
  }
  .message {
    flex-grow: 1;
  }
`;class m extends l.default.Component{constructor(e){super(e),this.renderLine=(e=>{var t=e.index,a=e.style,o=this.props.global,i=(0,r.default)(o.feeds[t],4),n=i[0],s=i[1],c=i[2],d=i[3],p=c>=10,u=c>=5&&c<10;return l.default.createElement(A,{style:a,key:t,className:`${u?"largeThanFive":p?"largeThanTen":""}`},l.default.createElement("span",{className:"date"},n),l.default.createElement("span",{className:"name"},s),l.default.createElement("span",{className:"num"},"\uffe5 ",Number(c).toFixed(2)),l.default.createElement("span",{className:"message"},d))})}render(){var e=this.props.global;return l.default.createElement(u,null,l.default.createElement(c.Header,null,"\u6295\u5582\u533a\u9e2d ~ FEEDS",l.default.createElement("p",null,"\u611f\u8c22\u5927\u5bb6\u7684\u652f\u6301\u9e2d~mua~")),l.default.createElement(g,{width:800,height:200,rowCount:e.feeds&&e.feeds.length||0,rowHeight:28,rowRenderer:this.renderLine,noRowsRenderer:()=>l.default.createElement("div",null,"\u65e0\u6570\u636e")}),l.default.createElement(i.default,{src:"../static/images/alipay-df.png"}))}}var h=(0,n.connect)(e=>{var t=e.global;return{global:t}})(m);t.default=h},rB1f:function(e,t,a){"use strict";var o=a("g2Oz"),r=a("svvH");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=r(a("cDcd")),l=a("MuoO"),n=o(a("vOnD")),s=r(a("Bo8p")),c=a("Kvkj"),d=n.createGlobalStyle`
  html {
    --background-color: #fafafa;
	  --bilibili-blue: #23ade5;
	  --bilibili-pink: #fb7299;
	  --border-color: #f1f1f1;
	  --content-color: #555;
	  --pure-white: #fcfcfc;
  }
  body {
    background: var(--background-color);
  }
  *, body {
    margin: 0;
    padding: 0;
    font-family: system-ui, "PingFang SC", STHeiti, sans-serif;
  }
  .model-img {
    &:not([src]) {
      content: url("data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
      border: 1px solid var(--border-color);
      box-sizing: border-box;
    }
  }
`,p=()=>i.default.createElement(i.default.Fragment,null,i.default.createElement(d,null),i.default.createElement(c.HeaderArea,null),i.default.createElement(c.DownloadArea,null),i.default.createElement(c.VoteArea,null),i.default.createElement(c.AnnouncementArea,null),i.default.createElement(c.FeedbackArea,null),i.default.createElement(c.FeedArea,null),i.default.createElement(c.BadgeArea,null),i.default.createElement(c.CommentArea,null)),u=(0,s.default)((0,l.connect)(e=>e)(p));t.default=u},rY4l:function(e,t,a){"use strict";var o=a("svvH");Object.defineProperty(t,"__esModule",{value:!0}),t.Header=void 0;var r=o(a("cDcd")),i=o(a("vOnD")),l=i.default.h3`
  align-items: center;
  margin: 15px 0 20px;
  font-size: 16px;
  color: #212121;
  a {
    margin-left: 20px;
    padding: 2px 7px;
    line-height: 22px;
    vertical-align: bottom;
    font-size: 12px;
    font-weight: normal;
    border: 1px solid;
    border-radius: 3px;
    text-decoration: none;
    background-color: var(--pure-white);
    color: var(--bilibili-blue);
    cursor: pointer;
    outline: none;
    user-select: none;
    &:active {
      background-color: var(--bilibili-blue);
      color: var(--pure-white);
    }
  }
  p {
    margin: 3px 0px;
    font-size: 12px;
    color: var(--content-color);
    font-weight: normal;
  }
`,n=function(e){return r.default.createElement(l,null,e.children)};t.Header=n},ywEC:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.LOADING_IMAGE_URL=void 0;var o="data:image/jpeg;base64,R0lGODlhZABkAMQfAKqytf7+/hktNoaRltTY2jRHTvP09VdmbHqGi2Nxd+rs7cPIyvr6+52nquHk5bzCxUFSWc/T1SY6Qt7h4kxcY+fp6pKcoG58gfDx8rS7vsjNz9nd3uTm5/b39+3u7////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkY3OUZDREY5MDgxMDExRTVBOTQ0ODQ2RTUzQjczM0VEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkY3OUZDREZBMDgxMDExRTVBOTQ0ODQ2RTUzQjczM0VEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Rjc5RkNERjcwODEwMTFFNUE5NDQ4NDZFNTNCNzMzRUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Rjc5RkNERjgwODEwMTFFNUE5NDQ4NDZFNTNCNzMzRUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94Onht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";t.LOADING_IMAGE_URL=o}}]);