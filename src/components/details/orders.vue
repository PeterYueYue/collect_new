<template>
  <div class="orders_wrap">
    <div class="orders_wrap_item" v-for="item in ordersList" :key="item.id">
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
    <div class="orders_wrap_text"><span class="line_lf"></span>没有更多订单了<span class="line_rt"></span></div>
  </div>
</template>

<script>
  import '@/components/details/orders.css'
  import api from '@/api/api.js'

  export default {
    data() {
      return {
        ordersList: {},
      }
    },
    mounted() {
      //获取数据
      api.getOrders({
        "app_key": "app_id_1",
        "data": {
          "pageNumber": 1,
          "pageSize": 20
        },
      }).then((res) => {
        console.log(res.data.listOrder);
        this.ordersList = res.data.listOrder;
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
      }).catch((error) => {
        console.log(error)
      })
    }
  }
</script>
