<template>
  <div class="orders_wrap">
    <scroller :on-infinite="getList">
      <!-- content goes here -->
      <div class="orders_wrap_item" v-for="(item,index) in ordersList" :key="index">
        <!-- 数码家电 -->
        <router-link :to="{path: '/details/', query: { id: item.id }}" v-if="item.title == 'DIGITAL'">
          <div class="time">{{item.statusDatePage}}<span :class="item.statusClass">{{item.statusPage}}</span></div>
          <div class="content">
            <img :src="item.category.icon" alt="" class="pic">
            <div>
              <div class="name">{{item.cateAttName4Page}}</div>
              <div class="price">预估价格：<span>￥<span>{{item.price}}</span></span></div>
            </div>
          </div>
        </router-link>

        <!-- 生活垃圾 -->
        <router-link :to="{path: '/details/', query: { id: item.id }}" v-else-if="item.title == 'HOUSEHOLD'">
          <div class="time">订单号：{{item.orderNo}}<span :class="item.statusClass">{{item.statusPage}}</span></div>
          <div class="o_number">下单时间：{{item.createDatePage}}</div>
          <div class="o_name">{{item.cateAttName4Page}}</div>
          <!--<div class="o_price">预估价格：<span>{{item.price}}</span></div>-->
        </router-link>
      </div>

      <img src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" class="orders_wrap_loading"
           v-show="showLoading"/>
      <div class="orders_wrap_text" v-show="noMore"><span class="line_lf"></span>没有更多订单了<span class="line_rt"></span>
      </div>
    </scroller>
  </div>
</template>

<script>
  import '@/assets/detailstyle/orders.css'
  import api from '@/api/api.js'
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        ordersList: {},
        pageNumber: 1,
        pageSize: 10,
        noMore: false,
        showLoading: false
      }
    },
    computed: mapGetters({
      token: "token"
    }),
    mounted(){
      document.setTitle('订单记录');
    },
    methods: {
      //获取数据
      getList(done) {
        const {pageNumber, pageSize} = this;
        this.showLoading = true;
        api.getOrders({
          "app_key": "app_id_1",
          "data": {pageNumber, pageSize},
          token: this.token,
        }).then((res) => {
          res.data.listOrder.map(items => {
            var status = items.status4Page;
            switch (status) {
              case 'distribute':
                items.statusClass = 'complete';
                break;
              case 'ALREADY':
                items.statusClass = 'complete';
                break;
              case 'INIT':
                items.statusClass = 'waiting';
                break;
              case 'TOSEND':
                items.statusClass = 'waiting';
                break;
              case 'CANCEL':
                items.statusClass = 'cancel';
                break;
              case 'REJECTED':
                items.statusClass = 'cancel';
                break;
              case 'COMPLETE':
                items.statusClass = 'succeed';
                break;
              default:
                break;
            }
          });
          setTimeout(() => {
            this.showLoading = false;
            this.ordersList = [...this.ordersList, ...res.data.listOrder];
            if (res.data.listOrder.length < this.pageSize) {
              /* 所有数据加载完毕 */
              this.noMore = true;
              return;
            }
            this.pageNumber += 1;
            if (done) done();
          }, 100)
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>
