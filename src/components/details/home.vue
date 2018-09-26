<template>
  <div style="width:100% ; height:100%">
    <pull-to :top-load-method="onRefresh" :top-config="pullRefreshConfig">
      <div class="bestBox">
        <div  class="home_wrap">
        <!-- <img src="@/assets/banner3.png" alt="" class="home_wrap_banner"> -->
        <!-- 轮播图 -->
        <bannebox class="home_wrap_banner"></bannebox>
        <!-- 有订单时 -->
        <div v-if="showList" style="padding-bottom: 1.7rem">
          <div class="home_address" v-if="!adressList"><img src="@/assets/icon_add_logo.png" alt="" class="icon_add_logo_new">回收地址
            <router-link to="addAdress"><div class="add">添加回收地址</div></router-link>
            <img src="@/assets/icon_right.png" alt="">
          </div>
          <div class="home_address" v-else>
            <router-link to="adressList">
              <div class="add reaonly"><img src="@/assets/icon_add_logo.png" alt="" class="icon_add_logo">{{adressList.address ?
                adressList.address : ''}}</div>
            </router-link>
            <img src="@/assets/icon_right.png" alt="">
          </div>
          <div class="home_details" v-show="adressList.isFixedPoint==='1'">
            <div class="home_details_item">您的小区已开通生活垃圾定时定点投放服务<span class="check" @touchstart="openAlert()">查看详情</span><i
              class="triangle"></i></div>
          </div>
          <div class="home_call">
            <ul class="home_list">
              <li class="item">
                <span><img src="@/assets/icon/icon_home_1.png" alt="" class="home_num">废品选择</span>
                <div class="xuxian"></div>
              </li>
              <li class="item">
                <span><img src="@/assets/icon/icon_home_2.png" alt="" class="home_num">获取估价</span>
                <div class="xuxian"></div>
              </li>
              <li class="item">
                <span><img src="@/assets/icon/icon_home_3.png" alt="" class="home_num">上门回收</span>
                <div class="xuxian"></div>
              </li>
              <li class="item">
                <span><img src="@/assets/icon/icon_home_4.png" alt="" class="home_num">金额结算</span>
              </li>
            </ul>
          </div>
          <div class="home_recycle">
            <div class="head">家电数码回收<span><img src="@/assets/icon/icon_home_5.png" alt="">免费上门拆卸搬运
            </span><span><img src="@/assets/icon/icon_home_6.png" alt="">回收人员安全认证</span></div>
            <div class="main">
              <router-link to="classify/appliances?type=0&id=19&index=3"><div class="bx"><img src="@/assets/icon/home_main1.png" alt="">冰箱回收</div></router-link>
              <div class="group">
                <ul>
                  <router-link to="classify/appliances?type=0&id=15&index=2"><li><img src="@/assets/icon/home_main2.png" alt="">洗衣机回收</li></router-link>
                  <router-link to="classify/appliances?type=0&id=9&index=0"><li><img src="@/assets/icon/home_main3.png" alt="">电视机回收</li></router-link>
                </ul>
                <ul>
                  <router-link to="classify/appliances?type=0&id=22&index=4"><li><img src="@/assets/icon/home_main4.png" alt="">电脑回收</li></router-link>
                  <router-link to="classify/appliances?type=0&id=12&index=1"><li><img src="@/assets/icon/home_main5.png" alt="">空调回收</li></router-link>
                </ul>
              </div>
            </div>
          </div>
          <div class="home_recycle">
            <div class="head">可再生垃圾回收<span><img src="@/assets/icon/icon_home_7.png" alt="">免费上门回收
            </span><span><img src="@/assets/icon/icon_home_8.png" alt="">当面计量称重</span></div>
            <div class="remind"><img src="@/assets/icon/icon_home_9.png" alt="">垃圾打免费送给回收小哥，会获得双倍环保积分哦！一般人我不告诉他！</div>
            <div class="item">
              <ul>
                <router-link to="classify/appliances?type=1&id=25&index=0">
                  <li><img src="@/assets/icon/home_item1.png" alt="">废纸回收</li>
                </router-link>
                <router-link to="classify/appliances?type=1&id=34&index=1">
                  <li><img src="@/assets/icon/home_item2.png" alt="">废塑料回收</li>
                </router-link>
                <router-link to="classify/appliances?type=1&id=40&index=2">
                  <li><img src="@/assets/icon/home_item3.png" alt="">废玻璃回收</li>
                </router-link>
              </ul>
              <ul>
                <router-link to="classify/appliances?type=1&id=45&index=3">
                  <li><img src="@/assets/icon/home_item4.png" alt="">废纺织衣物回收</li>
                </router-link>
                <router-link to="classify/appliances?type=1&id=56&index=4">
                  <li><img src="@/assets/icon/home_item5.png" alt="">废木回收</li>
                </router-link>
                <router-link to="classify/appliances?type=1&id=60&index=5">
                  <li><img src="@/assets/icon/home_item6.png" alt="">废金属回收</li>
                </router-link>
              </ul>
            </div>
          </div>
          <div class="home_wrap_item" v-for="(item,index) in homeList" :key="index">
            <!-- 数码家电 -->
            <router-link :to="{path: '/details/', query: { id: item.id }}" v-if="item.title == 'DIGITAL'">
              <div class="time">下单时间：{{item.createDatePage}}<span :class="item.statusClass">{{item.statusPage}}</span>
              </div>
              <div class="content">
                <img :src="item.category?item.category.icon:''" alt="" class="pic">
                <div>
                  <div class="name">{{item.cateAttName4Page}}</div>
                  <div class="price">预估价格：<span>￥<span>{{item.price}}</span></span></div>
                </div>
              </div>
            </router-link>
            <!-- 生活垃圾 -->
            <router-link :to="{path: '/details/', query: { id: item.id }}" v-else-if="item.title == 'HOUSEHOLD'">
              <div class="time">下单时间：{{item.createDatePage}}<span :class="item.statusClass">{{item.statusPage}}</span></div>
              <div class="o_number">订单号：{{item.orderNo}}</div>
              <div class="o_name">{{item.cateAttName4Page}}</div>
              <!--<div class="o_price">预估价格：<span>￥{{item.price}}</span></div>-->
            </router-link>
          </div>
        </div>
        <!-- 无订单时 -->
        <div v-else>
          <div class="home_address" v-if="!adressList"><img src="@/assets/icon_add_logo.png" alt="" class="icon_add_logo_new">回收地址
            <router-link to="addAdress"><div class="add">添加回收地址</div></router-link>
            <img src="@/assets/icon_right.png" alt="">
          </div>
          <div class="home_address" v-else>
            <router-link to="adressList">
              <div class="add reaonly"><img src="@/assets/icon_add_logo.png" alt="" class="icon_add_logo">{{adressList.address ?
                adressList.address : ''}}{{adressList.houseNumber}}</div>
            </router-link>
            <img src="@/assets/icon_right.png" alt="">
          </div>
          <div class="home_details" v-show="adressList.isFixedPoint==='1'">
            <div class="home_details_item">您的小区已开通生活垃圾定时定点投放服务<span class="check" @touchstart="openAlert()">查看详情
            </span><i
              class="triangle"></i></div>
          </div>
          <div class="home_call">
            <ul class="home_list">
              <li class="item">
                <span><img src="@/assets/icon/icon_home_1.png" alt="" class="home_num">废品选择</span>
                <div class="xuxian"></div>
              </li>
              <li class="item">
                <span><img src="@/assets/icon/icon_home_2.png" alt="" class="home_num">获取估价</span>
                <div class="xuxian"></div>
              </li>
              <li class="item">
                <span><img src="@/assets/icon/icon_home_3.png" alt="" class="home_num">上门回收</span>
                <div class="xuxian"></div>
              </li>
              <li class="item">
                <span><img src="@/assets/icon/icon_home_4.png" alt="" class="home_num">金额结算</span>
              </li>
            </ul>
          </div>
          <div class="home_recycle">
            <div class="head">家电数码回收<span><img src="@/assets/icon/icon_home_5.png" alt="">免费上门拆卸搬运
            </span><span><img src="@/assets/icon/icon_home_6.png" alt="">回收人员安全认证</span></div>
            <div class="main">
              <router-link to="classify/appliances?type=0&id=19&index=3"><div class="bx"><img src="@/assets/icon/home_main1.png" alt="">冰箱回收</div></router-link>
              <div class="group">
                <ul>
                  <router-link to="classify/appliances?type=0&id=15&index=2"><li><img src="@/assets/icon/home_main2.png" alt="">洗衣机回收</li></router-link>
                  <router-link to="classify/appliances?type=0&id=9&index=0"><li><img src="@/assets/icon/home_main3.png" alt="">电视机回收</li></router-link>
                </ul>
                <ul>
                  <router-link to="classify/appliances?type=0&id=22&index=4"><li><img src="@/assets/icon/home_main4.png" alt="">电脑回收</li></router-link>
                  <router-link to="classify/appliances?type=0&id=12&index=1"><li><img src="@/assets/icon/home_main5.png" alt="">空调回收</li></router-link>
                </ul>
              </div>
            </div>
          </div>
          <div class="home_recycle">
            <div class="head">可再生垃圾回收<span><img src="@/assets/icon/icon_home_7.png" alt="">免费上门回收
            </span><span><img src="@/assets/icon/icon_home_8.png" alt="">当面计量称重</span></div>
            <div class="remind"><img src="@/assets/icon/icon_home_9.png" alt="">垃圾打免费送给回收小哥，会获得双倍环保积分哦！一般人我不告诉他！</div>
            <div class="item">
              <ul>
                <router-link to="classify/appliances?type=1&id=25&index=0">
                  <li><img src="@/assets/icon/home_item1.png" alt="">废纸回收</li>
                </router-link>
                <router-link to="classify/appliances?type=1&id=34&index=1">
                  <li><img src="@/assets/icon/home_item2.png" alt="">废塑料回收</li>
                </router-link>
                <router-link to="classify/appliances?type=1&id=40&index=2">
                  <li><img src="@/assets/icon/home_item3.png" alt="">废玻璃回收</li>
                </router-link>
              </ul>
              <ul>
                <router-link to="classify/appliances?type=1&id=45&index=3">
                  <li><img src="@/assets/icon/home_item4.png" alt="">废纺织衣物回收</li>
                </router-link>
                <router-link to="classify/appliances?type=1&id=56&index=4">
                  <li><img src="@/assets/icon/home_item5.png" alt="">废木回收</li>
                </router-link>
                <router-link to="classify/appliances?type=1&id=60&index=5">
                  <li><img src="@/assets/icon/home_item6.png" alt="">废金属回收</li>
                </router-link>
              </ul>
            </div>
          </div>
          <img src="@/assets/recycling.png" alt="" class="home_wrap_icon">
          <div class="home_wrap_ordername">您还没有进行中的订单</div>
          <div class="home_wrap_btnname">点击下方上门回收按钮，为绿色生活助力吧！</div>
        </div>
      </div>
      </div>
    </pull-to>
    <!-- 底部footer -->
    <div class="home_wrap_footer">
      <img src="@/assets/icon_footer.png" alt="" class="home_wrap_footer_tbg">
      <router-link to="/classIfy/appliances">
        <div class="footer_circle">上门<br/>回收</div>
      </router-link>
      <router-link to="/integralshoping/dic">
        <div class="footer_left"><img src="@/assets/icon_foot.png" alt="" class="icon"><span>环保商城</span></div>
      </router-link>
      <router-link to="/orders">
        <div class="footer_right"><img src="@/assets/icon_record.png" alt="" class="icon"><span>订单记录</span></div>
      </router-link>
    </div>

    <router-link to="/active">
      <div class="floatbutton" ref="floatbutton" @touchstart="startHandle($event)" @touchmove="moveHandle($event)" @touchend="endHandle($event)">
          <img src="@/assets/coupon_icon.png" alt="" class="coupon_icon">
      </div>
    </router-link>

    <!-- 弹窗 -->
    <div class="home_shadow" v-if="showShadow" @touchstart="prohibitAlert($event)"></div>
    <div class="home_shadow_box" v-if="showAlert">
      <div class="title">定点回收小贴士</div>
      <div class="text mt20">将可回收垃圾分类打包，在回收时间段内送到您小区指定的回收点</div>
      <div class="text">打开支付宝【卡包】-【垃圾分类回收】出示卡包内条码给回收人员扫描，回收人员对回收物进行称重，获得积分</div>
      <div class="text">积分可在垃圾分类回收【环保商城】兑换海量权益</div>
      <div class="text mt20">定点时间</div>
      <div class="text">{{communityList.fixedPointTime[0]}}</div>
      <div class="text">{{communityList.fixedPointTime[1]}}</div>
      <div class="text mt20">定点投放地址</div>
      <div class="text">{{communityList.fixedPointAddress}}</div>
      <div class="btn" @touchstart="closeAlert($event)">我知道了</div>
    </div>
  </div>

</template>
<script>
  import '@/assets/detailstyle/home.css';
  import api from '@/api/api.js';
  import {mapGetters} from 'vuex';
  import PullTo from 'vue-pull-to';
  import Bannebox from './banner1.vue';
  import $ from 'jquery'
  export default {
    name: "home",
    components: {
      PullTo,
      Bannebox
    },
    data() {
      return {
        homeList: {},
        adressList: {},
        communityList: {},
        showList: true,
        showShadow: false,
        showAlert: false,
        pullRefreshConfig: {
          pullText: '下拉刷新',       // 下拉时显示的文字
          triggerText: '释放更新',    // 下拉到触发距离时显示的文字
          loadingText: '加载中...',   // 加载中的文字
          doneText: '加载完成',       // 加载完成的文字
          failText: '加载失败',       // 加载失败的文字
          loadedStayTime: 800,        // 加载完后停留的时间ms
          stayDistance: 80,           // 触发刷新后停留的距离
          triggerDistance: 100        // 下拉刷新触发的距离
        },
      }
    },
    computed: mapGetters({
      token: "token",
      cityId: "cityId",
      adressInfo: 'adressInfo',
    }),
    mounted() {
      document.setTitle('垃圾分类回收');
      // 本地测试打开
     // var tk = '3F3TEMH74565Q5QORHNPE76UZM6VT4JPWVV4OPUNTGAXLLRLC6B5GYU3LW34YHVNOEFL2LXPVT24U65CVPQU32QS6WCOW4OQQ3AURAT25OYS7KWASJZYQ5IPQBJGAUZRTFGRL7NE5YTTFEAYERKA4VYKTBVI6YOUHJBB3MKI3NUQ6SBCWQ2DZOS37DA2PD2UCMAINFFD7GYHH56ITBFEOMX4NET5ZWTRXGAWNDVVIJI4SBBITJN4JPMKM6VT672AGVZ27CFHSKZU3MORRA2KIA4TYUBCSEFKOYVBIRGZV6Q2VXPXQTUQ'
     // this.$store.dispatch('getToken', tk);

      if(!this.token){
      // 用户进来判断是否要授权；
        this.agreeOrNot();
      }
      //存储token到本地
      if(this.token){
        window.localStorage.setItem('token', this.token);
        this.getData();
        this.memberAddress();
        this.getCommunity();
      }
      this.screenWidth=document.documentElement.clientWidth;
      this.screenHeight = document.documentElement.clientHeight;
    },

    methods: {
      onRefresh(loaded) {
        //获取数据
        this.getData(loaded)
      },
      memberAddress(token) {
        //默认地址
        api.MemberAddress({
          "app_key": "app_id_1",
          token: this.token?this.token:token,
          "data":{
            "cityId": this.cityId,
          }
        }).then((res) => {
          this.$store.dispatch('getAddressInfo',res.data);
          this.adressList = res.data;
        }).catch((error) => {
          console.log(error)
        })
      },
      getCommunity(token) {
        api.GetCommunity({
          "app_key": "app_id_1",
          token: this.token?this.token:token,
          "data":{
            "communityId": this.adressInfo.communityId,
          }
        }).then((res) => {
          this.communityList = res.data;
        }).catch((error) => {
          console.log(error)
        })
      },
      getData(loaded) {
        //获取数据
        api.getHome({
          "app_key": "app_id_1",
          token: this.token?this.token:loaded
        }).then((res) => {
          if (res.data.length === 0) {
            this.showList = false;
          } else {
            res.data.map(items => {
              var status = items.status4Page;
              switch (status) {
                case 'distribute':
                  items.statusClass = 'complete';
                  break;
                case 'TOSEND':
                  items.statusClass = 'waiting';
                  break;
                case 'ALREADY':
                  items.statusClass = 'complete';
                  break;
                case 'INIT':
                  items.statusClass = 'waiting';
                  break;
                default:
                  break;
              }
            });
            this.homeList = res.data;
            if (loaded) {
              loaded('done')
            }
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      startHandle(e){
        this.screenWidth=document.documentElement.clientWidth;
        this.screenHeight = document.documentElement.clientHeight;
        this.floatbutton = $('.floatbutton');
        this.floatbutton.css('transition','all 0s');
        if(!e){ e = window.event;}
        this.posX=e.touches[0].pageX-parseInt(this.floatbutton.css('left'));
        this.posY=e.touches[0].pageY-parseInt(this.floatbutton.css('top'));
      },
      moveHandle(e){
        if(e.targetTouches.length == 1){
          e.stopPropagation();
          e.preventDefault();
          if((e.touches[0].pageY-this.posY)<=40){
            //超过顶部
            this.floatbutton.css('top','40px')
          }
          else if((e.touches[0].pageY)>(this.screenHeight-parseInt(this.floatbutton[0].clientHeight))){
            //超过底部
            this.floatbutton.css('top',(this.screenHeight-parseInt(this.floatbutton[0].clientHeight)-40)+'px')
          }else{
            this.floatbutton.css('top',(e.touches[0].pageY-parseInt(this.floatbutton[0].clientHeight)/2)+'px')
          }

          if((e.touches[0].pageX-this.posX)<=40){
            //超过左边
            this.floatbutton.css('left','40px')
          }else if((e.touches[0].pageX)>(this.screenWidth-parseInt(this.floatbutton[0].clientWidth))){
            //超过右边
            this.floatbutton.css('left',(this.screenWidth-parseInt(this.floatbutton[0].clientWidth)-40)+'px')
          }else {
            this.floatbutton.css('left',(e.touches[0].pageX-parseInt(this.floatbutton[0].clientWidth)/2)+'px')
          }
        }
      },
      endHandle(e){
        // 释放时自动贴到最近位置
        this.floatbutton.css('transition','all 0.3s');
        if((parseInt(this.floatbutton.css('top'))+parseInt(this.floatbutton[0].clientHeight)/2)<=(this.screenHeight/2)){//在上半部分
          if((parseInt(this.floatbutton.css('left'))+parseInt(this.floatbutton[0].clientWidth)/2)<=(this.screenWidth/2)){//在左半部分
            if((parseInt(this.floatbutton.css('top'))+parseInt(this.floatbutton[0].clientHeight)/2)<=(parseInt(this.floatbutton.css('left'))+parseInt(this.floatbutton[0].clientWidth)/2)){//靠近上方
               this.floatbutton.css('top','40px')
            }else{//靠近左边
              this.floatbutton.css('left','40px')
            }
          }else {
            if((parseInt(this.floatbutton.css('top'))+parseInt(this.floatbutton[0].clientHeight)/2)<=(this.screenWidth-(parseInt(this.floatbutton.css('left'))+parseInt(this.floatbutton[0].clientWidth)/2))){//靠近上方
              this.floatbutton.css('top','40px');
            }else{//靠近右边
              this.floatbutton.css('left',(this.screenWidth-parseInt(this.floatbutton[0].clientWidth)-40)+"px")
            }
          }
        }else {//上半部分
            if((parseInt(this.floatbutton.css('left'))+parseInt(this.floatbutton[0].clientWidth)/2)<=(this.screenWidth/2)){//在左半部分
            if( (this.screenHeight-(parseInt(this.floatbutton.css('top'))+parseInt(this.floatbutton[0].clientHeight)/2))<=(parseInt(this.floatbutton.css('left'))+parseInt(this.floatbutton[0].clientWidth)/2)){//靠近下方
              this.floatbutton.css('top',(this.screenHeight-parseInt(this.floatbutton[0].clientHeight)-40)+"px");
            }else{//靠近左边
              this.floatbutton.css('left','40px')
            }
          }else{//在右半部分
            if( (this.screenHeight-(parseInt(this.floatbutton.css('top'))+parseInt(this.floatbutton[0].clientHeight)/2))<=(this.screenWidth-(parseInt(this.floatbutton.css('left'))+parseInt(this.floatbutton[0].clientWidth)/2)) ){//靠近上方
              this.floatbutton.css('top',(this.screenHeight-parseInt(this.floatbutton[0].clientHeight)-40)+"px")
            }else{//靠近右边
              this.floatbutton.css('left',(this.screenWidth-parseInt(this.floatbutton[0].clientWidth)-40)+"px")
            }
          }
        }
      },
      agreeOrNot(){
        if (!this.$route.query.token) {
          //本地
          // let str = 'http://alipay.mayishoubei.com/index.htm?app_id=2017022805948218&source=alipay_wallet&scope=auth_base,auth_user,auth_ecard&state=021-index&auth_code=f3e97275c7a8455ab7bb529d1f4cTX66';
          //正式
          let str = window.location.href;
          str = str +'#/';
          let str1 = str.substring((str.indexOf('?') + 1), str.indexOf('#'));
          let ayth_code = this.qs.parse(str1).auth_code;
          let state = this.qs.parse(str1).state;

          if(state == 'product'){
            this.goIntegral(ayth_code)
          }else{
            this.goHome(ayth_code,state);
          }

        }
      },
      goHome(ayth_code,state){
        var city='上海市';
        var pro = new Promise(function(resolve, reject){
            AlipayJSBridge.call('getCurrentLocation', {bizType: 'didi', requestType: 1}, (result) => {
              if (result.error) {
                alert("请您开启定位功能");
                // return;
              }
              city = result.city?result.city:result.province?result.province:'上海市' ;
              resolve();
            });
            //测试
            // resolve();
        }).then(()=>{
            api.isAuthorization({
              "app_key": "app_id_1",
              "data": {
                "authCode": ayth_code,
                "state": state,
                "cityName":city
              }
            }).then(res => {
              this.$store.dispatch('getCityId',res.data.cityId);
              if(res.data == "用户授权解析失败"){
                AlipayJSBridge.call('popWindow');
                return;
              }
              if (res.data.mobile == '0') {
                this.$router.push({
                  path: '/verifiaction',
                  query: { id: res.data.id }
                })
              }
              if (res.data.mobile == '1') {
                this.$store.dispatch('getToken', res.data.token);

                window.localStorage.setItem('token', res.data.token);
                this.getData(res.data.token);
                this.memberAddress(res.data.token);
              }
            })

        })

      },
      goIntegral(ayth_code){
        var city='上海市';
        var pro = new Promise(function(resolve, reject){
          AlipayJSBridge.call('getCurrentLocation', {bizType: 'didi', requestType: 1}, (result) => {
            if (result.error) {
              alert("请您开启定位功能");
              // return;
            }
            city = result.city?result.city:result.province?result.province:'上海市' ;
            resolve();
          });
          //测试
          // resolve();
        }).then(() => {
            api.GetUserToken({
              "data": {
                "authCode": ayth_code,
                "cityName":city
                }
            }).then(res => {
              this.$store.dispatch('getToken', res.data.token);
               this.$store.dispatch('getCityId',res.data.cityId);
              this.$router.push({ path: '/integralshoping/dic'})
            })
        })
      },
      openAlert() {
        this.getCommunity();
        this.showShadow = true;
        this.showAlert = true;
      },
      closeAlert(e) {
        this.showShadow = false;
        this.showAlert = false;
        e.stopPropagation();
        e.preventDefault();
      },
      prohibitAlert(e){
        e.stopPropagation();
        e.preventDefault();
      }
    },
  }
</script>
<style>
  .floatbutton{
    position:fixed;
    bottom: 50%;
    /* 临时样式 */
    right: 10px;
    width: 1.2rem;
    height:1.1rem;
    z-index: 100000;
    transition: all 0s;
  }
  .van-pull-refresh {
    width: 100%;
  }
  .vue-pull-to-wrapper {
    width: 100%;
  }
  .van-toast {
    font-size: 0.3rem;
    line-height: 0.012rem;
    border-radius: 0.1rem;
  }
  .van-toast--text {
    padding: 0.6rem;
    min-width: 1.6rem;
  }
  .van-pull-refresh__head {
    height: 0.5rem;
    top: -0.5rem;
    font-size: 0.24rem;
    line-height: 0.5rem;
  }
  .action-block .default-text {
    font-size: 0.24rem;
  }
  .coupon_icon{
    width: 100%;
    height: 100%;
  }
</style>






