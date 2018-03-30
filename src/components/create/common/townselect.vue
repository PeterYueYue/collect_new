<template>
  <ul class="elelist">
        <li v-for="item in townList" :key="item.id"  @click="changeSelectedSubdistyict(item)"  > 
            <router-link :to="'/addressel/cellseletion/'+item.area.id">{{item.area.areaName}}</router-link> 
        </li>
          
    </ul>
</template>
<script>
import '@/components/create/common/addressel.css'
import api from '@/api/api.js'
import { mapGetters } from 'vuex';

export default {

    data(){
        return{
            townList:[]
        }
    },
    computed:mapGetters({
        token:'token'

    }),
    created(){
        //根据父级取得所有子地区
        api.areaChildList({
            "app_key": "app_id_1",
            "data": {
                "id": this.$route.params.areaItem,
                "level": 1
            },
            token:this.token
        }).then((res)=>{
            this.townList = res.data
            console.log(res,"根据父级取得所有子地区")
        }).catch((erro)=>{
            console.log(erro)
        })
    },
    methods:{
        changeSelectedSubdistyict(item){
            this.$store.dispatch('changeSelectedSubdistyict',item)
        }
    }
}
</script>

