<!-- The ref attr used to find the swiper instance -->
<template>
  <van-swipe class="banner_box" style="width: 7.5rem;" :autoplay="3000">
    <van-swipe-item style="width: 7.5rem;">
      <router-link to="ad">
        <img style="width: 7.5rem !important;" src="@/assets/banner3.png">
      </router-link>
    </van-swipe-item>
    <!--<van-swipe-item style="width: 7.5rem;">-->
      <!--<a href="http://106.15.157.147/green/my/goADPage.jhtml">-->
        <!--<img style="width: 7.5rem !important;" src="@/assets/banner5.png">-->
      <!--</a>-->
    <!--</van-swipe-item>-->
    <van-swipe-item style="width: 7.5rem;">
      <router-link to="ad">
        <img style="width: 7.5rem!important;" src="@/assets/支付宝端-收呗画板-banner4.png">
      </router-link>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);
export default {

}
</script>

<style>
  .van-swipe__indicators {
    bottom: 0.25rem !important;
  }

  .van-swipe__indicator {
    margin-right: 0.2rem !important;
    width: 0.12rem !important;
    height: 0.12rem !important;
    background-color: rgba(0, 0, 0, .5) !important;
  }

  .van-swipe__indicator--active {
    background-color: #fff !important;
  }
</style>
