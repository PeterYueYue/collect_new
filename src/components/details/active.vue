<template>
    <div class="active_wrap">
        <div class="active_wrap_top">
            <img src="@/assets/banner4.png" alt="" class="banner">
        </div>
        <div class="active_wrap_title">
            <div class="title_content">
                <h3 class="title_one">首次完成垃圾分类上门回收</h3>
                <p class="title_two">将会有一瓶价值38元的淳萃洗发水送货上门，请注意查收哦！</p>
                <p class="title-three">环保价值，惊喜上门 数量有限</p>
            </div>
            <div class="title_banner">
                <img src="@/assets/shampoo.png" alt="" class="title-img">
            </div>
        </div>
        <div class="active_wrap_content">
            <div class="coupon" v-for="item in productlist" :key="item.id" v-if="item.bindingQuantity<item.combinationCount">
                <div class="coupon_icon">
                    <img :src="item.img" alt="" class="icon_img">
                </div>
                <div class="coupon_content">
                    <p class="coupon_title">
                         <span class="icon_1">家乐福</span>
                         <span class="icon_2">{{item.brand.substring(5,item.brand.length)}}</span>
                    </p>
                    <p class="coupon_explain">{{item.name}}</p>
                    <div class="coupon_button_wrap">
                        <div class="progress">
                            <p class="progress_contain">
                                <span class="progress_bar" :style="'width:'+item.bindingQuantity/item.combinationCount*100+'%'"></span>
                            </p>
                            <p>已抢 <big class="progress_persents">{{item.bindingQuantity}}%</big> </p>
                        </div>
                        <div class="coupon_button" @click="getCoupon(item.id)">立即领取</div>
                    </div>
                </div>
            </div>
            <div class="coupon" v-for="item in productlist" :key="item.id" v-if="item.bindingQuantity>=item.combinationCount">
                <div class="coupon_icon">
                    <img src="@/assets/coupon.png" alt="" class="icon_img">
                </div>
                <div class="coupon_content">
                    <p class="coupon_title">
                         <span class="icon_1 down">家乐福</span>
                         <span class="icon_2">{{item.brand.substring(5,item.brand.length)}}</span>
                    </p>
                    <p class="coupon_explain">{{item.name}}</p>
                    <div class="coupon_button_wrap">
                        <div class="progress">
                            <p class="progress_contain down">
                                <span class="progress_bar down"></span>
                            </p>
                            <p class="down">已抢 <big class="progress_persents">100%</big> </p>
                        </div>
                        <div class="coupon_button down">已抢完</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="active_footer">
            <span>海量的权益 持续更新中...</span>
        </div>
        <!-- 弹窗 -->
        <div class="show_mask" v-if="showbox">
            <div class="shadow_box" >
                <div v-text="boxContent"></div>
                <div class="shadow_btn" @click="closeShadow">确定</div>
            </div>
        </div>
    </div>
</template>
<script>
import '@/assets/detailstyle/active.css'
import api from '@/api/api.js'
import {mapGetters} from 'vuex';
export default {
    name:'active',
    data(){
        return {
            productlist:[],
            baseCount:100,
            showbox:false,
            boxContent:""
        }
    },
    mounted(){
        document.setTitle('抢优惠');
        this.getActive();
    },
    methods:{
        getActive(p){
            api.ProductListYes({
               "app_key": "app_id_1", 
            }).then(res =>{
                this.productlist=res.data;
            })
        },
        getCoupon(id){
            api.SendVoucher({
                "app_key": "app_id_1",
                token: this.$store.state.token,
                "data": {
                    "id": id
                },
            }).then((res,callback) =>{
               this.boxContent=res.data
               this.showbox=true;
                console.log(res)
            })
        },
        closeShadow(){
             this.showbox=false;
        }
    }
}
</script>


