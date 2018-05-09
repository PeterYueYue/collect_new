import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './vuex/store'
import router from './router'
import $ from 'jquery'
import {DateTime} from 'vue-ydui/dist/lib.rem/datetime';

import 'vue-ydui/dist/ydui.base.css';
import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider';
Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);
import VueScroller from 'vue-scroller';
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(VueScroller);
Vue.use(Vuex);
Vue.use(Vant);




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
