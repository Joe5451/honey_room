import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'
import { fb } from '../src/firebase'
/* import { fb } from 'firebase' 會引用到 npm 安裝的 firebase，
所以將路徑改為 '../src/firebase' 才可以引用到我的 firebase */
import $ from 'jquery'


Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'zhTW',
});

Vue.use(VeeValidate, {
  events: 'input|blur',
  i18n,
  dictionary: {
    zhTW,
  },
});

Vue.config.productionTip = false
Vue.component('Loading', Loading); // 全域啟用 vue-loading-overlay

// new Vue({
//   i18n,
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

let app;
fb.auth().onAuthStateChanged((user) => {
  if(!app) {
    app = new Vue({
      i18n,
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = fb.auth().currentUser;

  $('#navbar-nav-toggle').prop('checked', false); // 關閉 nav-menu toggle

  if(requiresAuth && !isAuthenticated) {
    next('/signin');
  } else {
    next();
  }
})