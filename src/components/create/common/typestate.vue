<template>
<div class="classchange">
    <h3 class="titlename">功能状况</h3>
    <ul class="class_change_list clearfix">
        <li class="fl">
            <a href="">制冷正常</a>
        </li>
        <li class="fl">
            <a href="">制冷效果差</a>
        </li>
        <li class="fl ">
            <!-- <a class="active" href="">不制冷/不启动</a> -->
            <router-link class="active" to="/uploadimage">不制冷/不启动</router-link>
        </li>
        
    </ul>
</div>
</template>
<script>
import api from '@/api/api.js'

export default {

    data(){
        return{
            dataList:null
        }
    },
  
    created(){

        var {index}  = this.$route.params;

        //  根据分类 的属性取 分类属性选项
        api.getAllattrOption({
        "app_key": "app_id_1",
        "data": {
            "id": 0
        }
        }).then((res)=>{
            this.dataList = res.data.reverse();

            console.log(res)

        }).catch((erro)=>{
            console.log(erro)

        })

        
    }
}
</script>

