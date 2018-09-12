<template>
  <div class="ticketdetails">
    <!-- 头部 -->
    <header class="head">
      <div class="logo">
        <img :src=item.img alt="">
      </div>
      <h3>{{item.address}}</h3>
      <strong>{{item.name}}</strong>
      <div class="validity">有效期：{{item.pickStartDate.split(' ')[0]}}-{{item.pickEndDate.split(' ')[0]}}</div>
      <div
        @touchstart=toDteailsStart
        @touchmove=toDteailsMove
        @click=firm
        class="changeButton">{{item.bindingPoint}}kg环保能量
      </div>
    </header>
    <!-- 主体 -->
    <div class="content">
      <h3 class="title">使用说明</h3>
      <ul class="main">
        <li class="item">
          <span>门店地址</span>
          <div class="info">
            {{item.address}}
          </div>
        </li>
        <li class="item">
          <span>联系电话（点击号码拨打）</span>
          <div class="info">
            {{item.phone}}
          </div>
        </li>
        <li class="item">
          <span>时间时段</span>
          <div class="info">
            {{item.vaildWeek}}
          </div>
        </li>
        <li class="item">
          <span>不可使用日期</span>
          <div class="info">
            {{item.unusedableDate}}
          </div>
        </li>
        <li class="item">
          <span>使用条件</span>
          <div class="info">
            满{{item.lowLimit}}元可用
          </div>
        </li>
      </ul>
    </div>

    <!-- 底部 -->
    <footer
      @touchstart=toDteailsStart
      @touchmove=toDteailsMove
      @touchend=isShowPop
    >
      使用详情
      <div class="arrows"></div>
    </footer>
    <!-- 弹出层 -->
    <div @touchend=closePop class="popupBox">
      <div class="messageBox">
        <h3>使用详情</h3>
        <div class="content">
          <p v-for="sitem in text" :key="sitem.id">{{sitem}}</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import './ticketdetails.css';
  import api from '../../../../api/api.js';
  import {mapGetters} from 'vuex';
  import $ from 'jquery';

  export default {
    data() {
      return {
        item: '',
        justTouch: '',
        text: ''
      }
    },
    computed: mapGetters({
      token: "token"
    }),
    created() {
      document.title = '优惠券详情';
      this.item = JSON.parse(this.$route.query.item);
      this.text = this.item.content.split("<br/>")
    },
    methods: {
      // touchstart
      toDteailsStart(e) {
        this.justTouch = 'true';
        let target = {
          startY: e.changedTouches[0].pageY,
          startX: e.changedTouches[0].pageX,
        }
        return target;
      },
      // touchmove
      toDteailsMove(e) {
        let moveEndX = e.changedTouches[0].pageX;
        let moveEndY = e.changedTouches[0].pageY;
        let X = moveEndX - this.toDteailsStart.startX;
        let Y = moveEndY - this.toDteailsStart.startY;
        if (Math.abs(X) > Math.abs(Y) && X > 0) {
          this.justTouch = 'true';
        }
        else if (Math.abs(X) > Math.abs(Y) && X < 0) {
          this.justTouch = 'true';
        }
        else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
          this.justTouch = 'true'
        }
        else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
          this.justTouch = 'true'
        }
        else {
          this.justTouch = 'false'
        }
      },
      // touchend
      toDteails() {
        if (this.justTouch == 'true') {
          api.SendVoucher({
            "data": {
              "id": this.item.id,
            },
            "token": this.token
          }).then(res => {
            alert(res.data)
          })
        }
      },
      isShowPop() {
        if (this.justTouch == 'true') {
          $('.messageBox').css({bottom: "-1000px"}).animate({bottom: "0"}, 500);
          $('.popupBox').css({display: 'block'})
        }
      },
      closePop(e) {
        console.log(e)
        if (e.target.className == "popupBox") {
          $('.messageBox').animate({bottom: "-1000"}, 500, function () {
            $('.popupBox').css({display: 'none'})
          });
        }
      },
      firm() {
        //利用对话框返回的值 （true 或者 false）
        if (confirm("你确定兑换吗？")) {
          this.toDteails();
        }

      }
    }

  }
</script>

