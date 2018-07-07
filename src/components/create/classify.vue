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
    <div class="content clearfix" v-show="showUl">
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
        <ul class="linlei_list clearfix">
          <li class="item  fl" v-for="(item,index) in subList" :key="item.id" @click="getAddressInfo(item,index)">
            <router-link :to="'/typeSelect/'+addRessId.id">
              <img :src=item.icon alt="">
              <span>{{item.name}}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- 生活垃圾 -->
    <div class="content clearfix" v-show="!showUl">
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
          <img :src="menuListImg" alt="" class="classify_banner">
          <div class="classify_title"><i></i>回收类型<span>（以下单价为上海市平均回收价）</span></div>
          <div class="classify_main">
            <div class="classify_item" v-for="item in subList" :key="item.id">
              <img :src="item.icon?item.icon:''" alt="">
              <div class="name">{{item.name}}</div>
              <div class="price">¥<span>{{item.price}}/{{item.unit}}</span>
                <div class="calculation">
                  <span class="less round" v-if="item.number" @click="less(item)">-</span>
                  <span v-if="item.number">{{item.number}}</span>
                  <span class="plus round" @click="plus(item)">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="classify_footer" v-show="!showUl">
      <div class="f_title">
        <div class="icon"><img src="@/assets/class_icon.png" alt=""><i>{{numTotal}}</i></div>
        <div class="name">预估金额：<span class="price">￥<span>{{priceTotal.toFixed(2)}}</span></span></div>
      </div>
      <div class="r_btn" @click="openAlert">一键回收</div>
    </div>

    <div class="classify_foot" v-show="!showUl&&!comIsNull">您所在街道暂无回收企业</div>

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
      <div @click="closeOrdersPush" class="btn">仍然下单</div>
      <div @click="closeOrders" class="btn">我在攒一攒吧</div>
    </div>

    <div class="class_shadow_box" v-if="showAlert2">
      <div class="title">回收小贴士</div>
      <div class="remind">不精确知道您需要回收的重量或者个数？没关系！您只需根据预估输入待回收物的大约重量或个数，实际成交重量和件数将以上门回收人员实际计量为准！</div>
      <div @click="closeOrders(false)" class="btn">我知道了</div>
      <div @click="closeOrders(true)" class="btn nocolor">不再提醒</div>
    </div>

  </div>

</template>
<script>
  import api from '@/api/api.js'
  import '@/assets/createstyle/tool.css'
  import '@/assets/createstyle/classify.css'
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        comIsNull: false,
        menulist: '',
        isId: '1',
        subList: '',
        isActive: '0',
        showUl: true,
        showShadow: false,
        showAlert1: false,
        showAlert2: false,
        menuListImg: '',
        selectProductList: window.sessionStorage.getItem('productList') ?
          JSON.parse(window.sessionStorage.getItem('productList')) : [],//上传成功要清掉
        priceTotal: window.sessionStorage.getItem('productTotal') ? JSON.parse(window.sessionStorage.getItem('productTotal')).priceTotal : 0,
        //上传成功要清掉
        numTotal: window.sessionStorage.getItem('productTotal') ? JSON.parse(window.sessionStorage.getItem('productTotal')).numTotal : 0
      }
    },
    computed: mapGetters({
      addRessId: 'addRessId',
      adressInfo: 'adressInfo',
      token: "token"
    }),
    mounted() {
      this.getClassFiy();
    },
    methods: {
      getClassFiy(value){
        api.getClassify({
          "app_key": "app_id_1",
          "data": {
            "level": "0",
            "title": value ? 'HOUSEHOLD' : 'DIGITAL'
          },
          token: this.token
        }).then((res) => {
          this.menulist = res.data;
          this.menuListImg = res.data[0].icon;
          this.isId = res.data[0].id;
          this.$store.dispatch('getIsTitle',res.data[0].title);
          api.getSubList({
            "app_key": "app_id_1",
            "data": {
              "id": this.isId,
              "communityId": this.adressInfo.communityId,
              "title": value ? 'HOUSEHOLD' : 'DIGITAL'
            },
            token: this.token
          }).then((res) => {
            this.comIsNull = res.data.comIsNull;
            res.data.ComCatePriceList.map((items) => {
              items.pName = this.menulist[0].name;
              items.pId = this.menulist[0].id;
              const haveIn = this.selectProductList.findIndex((el) => {
                return el.id === items.id
              });
              if (haveIn > -1) {
                items.number = this.selectProductList[haveIn].number
              } else {
                items.number = 0
              }
            });
            this.subList = res.data.ComCatePriceList;
          }).catch((erro) => {
            console.log(erro)
          })
        }).catch((erro) => {
          console.log(erro)
        });
      },
      getList(id, index, value) {
        this.isId = id;
        this.menuListImg = this.menulist[index].icon;
        this.isActive = index;
        api.getSubList({
          "app_key": "app_id_1",
          "data": {
            "id": this.isId,
            "communityId": this.adressInfo.communityId,
            "title": value ? 'HOUSEHOLD' : 'DIGITAL'
          },
          token: this.token
        }).then((res) => {
          this.comIsNull = res.data.comIsNull;
          res.data.ComCatePriceList.map((items) => {
            items.pName = this.menulist[index].name;
            items.pId = this.menulist[index].id;
            const haveIn = this.selectProductList.findIndex((el) => {
              return el.id === items.id
            });
            if (haveIn > -1) {
              items.number = this.selectProductList[haveIn].number
            } else {
              items.number = 0
            }
          });
          this.subList = res.data.ComCatePriceList;
        }).catch((erro) => {
          console.log(erro)
        })
      },
      getAddressInfo(item, id) {  //获取子集列表里的ID
        this.$store.dispatch('setClassItemId', this.isId);
        this.$store.dispatch('setAddRessId', item);
        //获取地址信息
        api.MemberAddress({
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
        this.getClassFiy(!type);
      },
      openAlert() {
        this.total();
        if (this.priceTotal > 50 || this.numTotal > 30) {
          window.sessionStorage.setItem('productList', JSON.stringify(this.selectProductList));
          window.sessionStorage.setItem('productTotal', JSON.stringify({
            priceTotal: this.priceTotal,
            numTotal: this.numTotal
          }));
          this.$router.push({
            path: '/uploadimage1',
          });
          return
        }
        this.showShadow = true;
        this.showAlert1 = true;
      },
      openAlert1() {
        const status = window.localStorage.getItem('hasAgree');
        if (status)return;
        this.showShadow = true;
        this.showAlert2 = true;
      },
      closeOrders(status) {
        if (status) {
          window.localStorage.setItem('hasAgree', status)
        }
        this.showShadow = false;
        this.showAlert1 = false;
        this.showAlert2 = false;
      },
      closeOrdersPush() {
        this.total();
        window.sessionStorage.setItem('productList', JSON.stringify(this.selectProductList));
        window.sessionStorage.setItem('productTotal', JSON.stringify({
          priceTotal: this.priceTotal,
          numTotal: this.numTotal
        }));
        this.$router.push({
          path: '/uploadimage1'
        })
      },
      plus(item){
        this.getAddressInfo(item);
        const haveIn = this.selectProductList.findIndex((el) => {
          return el.id === item.id
        });
        if (haveIn > -1) {
          this.selectProductList[haveIn].number += 1;
          item.number += 1
        } else {
          const initItem = Object.assign(item, { number: 1 });
          this.selectProductList.push(this.deepCopy(initItem));
        }
        this.total();
        this.openAlert1()
      },
      less(item){
        const haveIn = this.selectProductList.findIndex((el) => {
          return el.id === item.id
        });
        this.selectProductList[haveIn].number -= 1;
        item.number -= 1;
        if (item.number === 0) {
          this.selectProductList.splice(haveIn, 1)
        }
        this.total();
      },
      total(){
        let priceTotal = 0;
        let numTotal = 0;
        this.selectProductList.map((items) => {
          priceTotal += items.number * items.price;
          numTotal += items.number;
        });
        this.priceTotal = priceTotal;
        this.numTotal = numTotal;
      },
      deepCopy(source) {
        let result = {};
        for (let key in source) {
          result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key];
        }
        return result;
      }
    }
  }
</script>

