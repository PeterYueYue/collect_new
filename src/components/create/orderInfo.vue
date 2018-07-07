<template>
  <div class="orderinfo">
    <div class="userInfoBox">
      <ul class="userInfo">
        <li class="item clearfix">
          <strong class="fl">姓名:</strong>
          <div class="nameBox fl">
            <div class="addressSt">{{adressInfo.name}}</div>
          </div>
        </li>
        <li class="item clearfix">
          <strong class="fl">电话:</strong>
          <div class="nameBox  fl">
            <div class="addressSt">{{adressInfo.tel}}</div>
          </div>
        </li>
        <li class="item clearfix">
          <strong class="fl">地址:</strong>
          <div class="nameBox fl">
            <div class="addressSt">{{adressInfo.address}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="collectTimeAndPrice">
      <div class="pickUp">
        <strong>期望上门时间:</strong>
        <time :class="{textColor:infoTm}">{{time}}{{infotime}}</time>
        <div @click="setTime" class="dataBlock">
          <a href="javaScript:;">
          </a>
        </div>
      </div>
      <div class="estimatePrice clearfix">
        <strong class="fl">回收估计:</strong>
        <span class="fr">￥{{isTitle === 'DIGITAL' ? futurePrice : garbagePrice}}</span>
      </div>
    </div>
    <div class="information">实际成交价格以回收人员上门计量验收为准</div>
    <div class="nextbutton">
      <!--<a v-if="isOk.timeIsOk == false" class="dontEnter">提交订单</a>-->
      <a href="javascript:;" v-if="isOk.timeIsOk == false" @click="completeAnOrder" class="yesEnter">提交订单</a>
    </div>

    <div class="information">提交订单后将有工作人员可能和您电话沟通，请保持手机畅通</div>

    <router-link to="home">
      <div class="o_info_btn">放弃订单</div>
    </router-link>

    <div class="bottomInformation">
      <div>本服务由{{detailsList?detailsList.name:''}}提供</div>
      <div>{{detailsList?detailsList.tel:''}}</div>
    </div>

    <div v-show="show" class="changeTimeBox">
      <div class="btnBox">
        <h5>请选择上门具体时间段</h5>
        <span @click="setTimeInfoAm()">上午</span>
        <span @click="setTimeInfoPm()">下午</span>
      </div>
    </div>

    <!-- 弹窗 -->
    <div class="order_info_shadow" v-if="showShadow"></div>
    <div class="order_info_shadow_box" v-if="showNul">
      <div>你所选的小区没有企业</div>
      <div class="order_info_shadow_btn" @click="closeShadow">确定</div>
    </div>

  </div>
</template>
<script>
  import '@/assets/createstyle/tool.css'
  import '@/assets/createstyle/orderInfo.css'
  import api from '@/api/api.js'
  import {mapGetters} from 'vuex';
  // import DataTime from '@/components/create/common/dataTime.vue'
  export default {
    data() {
      return {
        datetime5: '2018-01-11 上午',
        time: '请选择上门回收时间 ',
        show: false,
        infoTm: '',
        infotime: '',
        isOk: {
          timeIsOk: false
        },
        iscolor: false,
        addressInfo: {
          areaId: '',
          address: ''
        },
        detailsList: {},
        showShadow: false,
        showNul: false,
        idAndListList: [],
        garbagePrice: JSON.parse(window.sessionStorage.getItem('productTotal')).priceTotal
      }
    },
    mounted() {
      this.getCompany();
      let productList = JSON.parse(window.sessionStorage.getItem('productList'));
      let orderList = [];
      productList.map((items) => {
        let index = orderList.findIndex((el) => {
          return el.categoryParentId === items.pId
        });
        if (index > -1) {
          orderList[index].idAndAmount.push({
            amount: items.number,
            categoryId: items.id,
            categoryName: items.name,
          });
          orderList[index].categoryParentId = items.pId;
          orderList[index].categoryParentName = items.pName;
        } else {
          orderList.push({
            categoryParentName: items.pName, idAndAmount: [{
              amount: items.number,
              categoryId: items.id,
              categoryName: items.name,
            }], categoryParentId: items.pId
          })
        }
      });
      this.idAndListList = orderList;
    },
    computed: mapGetters({
      futurePrice: 'futurePrice',                //预估价格
      appointmentTime: 'appointmentTime',        //上门预约时间
      selectedInfo: 'selectedInfo',              //用来存储 地址选择 已选择信息
      imgsAddress: 'imgsAddress',                //用户上传图片信息
      addRessId: 'addRessId',                    //一级分类信息
      categoryAttrOppIds: 'categoryAttrOppIds',  //分类属性信息
      orderPic: 'orderPic',                      //图片信息分类
      textareaValue: 'textareaValue',            //图片物品描述
      token: 'token',
      addResstext: 'addResstext',                //用户默认地址
      adressInfo: 'adressInfo',                  //新地址信息
      classID: 'classID',                        //分类父级Id
      isTitle: 'isTitle',                        //分类title
    }),
    created() {
      if (this.imgsAddress.length < 1) {
        this.$router.push({path: "/home"})
      }
      // if (this.selectedInfo.areaItem.areaName && this.selectedInfo.subdistyictItem.areaName && this.selectedInfo.cellseletionItem.address && this.selectedInfo.cellseletionItem.name) {
      //   this.addressInfo.address = this.selectedInfo.areaItem.areaName + this.selectedInfo.subdistyictItem.areaName +
      //     this.selectedInfo.cellseletionItem.address + this.selectedInfo.cellseletionItem.name;
      //   this.addressInfo.areaId = this.selectedInfo.areaItem.id;
      //   this.addressInfo.id = this.selectedInfo.cellseletionItem.id;
      //   this.$store.dispatch('changeAddressText', this.addressInfo)
      // }
    },
    methods: {
      getCompany() {
        api.companyByIds({
          "app_key": "app_id_1",
          "data": {
            "communityId": this.adressInfo.communityId,
            "categoryId": this.classID,
            "isEvaluated": "0"
          },
          token: this.$store.state.token
        }).then((res) => {
          console.log(res);
          this.detailsList = res.data;
        }).catch((error) => {
          console.log(error)
        })
      },
      completeAnOrder() {
        api.completeOrder({
          "app_key": "app_id_1",
          token: this.token,
          "data": {
            "address": this.adressInfo.address,
            "areaId": this.adressInfo.areaId,
            "communityId": this.adressInfo.communityId,
            "streetId": this.adressInfo.streetId,
            "fullAddress": this.adressInfo.houseNumber,
            "arrivalPeriod": this.infoTm,
            "linkMan": this.adressInfo.name,
            "tel": this.adressInfo.tel,
            "orderItemBean": {
              "categoryAttrId": 0,
              "orderId": 0,
              "categoryAttrOppId": 0,
              "categoryAttrOppIds": this.categoryAttrOppIds,
              "categoryId": 0
            },
            "level": "0",
            "orderPic": {
              "new": true,
              "picUrl": this.orderPic.picUrl,
              "orderId": 0,
              "origPic": this.orderPic.origPic,
              "smallPic": this.orderPic.smallPic,
              "delFlag": "0"
            },
            "isEvaluated": "0",
            "unit": "计量单位",
            "arrivalTime": this.time,
            "price": this.isTitle === 'DIGITAL' ? this.futurePrice : this.garbagePrice,
            "qty": 9999,
            "categoryId": this.addRessId.id,
            "categoryParentId": this.classID,
            "remarks": this.textareaValue,
            //垃圾回收新增的字段
            "idAndListList": this.idAndListList,
            "title": this.isTitle,
          }
        }).then((res) => {
          this.$store.dispatch('clear');
          if (res.data == "SUCCESS") {
            alert("恭喜您 下单成功");
            // this.$router.push({path: "/home"})
          } else {
            this.showShadow = true;
            this.showNul = true;
          }
        }).catch((err) => {
          alert(err)
        })
      },
      setTimeInfoAm() {
        this.show = false;
        this.infoTm = "am";
        this.infotime = "上午"
      },
      setTimeInfoPm() {
        this.show = false;
        this.infoTm = "pm";
        this.infotime = "下午"
      },
      backbtn() {
        this.$router.go(-1);
      },
      setTime() {
        var antThis = this;
        var startTime1 = new Date();
        var startTime2 = new Date(startTime1);
        startTime2.setDate(startTime1.getDate() + 1);
        var endTime1 = new Date();
        var endTime2 = new Date(endTime1);
        endTime2.setDate(endTime1.getDate() + 8);
        var startTime = startTime2.getFullYear() + "-" + (startTime2.getMonth() + 1) + "-" + startTime2.getDate();
        var endTime = endTime2.getFullYear() + "-" + (endTime2.getMonth() + 1) + "-" + endTime2.getDate();
        ap.datePicker({
          formate: 'yyyy-MM-dd',
          currentDate: startTime,
          startDate: startTime,
          endDate: endTime
        }, function (res) {
          if (res.date) {
            antThis.show = true;
            antThis.time = res.date;
            antThis.isOk.timeIsOk = true;
            this.iscolor = true;
          }
        });
      },
      closeShadow() {
        this.showShadow = false;
        this.showNul = false;
        // this.$router.push({path: "/home"})
      },
    }
  }
</script>
