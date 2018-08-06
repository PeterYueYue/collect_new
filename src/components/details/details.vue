<template>
  <imgView v-if="showImgView" :picUrl="picUrl" @toggleImgView="toggleImgView"></imgView>
  <div class="details_wrap" v-else>

    <!-- 数码家电 -->
    <div class="details_wrap_item" v-show="detailsList.title == 'DIGITAL'">
      <div class="time">订单号：{{detailsList.orderNo}}<span
        :class="detailsList.statusClass">{{detailsList.statusPage}}</span></div>
      <div class="date">下单时间：{{detailsList.createDatePage}}</div>
      <div class="content">
        <img :src="detailsList.category?detailsList.category.icon:''" alt="" class="pic">
        <div>
          <div class="name">{{detailsList.cateAttName4Page}}</div>
          <div class="price">预估价格：<span>￥<span class="money">{{detailsList.price}}</span></span></div>
        </div>
      </div>
    </div>

    <!-- 生活垃圾 -->
    <div class="details_wrap_item" v-show="detailsList.title == 'HOUSEHOLD'">
      <div class="time">订单号：{{detailsList.orderNo}}<span
        :class="detailsList.statusClass">{{detailsList.statusPage}}</span></div>
      <div class="o_number">下单时间：{{detailsList.createDatePage}}</div>
      <div class="o_name">{{detailsList.cateAttName4Page}}</div>
      <!--<div class="o_price">预估价格：<span>￥<span>{{detailsList.price}}</span></span></div>-->
    </div>

    <div class="details_wrap_time" v-show="detailsList.title == 'DIGITAL'">
      <span v-show="detailsList.level=='0'">上门时间：{{detailsList.arrivalTimePage}}</span>
      <span class="btn_cancel" @click="openOrders" v-show="detailsList.status4Page!=='COMPLETE'&&detailsList.status4Page!=='CANCEL'&&detailsList.status4Page!=='REJECTED'">取消订单</span>
    </div>

    <div class="details_wrap_time" v-show="detailsList.title == 'HOUSEHOLD'">
      <span class="btn_cancel" @click="openOrders" v-show="detailsList.status4Page!=='COMPLETE'&&detailsList.status4Page!=='CANCEL'&&detailsList.status4Page!=='REJECTED'">取消订单</span>
    </div>
    <!-- 待接单状态无此div -->
    <!-- 已取消 -->
    <div class="details_wrap_reason" v-show="detailsList.status4Page=='CANCEL'||detailsList.status4Page=='REJECTED'">
      <div class="why">取消原因</div>
      <div class="answer">{{detailsList.cancelReason}}</div>
    </div>
    <!-- 已完成，已派单 -->
    <div class="details_wrap_reason" v-show="detailsList.status4Page=='COMPLETE'||detailsList.status4Page=='ALREADY'">
      <div class="why">{{detailsList.recyclers?detailsList.recyclers.name:''}}<span class="btn_view"
                                                                                    @click="openEvaluation"
                                                                                    v-show="detailsList.status4Page=='COMPLETE'">{{detailsList.isEvaluated == '1' ? '查看评价' : '评价'}}</span>
      </div>
      <a :href="tel" class="tel"><img src="@/assets/icon_tel.png" alt=""
                                      class="icon_tel">联系电话：{{detailsList.recyclers?detailsList.recyclers
        .tel:''}}</a>
    </div>
    <!--  已接单 -->
    <div class="details_wrap_reason" v-show="detailsList.status4Page=='distribute'">
      <div class="why">派单详情</div>
      <div class="answer">本订单已由爱回收有限公司接单，工作人员将在1-3个工作日内与您联系，请保持电话畅通</div>
    </div>
    <div class="details_wrap_info">
      <div class="title">询价信息</div>
      <div class="picture">
        <img :src="pic.picUrl" alt="" v-for="pic in detailsPic" :key="pic.id" @click="toggleImgView(true)">
      </div>
      <div class="description" v-show="detailsList.title == 'DIGITAL'">{{detailsList.remarks}}</div>
      <div class="lable" v-show="detailsList.title == 'DIGITAL'">
        <span v-for="des in detailsDes" :key="des.id">{{des.categoryAttrOpptionName}}</span>
      </div>

      <!-- 生活垃圾 -->
      <div v-show="detailsList.title == 'HOUSEHOLD'">
        <div class="details_rubsh" v-for="item in rubshList" :key="item.id">
          <div class="trash_title">{{item.name}}<span>X {{item.count}}</span></div>
          <div class="trash_item" v-for="data in item.list" :key="data.id">
            <div class="name">{{data.cateName}}<span class="number">¥{{data.price+'/'+data
              .unit}}</span><span class="amount" v-show="detailsList.status4Page=='COMPLETE'">X {{data.amount}}</span></div>
          </div>
          <div class="zero">{{item.categoryName}}</div>
        </div>
        <div class="trash_total_price" v-show="detailsList.status4Page=='COMPLETE'">成交价格<span><span>￥</span>{{listData.price}}</span></div>
        <div class="trash_total_price" v-show="detailsList.status4Page=='COMPLETE'">环保能量<span>{{listData.greenCount}}<span>kg</span></span></div>
      </div>
    </div>
    <div class="details_wrap_belongs">
      <div class="text">本服务由{{detailsList.company?detailsList.company.name:''}}提供</div>
      <div class="text">{{detailsList.company?detailsList.company.tel:''}}</div>
    </div>
    <!-- 已派单状态才有 -->
    <!-- <div class="details_wrap_footbtn" @click="openCode"
         v-show="detailsList.status4Page=='ALREADY'||detailsList.status4Page=='distribute'">确认交易
    </div> -->
    <div class="details_shadow" v-if="showShadow"></div>
    <!-- 取消理由弹窗 -->
    <div class="details_shadow_box" v-if="showOrders">
      <div class="title">请选择取消订单的理由</div>
      <div class="button_holder">
        <input type="radio" id="radio-1" name="radio" class="regular_radio" value="不想卖了" v-model="cancelReason"/><label
        for="radio-1"><i></i>不想卖了</label>
        <input type="radio" id="radio-2" name="radio" class="regular_radio" value="信息填写错误"
               v-model="cancelReason"/><label for="radio-2"><i></i>信息填写错误</label>
        <input type="radio" id="radio-3" name="radio" class="regular_radio" value="估价过低" v-model="cancelReason"/><label
        for="radio-3"><i></i>估价过低</label>
        <input type="radio" id="radio-4" name="radio" class="regular_radio" value="回收员原因" v-model="cancelReason"/><label
        for="radio-4"><i></i>回收员原因</label>
        <input type="radio" id="radio-5" name="radio" class="regular_radio" value="其他原因" v-model="cancelReason"/><label
        for="radio-5"><i></i>其他原因</label>
      </div>
      <div class="button_footer">
        <div class="btn_cancel" @click="closeOrders">取消</div>
        <div class="btn_confirm" @click="submitCancelOrders">确认</div>
      </div>
    </div>
    <!-- 取消成功弹窗 -->
    <div class="details_cancelSucceed_box" v-if="showCancel">取消成功</div>
    <!-- 二维码弹窗 -->
    <div class="details_shadow_code" v-if="showCode">
      <img src="@/assets/icon_delete.png" alt="" class="icon_delete" @click="closeCode">
      <div class="code_text">请将交易二维码出示给回收人员</div>
      <qrCode :url="url"></qrCode>
    </div>
    <!-- 已完成状态弹窗 -->
    <div class="details_shadow_evaluation" v-if="showEvaluation">
      <div class="title" v-show="detailsList.isEvaluated == '0'">我们的服务您满意吗？</div>
      <div class="title" v-show="detailsList.isEvaluated == '1'">我的评价</div>
      <div class="evaStar">
        <ul class="star">
          <li v-for="(itemClass,index) in itemClasses" :key="itemClass.id" :class="itemClass" class="star-item"
              @click="stars(index)"
              track-by="index"></li>
        </ul>
      </div>
      <textarea name="" id="" class="text" v-model="evaluateText" :disabled="detailsList.isEvaluated=='1'"
                placeholder="我们的服务您还满意吗？"></textarea>
      <div class="footer_btn" @click="closeEvaluation" v-show="detailsList.isEvaluated == '1'">关闭</div>
      <div class="footer_btn" @click="setEvaluate" v-show="detailsList.isEvaluated == '0'">提交</div>
    </div>
  </div>
</template>

<script>
  import '@/assets/detailstyle/details.css'
  import api from '@/api/api.js'
  import imgView from '@/components/details/imgView.vue'
  import qrCode from '@/components/details/qrCode.vue'

  export default {
    data() {
      return {
        showShadow: false,
        showOrders: false,
        showEvaluation: false,
        showCode: false,
        showCancel: false,
        score: 5,
        detailsList: {},
        detailsPic: {},
        detailsDes: {},
        rubshList: {},
        cateList: {},
        id: this.$route.query.id,
        cancelReason: '不想卖了',
        evaluateText: '',
        showImgView: false,
        picUrl: [],
        url: '',
        tel: '',
        listData: {},
      }
    },
    mounted() {
      //获取数据
      this.getData();
      //获取评价
      this.getEvaluate();
    },
    components: {
      imgView, qrCode
    },
    computed: {
      //计算属性
      itemClasses() {
        var result = []; // 返回的是一个数组,用来遍历输出星星
        var score = Math.floor(this.score * 2) / 2; // 计算所有星星的数量
        var hasDecimal = score % 1 !== 0; // 非整数星星判断
        var integer = Math.floor(score); // 整数星星判断
        for (var i = 0; i < integer; i++) { // 整数星星使用on
          result.push("on"); // 一个整数星星就push一个CLS_ON到数组
        }
        if (hasDecimal) { // 非整数星星使用half
          result.push("half"); // 类似
        }
        while (result.length < 5) {// 余下的用无星星补全,使用off
          result.push("off");
        }
        return result;
      }
    },
    methods: {
      getData() {
        api.getDetails({
          "app_key": "app_id_1",
          "data": {
            "id": this.id,
            "isEvaluated": "0",
            "status": 0
          },
          token: this.$store.state.token
        }).then((res) => {
          this.listData = res.data;
          var status = res.data.order.status4Page;
          this.picUrl = res.data.orderPicList;
          switch (status) {
            //已接单
            case 'distribute':
              res.data.order.statusClass = 'complete';
              break;
            //已派单
            case 'ALREADY':
              res.data.order.statusClass = 'complete';
              break;
            //待接单
            case 'INIT':
              res.data.order.statusClass = 'waiting';
              break;
            //已派送
            case 'TOSEND':
              res.data.order.statusClass = 'waiting';
              break;
            //已取消
            case 'CANCEL':
              res.data.order.statusClass = 'cancel';
              break;
            //平台已取消
            case 'REJECTED':
              res.data.order.statusClass = 'cancel';
              break;
            //已完成
            case 'COMPLETE':
              res.data.order.statusClass = 'succeed';
              break;
            default:
              break;
          }
          this.detailsList = res.data.order;
          this.rubshList = res.data.list;
          this.cateList = res.data.list.list;
          if(res.data.order.recyclers){
            this.tel = "tel:" + res.data.order.recyclers.tel;
          }
          this.url = res.data.order.orderNo;
          this.detailsPic = res.data.orderPicList;
          this.detailsDes = res.data.OrderItemList;
        }).catch((error) => {
          console.log(error)
        })
      },
      openOrders() {
        this.showShadow = true;
        this.showOrders = true;
        document.querySelector('.details_wrap').style.overflow = 'hidden';
      },
      closeOrders() {
        this.showShadow = false;
        this.showOrders = false;
        document.querySelector('.details_wrap').style.overflow = 'auto';
      },
      openEvaluation() {
        this.showShadow = true;
        this.showEvaluation = true;
        document.querySelector('.details_wrap').style.overflow = 'hidden';
      },
      closeEvaluation() {
        if ('detailsList.isEvaluated=="1"') {
          this.showShadow = false;
          this.showEvaluation = false;
          document.querySelector('.details_wrap').style.overflow = 'auto';
          return
        }
        this.setEvaluate();
        this.showShadow = false;
        this.showEvaluation = false;
        document.querySelector('.details_wrap').style.overflow = 'auto';
      },
      openCode() {
        this.showShadow = true;
        this.showCode = true;
        document.querySelector('.details_wrap').style.overflow = 'hidden';
      },
      closeCode() {
        this.showShadow = false;
        this.showCode = false;
        document.querySelector('.details_wrap').style.overflow = 'auto';
      },
      stars(index) {
        if (this.detailsList.isEvaluated === '0') {
          this.score = index + 1
        }
      },
      timedMsg() {
        setTimeout(() => {
          this.showCancel = false;
          this.showShadow = false;
          document.querySelector('.details_wrap').style.overflow = 'auto';
          this.$router.push({
            path: '/orders'
          })
        }, 1000);
      },
      submitCancelOrders() {
        api.cancelOrders({
          "app_key": "app_id_1",
          "data": {
            "id": this.id,
            "cancelReason": this.cancelReason,
            "isEvaluated": "0"
          },
          token: this.$store.state.token
        }).then((res) => {
          console.log(res.data);
          this.showOrders = false;
          this.showCancel = true;
          this.timedMsg();
        }).catch((error) => {
          console.log(error)
        })
      },
      getEvaluate() {
        api.getEvaluate({
          "app_key": "app_id_1",
          "data": {
            "id": this.id,
          },
          token: this.$store.state.token
        }).then((res) => {
          console.log(res);
          if (res.data) {
            this.score = res.data.score;
            this.evaluateText = res.data.content;
          } else {
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      setEvaluate() {
        api.setEvaluate({
          "app_key": "app_id_1",
          "data": {
            "recyclerId": 0,
            "orderId": this.id,
            "score": this.score,
            "content": this.evaluateText,
            "memberId": 0
          },
          token: this.$store.state.token
        }).then((res) => {
          this.$router.push({
            path: '/orders'
          })
          // if (res.status=="success") {
          //   this.$router.push({
          //     path: '/orders'
          //   })
          //   this.getData();
          // }
        }).catch((error) => {
          console.log(error)
        })
      },
      toggleImgView(v) {
        this.showImgView = v
      }
    }
  }
</script>
