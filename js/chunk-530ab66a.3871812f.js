(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-530ab66a"],{1560:function(t,e,s){},"178e":function(t,e,s){"use strict";var r=s("1560"),a=s.n(r);a.a},fef1:function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"container"},[s("nav",{attrs:{"aria-label":"breadcrumb"}},[s("ol",{staticClass:"breadcrumb border-bottom"},[s("li",{staticClass:"breadcrumb-item h6"},[s("router-link",{attrs:{to:"/"}},[t._v("首頁")])],1),s("li",{staticClass:"breadcrumb-item h6"},[s("router-link",{attrs:{to:"/products"}},[t._v("商品")])],1),s("li",{staticClass:"breadcrumb-item active h6",attrs:{"aria-current":"page"}},[t._v(t._s(t.product.title))])])]),s("div",{staticClass:"row mb-5"},[s("div",{staticClass:"col-md-6 mb-3"},[s("div",{staticClass:"img-container rounded-lg overflow-hidden"},[s("img",{attrs:{src:t.product.imgURL,alt:"product"}})])]),s("div",{staticClass:"col-md-6"},[s("h2",[t._v(t._s(t.product.title))]),s("div",{staticClass:"d-flex justify-content-between align-items-center"},[s("span",{staticClass:"text-muted"},[s("del",[t._v("原價 $"+t._s(t.product.origin_price))])]),s("span",{staticClass:"h3 text-danger"},[s("strong",[t._v("售價 $"+t._s(t.product.price))])])]),s("hr"),s("div",[s("h4",[t._v("商品介紹")]),s("p",[t._v(t._s(t.product.content))])]),s("hr"),s("div",[s("div",{staticClass:"form-group d-flex"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.qty,expression:"qty"}],staticClass:"form-control col mr-2",on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.qty=e.target.multiple?s:s[0]}}},[s("option",{attrs:{value:"0",selected:"selected",disabled:"disabled"}},[t._v("請選擇數量")]),t._l(10,(function(e){return s("option",{key:e,domProps:{value:e}},[t._v("選購 "+t._s(e)+" "+t._s(t.product.unit))])}))],2),s("button",{staticClass:"btn btn-danger",on:{click:function(e){return t.addtoCart(t.id,t.product,t.qty)}}},[t._v("加入購物車")])])])])])]),s("section",{staticClass:"l-section"},[s("h2",{staticClass:"l-section-title"},[t._v("同系列商品")]),s("RecommendSwiper",{staticClass:"px-5 px-md-3",attrs:{products:t.seriesProducts}})],1)])},a=[],i=(s("4de4"),s("565c")),c=s("dc59"),o=c["a"].firestore(),n={components:{RecommendSwiper:i["a"]},data:function(){return{id:"",product:{},qty:0}},computed:{seriesProducts:function(){var t=this;return this.$store.state.cusProducts.filter((function(e){return e.category==t.product.category&&e.productId!=t.id}))},cart:function(){return this.$store.state.cart.cart}},methods:{getProduct:function(){var t=this,e=this.$store;e.commit("LOADING",!0),o.collection("products").doc(t.id).get().then((function(s){t.product=Object.assign({},s.data(),{productId:s.id}),e.commit("LOADING",!1)})).catch((function(t){e.commit("LOADING",!1),console.error("Error adding document: ",t),alert("商品資料讀取失敗")}))},getCart:function(){this.$store.dispatch("getCart")},addtoCart:function(t,e,s){s<=0?this.$store.dispatch("updateMessage",{message:"請選擇數量",status:"danger"}):this.$store.dispatch("addtoCart",{id:t,product:e,qty:s})}},created:function(){this.id=this.$route.params.productId,this.getProduct(),this.$store.dispatch("getCusProducts"),this.getCart()}},d=n,u=(s("178e"),s("2877")),l=Object(u["a"])(d,r,a,!1,null,"567ff034",null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-530ab66a.3871812f.js.map