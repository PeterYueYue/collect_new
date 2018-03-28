<template>
  <div class="records_wrap">
    <div class="records_wrap_top">
      <img src="@/assets/banner2.png" alt="" class="banner">
      <div>收呗足迹{{documentNo}}</div>
      <div class="getbtn" @click="openWindow">如何获得收呗足迹<img src="@/assets/icon_mark.png" alt="" class="icon_mark"></div>
    </div>
    <div class="records_wrap_item">
      <ul>
        <li :class="{ active: showTab }" @click="openTab(true)">收呗记录</li>
        <li :class="{ active: !showTab }" @click="openTab(false)">兑换记录</li>
        <span></span>
      </ul>
      <div class="tab1" v-if="showTab">
        <div class="remind">信用累计可能会延迟,请耐心等待....</div>
        <div class="list">
          <div class="list_item" v-for="item in recordsList" v-if="item.type==='0'" :key="item.id">
            <div class="name">{{item.descrb}}<span>+{{item.point}}</span></div>
            <div class="date">{{item.createDatePage}}</div>
          </div>
        </div>
        <div class="loading">加载完成</div>
      </div>
      <!-- tab切换 -->
      <div class="tab2" v-else>
        <div class="remind">截止昨天24:00前记录，仅限支付宝端兑换记录</div>
        <div class="list">
          <div class="list_item" v-for="item in recordsList" v-if="item.type==='1'" :key="item.id">
            <div class="name">{{item.descrb}}<span>-{{item.point}}</span></div>
            <div class="date">{{item.createDatePage}}</div>
          </div>
        </div>
        <div class="loading">加载完成</div>
      </div>
    </div>
    <!-- 弹窗 -->
    <div class="records_shadow" v-if="showShadow" @click="closeBox"></div>
    <div class="records_shadow_box" v-if="showBox">
      <div class="title">如何获得收呗足迹？</div>
      <div>“收呗”是以实现促进家庭参与垃圾分类投放及废品回收为主，记录履约行为的公益环保平台，用户可通过线上预约回收实现旧物的及时处理，在回收的同时获取“收呗足迹”，兑换相应的收呗权益。</div>
    </div>
    <img src="@/assets/icon_close.png" alt="" class="records_shadow_icon_close" @click="closeBox">
  </div>

</template>

<script>
  import '@/components/details/records.css'
  import api from '@/api/api.js'

  export default {
    name: "records",
    data() {
      return {
        showShadow: false,
        showBox: false,
        showList: true,
        showTab: true,
        recordsList: {},
        documentNo: '',
      }
    },
    methods: {
      openWindow() {
        this.showShadow = true;
        this.showBox = true;
        document.querySelector('.records_wrap').style.overflow = 'hidden';
      },
      closeBox() {
        this.showShadow = false;
        this.showBox = false;
        document.querySelector('.records_wrap').style.overflow = 'auto';
      },
      openTab(type) {
        this.showTab = type;
      },
    },
    mounted() {
      //获取数据
      api.getRecords({
        "app_key": "app_id_1",
        "data": {
          "pageNumber": 1,
          "pageSize": 20
        },
      }).then((res) => {
        console.log(res.data);
        this.documentNo = res.data[0];
        this.recordsList = res.data[1];
      }).catch((error) => {
        console.log(error)
      })
    },
  }
</script>

