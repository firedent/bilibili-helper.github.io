(function(e){function t(t){for(var a,i,s=t[0],u=t[1],p=t[2],l=0,c=[];l<s.length;l++)i=s[l],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&c.push(r[i][0]),r[i]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);d&&d(t);while(c.length)c.shift()();return o.push.apply(o,p||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,i=1;i<n.length;i++){var u=n[i];0!==r[u]&&(a=!1)}a&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},r={1:0},o=[];function i(e){return s.p+""+({}[e]||e)+"."+{2:"06ee4084",3:"253340d2"}[e]+".async.js"}function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise(function(t,a){n=r[e]=[t,a]});t.push(n[2]=a);var o,u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=i(e);var p=new Error;o=function(t){u.onerror=u.onload=null,clearTimeout(l);var n=r[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;p.message="Loading chunk "+e+" failed.\n("+a+": "+o+")",p.name="ChunkLoadError",p.type=a,p.request=o,n[1](p)}r[e]=void 0}};var l=setTimeout(function(){o({type:"timeout",target:u})},12e4);u.onerror=u.onload=o,document.head.appendChild(u)}return Promise.all(t)},s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],p=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var d=p;o.push([0,0]),n()})({"/1p2":function(e,t,n){"use strict";n("0wlq"),n("dcFJ"),n("VxKu"),n("QsMh"),n("kgWH"),n("/gYn"),n("Q6cQ"),n("nwK/"),n("O42g"),n("XrRV"),n("jN/G"),n("PkQq"),n("er1Y"),n("/mWb"),n("jjMW"),n("OHgp"),n("EEQl"),n("HXXR"),n("kWR5"),n("Bz7s"),n("lZXM"),n("DBt0"),n("hIUm"),n("G7Hh"),n("DFAo"),n("0sxA"),n("rUcv"),n("3m+/"),n("9nSz"),n("IR7R"),n("UQt1"),n("u2w5"),n("zxrt"),n("Bus3"),n("OR3X"),n("o175"),n("XP1/"),n("w8uh"),n("HCMe"),n("QEzc"),n("QeHl"),n("SPFY"),n("7RDE"),n("fKm+"),n("N4uP"),n("zr8x"),n("zQzA"),n("wOl0")},0:function(e,t,n){e.exports=n("KyW6")},1:function(e,t){},"5R+S":function(e,t,n){"use strict";var a=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("d6i3")),o=n("f23f"),i={state:{},subscriptions:{setup(e){var t=e.dispatch;e.history;window.addEventListener("message",function(e){var n=e.data,a=n.command,r=void 0===a?"":a,o=n.commend,i=void 0===o?"":o,s=n.data,u=void 0===s?{}:s,p=n.from,l=n.model,d=n.sign;if("helper"===p&&"image"===l)switch(r||i){case"returnFetch":t({type:"update",payload:{url:u,sign:d}});break}})}},reducers:{update(e,t){t.type;var n=t.payload,a=n.url,r=n.sign;return e[r]=a,e}},effects:{fetch(e,t){return r.default.mark(function n(){var a,i,s,u;return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return e.type,a=e.payload,t.put,t.call,i=t.select,s=a.url,u=a.sign,n.next=5,i(e=>{var t=e.image;t[u]||(0,o.fetchFromHelper)("image",{url:s,model:"image",sign:u,mine:"image/jpeg"})});case 5:case"end":return n.stop()}},n)})()}}};t.default=i},AabO:function(e,t,n){"use strict";var a=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("jHYr")),o=a(n("d6i3")),i=a(n("p0pE")),s=a(n("GBY4")),u=n("f23f"),p={state:{data:{replies:null,hots:null,page:{acount:0,count:0,num:1,size:20},top:null},votes:{rpidArray:[],likeSum:{}},members:{},replyMap:{},config:null,commentMap:[],voteConfig:null,status:{comment:{loadPage:!1,loadingRpid:null},vote:{voting:!1},editor:{getting:!1,sending:!1,error:null}}},subscriptions:{setup(e,t){var n=e.dispatch;e.history;window.addEventListener("message",function(e){var t=e.data,a=t.command,r=void 0===a?"":a,o=t.commend,i=void 0===o?"":o,s=t.data,u=void 0===s?{}:s,p=t.from,l=t.model,d=t.sign;if("helper"===p&&"comment"===l)switch(r||i){case"returnFetch":if(0===u.code)switch(d){case"getComment":n({type:"updateCommentLoadingState",payload:!1}),n({type:"updateCommentData",payload:u.data});break;case"getReply":n({type:"updateReplyLoadingState",payload:!1}),n({type:"updateReplayData",payload:u.data});break;case"sendReply":n({type:"updateEditorSendError",payload:null});var c=u.data,f=c.dialog,m=c.parent,y=c.root,v=c.rpid;setTimeout(()=>{n({type:"updateEditorSendingState",payload:!1}),n(f||m||y||!v?{type:"fetchReply",payload:{parent:m,root:y}}:{type:"fetchComment"})},1e3);break;case"setLike":var g=u.receipt,h=g.rpid,w=g.action;n({type:"updateCommentLikeStatus",payload:{rpid:h,action:w}});break;case"setHate":var b=u.receipt,x=b.rpid,C=b.action;n({type:"updateCommentHateStatus",payload:{rpid:x,action:C}});break;case"getVote":n({type:"updateVoteData",payload:u.data});break}else 12025===u.code&&(n({type:"updateEditorSendError",payload:u.message}),n({type:"updateEditorSendingState",payload:!1}));break}})}},reducers:{updateCommentData:(e,t)=>{t.type;var n=t.payload,a=t=>{var n=t.rpid,r=t.replies,o=t.rcount,i=t.member,s=t.content;return t.content.message=s.message.replace(/&#([\d]+);/g,(e,t)=>String.fromCharCode(t)).replace(/(&.+;)/g,u.htmlDecode),e.members[i.mid]=i,e.replyMap[n]={self:t,replies:r?r.map(a):null,page:{count:o,num:1,size:10},root:{},hasExpand:!1,needExpand:r&&r.length<o||!1,pages:Math.ceil(o/10)},t};return n.upper&&n.upper.top&&(n.upper.top=a(n.upper.top)),n.hots&&(n.hots=n.hots.map(a)),n.replies&&(n.replies=n.replies.map(a)),e.data=(0,i.default)({},n,{top:n.upper?n.upper.top:e.data.top}),e},updateConfig:(e,t)=>{var n=t.payload;return e.config=(0,i.default)({},e.config,n),e},updateCommentMap:(e,t)=>{var n=t.payload;return e.commentMap=n,e},updateReplayData:(e,t)=>{var n=t.payload,a=t=>{var n=t.rpid,r=t.replies,o=t.rcount,i=t.member,s=t.content;return t.content.message=s.message.replace(/&#([\d]+);/g,(e,t)=>String.fromCharCode(t)).replace(/(&.+;)/g,u.htmlDecode),e.members[i.mid]=i,e.replyMap[n]={self:t,replies:r?r.map(a):null,page:{count:o,num:1,size:10},root:{},hasExpand:!1,needExpand:r&&r.length<o||!1,pages:Math.ceil(o/10)},t},r=n.replies,o=n.page,s=n.root,p=n.upper,l=o.count,d=o.size,c=o.num,f=e.replyMap[s.rpid];return e.replyMap[s.rpid]=(0,i.default)({},f,{replies:r.map(a),page:o,root:s,upper:p,pages:Math.ceil(l/d),hasExpand:r.length===d||1!==c,needExpand:r.length<l&&1===c}),e},updateVoteData:(e,t)=>{var n=t.payload,a=t=>{var n=t.rpid,r=t.replies,o=t.rcount,i=t.member,s=t.content;return t.content.message=s.message.replace(/&#([\d]+);/g,(e,t)=>String.fromCharCode(t)).replace(/(&.+;)/g,u.htmlDecode),e.members[i.mid]=i,e.replyMap[n]={self:t,replies:r?r.map(a):null,page:{count:o,num:1,size:10},root:{},hasExpand:!1,needExpand:r&&r.length<o||!1,pages:Math.ceil(o/10)},t};return(e.votes.rpidArray&&e.votes.rpidArray.indexOf(n.root.rpid)<0||!e.votes.rpidArray)&&(e.votes.rpidArray=[...e.votes.rpidArray,n.root.rpid]),e.votes.likeSum[n.root.rpid]=n.root.like,a(n.root),e},updateVoteSum:(e,t)=>{var n=t.payload;if(n){var a=n.rpid,r=n.like;e.votes.likeSum[a]=r}else e.votes.likeSum={};return e},updateCommentLoadingState:(e,t)=>{var n=t.payload;return e.status.comment.loadPage=n,e},updateReplyLoadingState:(e,t)=>{var n=t.payload;return e.status.comment.loadingRpid=n,e},updateEditorSendingState:(e,t)=>{var n=t.payload;return e.status.editor.sending=n,e},updateEditorSendError:(e,t)=>{var n=t.payload;return e.status.editor.error=n,e},updateCommentLikeStatus:(e,t)=>{var n=t.payload,a=n.rpid,r=(n.action,_.find(e.replyMap,e=>e.self.rpid===a));return r&&(0===r.self.action||2===r.self.action?(r.self.action=1,r.self.like+=1):1===r.self.action&&(r.self.action=0,r.self.like>0&&(r.self.like-=1))),e.replyMap[a]=r,e},updateCommentHateStatus:(e,t)=>{var n=t.payload,a=n.rpid,r=(n.action,_.find(e.replyMap,e=>e.self.rpid===a));return r&&(0===r.self.action?(r.self.action=2,r.self.like>0&&(r.self.like-=1)):2===r.self.action?r.self.action=0:1===r.self.action&&(r.self.action=2,r.self.like-=1)),e.replyMap[a]=r,e},updateVoteConfig:(e,t)=>{var n=t.payload;return e.voteConfig=n,e}},effects:{loadVoteConfig(e,t){return o.default.mark(function n(){var a,r,i,s;return o.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return e.payload,a=t.put,r=t.call,n.next=4,r(fetch,"../static/json/votes.json");case 4:if(i=n.sent,200!==i.status&&304!==i.status){n.next=11;break}return n.next=8,i.json();case 8:return s=n.sent,n.next=11,a({type:"updateVoteConfig",payload:s});case 11:case"end":return n.stop()}},n)})()},loadCommentMap(e,t){return o.default.mark(function n(){var a,r,i,s;return o.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return e.payload,a=t.put,r=t.call,n.next=4,r(fetch,"../static/json/comments.json");case 4:if(i=n.sent,200!==i.status&&304!==i.status){n.next=11;break}return n.next=8,i.json();case 8:return s=n.sent,n.next=11,a({type:"updateCommentMap",payload:s});case 11:case"end":return n.stop()}},n)})()},load(e,t){return o.default.mark(function n(){var a,r,i,s,u,p,l,d,c;return o.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return a=e.payload,r=t.put,n.next=4,r({type:"updateConfig",payload:a.comment});case 4:if(i=a.query,s=i.oid,u=i.pn,p=i.ps,l=i.root,d=i.type,c=i.sort,!a.ptype){n.next=10;break}return n.next=8,r({type:"fetchReply",payload:_.pickBy({oid:s,ps:p,sort:c||a.comment.config.sort,type:d},_.identity)});case 8:n.next=12;break;case 10:return n.next=12,r({type:"fetchComment",payload:_.pickBy({oid:s,pn:u,sort:c||a.comment.config.sort,type:d,root:l},_.identity)});case 12:case"end":return n.stop()}},n)})()},fetchComment(e,t){return o.default.mark(function n(){var a,r,p,l,d,c,f,m,y;return o.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return a=e.payload,r=t.put,p=t.select,n.next=4,r({type:"updateCommentLoadingState",payload:!0});case 4:return l=new s.default("https://api.bilibili.com/x/v2/reply"),n.next=7,p(e=>{var t=e.comments;return t.config});case 7:return d=n.sent,c=d.oid,f=d.pn,m=d.sort,y=d.type,n.next=14,r({type:"updateConfig",payload:a});case 14:l.set("query",(0,i.default)({oid:c,pn:f,sort:m,type:y,mobi_app:1},a)),(0,u.fetchFromHelper)("json",{url:l.toString(),model:"comment",sign:"getComment"});case 16:case"end":return n.stop()}},n)})()},fetchReply(e,t){return o.default.mark(function n(){var a,r,p,l,d,c,f;return o.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return a=e.payload,r=t.put,p=t.select,n.next=4,r({type:"updateReplyLoadingState",payload:a.root});case 4:return l=new s.default("https://api.bilibili.com/x/v2/reply/reply"),n.next=7,p(e=>{var t=e.comments;return t.config});case 7:d=n.sent,c=d.oid,f=d.type,l.set("query",(0,i.default)({oid:c,type:f,mobi_app:1},a)),(0,u.fetchFromHelper)("json",{url:l.toString(),model:"comment",sign:"getReply"});case 12:case"end":return n.stop()}},n)})()},sendReply(e,t){return o.default.mark(function n(){var a,r,i,s,p,l,d,c,f,m,y,v,g,h;return o.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return a=e.payload,r=t.put,i=t.select,n.next=4,r({type:"updateEditorSendingState",payload:!0});case 4:return s="https://api.bilibili.com/x/v2/reply/add",n.next=7,i(e=>{var t=e.comments;return t.config.config});case 7:return p=n.sent,l=p.oid,d=p.type,c=p.plat,n.next=13,i(e=>{var t=e.user;return t.csrf});case 13:f=n.sent,m=a.root,y=a.parent,v=a.message,g={oid:l,type:d,root:m,parent:y,message:v,plat:c,csrf:f},h=Object.keys(g).map(e=>{return!!g[e]&&e+"="+g[e]}).filter(Boolean).join("&"),(0,u.fetchFromHelper)("json",{url:s,model:"comment",sign:"sendReply",options:{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded; charset=UTF-8"},body:h}});case 18:case"end":return n.stop()}},n)})()},setLike(e,t){return o.default.mark(function n(){var a,r,p,l,d,c,f;return o.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return a=e.payload,r=t.select,p=new s.default("https://api.bilibili.com/x/v2/reply/action"),n.next=5,r(e=>{var t=e.comments;return t.config});case 5:return l=n.sent,d=l.oid,c=l.type,n.next=10,r(e=>{var t=e.user;return t.csrf});case 10:f=n.sent,(0,u.fetchFromHelper)("post",{url:p.toString(),model:"comment",sign:"setLike",options:{method:"POST",body:(0,i.default)({csrf:f,oid:d,type:c},a)}});case 12:case"end":return n.stop()}},n)})()},setHate(e,t){return o.default.mark(function n(){var a,r,p,l,d,c,f;return o.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return a=e.payload,r=t.select,p=new s.default("https://api.bilibili.com/x/v2/reply/hate"),n.next=5,r(e=>{var t=e.comments;return t.config});case 5:return l=n.sent,d=l.oid,c=l.type,n.next=10,r(e=>{var t=e.user;return t.csrf});case 10:f=n.sent,(0,u.fetchFromHelper)("post",{url:p.toString(),model:"comment",sign:"setHate",options:{method:"POST",body:(0,i.default)({csrf:f,oid:d,type:c},a)}});case 12:case"end":return n.stop()}},n)})()},fetchVotes(e,t){return o.default.mark(function n(){var a,i,p,l,d,c;return o.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return(0,r.default)(e),a=t.put,i=t.select,n.next=4,i(e=>{var t=e.comments;return t.voteConfig});case 4:return p=n.sent,n.next=7,a({type:"updateVoteSum"});case 7:p||console.warn("no vote config"),l=p.oid,d=p.type,c=p.rpids,_.map(c,e=>{var t=new s.default("https://api.bilibili.com/x/v2/reply/reply");t.set("query",{oid:l,type:d,root:e}),(0,u.fetchFromHelper)("json",{url:t.toString(),model:"comment",sign:"getVote"})});case 10:case"end":return n.stop()}},n)})()}}};t.default=p},ERIh:function(e,t,n){"use strict";var a=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.dva=void 0;var r=a(n("YLtl")),o={config:{onError(e){e.preventDefault()}},plugins:r.default.compact([""])};t.dva=o},F03t:function(e,t,n){"use strict";var a=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("d6i3")),o=a(n("jHYr")),i=a(n("p0pE")),s=n("f23f"),u={state:{version:null,config:null,downloads:null,feeds:null,websiteUpdate:null,status:{initializing:!1,tryConnect:!1,connected:!1,error:null}},subscriptions:{setup(e){var t=e.dispatch;e.history;window.addEventListener("message",function(e){var n=e.data,a=n.command,r=void 0===a?"":a,o=n.commend,s=void 0===o?"":o,u=n.data,p=void 0===u?{}:u,l=n.from,d=n.model,c=n.sign;if("helper"===l&&"global"===d)switch(r||s){case"returnApp":if(0===p.code)switch(c){case"connect":t({type:"user/fetchUser"}),t({type:"comments/loadCommentMap"}).then(()=>t({type:"comments/loadVoteConfig"}).then(()=>t({type:"comments/fetchVotes"}))),t({type:"user/fetchCsrf"}),t({type:"initApp",payload:(0,i.default)({},p.data,{initializing:!1})});break}break}}),t({type:"connectHelper"}),t({type:"fetchConfig"}),t({type:"fetchDownloadsConfig"}),t({type:"fetchFeedsConfig"}),t({type:"fetchWebsiteUpdateConfig"})}},reducers:{updateTryConnect(e){return e.status.tryConnect=!0,e},initApp(e,t){var n=t.payload;return n.connected&&(e.status.connected=n.connected),n.config&&(e.version=n.config),n.initializing&&(e.initializing=n.initializing),e},updateAppConfig(e,t){var n=t.payload;return e.config=n,e},updateDownloadsConfig(e,t){var n=t.payload;return e.downloads=n,e},updateFeedsConfig(e,t){var n=t.payload;return e.feeds=n,e},updateWebsiteUpdateConfig(e,t){var n=t.payload;return e.websiteUpdate=n,e}},effects:{connectHelper(e,t){return r.default.mark(function n(){var a;return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return(0,o.default)(e),a=t.put,(0,s.sendCommandToHelper)("connect",{model:"global",sign:"connect"}),n.next=5,a({type:"initApp",payload:{initializing:!0}});case 5:return n.next=7,a({type:"updateTryConnect"});case 7:case"end":return n.stop()}},n)})()},fetchConfig(e,t){return r.default.mark(function n(){var a,i,s,u;return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return(0,o.default)(e),a=t.put,i=t.call,n.next=4,i(fetch,"../static/json/config.json");case 4:if(s=n.sent,200!==s.status&&304!==s.status){n.next=11;break}return n.next=8,s.json();case 8:return u=n.sent,n.next=11,a({type:"updateAppConfig",payload:u});case 11:case"end":return n.stop()}},n)})()},fetchDownloadsConfig(e,t){return r.default.mark(function n(){var a,i,s,u;return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return(0,o.default)(e),a=t.put,i=t.call,n.next=4,i(fetch,"../static/json/downloads.json");case 4:if(s=n.sent,200!==s.status&&304!==s.status){n.next=11;break}return n.next=8,s.json();case 8:return u=n.sent,n.next=11,a({type:"updateDownloadsConfig",payload:u});case 11:case"end":return n.stop()}},n)})()},fetchFeedsConfig(e,t){return r.default.mark(function n(){var a,i,s,u;return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return(0,o.default)(e),a=t.put,i=t.call,n.next=4,i(fetch,"../static/json/feed.json");case 4:if(s=n.sent,200!==s.status&&304!==s.status){n.next=11;break}return n.next=8,s.json();case 8:return u=n.sent,n.next=11,a({type:"updateFeedsConfig",payload:u});case 11:case"end":return n.stop()}},n)})()},fetchWebsiteUpdateConfig(e,t){return r.default.mark(function n(){var a,i,s,u;return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return(0,o.default)(e),a=t.put,i=t.call,n.next=4,i(fetch,"../static/json/websiteUpdate.json");case 4:if(s=n.sent,200!==s.status&&304!==s.status){n.next=11;break}return n.next=8,s.json();case 8:return u=n.sent,n.next=11,a({type:"updateWebsiteUpdateConfig",payload:u});case 11:case"end":return n.stop()}},n)})()}}};t.default=u},KyW6:function(e,t,n){"use strict";var a=n("tAuX"),r=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.ReactDOMServer=void 0;r(n("Y/ft")),r(n("qIgq"));var o=r(n("d6i3")),i=r(n("p0pE")),s=r(n("1l/V"));n("/1p2");r(n("RFCh"));var u=r(n("cDcd")),p=r(n("faye")),l=a(n("sa7a")),d=n("PszG");window.g_plugins=d,d.init({validKeys:["patchRoutes","render","rootContainer","modifyRouteProps","onRouteChange","modifyInitialProps","initialProps","dva"]}),d.use(n("3JrO")),d.use(n("ERIh"));var c=n("xg5P")._onCreate();window.g_app=c;var f,m=function(){var e=(0,s.default)(o.default.mark(function e(){var t,a,r,s,c;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(window.g_isBrowser=!0,t={},!window.g_useSSR){e.next=6;break}t=window.g_initialData,e.next=18;break;case 6:if(a=location.pathname,r=(0,l.default)(n("i4x8").routes,a),!(r&&r.component&&r.component.getInitialProps)){e.next=18;break}if(s=d.apply("modifyInitialProps",{initialValue:{}}),!r.component.getInitialProps){e.next=16;break}return e.next=13,r.component.getInitialProps((0,i.default)({route:r,isServer:!1,location:location},s));case 13:e.t0=e.sent,e.next=17;break;case 16:e.t0={};case 17:t=e.t0;case 18:c=d.apply("rootContainer",{initialValue:u.default.createElement(n("i4x8").default,t)}),p.default[window.g_useSSR?"hydrate":"render"](c,document.getElementById("root"));case 20:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),y=d.compose("render",{initialValue:m}),v=[];Promise.all(v).then(()=>{y()}).catch(e=>{window.console&&window.console.error(e)}),t.ReactDOMServer=f;var g=null;t.default=g},"P+IA":function(e,t,n){"use strict";var a=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("d6i3")),o=n("f23f"),i={pid:0,pname:"\u989c\u6587\u5b57",pstate:0,purl:"https://static.hdslb.com/images/base/emoji-tab-default.png",type:"text",emojis:["(\u2312\u25bd\u2312)","\uff08\uffe3\u25bd\uffe3\uff09","(=\u30fb\u03c9\u30fb=)","(\uff40\u30fb\u03c9\u30fb\xb4)","(\u301c\uffe3\u25b3\uffe3)\u301c","(\uff65\u2200\uff65)","(\xb0\u2200\xb0)\uff89","(\uffe33\uffe3)","\u256e(\uffe3\u25bd\uffe3)\u256d","( \xb4_\u309d\uff40)","\u2190_\u2190","\u2192_\u2192","(<_<)","(>_>)","(;\xac_\xac)",'("\u2594\u25a1\u2594)/',"(\uff9f\u0414\uff9f\u2261\uff9f\u0434\uff9f)!?","\u03a3(\uff9f\u0434\uff9f;)","\u03a3( \uffe3\u25a1\uffe3||)","(\xb4\uff1b\u03c9\uff1b`)","\uff08/T\u0414T)/","(^\u30fb\u03c9\u30fb^ )","(\uff61\uff65\u03c9\uff65\uff61)","(\u25cf\uffe3(\uff74)\uffe3\u25cf)","\u03b5=\u03b5=(\u30ce\u2267\u2207\u2266)\u30ce","(\xb4\uff65_\uff65`)","(-_-#)","\uff08\uffe3\u3078\uffe3\uff09","(\uffe3\u03b5(#\uffe3) \u03a3","\u30fd(`\u0414\xb4)\uff89","(\u256f\xb0\u53e3\xb0)\u256f(\u2534\u2014\u2534","\uff08#-_-)\u252f\u2501\u252f","_(:3\u300d\u2220)_","(\u7b11)","(\u6c57)","(\u6ce3)","(\u82e6\u7b11)"]},s={state:{optionJSON:[],emojiURLs:{},emojiMap:{}},subscriptions:{setup(e){var t=e.dispatch;e.history;window.addEventListener("message",function(e){var n=e.data,a=n.command,r=void 0===a?"":a,o=n.commend,i=void 0===o?"":o,s=n.data,u=void 0===s?{}:s,p=n.from,l=n.model;n.sign;if("helper"===p&&"emoji"===l)switch(r||i){case"returnFetch":t({type:"updateOptions",payload:u.data});break}}),t({type:"fetchOptions"})}},reducers:{updateOptions(e,t){t.type;var n=t.payload,a={},r=n.vip,o=n.free;return o.forEach(e=>{var t=e.pid,n=e.emojis,r=e.purl;a[t]=r,n.forEach(e=>{var t=e.name,n=e.url;n&&(a[t]=n)})}),r.forEach(e=>{var t=e.pid,n=e.emojis,r=e.purl;a[t]=r,n.forEach(e=>{var t=e.name,n=e.url;n&&(a[t]=n)})}),e.optionJSON=[i,...o,...r],e.emojiURLs=a,e}},effects:{fetchOptions(e,t){return r.default.mark(function n(){return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:e.type,e.payload,t.put,t.call,t.select,(0,o.fetchFromHelper)("json",{url:"https://api.bilibili.com/x/v2/reply/v2/emojis",model:"emoji"});case 3:case"end":return n.stop()}},n)})()}}};t.default=s},"R3y/":function(e,t,n){"use strict";var a=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("d6i3")),o=a(n("jHYr")),i=n("f23f"),s={state:{config:null,status:{initializing:!1,error:null}},subscriptions:{setup(e){var t=e.dispatch;e.history;window.addEventListener("message",function(e){var t=e.data;t.command,t.data,t.from,t.model,t.sign}),t({type:"fetchAnnouncementConfig"})}},reducers:{updateTryConnect(e){return e.status.tryConnect=!0,e},initApp(e,t){var n=t.payload;return n.connected&&(e.status.connected=n.connected),n.config&&(e.version=n.config),n.initializing&&(e.initializing=n.initializing),e},updateAnnouncementConfig(e,t){var n=t.payload;return e.config=n,e}},effects:{connectHelper(e,t){return r.default.mark(function n(){var a;return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return(0,o.default)(e),a=t.put,(0,i.sendCommandToHelper)("connect",{model:"global",sign:"connect"}),n.next=5,a({type:"initApp",payload:{initializing:!0}});case 5:return n.next=7,a({type:"updateTryConnect"});case 7:case"end":return n.stop()}},n)})()},fetchAnnouncementConfig(e,t){return r.default.mark(function n(){var a,i,s,u;return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return(0,o.default)(e),a=t.put,i=t.call,n.next=4,i(fetch,"../static/json/announcement.json");case 4:if(s=n.sent,200!==s.status&&304!==s.status){n.next=11;break}return n.next=8,s.json();case 8:return u=n.sent,n.next=11,a({type:"updateAnnouncementConfig",payload:u});case 11:case"end":return n.stop()}},n)})()}}};t.default=s},RFCh:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n("fwAN").default({basename:window.routerBase});window.g_history=a;var r=a;t.default=r},YLtl:function(e,t){e.exports=window._},cDcd:function(e,t){e.exports=window.React},f23f:function(e,t,n){"use strict";var a=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.cumulativeOffset=t.htmlDecode=t.getCookieFromHelper=t.fetchFromHelper=t.sendCommandToHelper=t.postMessage=void 0;var r=a(n("p0pE")),o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"https://bilibili-helper.github.io/";window.postMessage(e,t)};t.postMessage=o;var i=(e,t)=>{o({command:e,commend:e,data:t,from:"website"})};t.sendCommandToHelper=i;var s=(e,t)=>{if(t.type)throw"fetchOptions can not contain the param: type";i("fetch",(0,r.default)({},t,{type:e}))};t.fetchFromHelper=s;var u=e=>{i("cookie",e)};t.getCookieFromHelper=u;var p=(e,t)=>{var n=document.createElement("div");return n.innerHTML=t,0===n.childNodes.length?"":n.childNodes[0].nodeValue};t.htmlDecode=p;var l=e=>{var t=0,n=0;do{t+=e.offsetTop||0,n+=e.offsetLeft||0,e=e.offsetParent}while(e);return{top:t,left:n}};t.cumulativeOffset=l},faye:function(e,t){e.exports=window.ReactDOM},hlQx:function(e,t,n){"use strict";var a=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("d6i3")),o=a(n("GBY4")),i=n("f23f"),s={state:{info:null,csrf:null},subscriptions:{setup(e){var t=e.dispatch;e.history;window.addEventListener("message",function(e){var n=e.data,a=n.command,r=void 0===a?"":a,o=n.commend,i=void 0===o?"":o,s=n.data,u=void 0===s?{}:s,p=n.from,l=n.model,d=n.sign;if("helper"===p&&"user"===l)switch(r||i){case"returnFetch":"REPONSE_OK"===u.code||0===u.code?t({type:"updateUserData",payload:u.data}):console.error(u);break;case"returnCookie":"getCsrf"===d&&t({type:"updateCsrf",payload:u});break}})}},reducers:{updateUserData(e,t){var n=t.payload;return e.info=n,e},updateCsrf(e,t){var n=t.payload;return e.csrf=n,e}},effects:{fetchCsrf(e,t){return r.default.mark(function n(){return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:e.type,e.payload,t.put,t.call,t.select,(0,i.getCookieFromHelper)({detail:{url:"http://interface.bilibili.com/",name:"bili_jct"},model:"user",sign:"getCsrf"});case 3:case"end":return n.stop()}},n)})()},fetchUser(e,t){return r.default.mark(function n(){var a;return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:e.type,e.payload,t.put,t.call,t.select,a=new o.default("https://api.live.bilibili.com/xlive/web-ucenter/user/get_user_info"),(0,i.fetchFromHelper)("json",{url:a.toString(),model:"user"});case 4:case"end":return n.stop()}},n)})()}}};t.default=s},i4x8:function(e,t,n){"use strict";var a=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.routes=void 0;var r=a(n("cDcd")),o=(n("6YkS"),a(n("VB0o")),a(n("Crw4"))),i=a(n("RFCh")),s=a(n("VcJ9")),u=n("7DNP").routerRedux.ConnectedRouter,p=[{path:"/",component:(0,s.default)({component:()=>Promise.all([n.e(0),n.e(2)]).then(n.t.bind(null,"rB1f",7))}),exact:!0},{path:"/product",component:(0,s.default)({component:()=>Promise.all([n.e(0),n.e(3)]).then(n.t.bind(null,"XzvM",7))}),exact:!0}];t.routes=p,window.g_routes=p;var l=n("PszG");l.applyForEach("patchRoutes",{initialValue:p});class d extends r.default.Component{unListen(){}constructor(e){function t(e,t){l.applyForEach("onRouteChange",{initialValue:{routes:p,location:e,action:t}})}super(e),this.unListen=i.default.listen(t);var n=i.default.listen.toString().indexOf("callback(history.location, history.action)")>-1;n||t(i.default.location)}componentWillUnmount(){this.unListen()}render(){var e=this.props||{};return r.default.createElement(u,{history:i.default},(0,o.default)(p,e))}}t.default=d},xg5P:function(e,t,n){"use strict";var a=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t._onCreate=l,t.getApp=d,t._DvaContainer=void 0;var r=a(n("p0pE")),o=a(n("MuoO")),i=n("cDcd"),s=a(n("0Wa5")),u=a(n("RFCh")),p=null;function l(){var e=n("PszG"),t=e.mergeConfig("dva");return p=(0,o.default)((0,r.default)({history:u.default},t.config||{},window.g_useSSR?{initialState:window.g_initialData}:{})),p.use((0,s.default)()),(t.plugins||[]).forEach(e=>{p.use(e)}),p.use(n("Quko")()),p.model((0,r.default)({namespace:"announcements"},n("R3y/").default)),p.model((0,r.default)({namespace:"comments"},n("AabO").default)),p.model((0,r.default)({namespace:"emoji"},n("P+IA").default)),p.model((0,r.default)({namespace:"global"},n("F03t").default)),p.model((0,r.default)({namespace:"image"},n("5R+S").default)),p.model((0,r.default)({namespace:"user"},n("hlQx").default)),p}function d(){return p}class c extends i.Component{render(){var e=d();return e.router(()=>this.props.children),e.start()()}}t._DvaContainer=c}});