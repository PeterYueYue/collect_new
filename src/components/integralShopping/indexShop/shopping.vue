<template>
    <div class="integralShopping">
        <!-- 头部 -->
        <div class="head">
            <div class="bacBox">
                <div id="bannerbox">
                    <img src="../img/banner2.png" alt="">
                </div>
                <strong>
                    累计获得环保能量
                </strong>
                <div class="quantity">{{totalQuantity}}kg</div>
                <div  @click="showShadow = true " class="strategy">
                    如何获得环保能量
                    <span class="icon"></span>
                </div>
            </div>
            <div class="useEnvironmental">
                <span class="enviromental">可用于兑换的环保能量</span>
                <span class="digit">{{availableQuantity}}kg</span>
            </div>
        </div>
        <!-- 主体 -->
        <nav class="nav">
            <div
            v-bind:class="{ active: isActive == 'dic' }"
            @touchend = getDisData()
            >优惠兑换</div>

            <span class="line"></span>
            <div
            v-bind:class="{ active: isActive == 'goods' }"
            @touchend = getGoodsData()
            >实物兑换</div>
        </nav>
        <!-- 列表 -->
        <shop-list  v-bind:list="list"
                    v-bind:isActive="isActive"
                    v-bind:memberAddress="memberAddress"
         ></shop-list>

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
import './shopping.css';
import api from '../../../api/api.js';
import ShopList from './list';
import {mapGetters} from 'vuex';
export default {
    components:{
        ShopList
    },
    data(){
        return{
            list:[],
            availableQuantity:'0',
            totalQuantity:'0',
            showShadow:false,
            isActive:'',
            memberAddress:'',

        }
    },
    watch:{
        "$route":"routerchange"
    },
    mounted(){
      document.setTitle('环保能量');
        this.getRecords();
        this.routerchange();
    },
    computed:mapGetters({
        token:"token",
        cityId:'cityId'
    }),
    methods:{
        getRecords(){
            api.getRecords({
            "app_key": "app_id_1",
            "data": {pageNumber:1, pageSize:10},
            token: this.token
            }).then((res) => {
            this.totalQuantity = res.data[0];
            this.availableQuantity = res.data[2];
            }).catch((error) => {
            console.log(error)
            })
        },
        getDisData(a){
            // 优惠列表
            if(a){
                this.list ='';
                api.GetIntegralList({
                    "token":this.token,
                    "data":{
                        "cityId":this.cityId
                    }
                }).then( res => {
                    // this.$router.push({path:'/integralshoping/dic'});
                    this.list = res.data;
                    this.isActive = "dic";
                })
            }else{
                this.$router.replace({path:'/integralshoping/dic'});
            }
        },
        getGoodsData(a){
            // 实物列表
            if(a){
                this.list ='';
                api.GetGoodsList({
                    "token":this.token,
                    "data":{
                        "cityId":this.cityId
                    }
                }).then(res =>{
                    this.list = res.data.product;
                    this.isActive = "goods"
                    this.memberAddress = res.data.memberAddress;
                    console.log(this.memberAddress)
                })
            }else{
                this.$router.replace({path:'/integralshoping/goods'});
            }
        },
        routerchange(){

            console.log(this.$router)
            this.isActive = this.$route.params.id
            this.getRecords();
            if(this.isActive == 'dic'){
                this.getDisData('aa')
            }
            if(this.isActive == 'goods'){
                this.getGoodsData('aa')
            }
        }

    }

}
</script>

