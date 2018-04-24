<template>
  <div class="typeselect">
    <!-- <header class="head clearfix">
        <div @click="backbtn()" class="fl">
            <span class="fl headback"></span>
            <span class="fl">返回</span>
        </div>
        <h3 class="fl">类型选择</h3>
    </header> -->
    <div class="callbackinfo">
        <div class="imgbox">
            <img class="" :src="addRessId.icon" alt="">
        </div>
        <div class=" information ">
            <h5>{{addRessId.name}}</h5>
            <div class="recovery_price">
                平均回收价:
                <span class="young">
                    ￥
                    <span>
                        {{addRessId.price}}
                    </span>
                </span>
            </div>
        </div>
    </div>
    <div class="ul_Box">
        <transition name="slide-fade">
            <div class="classchange"  v-for="(item,index) in dataList"  :key="item.id"   v-if="    isShow == index"        >
                <h3 class="titlename">{{item.name}}</h3>
                <ul class="class_change_list ">
                    
                    <li class=" "   v-for="(e,i) in item.categoryAttrOptionList "   :key="e.id"   :class="{active: isActive === i }"  @click="changeItem(e,{item,index,i})"         >{{e.name}}
                        <!-- <router-link :to="'/typeSelect/typestate/' + pointIndex" class="active">{{e.name}}</router-link> -->
                        <!-- <a :class="{active: isActive === i }"  @click="changeItem(e,{item,index,i})" href="javascript:;">{{e.name}}</a> -->
                    </li>
                    
                </ul>
            </div>
        </transition> 
    </div>
    <ul class="schedule">
        <li v-for="(item,index) in dataList"  :key="item.id"  :class="{active :  index == isShow}"></li>
        <!-- <li></li>
        <li></li>
        <li></li> -->
    </ul>
    <!-- 嵌套 种类 年前 以及其他信息的组件 -->
    <!-- <transition  >
        <router-view  ></router-view> -->
    <!-- </transition> -->
    <!-- 底部步骤按钮提示 -->
    <!-- <schedule ></schedule> -->
  </div>

</template>



<script>
import api from '@/api/api.js'
import '@/assets/createstyle/tool.css'
import '@/assets/createstyle/typeselect.css'
import Schedule from '@/components/create/common/schedule.vue'
import { mapGetters } from 'vuex';
export default {
    data(){
        return{
            itemID:null,    //商品ID
            dataList:null,  // 商品属性信息列表
            isShow:0,       //判断第几个选项卡显示    
            classInfo:null , //存储类型选择的信息
            isActive: false
        }
    },
    components:{
        Schedule
    },
    computed:mapGetters({
        // 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
        testStr         : 'testStr',
        useraddress     : 'useraddress',  //地址信息
        isShowMeassage  : 'isShowMeassage',  //控制选不到已服务的小区的提示框
        addRessId       : 'addRessId',    //进入地址组件关联的ID
        isShowForState  : 'isShowForState', //
        token           : 'token'
    }),
    created(){
        var {index} = this.$route.params;
        this.itemID = index
        api.getAllattrOption({
            "app_key": "app_id_1",
            "data": {
                "id": this.addRessId.id,
                "pageBean": {
                "pageNumber": 1,
                "pageSize": 20
                }
            },
            token:this.token
        }).then((res)=>{
            this.dataList = res.data;



        }).catch((erro)=>{
            console.log(erro)
        })

        this.$store.dispatch('clearPriceInfo')
    },
    methods:{
        backbtn(){ //执行返回上一个路由；
          this.$store.dispatch('clearPriceInfo')
          this.$router.go(-1);
          this.isShow-=1; 

          
        },
        changeItem(e,itemInfo){
            if(this.isShow <this.dataList.length-1 ){
                this.isActive = itemInfo.i
                this.$store.dispatch('changeStatisticsPrice',e)
                // this.$store.dispatch('setAttrOppids',itemInfo)
                setTimeout(()=>{
                    this.isShow+=1;
                    this.isActive = -1
                },200)
            }else{
                this.isActive = itemInfo.i
                setTimeout(()=>{
                    this.$store.dispatch('changeStatisticsPrice',e)  //再最后跳转前再执行一次；
                    this.$router.push({path:'/uploadimage'})
                    this.isActive = -1
                },200)
                
          }
      } 
      
    }
     
    }


    
</script>

