<template>
    <div class="integralShopping">
        <!-- 头部 -->
        <header class="head">
            <div class="bacBox">
                <strong>
                    累计回收环保能量
                </strong>
                <div class="quantity">1000kg</div>
                <div class="strategy">
                    如何获得环保能量
                    <span class="icon"></span>
                </div>
            </div>
            <div class="useEnvironmental">
                <span class="enviromental">可用环保能量</span>
                <span class="digit">100kg</span>
            </div>
        </header>
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
            justTouch : 'true'
        }
    },
    created(){
        document.title = "积分商城"

         api.GetIntegralList().then( res => {
             this.list = res.data;
        })
    },
    methods:{
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

