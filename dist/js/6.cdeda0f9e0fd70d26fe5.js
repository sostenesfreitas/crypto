webpackJsonp([6],{140:function(t,o,n){n(191);var e=n(122)(n(178),n(203),null,null);t.exports=e.exports},178:function(t,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var e=n(198),a=function(t){e.moeda.forEach(function(o){t.forEach(function(t){if(o.coin===t.name){var n=t.last-o.buyPrice;n/=o.buyPrice,n*=100,i.push(parseFloat(n).toFixed(2))}})})},i=[],c=[],s=[],r=void 0;o.default={data:function(){return this.get(),{jSon:e.moeda,mo:c,lucro:i,price:r}},methods:{get:function(){var t=this;this.$http.get("https://poloniex.com/public?command=returnTicker").then(function(o){c.push(o.body),s=o.body;var n=[{name:"BTC_DASH",last:s.BTC_DASH.last},{name:"BTC_BTCD",last:s.BTC_BTCD.last},{name:"BTC_DCR",last:s.BTC_DCR.last},{name:"BTC_FCT",last:s.BTC_FCT.last},{name:"BTC_LSK",last:s.BTC_LSK.last},{name:"BTC_STEEM",last:s.BTC_STEEM.last},{name:"BTC_XRP",last:s.BTC_XRP.last},{name:"BTC_XMR",last:s.BTC_XMR.last},{name:"BTC_LTC",last:s.BTC_LTC.last}];a(n),t.btcPrice(n)},function(t){})},btcPrice:function(t){return e.moeda.forEach(function(o){t.forEach(function(t){o.coin===t.name&&(r+=parseFloat(o.total*t.last).toFixed(2))})}),r},refresher:function(t){var o=this;setTimeout(function(){t(),i=[],o.get()},2e3)}}}},184:function(t,o,n){o=t.exports=n(135)(),o.push([t.i,".cont{width:100%}.logo,h6{margin:5%}h6{color:#4f4f4f}.innerPercent{width:30%}.percent{margin:17%;width:75px}.price{margin:30%}",""])},191:function(t,o,n){var e=n(184);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n(136)("27f06331",e,!0)},198:function(t,o){t.exports={moeda:[{name:"Dash",total:"15.46221277",coin:"DASH",buyPrice:"0.09776196",logo:"https://i.imgur.com/qiIMHZr.png"},{name:"BitcoinDark",total:"1.03902045",coin:"BTCD",buyPrice:"0.02400100",logo:"http://bitbillions.net/wp-content/uploads/2014/07/BITCOINDARK2.jpg"},{name:"Decred",total:"3.97474691",coin:"DCR",buyPrice:"0.01010008",logo:"http://www.altcoinwatch.com/wp-content/uploads/2016/07/decred-logo.png"},{name:"Factom",total:"2.87094552",coin:"FCT",buyPrice:"0.00347453",logo:"https://pbs.twimg.com/profile_images/848526728708239360/5hC-ie8r.jpg"},{name:"Lisk",total:"66.68208213",coin:"LSK",buyPrice:"0.00030224",logo:"https://pbs.twimg.com/profile_images/693005622267269121/WCttamlO.png"},{name:"STEEM",total:"44.60647026",coin:"STEEM",buyPrice:"0.00018592",logo:"http://cryptocoinview.com/coinicons/steem.jpg"},{name:"Ripple",total:"640.11626132",coin:"XRP",buyPrice:"0.00000938",logo:"https://ripple.com/wp-content/uploads/2014/10/mark.png"},{name:"Monero",total:"1.09836051",coin:"XMR",buyPrice:"0.01999441",logo:"https://pbs.twimg.com/profile_images/473825289630257152/PzHu2yli.png"},{name:"LiteCoin",total:"2.26704832",coin:"LTC",buyPrice:"0.00395768",logo:"http://2.bp.blogspot.com/-TfzvgtdVFEs/VSBQPTfBOpI/AAAAAAAAEL4/_NDG_jfdX6I/s1600/litecoin.png"}]}},203:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("q-pull-to-refresh",{attrs:{handler:t.refresher}},[n("div",{staticClass:"cont row wrap justify-between"},[n("div",{staticClass:"inner"},t._l(t.jSon,function(o){return n("div",{staticClass:"logo column"},[n("div",{staticClass:"row"},[n("div",{},[n("img",{staticClass:"avatar",attrs:{src:o.logo}})]),t._v(" "),n("div",{staticClass:"column"},[n("h6",[t._v(t._s(o.name))]),t._v(" "),n("h6",[t._v(t._s(o.total))])])])])})),t._v(" "),n("div",{staticClass:"innerPercent justify-end"},t._l(t.lucro,function(o){return n("div",[n("span",{staticClass:"percent label shadow-1 text-white",style:o<0?"background-color: #DB2828":"background-color: #21BA45"},[t._v(t._s(o)+"%")])])}))])])},staticRenderFns:[]}}});