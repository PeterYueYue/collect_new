<template>
  <div class="imgViewWrap">
    <img src="@/assets/icon_close.png" alt="" class="icon_close" @click="close">
    <div class="swiper-wrap">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="items in picUrl" :key="items.id">
          <img @click="close" :src="items.picUrl" alt="">
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>
<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    components: {
      swiper,
      swiperSlide
    },
    props: ['picUrl'],
    data() {
      return {
        swiperOption: {
          autoHeight: true,
          width: window.innerWidth,
          pagination: {
            el: '.swiper-pagination',
          },
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
//			console.log('this is current swiper instance object', this.swiper)
//			this.swiper.slideTo(3, 1000, false)
    },
    methods: {
      close() {
        this.$emit('toggleImgView', false)
      },
    }
  }
</script>
<style>
  .swiper-wrapper {
    height: 6rem !important;
  }

  .icon_close {
    position: absolute;
    bottom: 1.6rem;
    left: 50%;
    transform: translateX(-50%);
    width: 0.7rem;
    height: 0.7rem;
  }

  .imgViewWrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #000;
  }

  .swiper-wrap {
    width: 100%;
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
  }

  .swiper-wrap img {
    width: 100%;
    height: 6rem;
  }

  .swiper-pagination-bullet {
    width: .15rem;
    height: .15rem;
    text-align: center;
    color: #000;
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
  }

  .swiper-pagination-bullet.swiper-pagination-bullet-active {
    color: #fff;
    background: #007aff;
  }
</style>
