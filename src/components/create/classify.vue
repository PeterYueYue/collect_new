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
              <div class="price" @click="openAlert">￥<span>39.9/kg</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="classify_footer">
      <div class="f_title"><div class="icon"><img src="@/assets/class_icon.png" alt=""><i>1</i></div><div
        class="name">预估金额：<span class="price">￥<span>39.9</span></span></div></div>
      <div class="r_btn" @click="openAlert">一键回收</div>
    </div>

    <!-- 弹窗 -->
    <div class="class_shadow" v-if="showShadow"></div>
    <div class="class_shadow_box" v-if="showAlert1">
      <div class="title">回收小贴士</div>
      <div class="remind">由于您本次下单未达到起收标准。若继续下单预约，平台工作人员可能会联系您，希望您能继续攒多一点再进行预约回收哦！感谢您对环保事业的奉献精神！</div>
      <div class="text cur">起收标准 ：</div>
      <div class="text">1. 回收物总重量大于30Kg</div>
      <div class="text">2. 回收物总数量大于30个</div>
      <div class="text">3. 回收物总金额达到50.00元</div>
      <div class="text">满足上述任一标准即可哦！</div>
      <div @click="closeOrders" class="btn">仍然下单</div>
      <div @click="closeOrders" class="btn">我在攒一攒吧</div>
    </div>

    <div class="class_shadow_box" v-if="showAlert2">
      <div class="title">回收小贴士</div>
      <div class="remind">不精确知道您需要回收的重量或者个数？没关系！您只需根据预估输入待回收物的大约重量或个数，实际成交重量和件数将以上门回收人员实际计量为准！</div>
      <div @click="closeOrders" class="btn">我知道了</div>
      <div @click="closeOrders" class="btn nocolor">不再提醒</div>
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
        showShadow: false,
        showAlert1: false,
        showAlert2: false,
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
      openAlert() {
        this.showShadow = true;
        this.showAlert1 = true;
        document.querySelector('.details_wrap').style.overflow = 'hidden';
      },
      openAlert1() {
        this.showShadow = true;
        this.showAlert2 = true;
        document.querySelector('.details_wrap').style.overflow = 'hidden';
      },
      closeOrders() {
        this.showShadow = false;
        this.showAlert1 = false;
        this.showAlert2 = false;
        document.querySelector('.details_wrap').style.overflow = 'auto';
      },
    }
  }
</script>

