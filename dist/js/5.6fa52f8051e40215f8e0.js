webpackJsonp([5],{138:function(t,a,e){e(197);var n=e(122)(e(177),e(209),"data-v-f541b698",null);t.exports=n.exports},153:function(t,a){t.exports=window.sqlitePlugin.openDatabase({name:"moeda",location:"default"})},173:function(t,a,e){var n=e(153);t.exports=n.transaction(function(t){t.executeSql("CREATE TABLE IF NOT EXISTS moeda (idmoeda INTEGER PRIMARY KEY  AUTOINCREMENT, name, total, buyPrice, logo)")})},177:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=[],o=function(t){n.forEach(function(a){t.forEach(function(t){if(a.name===t.name){var e=t.last-a.buyPrice;e/=a.buyPrice,e*=100,s.push(parseFloat(e).toFixed(2))}})})},s=[],i=[],r=[];a.default={data:function(){return{criptoMoedas:n,lucro:s,price:r}},mounted:function(){this.clean(),this.init(),this.get()},methods:{init:function(){n.length=0;var t=e(153);e(173);t.transaction(function(t){t.executeSql("SELECT * FROM moeda",[],function(t,a){for(var e=0;e<a.rows.length;e++)n.push(a.rows.item(e))})})},get:function(){var t=this;this.$http.get("https://poloniex.com/public?command=returnTicker").then(function(a){i=a.body;var e=[{name:"DASH",last:i.BTC_DASH.last},{name:"BTCD",last:i.BTC_BTCD.last},{name:"DCR",last:i.BTC_DCR.last},{name:"FCT",last:i.BTC_FCT.last},{name:"LSK",last:i.BTC_LSK.last},{name:"STEEM",last:i.BTC_STEEM.last},{name:"XRP",last:i.BTC_XRP.last},{name:"XMR",last:i.BTC_XMR.last},{name:"LTC",last:i.BTC_LTC.last}];o(e),t.btcPrice(e)},function(t){})},btcPrice:function(t){return n.forEach(function(a){t.forEach(function(t){a.coin===t.name&&r.push(a.total*t.last)})}),r},refresher:function(t){var a=this;setTimeout(function(){t(),a.clean(),a.get()},2e3)},clean:function(){s.length=0,n.length=0}}}},190:function(t,a,e){a=t.exports=e(135)(),a.push([t.i,".pop[data-v-f541b698]{width:40%;height:50px}.body[data-v-f541b698]{width:100%;padding:1%}h6[data-v-f541b698]{margin-left:4%}.coin[data-v-f541b698]{color:#fff}.innerPercent[data-v-f541b698]{width:30%}.percent[data-v-f541b698]{width:75px}",""])},197:function(t,a,e){var n=e(190);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e(136)("c7ba94d4",n,!0)},209:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("q-layout",[e("div",{staticClass:"toolbar bg-dark shadow-2",slot:"header"},[e("q-toolbar-title",{attrs:{padding:0}},[t._v("\n      Meus Rendimentos\n    ")]),t._v(" "),e("button",[e("i",[t._v("more_vert")]),t._v(" "),e("q-popover",{ref:"popover1"},[e("div",{staticClass:"text-center column justify-center",staticStyle:{"min-width":"150px",height:"80px"}},[e("div",{on:{click:function(a){t.$refs.popover1.close()}}},[e("router-link",{attrs:{to:"/tutorial"}},[e("h6",[t._v("Criar API")])]),t._v(" "),e("hr"),t._v(" "),e("router-link",{attrs:{to:"/sobre"}},[e("h6",[t._v("Sobre")])])],1)])])],1)],1),t._v(" "),e("div",{staticClass:"body"},[e("q-pull-to-refresh",{attrs:{handler:t.refresher}},[e("div",{staticClass:"row wrap justify-between"},[e("div",{staticClass:"inner"},t._l(t.criptoMoedas,function(a){return e("div",{staticClass:"logo column "},[e("div",{staticClass:"row"},[e("div",{staticClass:"logo "},[e("img",{staticClass:"avatar",attrs:{src:a.logo}})]),t._v(" "),e("div",{staticClass:"coin"},[e("h6",[t._v(t._s(a.name))]),t._v(" "),e("h6",[t._v(t._s(a.total))])])])])})),t._v(" "),e("div",{staticClass:"innerPercent column justify-around"},t._l(t.lucro,function(a){return e("div",[e("span",{staticClass:"percent label shadow-1 text-white",style:a<0?"background-color: #DB2828":"background-color: #21BA45"},[t._v(t._s(a)+"%")])])}))])])],1),t._v(" "),e("router-link",{attrs:{to:"/teste"}},[e("q-fab",{staticClass:"absolute-bottom-right",staticStyle:{right:"18px",bottom:"18px"},attrs:{classNames:"dark","active-icon":"alarm"}})],1)],1)},staticRenderFns:[]}}});