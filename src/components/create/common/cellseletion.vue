<template>
    <div>
        <ul class="elelist">
            <li  v-for="item in cellList"   :key="item.id"      @click="sendAddInfo(item)"   >
                <router-link    :to="'/addressoption/'+addRessId.id">
                {{item.address+item.name}}
                
                </router-link>
            </li>
        </ul> 

        <div  v-if="isShowMeassage" class="promptbox">
            <div class="textbox">
                <h3>感谢你的关注</h3>
                
                <div class="info">
                    冰箱品类服务区域正在全面铺设当中，现在小区如下：
                    <ul class="community">
                        <li class="communityItem">
                            <span>浦东新区:</span>
                            <span>光明小区</span>
                            <span>光明小区</span>
                            <span>光明小区</span>
                        </li>
                        <li class="communityItem">
                            <span>浦东新区:</span>
                            <span>光明小区</span>
                            <span>光明小区</span>
                            <span>光明小区</span>
                        </li>
                        <li class="communityItem">
                            <span>浦东新区:</span>
                            <span>光明小区</span>
                            <span>光明小区</span>
                            <span>光明小区</span>
                        </li>
                    </ul>
                </div>
                <a @click="changeShow()" href="javascript:;">确定</a>
            </div>
        </div>  
    </div>   
</template>
<script>
import '@/components/create/common/addressel.css'
import api from '@/api/api.js'
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            cellList:[]
        }
    },
    computed: mapGetters({
        useraddress     :'useraddress',  //地址信息
        isShowMeassage  :'isShowMeassage',  //控制选不到已服务的小区的提示框
        addRessId       :'addRessId',
        token           : 'token'
    }),
    created(){



        console.log(this.addRessId)
        console.log(this.$route.params.itemAreaId)
        // 根据区域id，取得该区域下所有小区 ，仅支持上一级，不支持跨层
        api.getCellSeleTion({
            "app_key": "app_id_1",
            "data": {
                "areaId":this.$route.params.itemAreaId ,
                "id": this.addRessId.id,
            },
            token:this.token
        }).then(res =>{
            if(res.data.length>=1){
                console.log("有数据")
                this.cellList = res.data
            }else{
                console.log("没数据")
                this.$store.dispatch('changeShowOrHidden',res)
            }
        }).catch( erro =>{
            console.log(erro)
        })
    },
    
     methods:{
        sendAddInfo(item){
            this.$store.dispatch('changeAddress',item)
        },
        changeShow(){   //关闭弹出框
            this.$store.dispatch('changeShowOrHidden',this.$route.params.itemAreaId )
            this.$router.go(-1);
        }
        
    },
}
</script>

