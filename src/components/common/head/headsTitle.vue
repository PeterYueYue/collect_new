<template>
    <header class="head clearfix">
        <div @click="backbtn()" class="fl">
            <span class="fl headback"></span>
            <span class="fl">返回</span>
        </div>
        <h3 class="fl">订单详情</h3>
    </header>
</template>
<script>
import './headsTitle.css'
export default {
  
    methods:{
        backbtn(){

            this.$router.go(-1);
        }
    }

}
</script>

