import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './vuex/store'
import router from './router'
import {DateTime} from 'vue-ydui/dist/lib.rem/datetime';
import $ from 'jquery'
import 'vue-ydui/dist/ydui.base.css';
import VueScroller from 'vue-scroller';
Vue.use(VueScroller);
Vue.use(Vuex);


Vue.component(DateTime.name, DateTime);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
