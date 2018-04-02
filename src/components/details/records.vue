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
          <scroller
            :on-infinite="getRecords"
          >
            <!-- content goes here -->
            <div class="list_item" v-for="(item,key) in recordsList" v-if="item.type==='0'" :key="key">
              <div class="name">{{item.descrb}}<span>+{{item.point}}</span></div>
              <div class="date">{{item.createDatePage}}</div>
            </div>
            <img src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" class="records_wrap_loading"
                 v-show="showLoading"/>
            <div class="loading" v-show="noMore">加载完成</div>
          </scroller>
        </div>
      </div>
      <!-- tab切换 -->
      <div class="tab2" v-else>
        <div class="remind">截止昨天24:00前记录，仅限支付宝端兑换记录</div>
        <div class="list">
          <scroller
            :on-infinite="getRecords"
          >
            <!-- content goes here -->
            <div class="list_item" v-for="(item,key) in recordsList" v-if="item.type==='1'" :key="key">
              <div class="name">{{item.descrb}}<span>-{{item.point}}</span></div>
              <div class="date">{{item.createDatePage}}</div>
            </div>
            <img src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" class="records_wrap_loading"
                 v-show="showLoading"/>
            <div class="loading" v-show="noMore">加载完成</div>
          </scroller>
        </div>
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
  import '@/assets/detailstyle/records.css'
  import api from '@/api/api.js'
  import {mapGetters} from 'vuex';

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
      this.getRecords()
    },
    methods: {
      //获取数据
      getRecords(done){
        const {pageNumber, pageSize} = this;
        this.showLoading = true;
        api.getRecords({
          "app_key": "app_id_1",
          "data": {pageNumber, pageSize},
          token: this.token
        }).then((res) => {
          console.log(res.data);
          this.documentNo = res.data[0];
          setTimeout(() => {
            this.showLoading = false;
            this.recordsList = [...this.recordsList, ...res.data[1]];
            if (res.data[1].length < this.pageSize) {
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
      },
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
  }
</script>

