<template>
    <div class="goodsTicket">
        <!-- 头部 -->
        <header class="head">
            <div class="imgBox">
                <img :src= item.img alt="">
                <div class="titile">{{item.brand}}</div>
            </div>
            <div  @click= firm  class="btn">{{item.bindingPoint}}kg能量兑换</div>
        </header>

        <!-- 兑换信息确认 -->
        <div class="content">

            <div class="message">
                <h3>兑换信息确认</h3>
                <p>
                    温馨提示：兑换成功后，礼品我们会通过快递免费寄送上门哦！请您务必核实您的姓名，收货地址和联系电话。
                </p>
                <p>
                    若要更换收货信息，请前往我的小区地址库修改默认地址
                </p>
            </div>
            <div v-if="memberAddress" class="userAddress">
                <div>姓名：{{memberAddress.name}}</div>
                <div>手机号码：{{memberAddress.tel}}</div>
                <div>收货地址：上海市{{memberAddress.address}}{{memberAddress.commByUserInput}}{{memberAddress.houseNumber}}</div>
            </div>
            <div v-if="!memberAddress" class="noAddress">您暂未添加收货地址...</div>
            <router-link  to="/adressList">
                <div class="goChangeAdd">前往修改我的收货信息</div> 
            </router-link>
        </div>
        <!-- 底部 -->
        <footer class="foot">
            <div  @touchend= callphone class="telBox">
                <span  class="icon"></span>
                <span>
                    如有疑问，请拨打服务热线：021-61420789
                </span>
            </div>
        </footer>
    </div>
</template>
<script>
import './index.css'
import api from"@/api/api"
import {mapGetters} from 'vuex';
export default {
    data(){
        return{
            item:'',
            memberAddress:'',
            show: true,
        }
    },
    
    computed:mapGetters({
        token:"token"
    }),
    mounted(){
        this.item = JSON.parse(this.$route.query.item)
        this.memberAddress = JSON.parse(this.$route.query.memberAddress)
    },
    methods:{
        submit(){
            api.GoodsOrder({
                "data": {
                    "id": this.item.id
                },
                "token":this.token
            }).then(res =>{
                if(res.code == 0){ alert(res.data) }
            })
        },
        firm() {  

            
            //利用对话框返回的值 （true 或者 false）  
            if (window.confirm("你确定兑换吗？") == true) {  
                this.submit();
            }
            return

             
        },
        callphone(){    
            window.location.href = "tel:02161420789";
        }
       
    }
}
</script>

