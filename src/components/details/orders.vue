<template>
  <div class="orders_wrap">
    <scroller
      :on-infinite="getList"
    >
      <!-- content goes here -->
      <div class="orders_wrap_item" v-for="(item,key) in ordersList" :key="key">
        <router-link :to="{path: '/details/', query: { id: item.id }}">
          <div class="time">{{item.statusDatePage}}<span :class="item.statusClass">{{item.statusPage}}</span></div>
          <div class="content">
            <img :src="item.category.icon" alt="" class="pic">
            <div>
              <div class="name">{{item.category.name}}</div>
              <div class="price">预估价格：<span>￥{{item.price}}</span></div>
            </div>
          </div>
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
  import '@/components/details/orders.css'
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
    mounted() {
      this.getList()
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
          console.log(res);
          res.data.listOrder.map(items => {
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
              case '已取消':
                items.statusClass = 'cancel';
                break;
              case '平台已取消':
                items.statusClass = 'cancel';
                break;
              case '已完成':
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
