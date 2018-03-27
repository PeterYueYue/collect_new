<template>
    <div class="selectBox">
        <!-- <header class="head clearfix">
            <div @click="backbtn()" class="fl">
                <span class="fl headback"></span>
                <span class="fl">返回</span>
            </div>
            <h3 class="fl">区域选择</h3>
        </header>  -->
        <div class="selConentbox">
            <div class="nowsel">当前选择</div>
            <div class="selected">
                <span class="active">上海市</span>
                <span class="active">{{selectedInfo.areaItem.areaName}}</span>
                <span class="active">{{selectedInfo.subdistyictItem.areaName}}</span>
            </div>
            
        </div>
        <router-view></router-view>
    </div>   
</template>
<script>
import '@/components/create/common/addressel.css'
import { mapGetters } from 'vuex';
export default {
    computed: mapGetters({
        selectedInfo:'selectedInfo'
    }),
    methods:{
        backbtn(){ //执行返回上一个路由；
            this.$router.go(-1);
        }
    }
}
</script>


