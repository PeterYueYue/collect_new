<template>
  <div class="goodsTicket">
    <!-- 头部 -->
    <header class="head">
      <div class="imgBox">
        <img :src=item.img alt="">
        <div class="titile">{{item.brand}}</div>
      </div>
      <div @click="firm" class="btn">{{item.bindingPoint}}kg能量兑换</div>
    </header>
    <!-- 兑换信息确认 -->
    <div class="content">

      <div class="message">
        <h3>兑换信息确认</h3>
        <p>温馨提示：兑换成功后，礼品我们会通过快递免费寄送上门哦！请您务必核实您的姓名，收货地址和联系电话。</p>
        <p>若要更换收货信息，请前往我的小区地址库修改地址</p>
      </div>
      <div v-if="memberAddress.name" class="userAddress">
        <div>姓名：{{memberAddress.name}}</div>
        <div>手机号码：{{memberAddress.tel}}</div>
        <div>收货地址：{{memberAddress.address}}</div>
      </div>
      <div v-if="!memberAddress.name" class="noAddress">您暂未添加收货地址...</div>
      <div class="goChangeAdd" @click="goToList" v-if="dataList.name">前往修改我的收货信息</div>
      <div class="goChangeAdd" @click="goToList" v-if="!dataList.name">前往添加我的收货信息</div>
    </div>
    <!-- 底部 -->
    <footer class="foot">
      <div @touchend=callphone class="telBox">
        <span class="icon"></span>
        <span>如有疑问，请拨打服务热线：021-61984970</span>
      </div>
    </footer>
    <!-- 弹窗 -->
    <div class="goods_info_shadow" v-if="showShadow"></div>
    <div class="goods_info_box" v-if="showInfo">
      <div class="remind">{{dataInfo}}</div>
      <router-link to="/shopList"><div class="btn">现在去添加</div></router-link>
      <div class="btn nocolor" @click="closeAlert">我知道了</div>
    </div>
    <div class="goods_info_box" v-if="showInfo2">
      <div class="remind2">{{dataInfo}}</div>
      <div class="btn nocolor2" @click="closeAlert">我知道了</div>
    </div>
  </div>
</template>
<script>
  import './index.css'
  import api from "@/api/api"
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        item: '',
        memberAddress: '',
        show: true,
        dataList: {},
        showShadow: false,
        showInfo: false,
        showInfo2: false,
        dataInfo: '',
      }
    },
    computed: mapGetters({
      token: "token",
      cityId:'cityId'
    }),
    mounted() {
      if(this.$route.query.item){
        this.item = JSON.parse(this.$route.query.item);
      }
      this.getAddress();
      if(!this.item){
        this.item = JSON.parse(window.localStorage.getItem('item'))
      }
    },
    methods: {
      submit() {
        api.GoodsOrder({
          "data": {
            "id": this.item.id,
            "address": this.dataList ? this.dataList.address:'',
            "mobile": this.dataList ? this.dataList.tel:'',
            "userName": this.dataList ? this.dataList.name:'',
            'cityId':this.cityId,
          },
          "token": this.token
        }).then(res => {
          if (res.data == '兑换成功') {
            ap.hideLoading(()=>{
              alert(res.data);
            });
          }
          else if (res.data == '您兑换超出限制，不可再兑换了') {
            ap.hideLoading(()=>{
              alert(res.data);
            });
          }
          else if (res.data == '您暂未添加收货信息') {
            ap.hideLoading(()=>{
              this.dataInfo = res.data;
              this.showShadow = true;
              this.showInfo = true;
            });
          }
          else if (res.data == '您的绿色能量不足') {
            ap.hideLoading(()=>{
              this.dataInfo = res.data;
              this.showShadow = true;
              this.showInfo2 = true;
            });
          }
        })
      },
      firm() {
        //利用对话框返回的值 （true 或者 false）
        if (window.confirm("你确定兑换吗？") == true) {
          ap.showLoading({
            content: '请稍后',
          });
          this.submit();
        }
        return
      },
      callphone() {
        window.location.href = "tel:02161984970";
      },
      getAddress() {
        //默认地址
        api.MAddress({
          "data": {
            "id": this.$route.query.id,
            'cityId':this.cityId,
          },
          "token": this.token,
        }).then((res) => {
          this.dataList = res.data;
          if (res.data.communityId == 0) {
            this.memberAddress = '';
          } else {
            this.memberAddress = '';
            this.memberAddress = res.data;
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      // 跳转的时候插入sessionStorage
      goToList() {
        window.sessionStorage.setItem('jumpUrl', this.$route.fullPath);
        window.localStorage.setItem('item', JSON.stringify(this.item));
        this.item ='';
        this.$router.push('/shopList')
      },
      closeAlert() {
        this.showShadow = false;
        this.showInfo = false;
        this.showInfo2 = false;
      }
    }
  }
</script>

