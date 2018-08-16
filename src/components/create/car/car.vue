<template>
    <div class="carMain"  @touchstart="showOrHiddenCar">
        <div class="carContent">
            <div class="carTitle clearfix">
                <span class="title fl">已选类型数量</span>
                <span  @touchstart = "clearAllItem" class="clear fr">清除</span>
            </div>
            <ul class="carList">
                <li  v-for="item in selectProductList" :key="item.id" class="carItem clearfix">
                    <strong class="fl">{{item.name}}</strong>
                    <div class="shopInfo fr">
                        <p v-if="item.price > 0" >
                        ￥<span>{{item.price}}/{{item.unit}}</span>     
                        </p>
                        <span v-if="item.price <= 0 " class="noPrice">麻烦回收小哥带走</span>
                        <i  v-if="item.price > 0"  class="icon"  @touchstart="deleItem(item)"  ></i>
                        <i  v-if="item.price <= 0" class="icon1" @touchstart="deleItem(item)"   ></i>
                    </div>
                </li>
            </ul>

        </div>
    </div>
</template>
<script>
import './car.css'
import $ from 'jquery'
export default {
    props:['selectProductList'],
    data(){
        return{
            list :[]
        }
    },
    created(){
        this.list = this.selectProductList.map(e => {
            e.name = e.name.replace('<br/>','')
            return e;
        })
    },
    methods:{
        showOrHiddenCar(ev){
            if(ev.target.className.indexOf('carMain') != -1){
                $('.carMain').css({'background':'none'})
                $('.carContent').animate({bottom: '-60%'}, "fast", () => {
                    this.$emit('closeCar','off')
                    $(".carList").animate({scrollTop: '0'}, 50);
                });
            }

        },
        deleItem(item){
            this.$emit('deleItem',item)
        },
        clearAllItem(){
            this.$emit('clearAllItem')
        }
        
    },
    
}
</script>

