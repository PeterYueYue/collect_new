<template>
    <div class="addressopt">
        <!-- <header class="head clearfix">
            <div @click="backbtn()" class="fl">
                <span class="fl headback"></span>
                <span class="fl">返回</span>
            </div>
            <h3 class="fl">地址选择</h3>
        </header> -->
        <div class="step_call">
            <h3>四步变现</h3>
            <ul class="step_list">
                <li class="item">
                    <div class="step_num">1</div>
                    <span>旧机评估</span>
                    <div class="xuxian"></div>
                </li>
                <li class="item">
                    <div class="step_num">2</div>
                    <span>获得报价</span>
                    <div class="xuxian"></div>
                </li>
                <li class="item">
                    <div class="step_num">3</div>
                    <span>回收鉴定</span>
                    <div class="xuxian"></div>
                </li>
                <li class="item">
                    <div class="step_num">4</div>
                    <span>获得现金</span>
                    <!-- <div class="xuxian"></div> -->
                </li>
            </ul>
            <div class="icon_smaell"></div>
            <h5 class="reward">交易成功即可获得1次收呗信用</h5>
        </div>
        <!-- 获取用户的地址信息来判断位置 -->
        <div class="hsdiqu clearfix"   >
            <h5 class="fl">回收地区</h5>
            <router-link class="text fl" to="/addressel/areaelecte"  >
                {{userAddressInfo}}
            </router-link>
            <span class="fr"></span>
            
        </div>
        <div class="next">
            <span class="add_info">找不到回收的小区?</span>
            <h1 id="demo"></h1>
            <div  class="nextbutton  ">
                <a  v-show="!isEnter"   class="dontEnter"     href="javascript:;">下一步</a>
                <router-link v-show="isEnter"   class="yesEnter"  :to="'/typeSelect/'+addRessId.id" >下一步</router-link>
            </div>


        </div>
        <!-- 如果选择的地址没有弹出此提示框 -->
        <!-- <prompt-box></prompt-box> -->
        
    </div>
</template>
<script>
import '@/assets/createstyle/tool.css'
import '@/assets/createstyle/addressopt.css'
import api from '@/api/api.js'
import PromptBox from './common/promptbox.vue'

import {mapGetters} from 'vuex'  
export default {
  components:{
      PromptBox
  },
    data(){
        return{
            itemID:'',
            userAddressInfo:'',
            areaList:'',
            id:'',
            isEnter:false
        }
    },
    computed: mapGetters({
        useraddress : 'useraddress',
        addRessId   : 'addRessId',
        token       : 'token'

        
    }),
  created(){
    this.itemID = this.$store.state.msItemId;
    var {id} = this.$route.params;   //商品ID
    this.id = id;
    api.getAddRessList({
        "app_key": "app_id_1",
        "data": {
            "areaId": 3,
            "id":id,
            "pageBean": {
            "pageNumber": 1,
            "pageSize": 20
            }
        },
        token:this.token
    
    }).then((res)=>{

        console.log(res)
        // 判断地址栏的默认信息以及修改后的显示逻辑
         if(this.useraddress.address){
             console.log("2222")
                 this.isEnter = true;
             
             this.userAddressInfo = this.useraddress.address + this.useraddress.name;
         }else{
             if(res.data.isExist){
                 console.log("111")
                 this.isEnter = true;
                  this.userAddressInfo  = res.data.address + res.data.name
             }else{
                 this.isEnter = false;
                 this.userAddressInfo = '请输入您的详细地址...'
             }
         }
    }).catch((erro)=>{
        console.log(erro)
    })
  },
  
  methods:{
    backbtn(){ //执行返回上一个路由；
        this.$router.go(-1);
    }
}
}
</script>
