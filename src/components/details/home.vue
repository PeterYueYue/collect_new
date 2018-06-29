<template>
  <div style="width:100%">
    <pull-to :top-load-method="onRefresh"  :top-config="pullRefreshConfig">
    <div class="home_wrap" >
      <!-- <img src="@/assets/banner3.png" alt="" class="home_wrap_banner"> -->
      <!-- 轮播图 -->
      <bannebox class="home_wrap_banner"></bannebox>
      <!-- 有订单时 -->
      <div v-if="showList" style="padding-bottom: 1.7rem">
        <div class="home_address">回收地址<router-link to="addAdress"><div class="add" >添加回收地址</div></router-link><img
          src="@/assets/icon_right.png" alt=""></div>
        <div class="home_address">回收地址<router-link to="addAdress"><div class="add reaonly" >{{adressList.address}}{{adressList.houseNumber}}</div></router-link><img
          src="@/assets/icon_right.png" alt=""></div>
        <div class="home_call">
          <h3>分类回收 助力绿色环保</h3>
          <ul class="home_list">
            <li class="item">
              <div class="home_num">1</div>
              <span>废品选择</span>
              <div class="xuxian"></div>
            </li>
            <li class="item">
              <div class="home_num">2</div>
              <span>获取估价</span>
              <div class="xuxian"></div>
            </li>
            <li class="item">
              <div class="home_num">3</div>
              <span>上门回收</span>
              <div class="xuxian"></div>
            </li>
            <li class="item">
              <div class="home_num">4</div>
              <span>金额结算</span>
            </li>
          </ul>
        </div>
        <!-- 数码家电 -->
        <div class="home_wrap_item" v-for="item in homeList" :key="item.id" v-show="item.title == 'DIGITAL'">
          <router-link :to="{path: '/details/', query: { id: item.id }}">
            <div class="time">下单时间：{{item.createDatePage}}<span :class="item.statusClass">{{item.statusPage}}</span>
            </div>
            <div class="content">
              <img :src="item.category?item.category.icon:''" alt="" class="pic">
              <div>
                <div class="name">{{item.cateAttName4Page}}</div>
                <div class="price">预估价格：<span>￥{{item.price}}</span></div>
              </div>
            </div>
          </router-link>
        </div>
        <!-- 生活垃圾 -->
        <div class="home_wrap_item" v-for="data in homeList" :key="data.id" v-show="data.title == 'HOUSEHOLD'">
          <router-link :to="{path: '/details/', query: { id: data.id }}">
            <div class="time">订单号：{{data.orderNo}}<span :class="data.statusClass">{{data.statusPage}}</span></div>
            <div class="o_number">下单时间：{{data.createDatePage}}</div>
            <div class="o_name">{{data.cateAttName4Page}}</div>
            <div class="o_price">预估价格：<span>{{data.price}}</span></div>
          </router-link>
        </div>

      </div>
      <!-- 无订单时 -->
      <div v-else>
        <div class="home_address">回收地址<router-link to="addAdress"><div class="add" >添加回收地址</div></router-link><img
          src="@/assets/icon_right.png" alt=""></div>
        <div class="home_call">
          <h3>分类回收 助力绿色环保</h3>
          <ul class="home_list">
            <li class="item">
              <div class="home_num">1</div>
              <span>废品选择</span>
              <div class="xuxian"></div>
            </li>
            <li class="item">
              <div class="home_num">2</div>
              <span>获取估价</span>
              <div class="xuxian"></div>
            </li>
            <li class="item">
              <div class="home_num">3</div>
              <span>上门回收</span>
              <div class="xuxian"></div>
            </li>
            <li class="item">
              <div class="home_num">4</div>
              <span>金额结算</span>
            </li>
          </ul>
        </div>
        <img src="@/assets/recycling.png" alt="" class="home_wrap_icon">
        <div class="home_wrap_ordername">您还没有进行中的订单</div>
        <div class="home_wrap_btnname">点击下方立即回收按钮，为绿色生活助力吧！</div>
      </div>

    </div>
   </pull-to>
   <!-- 底部footer -->
      <div class="home_wrap_footer">
        <img src="@/assets/icon_footer.png" alt="" class="home_wrap_footer_tbg">
        <router-link to="/classIfy">
          <div class="footer_circle">上门<br/>回收</div>
        </router-link>
        <router-link to="/records">
          <div class="footer_left"><img src="@/assets/icon_foot.png" alt="" class="icon"><span>我的积分</span></div>
        </router-link>
        <router-link to="/orders">
          <div class="footer_right"><img src="@/assets/icon_record.png" alt="" class="icon"><span>订单记录</span></div>
        </router-link>
      </div>
  </div>

</template>
<script>
  import '@/assets/detailstyle/home.css';
  import api from '@/api/api.js';
  import {mapGetters} from 'vuex';
  import PullTo from 'vue-pull-to';
  import Bannebox from './banner1.vue';
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
        showList: true,
        pullRefreshConfig: {
          pullText: '下拉刷新', // 下拉时显示的文字
          triggerText: '释放更新', // 下拉到触发距离时显示的文字
          loadingText: '加载中...', // 加载中的文字
          doneText: '加载完成', // 加载完成的文字
          failText: '加载失败', // 加载失败的文字
          loadedStayTime: 800, // 加载完后停留的时间ms
          stayDistance: 80, // 触发刷新后停留的距离
          triggerDistance: 100 // 下拉刷新触发的距离
        }
      }
    },
    beforeCreate() {

      // 正式
      // var tk = this.$route.query.token;
      // if(tk){
      //   this.$store.dispatch('getToken', tk)
      // }

      // 本地测试
      // var tk ='3F3TEMH74565Q5QORHNPE76UZM6VT4JPWVV4OPUNTGAXLLRLC6B5GYU3LW34YHVNOEFL2LXPVT24V6BKSK7XCKURHCCOW4OQQ3AURASOFFN52QCVR5LE4Y7OETSSZZ43TFGRL7NE5YTTFUKA7W74ZQF553OGLWKFT3OLE3M3U5D3P5XJXREVTUR6DO6RCKNVIPJMJUOKEQZPYTNNIIS4OCLDP54TANK26MJ7QLMYFLUKQ2PQR6G5JAIMWITCWJS6QNBBPDPC6WMG5IHK3K3W2KZU47KE33F56NSKHCGRF4NFSBQ6VVJQ'
      // var tk ='3F3TEMH74565Q5QORHNPE76UZM6VT4JPWVV4OPUNTGAXLLRLC6B5GYU3LW34YHVNOEFL2LXPVT24UCSPFZ54XJGBWOYJ2KXG2OVQSA6I7AVDEWHYHWTXEC7CUHLABIGZ7LTOFLZYLUKM2J6KRTYJLEEZEK2SNPEXA4F7IYAV4GPFLBIWMTZ4YGVKOU5ZDF42NB43W4CGNZHL5YCOBZCW72SMKT6WNE47RBT4VPY5QIMIBYSYRRTJJOEN6IDMQ37UD7JWT6YTFB7YSKVXIT7LGBOJ7ZEP4SW7XYP7JITPZ4O2ZIFJROTQ'
      var tk ='3F3TEMH74565Q5QORHNPE76UZM6VT4JPWVV4OPUNTGAXLLRLC6B5GYU3LW34YHVNOEFL2LXPVT24VDPYKJDZTFWQI6YJ2KXG2OVQSA6NTCH4PDRHJRV2ZJHIRFEZICJP7LTOFLZYLUKM2MAZIWHAZDR6WLVKMHPOHASYS6YVLKOSFG3ZZMIUWG5QM2G4J63ORFMWG4LOVV6P3WAHZLFAZQFYMHNKS6U4QA5S4HN52VCMVHT5M4JD6KZVET55W6TNHEDLCBQ7LG32NJA4I5F47ST77NTIUN6EKACXLADPZ4O2ZIFJROTQ'
      this.$store.dispatch('getToken', tk)

    },
    computed: mapGetters({
      token: "token"
    }),
    mounted() {
      //存储token到本地
      var token = this.$route.query.token;
      window.localStorage.setItem('token', token);
      this.getData();
      this.MemberAddress();
    },
    methods: {
      onRefresh(loaded) {
        //获取数据
        this.getData(loaded)
      },
      MemberAddress() {
        //默认地址
        api.MemberAddress({
          "app_key": "app_id_1",
          token: this.token
        }).then((res) => {
          console.log(res);
          this.adressList = res.data;
        }).catch((error) => {
          console.log(error)
        })
      },
      getData(loaded) {
        //获取数据
        api.getHome({
          "app_key": "app_id_1",
          token: this.token
        }).then((res) => {
          // console.log(res.data);
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
      }
    },
  }
</script>
<style>
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
  .action-block .default-text{
    font-size: 0.24rem;
  }
</style>


