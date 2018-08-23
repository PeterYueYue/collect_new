import Vue from 'vue';
import App from './App';
import Vuex from 'vuex';
import qs from 'qs';
import router from './router';
import store from './vuex/store';
import VueRouter from 'vue-router';
import VueScroller from 'vue-scroller';
import {DateTime} from 'vue-ydui/dist/lib.rem/datetime';
import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider';


import 'vant/lib/vant-css/index.css';
import 'vue-ydui/dist/ydui.base.css';

Vue.use(Vuex);
Vue.use(VueScroller);
Vue.prototype.qs = qs;
Vue.component(Slider.name, Slider);
Vue.component(DateTime.name, DateTime);
Vue.component(SliderItem.name, SliderItem);

Vue.config.productionTip = false;


// import VConsole from 'vconsole'
// import Vant from 'vant';
// Vue.use(Vant);

Vue.use(VueRouter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  mounted(){
    // var vConsole = new VConsole();
  },
  components: {App},
  template: '<App/>'
})
