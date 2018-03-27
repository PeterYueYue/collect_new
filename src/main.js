// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './vuex/store'
import router from './router'
import iView from 'iview';
import axios from 'axios'
import YDUI from 'vue-ydui';
import {DateTime} from 'vue-ydui/dist/lib.rem/datetime';
import 'vue-ydui/dist/ydui.rem.css';
import 'vue-ydui/dist/ydui.base.css';
// import 'iview/dist/styles/iview.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

Vue.use(Vant);
Vue.use(ElementUI)
Vue.use(YDUI);
Vue.use(iView);
Vue.use(Vuex)


Vue.component(DateTime.name, DateTime);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
