<template>
    <div class="integralShopping">
        <!-- 头部 -->
        <div class="head">
            <div class="bacBox">
                <img src="./img/banner2.png" alt="">
                <strong>
                    累计回收环保能量
                </strong>
                <div class="quantity">{{totalQuantity}}kg</div>
                <div  @click="showShadow = true " class="strategy">
                    如何获得环保能量
                    <span class="icon"></span>
                </div>
            </div>
            <div class="useEnvironmental">
                <span class="enviromental">可用环保能量</span>
                <span class="digit">{{availableQuantity}}kg</span>
            </div>
        </div>
        <!-- 主体 -->

        <ul class="content">
            <li
                @touchstart = toDteailsStart
                @touchmove  = toDteailsMove
                @touchend = toDteails(item)
                v-for=" item in list"
                :key="item.id"
                class="item clearfix">

                <img class="imageOfGgift fl" :src= item.img alt="">
                <div class="giftInfo fl">
                    <h3>{{item.brand}}</h3>
                    <div class="discountTicket"> <span>券</span>{{item.name}}</div>
                    <div class="expend">
                        <span class="number">{{item.bindingPoint}}</span>
                        <span>kg能量</span>
                    </div>
                </div>
                <span  class="statistics fr">{{item.bindingQuantity}}人兑换</span>
            </li>

        </ul>

        <!-- 弹窗 -->
        <div class="records_shadow" v-if="showShadow" ></div>
        <div class="records_shadow_box"  v-if="showShadow" >
            <div class="title">如何获得环保能量？</div>
            <div>用户可通过线上下单回收生活垃圾，待回收人员上门称重回收后，即可获得相应重量的环保能量，用来兑换权益。</div>
            <div>目前权益正在努力建设当中，更多权益，敬请期待...</div>
            <img src="@/assets/icon_close.png" alt="" class="records_shadow_icon_close"  @click="showShadow = false " >
        </div>






    </div>
</template>

<script>
import './shopping.css'
import api from '../../api/api.js'
 import {mapGetters} from 'vuex';
export default {

    data(){
        return{
            list:[],
            justTouch : 'true',
            totalQuantity:'',
            availableQuantity:'',
            showShadow:false,
        }
    },
    mounted(){
      document.setTitle('环保能量');
        this.getRecords();
         api.GetIntegralList({
             "token":this.token
         }).then( res => {
             this.list = res.data;
        })
    },
    computed:mapGetters({
        token:"token"
    }),
    methods:{
        getRecords(){
            api.getRecords({
            "app_key": "app_id_1",
            "data": {pageNumber:1, pageSize:10},
            token: this.token
            }).then((res) => {
            console.log(res);
            this.totalQuantity = res.data[0];
            this.availableQuantity = res.data[2];
            }).catch((error) => {
            console.log(error)
            })

        },
        // touchstart
        toDteailsStart(e){
            this.justTouch = 'true';
            console.log(e)
            let target = {
                startY : e.changedTouches[0].pageY,
                startX : e.changedTouches[0].pageX,
            }
            return target;
        },
        // touchmove
        toDteailsMove(e){
            let moveEndX = e.changedTouches[0].pageX;
            let moveEndY = e.changedTouches[0].pageY;
            let  X = moveEndX - this.toDteailsStart.startX;
            let  Y = moveEndY - this.toDteailsStart.startY;
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
        // touchend
        toDteails(item){
            if(this.justTouch == 'true'){
                this.$router.push({path:'/ticketdetails', query:{item:JSON.stringify(item)}})
            }
        }
    }

}
</script>

