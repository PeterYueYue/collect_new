<template>
  <div class="classify">
    <div class="classify_head">
      <ul>
        <span class="line"></span>
        <li :class="{ cur: !showUl }" @touchstart="openUl(false,'waste')"><span>生活垃圾</span></li>
        <li :class="{ cur: showUl }" @touchstart="openUl(true,'appliances')"><span>家电数码</span></li>
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
          @touchstart="getList(item.id,index)"
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
          <li class="item  fl" v-for="(item,index) in subList" :key="item.id" @touchstart="getAddressInfo(item,index)">
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
          @touchstart="getList(item.id,index)"
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
          <img :src="menuListImg" alt="" class="classify_banner" @touchstart="showShadow = true ; showAlert1 = true">
          <div @touchstart="showShadow = true ; showAlert1 = true" class="questions">
            <span></span> 什么是{{questionTitle}}
          </div>

          <div class="classify_main">
            <div class="classify_title" v-show="subList.length>0"><i></i>回收类型<span>（以下单价为上海市平均回收价）</span></div>
            <div class="classify_item" v-for="(item,index) in subList" :key="item.id">
              <img :src="item.icon?item.icon:''" alt="">
              <div class="name">{{item.name}}</div>
              <div class="price">
                ¥<span>{{item.price}}/<span class="danwei">{{item.unit}}</span></span>

                <!-- 有重量和价格单位的 -->
                <!-- <div class="calculation">
                  <span class="less round" v-if="item.number" @touchstart="less(item)">-</span>
                  <span v-if="item.number" class="class_number">{{item.number}}</span>
                  <span class="plus round" @touchstart="plus(item)">+</span>
                </div> -->
              </div>
              <div

                    @touchstart= addProduct1Start
                    @touchmove = addProduct1Move
                    @touchend  = addProduct1End(item,index)
                    v-bind:class="{ checked1: item.checked == '1'}"
                    class="optbtn">


                <div  class="btn"></div>
              </div>
            </div>
            <div class="classify_title"><i></i>上门回收服务 <br/><span>（由于价值较低，暂无回收价格，请回收小哥带走，可增加绿色环保积分）</span></div>
            <div class="classify_item" v-for="  (item,index) in noPriceList" :key="item.ids">
              <img id="shopImg" :src="item.icon?item.icon:''" alt="">
              <!-- <img  :src="item.icon?item.icon:''" alt=""> -->


              <div class="name">{{item.name}}</div>
              <div v-if="item.price !== 0" class="price">
                ¥<span>
                  {{item.price}}/{{item.unit}}
                </span>
              </div>
              <div class="xiaoge">麻烦回收小哥带走</div>
              <div v-bind:class="{ checked: item.checked == '1' }" class="optbtn1">
                <div
                      @touchstart= addProductStart
                      @touchmove = addProductMove
                      @touchend  = addProductEnd(item,index)
                     class="btn"></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 回收车start -->
    <car  v-show="isShowCar   ==    'on'"
          :selectProductList  =     "selectProductList"
          @deleItem           =     "less"
          @closeCar           =     'closeCar'
          @clearAllItem       =     "clearAllItem"
          class               =     "carBox"
    ></car>
    <!-- 回收车  end -->
    <div class="classify_footer" v-show="!showUl">
      <div class="f_title">
        <div  @touchstart="closeCar('on')"  class="icon"><img id="carbox" src="@/assets/class_icon.png" alt=""><i>{{numTotal}}</i></div>
        <div class="name">已选类型数量：<span class="price"><span>{{numTotal}}</span></span></div>
      </div>
      <div class="r_btn" :class="{disable:numTotal <= 0}" @touchstart="openAlert">一键回收</div>
    </div>

    <div class="classify_foot" v-show="!showUl&&comIsNull==='1'">您所在小区暂未开通生活垃圾回收服务</div>
    <router-link to="/addAdress">
      <div class="classify_foot" v-show="!showUl&&comIsNull==='0'">您暂未添加回收地址,请去添加地址</div>
    </router-link>
    <router-link to="/addAdress">
      <div class="classify_foot" v-show="showUl&&comIsNull==='0'">您暂未添加回收地址,请去添加地址</div>
    </router-link>


    <!-- 弹窗 -->
    <div class="class_shadow" v-if="showShadow"></div>
    <div class="class_shadow_box" v-if="showAlert1">
      <div class="title">{{recTypeExp}}?</div>
      <!-- <div class="remind">由于您本次下单未达到起收标准。若继续下单预约，平台工作人员可能会联系您，希望您能继续攒多一点再进行预约回收哦！感谢您对环保事业的奉献精神！</div> -->
      <!-- <div class="remind">由于您本次下单未达到起收标准。若继续下单预约，平台工作人员可能会联系您，希望您能继续攒多一点再进行预约回收哦！感谢您对环保事业的奉献精神！</div> -->
      <div class="text" v-for="item in text" :key="item.id">{{item}}</div>

      <div @touchstart="showShadow = false ;showAlert1= false " class="btn">我知道了</div>
      <!-- <div @click="closeOrders" class="btn">我在攒一攒吧</div> -->
    </div>

    <div class="class_shadow_box" v-if="showAlert2">
      <div class="title">回收小贴士</div>
      <div class="remind">不精确知道您要回收的重量或者个数？<br/>
        没关系！<br/>
        您只需根据预估输入待回收物的大约重量或个数，实际成交重量和件数将以上门回收人员实际计量为准！
      </div>
      <!--<div @click="closeOrders(false)" class="btn">我知道了</div>-->
      <!--<div @click="closeOrders(true)" class="btn nocolor">不再提醒</div>-->
      <div @touchstart="closeOrders(true)" class="btn1">我知道了</div>
    </div>

  </div>

</template>
<script>
  import api from '@/api/api.js'
  import '@/assets/createstyle/tool.css'
  import '@/assets/createstyle/classify.css'
  import {mapGetters} from 'vuex';
  import $ from 'jquery';
  import Car from './car/car.vue'

  export default {
    components:{
      Car
    },
    data() {
      return {
        recTypeExp: '',
        comIsNull: '',
        menulist: '',
        isId: '1',
        subList: '',
        noPriceList: '',
        isActive: '0',
        showUl: false,
        showShadow: false,
        showAlert1: false,
        showAlert2: false,
        menuListImg: '',
        questionTitle: '',
        isShowCar:'off',
        text: [],
        justTouch : '',
        information:{},
        selectProductList: window.sessionStorage.getItem('productList') ?
          JSON.parse(window.sessionStorage.getItem('productList')) : [],//上传成功要清掉
        priceTotal: window.sessionStorage.getItem('productTotal') ? JSON.parse(window.sessionStorage.getItem('productTotal')).priceTotal : 0,
        //上传成功要清掉
        numTotal: window.sessionStorage.getItem('productTotal') ? JSON.parse(window.sessionStorage.getItem('productTotal')).numTotal : 0,
        unitUnitG: window.sessionStorage.getItem('productTotal') ? JSON.parse(window.sessionStorage.getItem('productTotal')).unitUnitG : 0,
        unitUnitK: window.sessionStorage.getItem('productTotal') ? JSON.parse(window.sessionStorage.getItem('productTotal')).unitUnitK : 0,
      }
    },
    computed: {
      ...mapGetters(['addRessId', 'adressInfo', 'token', 'recyclingType']),
    },
    watch: {
      recyclingType(newValue, oldValue) {
        console.log(newValue, oldValue)
        if (newValue == 'waste') {
          this.$store.dispatch('clear');
          this.isActive = '0'
        }
        if (oldValue == 'waste') {
          this.isActive = '0'
          window.sessionStorage.removeItem('productList');
          window.sessionStorage.removeItem('productTotal');
          this.numTotal = 0;
        }
      }
    },
    mounted() {
      this.$store.dispatch('recyclingType', 'waste');
      this.getClassFiy('HOUSEHOLD');
      this.total();
      document.title = "回收分类"
    },
    methods: {
      getClassFiy(value) {
        api.getClassify({
          "app_key": "app_id_1",
          "data": {
            "level": "0",
            "title": value ? 'HOUSEHOLD' : 'DIGITAL'
          },
          token: this.token
        }).then((res) => {
          this.menulist = res.data;
          this.recTypeExp = res.data[0].recTypeExp;
          this.text = res.data[0].recNotes;
          this.menuListImg = res.data[0].icon;
          this.questionTitle = res.data[0].name;
          this.isId = res.data[0].id;
          this.$store.dispatch('getIsTitle', res.data[0].title);
          api.getSubList({
            "app_key": "app_id_1",
            "data": {
              "id": this.isId,
              "communityId": this.adressInfo ? this.adressInfo.communityId : '',
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

            // 默认给每一个商品增加一个点击状态
            this.subList = res.data.ComCatePriceList.map(e => {
              e.checked = false
              e.pName = this.menulist[0].name;
              e.pId = this.menulist[0].id;
              return e
            });
            this.noPriceList = res.data.ComCateNoPriceList.map(e => {
              e.checked = false
              e.pName = this.menulist[0].name;
              e.pId = this.menulist[0].id;
              return e
            })

            // 处理刷新后的选择状态；
            this.selectProductList.forEach(e => {
              this.subList = this.subList.map( k => {
                if(e.id == k.id){k.checked = e.checked}
                return k;
              })
              this.noPriceList = this.noPriceList.map( k => {
                if(e.id == k.id){k.checked = e.checked}
                return k;
              })

            })

          }).catch((erro) => {
            console.log(erro)
          })
        }).catch((erro) => {
          console.log(erro)
        });
      },
      getList(id, index,state) {
        // 恢复列表元素的滚动位置

        if(!state){
          $(".linlei_list").animate({scrollTop: '0'}, 50);
          /*******************************/
        }
        
        this.isId = id;
        this.recTypeExp = this.menulist[index].recTypeExp;
        this.text = this.menulist[index].recNotes;
        this.menuListImg = this.menulist[index].icon;
        this.questionTitle = this.menulist[index].name;
        this.isActive = index;
        api.getSubList({
          "app_key": "app_id_1",
          "data": {
            "id": this.isId,
            "communityId": this.adressInfo ? this.adressInfo.communityId : '',
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

          let resDataList = JSON.parse(window.sessionStorage.getItem('productList'));

          this.subList = res.data.ComCatePriceList.map(e => {
            if (resDataList) {
              resDataList.map(k => {
                if (e.name !== k.name && !e.checked) {
                  e.checked = false
                } else {
                  e.checked = true
                }
              })
            }
            e.pName = this.menulist[index].name;
            e.pId = this.menulist[index].id;
            return e
          });

          if (res.data.ComCateNoPriceList) {
            this.noPriceList = res.data.ComCateNoPriceList.map(el => {
              if (resDataList) {
                resDataList.map(k => {
                  if (el.name !== k.name && !el.checked) {
                    el.checked = false
                  } else {
                    el.checked = true
                  }
                })
              }
              el.pName = this.menulist[index].name;
              el.pId = this.menulist[index].id;
              return el
            })
          }
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
      openUl(type, household) {
        this.$store.dispatch('recyclingType', household);
        this.showUl = type;
        this.getClassFiy(!type);
      },
      openAlert() {

        if (this.numTotal <= 0) {
          return
        }
        this.total();
        let unitUnitG = 0;
        let unitUnitK = 0;
        this.selectProductList.map((items) => {
          if (items.unit === '个') {
            unitUnitG += items.number;
          } else if (items.unit === 'kg') {
            unitUnitK += items.number;
          }
        });
        this.unitUnitG = unitUnitG;
        this.unitUnitK = unitUnitK;
        if (this.priceTotal > 50 || this.unitUnitK > 10 || this.unitUnitG > 30) {
          window.sessionStorage.setItem('productList', JSON.stringify(this.selectProductList));
          window.sessionStorage.setItem('productTotal', JSON.stringify({
            priceTotal: this.priceTotal,
            // numTotal: this.numTotal
            unitUnitG: this.unitUnitG,
            unitUnitK: this.unitUnitK,
          }));
          this.$router.push({
            path: '/uploadimage1',
          });
          return
        }
        // this.showShadow = true;
        // this.showAlert1 = true;
        this.closeOrdersPush();
      },
      openAlert1() {
        const status = window.sessionStorage.getItem('hasAgree');
        if (status) return;
        // this.showShadow = true;
        // this.showAlert2 = true;
      },
      closeOrders(status) {
        if (status) {
          window.sessionStorage.setItem('hasAgree', status)
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
      plus(item) {
        this.getAddressInfo(item);
        const haveIn = this.selectProductList.findIndex((el) => {
          return el.id === item.id
        });
        if (haveIn > -1) {
          this.selectProductList[haveIn].number += 1;
          item.number += 1
        } else {
          const initItem = Object.assign(item, {number: 1});
          this.selectProductList.push(this.deepCopy(initItem));
        }
        this.total();
        this.openAlert1()

      },
      less(item) {


        this.selectProductList = this.selectProductList.filter(e => e.id !== item.id)

        if(this.selectProductList.length < 6){

          $('.carList')[0].style.height =this.selectProductList.length*1.15 +'rem';
        }
        if(this.selectProductList.length <= 0){
          this.closeCar('off')
        }
        
        this.getList(this.isId,this.isActive,'delet')
        
        // const haveIn = this.selectProductList.findIndex((el) => {
        //   return el.id === item.id
        // });
        // this.selectProductList[haveIn].number -= 1;
        // item.number -= 1;
        // if (item.number === 0) {
        //   this.selectProductList.splice(haveIn, 1)
        // }
        this.total();
      },
      total() {
        let priceTotal = 0;
        let numTotal = 0;
        this.selectProductList.map((items) => {
          priceTotal += items.number * items.price;
          numTotal += items.number;
        });
        this.priceTotal = priceTotal.toFixed(2);
        this.numTotal = numTotal;
        window.sessionStorage.setItem('productList', JSON.stringify(this.selectProductList));
      },
      deepCopy(source) {
        let result = {};
        for (let key in source) {
          result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key];
        }
        return result;
      },
      addProduct(item, index) {
        this.noPriceList[index].checked = !item.checked;
        if (this.noPriceList[index].checked) {
            this.animate(item)
        } else {
          this.less(item)
        }
      },
      addProduct1(item, index) {
        this.subList[index].checked = !item.checked;
        if (this.subList[index].checked) {
          this.animate(item)
        } else {
          this.less(item)
        }
      },

      addProduct1Start(e){
        this.justTouch = 'true';
        let target = {
            startY : e.changedTouches[0].pageY,
            startX : e.changedTouches[0].pageX,
        }
        return target;

      },
      addProduct1Move(e){
        let moveEndX = e.changedTouches[0].pageX;
        let moveEndY = e.changedTouches[0].pageY;
        let  X = moveEndX - this.addProduct1Start.startX;
        let  Y = moveEndY - this.addProduct1Start.startY;
        if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
            this.justTouch = 'true';
        }
        else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
            this.justTouch = 'true';
        }
        else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
            this.justTouch = 'true'     }
        else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
            this.justTouch = 'true'
        }
        else{
            this.justTouch = 'false'
        }

      },
      addProduct1End(item,index){
        if(this.justTouch == 'true'){
          this.addProduct1(item, index);
        }
      },
      addProductStart(e){

        this.justTouch = 'true';
        console.log(e)
        let target = {
            startY : e.changedTouches[0].pageY,
            startX : e.changedTouches[0].pageX,
        }
        return target;

      },
      addProductMove(e){
        let moveEndX = e.changedTouches[0].pageX;
        let moveEndY = e.changedTouches[0].pageY;
        let  X = moveEndX - this.addProductStart.startX;
        let  Y = moveEndY - this.addProductStart.startY;
        if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
            this.justTouch = 'true';
        }
        else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
            this.justTouch = 'true';
        }
        else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
            this.justTouch = 'true'     }
        else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
            this.justTouch = 'true'
        }
        else{
            this.justTouch = 'false'
        }

      },
      addProductEnd(item,index){
        if(this.justTouch == 'true'){
          this.addProduct(item, index);
        }
      },


      closeCar(data){
        if(data =='on' && this.selectProductList.length){

          if(this.selectProductList.length >=6){
            $('.carList')[0].style.height = '7.37rem';
          }else{
            $('.carList')[0].style.height = this.selectProductList.length * 1.15 +'rem';
          }

          this.isShowCar = data;
          $('.carMain').css({'background':'rgba(0,0,0,.5)'})
          $('.carContent').animate({bottom:'0%'}, "fast", () => {

          })
        }else{
          $('.carMain').css({'background':'none'})
          $('.carContent').animate({bottom: '-60%'}, "fast", () => {
              this.isShowCar = data;
          });
        }



      },
      clearAllItem(){

        this.selectProductList = [];
        window.sessionStorage.setItem('productList', JSON.stringify(this.selectProductList));
        this.getClassFiy('HOUSEHOLD');
        this.total();
        this.closeCar('off')
      },
      animate(item){

         /*回收箱 动画*/
        /* YueYue  */
          let event = window.event||arguments[0];
          let animateTarget = event.target.parentNode.parentNode.childNodes[0];
          let n = document.createElement("img");
              n.src = animateTarget.src
              n.width = animateTarget.width;
              n.height = animateTarget.height;
              n.style.position =  'absolute';
              n.className = 'newNode'
              n.style.top = $(animateTarget).offset().top +'px';
              n.style.left= $(animateTarget).offset().left+'px';
          app.append(n)
          let carboxOffH = $('#carbox').offset().top;
          let moveBH = carboxOffH - $(animateTarget).offset().top;
          let moveLW =  $(animateTarget).offset().left - $('#carbox').offset().left
          $(".newNode").animate({
            top: $(animateTarget).offset().top += moveBH ,
<<<<<<< HEAD
            left: $(animateTarget).offset().left - moveLW, 
            
            
          },"200",() => {
=======
            left: $(animateTarget).offset().left - moveLW,
          }, 200,() => {
>>>>>>> 28738e36bebc170fce9fc104478f1013d5065b76

            $(".newNode").remove();
            this.plus(item)

          });

      },





    }
  }
</script>

