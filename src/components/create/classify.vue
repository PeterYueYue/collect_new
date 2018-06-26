<template>
  <div class="classify">
    <div class="classify_head">
      <ul>
        <span class="line"></span>
        <li :class="{ cur: showUl }" @click="openUl(true)"><span>家电数码</span></li>
        <li :class="{ cur: !showUl }" @click="openUl(false)"><span>生活垃圾</span></li>
      </ul>
    </div>
    <!-- 数码家电 -->
    <!--<div class="content clearfix">-->
      <!--<ul class="commodity fl">-->
        <!--<li-->
          <!--v-for="(item ,index) in menulist"-->
          <!--:key="item.id"-->
          <!--class="item"-->
          <!--v-bind:class="{ active: isActive == index }"-->
          <!--@click="getList(item.id,index)"-->
        <!--&gt;{{item.name}}-->
        <!--</li>-->
      <!--</ul>-->
      <!--<div class="pinlei fl">-->
        <!--<div class="title clearfix">-->
          <!--<span class="left_line fl"></span>-->
          <!--<h5 class="fl">品类</h5>-->
          <!--<span class="right_line fl"></span>-->
        <!--</div>-->
        <!--<ul class="linlei_list clearfix">-->
          <!--<li class="item  fl" v-for="(item,index) in subList" :key="item.id" @click="getAddressInfo(item,index)">-->
            <!--<router-link :to="'/addressoption/'+item.id">-->
              <!--<img :src=item.icon alt="">-->
              <!--<span>{{item.name}}</span>-->
            <!--</router-link>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->
    <!-- 生活垃圾 -->
    <div class="content clearfix">
      <ul class="commodity fl">
        <li
          v-for="(item ,index) in menulist"
          :key="item.id"
          class="item"
          v-bind:class="{ active: isActive == index }"
          @click="getList(item.id,index)"
        >{{item.name}}
        </li>
      </ul>
      <div class="pinlei fl">
        <div class="title clearfix">
          <span class="left_line fl"></span>
          <h5 class="fl">品类</h5>
          <span class="right_line fl"></span>
        </div>
        <div class="linlei_list">
          <img src="@/assets/class_pic.png" alt="" class="classify_banner">
          <div class="classify_title"><i></i>回收类型<span>（以下单价为上海市平均回收价）</span></div>
          <div class="classify_main">
            <div class="classify_item">
              <img src="@/assets/class_pic1.png" alt="">
              <div class="name">家具</div>
              <div class="price">￥<span>39.9/kg</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="classify_footer">
      <div class="f_title"><div class="icon"><img src="@/assets/class_icon.png" alt=""><i>1</i></div><div
        class="name">预估金额：<span class="price">￥<span>39.9</span></span></div></div>
      <div class="r_btn">一键回收</div>
    </div>
  </div>

</template>
<script>
  import api from '@/api/api.js'
  import '@/assets/createstyle/tool.css'
  import '@/assets/createstyle/classify.css'
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        menulist: '',
        isId: '1',
        subList: '',
        isActive: '0',
        showUl: true,
      }
    },
    computed: mapGetters({
      token: "token"
    }),
    created: function (value) {
      api.getClassify({
        "app_key": "app_id_1",
        "data": {
          "level": "0",
          "title": value ? 'DIGITAL' : 'HOUSEHOLD'
        },
        token: this.token
      }).then((res) => {
        console.log(res);
        this.menulist = res.data;
        this.isId = res.data[0].id;
        api.getSubList({
          "app_key": "app_id_1",
          "data": {
            "id": this.isId
          },
          token: this.token
        }).then((res) => {
          this.subList = res.data;
        }).catch((erro) => {
          console.log(erro)
        })
      }).catch((erro) => {
        console.log(erro)
      });
    },
    methods: {
      getList(id, index) {
        this.isId = id;
        this.isActive = index;
        api.getSubList({
          "app_key": "app_id_1",
          "data": {
            "id": this.isId
          },
          token: this.token
        }).then((res) => {
          this.subList = res.data;
        }).catch((erro) => {
          console.log(erro)
        })
      },
      getAddressInfo(item, id) {  //获取子集列表里的ID
        this.$store.dispatch('setAddRessId', item);
        //获取地址信息
        api.getAddRessList({
          "app_key": "app_id_1",
          "data": {
            "id": 1
          },
          token: "token"
        }).then((res) => {
          this.$store.dispatch('changeAddress', res)
        }).catch((erro) => {
          console.log(erro)
        })
      },
      openUl(type) {
        this.showUl = type;
      },
    }
  }
</script>

