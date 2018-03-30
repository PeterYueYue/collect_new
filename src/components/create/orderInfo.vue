<template>
  <div class="orderinfo">
    <!-- <header class="head clearfix">
        <div @click="backbtn()" class="fl">
            <span class="fl headback"></span>
            <span class="fl">返回</span>
        </div>
        <h3 class="fl">订单详情</h3>
    </header> -->
    <div class="userInfoBox">
        <ul class="userInfo">
            <li class="item  clearfix ">
                <strong class="fl" >姓名</strong>
                <div  class="nameBox  fl">
                    <input @blur="isName"  v-on:input="listenInput"    v-model="nameValue"      placeholder="请输入联系人姓名 (必填)"  type="text" value="nameValue" >
                    <span  v-if="tipNmae" >名字格式为中文，长度为2-7位</span>
                </div>
                
            </li>
            <li class="item  clearfix ">
                <strong class="fl" >电话</strong>
                <div  class="nameBox  fl">
                    <input  type="text"   @blur="isPhoneNumber"   v-model="phoneNumber" placeholder="请输入手机号码 (必填)" value="phoneNumber" >
                    <span v-if="tipPhone"  >电话号码格式不正确</span>
                </div>
                
            </li>

            <li class="item  clearfix ">
                <strong class="fl" >地址</strong>
                <div  class="nameBox  fl">
                    <div class="addressSt">
                        {{selectedInfo.areaItem.areaName+selectedInfo.subdistyictItem.areaName}}
                        {{selectedInfo.cellseletionItem.address+selectedInfo.cellseletionItem.name}}
                    </div>
                </div>
            </li>
            <li class="item ">
               <strong class="fl" >门牌号</strong>
                <div  class="nameBox  fl">
                    <input  type="text"   placeholder="例：5号楼203室"  value="" >
                </div>     
            </li>
        </ul>
    </div>
    <div class="collectTimeAndPrice">
        <div class="pickUp ">
            <strong>上门时间：</strong>
            <time>{{time}}{{infoTm}}</time>
            <div  @click="setTime" class="dataBlock">
                <a href="javaScript:;">  
                </a>
            </div>
        </div>
        <div class="estimatePrice clearfix">
            <strong class="fl">回收估计</strong>
            <span class="fr">￥{{futurePrice}}</span>
        </div>        
    </div>
    <div class="information">实际成交价格最终验机结果为准</div>
    <div class="nextbutton  ">
        <a  v-if="isOk.nameisOk == false || isOk.phoneIsOk == false ||  isOk.timeIsOk == false"   style="background-color:#bfc5c8;"   >提交订单</a>

        <a href="javascript:;"   v-if="isOk.nameisOk == true && isOk.phoneIsOk == true &&  isOk.timeIsOk == true"   @click="completeAnOrder"      > 提交订单 </a>

    </div>

    
    

    <div class="information">提交订单后将有售后人员与您电话沟通，请保持手机畅通</div>
    <div class="bottomInformation">
        <div>本服务有爱回收有限公司提供</div>
        <div>400-8288-999</div>
    </div>


    
    <div  v-show="show" class="changeTimeBox">

        <div class="btnBox">
            <h5>请选择上门具体时间段</h5>
            <span   @click="setTimeInfoAm()"   >上午</span>
            <span   @click="setTimeInfoPm()" >下午</span>
        </div>
    </div>
  </div>
</template>
<script>
import '@/assets/createstyle/tool.css'
import '@/assets/createstyle/orderInfo.css'
import api from '@/api/api.js'
import { mapGetters } from 'vuex';
// import DataTime from '@/components/create/common/dataTime.vue'
export default {
    data () {
        return {
            nameValue:'',
            phoneNumber: '',
            datetime5: '2018-01-11 上午',
            time :'请选择上门回收时间 ',
            show:false,
            infoTm:'',
            tipNmae:false,
            tipPhone:false,
            isOk:{
                nameisOk:false,
                phoneIsOk:false,
                timeIsOk:false
            },
            
            
            
           
        }
    },
    computed: mapGetters({
        futurePrice         :   'futurePrice',      //预估价格
        appointmentTime     :   'appointmentTime',  //上门预约时间
        selectedInfo        :   'selectedInfo',      //用来存储 地址选择 已选择信息
        imgsAddress         :   'imgsAddress',      //用户上传图片信息
        addRessId           :   'addRessId',         //一级分类信息
        categoryAttrOppIds  :   'categoryAttrOppIds',  //分类属性信息
        useraddress         :   'useraddress',
        orderPic            :    'orderPic'  ,   //图片信息分类
        textareaValue       :   'textareaValue'  //图片物品描述
    }),
    methods:{
        completeAnOrder(){  

            api.completeOrder({   
                "app_key": "app_id_1",
                "data": {
                    "address": this.selectedInfo.areaItem.areaName+this.selectedInfo.subdistyictItem.areaName+this.selectedInfo.cellseletionItem.address+this.selectedInfo.cellseletionItem.name,
                    "arrivalPeriod": this.infoTm,
                    "linkMan": this.nameValue,
                    "orderItemBean": {
                        "categoryAttrId": 0,
                        "orderId": 0,
                        "categoryAttrOppId": 0,
                        "categoryAttrOppIds": this.categoryAttrOppIds,
                        "categoryId": 0
                    },
                    "level": "0",
                    "orderPic": {
                        "new": true,
                        "picUrl":this.orderPic.picUrl,
                        "orderId": 0,
                        "origPic": this.orderPic.origPic,
                        "smallPic": this.orderPic.smallPic,
                        "delFlag": "0"
                    },
                    "isEvaluated": "0",
                    // "recyclerId": 0,
                    "unit": "计量单位",
                    "areaId": this.selectedInfo.areaItem.id,
                    "arrivalTime": this.time,
                    "price": this.futurePrice,
                    "qty": 9999,
                    "tel": this.phoneNumber,
                    "communityId":this.selectedInfo.cellseletionItem.id,
                    "categoryId": this.addRessId.id,
                    "remarks": this.textareaValue
                }
            }).then((res)=>{
                console.log(res)

                alert("恭喜您 下单成功")

                this.$router.push({path:"/home"})


            }).catch((err)=>{

                
                console.log(err)

            })

        },
        setTimeInfoAm(){
            this.show = false;
            this.infoTm = "am"
        },
        setTimeInfoPm(){
            this.show = false;
            this.infoTm = "pm"
        },
        backbtn(){
            this.$router.go(-1);
        },
        setTime(){
            var antThis = this;
            ap.datePicker({
                formate: 'yyyy-MM-dd HH:mm:',
                currentDate: '2018-03-25 15:11:11',
                startDate: '2018-03-01 11:11:11',
                endDate: '2018-12-30 11:11:11'
            }, function(res) {
                
                if(res.date){
                    antThis.show = true;
                    antThis.time = res.date;
                    antThis.isOk.timeIsOk = !antThis.isOk.timeIsOk;
                }
            
            });

        },
        listenInput(){


            if(this.nameValue){
                var reg = RegExp();
                var str = this.nameValue;               
                reg=/^([\u4e00-\u9fa5]){2,7}$/;       //只能是中文，长度为2-7位
                if(!reg.test(str)){  
                    this.isOk.nameisOk = false;
                    this.tipNmae = true;
                        // alert("对不起,您输入正确的名字格式!");//请将“字符串类型”要换成你要验证的那个属性名称！   
                } else{

                    this.isOk.nameisOk = true;
                    this.tipNmae = false;
                }
            }


        },
        isName(){
            // if(this.nameValue){
            //     var reg = RegExp();
            //     var str = this.nameValue;               
            //     reg=/^([\u4e00-\u9fa5]){2,7}$/;       //只能是中文，长度为2-7位
            //     if(!reg.test(str)){  
            //         this.isOk.nameisOk = false;
            //             // alert("对不起,您输入正确的名字格式!");//请将“字符串类型”要换成你要验证的那个属性名称！   
            //     } else{

            //         this.isOk.nameisOk = !this.isOk.nameisOk;
            //     }
            // }       
        },
        isPhoneNumber(){
            var reg = RegExp();
            reg=/^[1][3,4,5,7,8][0-9]{9}$/;  
            if (!reg.test(this.phoneNumber)) {  
                        this.tipPhone = true;
                       this.isOk.phoneIsOk = false;     
                } else {  
                        this.isOk.phoneIsOk = !this.isOk.phoneIsOk;
                        this.tipPhone = false;
                }

            }
       
    }
   
  
}
</script>


