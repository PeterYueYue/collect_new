<template>
  <div class="estimate">
    <!-- <header class="head clearfix">
        <div @click="backbtn()" class="fl">
            <span class="fl headback"></span>
            <span class="fl">返回</span>
        </div>
        <h3 class="fl">价格评估</h3>
    </header> -->
    <div class="callbackinfo">
      <img class="" :src="addRessId.icon" alt="">
      <div class=" information ">
        <h5>{{addRessId?addRessId.name:''}}</h5>
        <div class="recovery_price">预估价格:<span class="young">￥<span>{{futurePrice}}</span></span></div>
        <div class="type_remind">提示：预估价格仅根据市场参考,最终成交价以上门面议为准.</div>
      </div>
    </div>
    <div class="reference_price clearfix">
      <span class="fl">平均回收价：￥{{addRessId.price}}</span>
      <a @click="letAgainM" href="javascript:;">
        <router-link class="fr btna" to="/typeSelect/typeclass">重新询价</router-link>
      </a>
    </div>
    <ul class="authority">
      <li class="item">
        <div class="imgbox">
          <img src="@/assets/评估(1)@2x.png" alt="">
        </div>
        <span>专业评估</span>
      </li>
      <li class="item">
        <div class="imgbox">
          <img src="@/assets/信息@2x.png" alt="">
        </div>
        <span>信息保密</span>
      </li>
      <li class="item">
        <div class="imgbox">
          <img src="@/assets/贴心关怀@2x.png" alt="">
        </div>
        <span>贴心服务</span>
      </li>
    </ul>
    <div class="nextbutton" v-show="showBtn == 'enter' && showAddBtn == 'enter'"><router-link to="/uploadimage">下一步</router-link></div>
    <div class="nextbutton" v-show="showBtn == 'back' ||showAddBtn == 'back'"><router-link to="/home">返回首页</router-link></div>
    <div class="nextcur" v-show="showAddBtn == 'back'" @click="goToList"> + 新增小区地址</div>
  </div>
</template>
<script>
  import '@/assets/createstyle/estimate.css'
  import api from '@/api/api.js'
  import {mapGetters} from 'vuex';

  export default {
    data(){
      return {
        showBtn: 'enter',
        showAddBtn: 'enter',
      }
    },
    computed: mapGetters({
      addRessId: 'addRessId',
      statisticsPrice: 'statisticsPrice',
      futurePrice: 'futurePrice',
      token: 'token',
      classID:'classID',
      adressInfo: 'adressInfo',
      cityId:'cityId'
    }),
    created() {
      api.MemberAddress({
          "app_key": "app_id_1",
          token: this.token,
          "data":{
            "cityId": this.cityId,
          }
        }).then((res) => {
          this.$store.dispatch('getAddressInfo',res.data);
          this.isFuturePrtices();
        })
    },
    mounted(){
      document.setTitle('回收物价格评估');
    },
    methods: {
      letAgainM() {
        this.$store.dispatch("clearfuturePrice")
      },
      backbtn() { //执行返回上一个路由；
        this.$router.go(-1);
      },
      isFuturePrtices(){
        api.futurePrices({
          "app_key": "app_id_1",
          "data": {
            "categoryAttrOptionPrices": this.statisticsPrice,
            "categoryId": this.addRessId.id,
            "communityId": this.adressInfo?this.adressInfo.communityId:'',
            "cityId":this.cityId,
          },
          token: this.token,
        })
        .then((res) => {
          this.$store.dispatch('changeFuturePrice', res.data);
          if(res.data=='您的小区暂无回收企业'){
            this.showBtn = 'back';
          }
          if(res.data=='您暂未添加回收地址'){
            this.showAddBtn = 'back';
          }
        })
      },
      // 跳转的时候插入sessionStorage
      goToList(){
        window.sessionStorage.setItem('jumpUrl', this.$route.fullPath);
        this.$router.push('/addAdress')
      }
    }
  }
</script>

