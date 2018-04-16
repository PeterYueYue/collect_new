<template>
  <div class="home_wrap">
    <img src="@/assets/banner.jpg" alt="" class="home_wrap_banner">
    <!-- 有订单时 -->
    <div v-if="showList">
      <div class="home_wrap_item" v-for="item in homeList" :key="item.id">
        <router-link :to="{path: '/details/', query: { id: item.id }}">
          <div class="time">下单时间：{{item.createDatePage}}<span :class="item.statusClass">{{item.statusPage}}</span></div>
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

    <!-- 底部footer -->
    <div class="home_wrap_footer">
      <img src="@/assets/icon_footer.png" alt="" class="home_wrap_footer_tbg">
      <router-link to="/classIfy">
        <div class="footer_circle">我要<br/>回收</div>
      </router-link>
      <router-link to="/records">
        <div class="footer_left"><img src="@/assets/icon_foot.png" alt="" class="icon"><span>收呗足迹</span></div>
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

  export default {
    name: "home",
    data() {
      return {
        homeList: {},
        showList: true,
      }
    },
    created() {
      var urlToken = location.search;
      var tk = urlToken.split("=");
      // var testToken = "3F3TEMH74565Q5QORHNPE76UZM6VT4JPWVV4OPUNTGAXLLRLC6B5GYU3LW34YHVNOEFL2LXPVT24UAJWCBI7NJ42KSYJ2KXG2OVQSA6ZMU4VMMCLQUKIRXAWTX2BD3K6MDOZDBJ4Q62CYGOB7DVAUP4CYQAHL3JSQRIG7P2UO77IZBN7W3E4RZK42VEEUWCHGAZLS7LGRB4EVIIYSQVYYSGAETEUZC4JUVVV2UDRKIOBGXURUGYCOGKTBVFLZYU2QFPF2G4I7DVNKBWCOFWBQDLZLJYEDSPIL6T46KLPZ4O2ZIFJROTQ"
      // this.$store.dispatch('getToken', testToken)
      this.$store.dispatch('getToken',tk[1])
    },
    computed: mapGetters({
      token: "token"
    }),
    mounted() {
      //存储token到本地
      var token = this.$route.query.token;
      window.localStorage.setItem('token', token);
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
            var status = items.statusPage;
            switch (status) {
              case '已接单':
                items.statusClass = 'already';
                break;
              case '已派单':
                items.statusClass = 'complete';
                break;
              case '待接单':
                items.statusClass = 'waiting';
                break;
              default:
                break;
            }
          });
          this.homeList = res.data;
        }
      }).catch((error) => {
        console.log(error)
      })
    },
  }
</script>
