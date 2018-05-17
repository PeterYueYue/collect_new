<template>
  <div style="width:100%">
    <pull-to :top-load-method="onRefresh"  :top-config="pullRefreshConfig">
    <div class="home_wrap" >
       <img src="@/assets/banner3.jpg" alt="" class="home_wrap_banner">
      <!-- 轮播图 -->
      <!--<bannebox class="home_wrap_banner"></bannebox>-->
      <!-- 有订单时 -->
      <div v-if="showList" style="padding-bottom: 1.7rem">
        <div class="home_wrap_item" v-for="item in homeList" :key="item.id">
          <router-link :to="{path: '/details/', query: { id: item.id }}">
            <div class="time">下单时间：{{item.createDatePage}}<span :class="item.statusClass">{{item.statusPage}}</span>
            </div>
            <div class="content">
              <img :src="item.category.icon" alt="" class="pic">
              <div>
                <div class="name">{{item.category.name}}</div>
                <div class="price">预估价格：<span>￥{{item.price}}</span></div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <!-- 无订单时 -->
      <div v-else>
        <img src="@/assets/recycling.png" alt="" class="home_wrap_icon">
        <div class="home_wrap_ordername">您还没有进行中的收呗订单</div>
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
          <div class="footer_left"><img src="@/assets/icon_foot.png" alt="" class="icon"><span>我的收呗</span></div>
        </router-link>
        <router-link to="/orders">
          <div class="footer_right"><img src="@/assets/icon_record.png" alt="" class="icon"><span>订单记录</span></div>
        </router-link>
      </div>
  </div>

</template>
<script>
  import '@/assets/detailstyle/home.css'
  import api from '@/api/api.js'
  import {mapGetters} from 'vuex';
  import PullTo from 'vue-pull-to'
  import Bannebox from './banner.vue'
  export default {
    name: "home",
    components: {
      PullTo,
      Bannebox
    },
    data() {
      return {
        homeList: {},
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
    created() {
      var urlToken = location.search;
      var tk = urlToken.split("=");
      // var testToken = "3F3TEMH74565Q5QORHNPE76UZM6VT4JPWVV4OPUNTGAXLLRLC6B5GYU3LW34YHVNOEFL2LXPVT24UCSPFZ54XJGBWOYJ2KXG2OVQSA4XXBTPXSV2LCS2ZJHIRFEZICJPZDF3ZEBP3BYPWXK2Z5KX5VOOLC6EQXK3DHR3CPY43MKE3HLRVQFBVFFSBL2D734IUX7SLAVFXSWJ5XSRKODFUYOD23YECXXDBJ4WQHGD3SFWEON7HRT5LZ3OS75EKML5UDKQC76XR6NNRF6K4IRHCEA6NZSB7NRXZVRFSC3PZ4O2ZIFJROTQ"
      // this.$store.dispatch('getToken', testToken)
      this.$store.dispatch('getToken', tk[1])
    },
    computed: mapGetters({
      token: "token"
    }),
    mounted() {
      //存储token到本地
      var token = this.$route.query.token;
      window.localStorage.setItem('token', token);
      this.getData();
    },
    methods: {
      onRefresh(loaded) {
        //获取数据
        this.getData(loaded)
      },
      getData(loaded) {
        //获取数据
        api.getHome({
          "app_key": "app_id_1",
          token: this.token

        }).then((res) => {
          console.log(res.data);
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


