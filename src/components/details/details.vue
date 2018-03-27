<template>
  <div class="details_wrap">
    <div class="details_wrap_item">
      <div class="time">订单号：{{detailsList.orderNo}}<span :class="detailsList.statusClass">{{detailsList.statusPage}}</span></div>
      <div class="date">时间：{{detailsList.createDatePage}}</div>
      <div class="content">
        <img :src="detailsList.category.icon" alt="" class="pic">
        <div>
          <div class="name">{{detailsList.category.name}}</div>
          <div class="price">预估价格：<span>￥{{detailsList.price}}</span></div>
        </div>
      </div>
    </div>
    <div class="details_wrap_time">{{detailsList.arrivalTimePage}}<span class="btn_cancel" @click="openOrders" v-show="detailsList.status!=='COMPLETE'&&detailsList.status!=='CANCEL'">取消订单</span></div>
    <!-- 待接单状态无此div -->
    <!-- 已取消 -->
    <div class="details_wrap_reason" v-show="detailsList.status=='CANCEL'||detailsList.status=='REJECTED'">
       <div class="why">取消原因</div>
       <div class="answer">{{detailsList.cancelReason}}</div>
    </div>
    <!-- 已完成，已派单 -->
    <div class="details_wrap_reason" v-show="detailsList.status=='COMPLETE'||detailsList.status=='TOSEND'">
      <div class="why">回收人员{{detailsList.recyclerId}}号<span class="btn_view" @click="openEvaluation" v-show="detailsList.status=='COMPLETE'">评价/查看评价</span></div>
      <div class="tel"><img src="@/assets/icon_tel.png" alt="" class="icon_tel">联系电话：{{detailsList.tel}}</div>
    </div>
    <!-- 已接单 -->
    <div class="details_wrap_reason" v-show="detailsList.status=='ALREADY'">
      <div class="why">派单详情</div>
      <div class="answer">本订单已由爱回收有限公司接单，工作人员将在1-3个工作日内与您联系，请保持电话畅通</div>
    </div>
    <div class="details_wrap_info">
      <div class="title">询价信息</div>
      <div class="picture">
        <img :src="pic.picUrl" alt="" v-for="pic in detailsPic"  :key="pic.type"  >
      </div>
      <div class="description">{{detailsList.cancelReason}}</div>
      <div class="lable">
        <span v-for="des in detailsDes"  :key="des.type"   >{{des.categoryAttrOpptionName}}</span>
      </div>
    </div>
    <div class="details_wrap_belongs">
      <div class="text">本服务由爱回收有限公司提供</div>
      <div class="text">400-8288-999</div>
    </div>
    <!-- 已派单状态才有 --><div class="details_wrap_footbtn" @click="openCode" v-show="detailsList.status=='TOSEND'">确认交易</div>
    <!-- 取消理由弹窗 -->
    <div class="details_shadow" v-if="showShadow"></div>
    <div class="details_shadow_box" v-if="showOrders">
      <div class="title">请选择取消订单的理由</div>
      <div class="button_holder">
        <input type="radio" id="radio-1" name="radio" class="regular_radio"/><label for="radio-1"></label>不想卖了<br />
        <input type="radio" id="radio-2" name="radio" class="regular_radio" /><label for="radio-2"></label>信息填写错误<br />
        <input type="radio" id="radio-3" name="radio" class="regular_radio" /><label for="radio-3"></label>估价过低<br />
        <input type="radio" id="radio-4" name="radio" class="regular_radio" /><label for="radio-4"></label>回收员原因<br />
        <input type="radio" id="radio-5" name="radio" class="regular_radio" /><label for="radio-5"></label>其他原因
      </div>
      <div class="button_footer">
        <div class="btn_cancel" @click="closeOrders">取消</div>
        <div class="btn_confirm" @click="submitCancelOrders">确认</div>
      </div>
    </div>
    <!-- 二维码弹窗 -->
    <div class="details_shadow_code" v-if="showCode">
      <img src="@/assets/icon_delete.png" alt="" class="icon_delete" @click="closeCode">
      <div class="code_text">请将交易二维码出示给回收人员</div>
      <img src="@/assets/code.png" alt="" class="pic_code">
    </div>
    <!-- 已完成状态弹窗 -->
    <div class="details_shadow_evaluation" v-if="showEvaluation">
      <div class="title">我们的服务您满意吗？</div>
      <div class="evaStar">
        <ul class="star">
        <li v-for="(itemClass,index) in itemClasses" :key="itemClass.type"  :class="itemClass" class="star-item" @click="stars(index)" track-by="index"></li>
        </ul>
      </div>
      <textarea name="" id="" class="text">我们的服务您还满意吗？</textarea>
      <div class="footer_btn" @click="closeEvaluation">提交</div>
    </div>
  </div>
</template>

<script>
  import '@/components/details/details.css'
  import api from '@/api/api.js'

  export default {
    data(){
      return {
        showShadow: false,
        showOrders: false,
        showEvaluation: false,
        showCode: false,
        score: 4,
        detailsList: {},
        detailsPic: {},
        detailsDes: {},
        id: this.$route.query.id,
      }
    },
    mounted() {
      //获取数据
      api.getDetails({
        "app_key": "app_id_1",
        "data": {
          "id": this.id,
          "isEvaluated": "0",
          "status": 0
        },
      }).then((res) => {
        console.log(res.data);
        var status = res.data.order.statusPage;
        switch (status) {
          case '已接单':
            res.data.order.statusClass = 'succeed';
            break;
          case '已派单':
            res.data.order.statusClass = 'complete';
            break;
          case '待接单':
            res.data.order.statusClass = 'waiting';
            break;
          case '已取消':
            res.data.order.statusClass = 'cancel';
            break;
          case '平台已取消':
            res.data.order.statusClass = 'cancel';
            break;
          case '已完成':
            res.data.order.statusClass = 'succeed';
            break;
          default:
            break;
        }
        this.detailsList = res.data.order;
        this.detailsPic = res.data.orderPicList;
        this.detailsDes = res.data.OrderItemList;
      }).catch((erro) => {
        console.log(erro)
      })
    },
    computed:{ //计算属性
      itemClasses(){
        var result = []; // 返回的是一个数组,用来遍历输出星星
        var score = Math.floor(this.score * 2 ) / 2; // 计算所有星星的数量
        var hasDecimal = score % 1 !== 0; // 非整数星星判断
        var integer = Math.floor(score); // 整数星星判断
        for(var i=0;i<integer;i++){ // 整数星星使用on
          result.push("on"); // 一个整数星星就push一个CLS_ON到数组
        }
        if(hasDecimal){ // 非整数星星使用half
          result.push("half"); // 类似
        } 
        while(result.length < 5){// 余下的用无星星补全,使用off
          result.push("off");
        }
        return result;
      }
    },
    methods:{
      openOrders(){
        this.showShadow = true;
        this.showOrders = true;
      },
      closeOrders(){
        this.showShadow = false;
        this.showOrders = false;
      },
      openEvaluation(){
        this.showShadow = true;
        this.showEvaluation = true;
      },
      closeEvaluation(){
        this.showShadow = false;
        this.showEvaluation = false;
      },
      openCode(){
        this.showShadow = true;
        this.showCode = true;
      },
      closeCode(){
        this.showShadow = false;
        this.showCode = false;
      },
      stars(index){
        this.score = index + 1
      },
      submitCancelOrders(){
        api.cancelOrders({
          "app_key": "app_id_1",
          "data": {
            "id": this.id,
            "cancelReason": "时间太紧",
            "isEvaluated": "0"
          },
        }).then((res) => {
          console.log(res.data);
          this.showShadow = false;
          this.showOrders = false;
        }).catch((erro) => {
          console.log(erro)
        })
      },
    }
  }
</script>
