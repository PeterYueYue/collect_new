<template>
<div class="classchange">
    <h3 class="titlename">购买年限</h3>
    <ul class="class_change_list clearfix">
        
        <li class="fl "   v-for="item in dataList"  :key="item.id" >
            <router-link :to="'/typeSelect/typestate/' + pointIndex" class="active">{{item.name}}</router-link>
            <!-- <a class="active" href="">3-5年</a> -->
        </li>
        <!-- <li class="fl">
            <a href="">6-8年</a>
        </li>
        <li class="fl">
            <a href="">8年以上</a>
        </li> -->
    </ul>
</div>
</template>
<script>
import api from '@/api/api.js'
import { mapGetters } from 'vuex';

export default {
  
  data(){
      return{
          dataList:null,
          pointIndex:3
      }
  },
  computed:mapGetters({
      token:'token'
  }),
  created(){
    var {index} = this.$route.params;
    //  根据分类 的属性取 分类属性选项
        api.categoryAttrOption({
        "app_key": "app_id_1",
        "data": {
            "id": 1
        },
        token:this.token
        }).then((res)=>{
            this.dataList = res.data.reverse();

            console.log(this.data)

        }).catch((erro)=>{
            console.log(erro)

        })

  }
}
</script>




