<template>
    
    <div> </div>
</template>

<script>

import api from '@/api/api.js';
export default {

    data(){
        return{


        }
    },
    mounted(){
        if(!this.$route.query.token){
            // let str = 'http://alipay.mayishoubei.com/index.html?app_id=2017022805948218&source=alipay_wallet&userOutputs=auth_base&scope=auth_base,auth_user,auth_ecard&alipay_token=&auth_code=a3d562a21da947edb529137e04b6TX66#/'
        let str = window.location.href
        let str1 = str.substring((str.indexOf('?')+1),str.indexOf('#'))
        let ayth_code = this.qs.parse(str1).auth_code
        api.isAuthorization({
            "app_key": "app_id_1",
            "data": {
                "authCode": ayth_code
            }
            }).then(res =>{
            if(res.data.mobile == '0'){
                    this.$router.push({
                    path:'/verifiaction',
                    query:{
                        id:res.data.id
                    }
                })
            }
            if(res.data.mobile == '1'){
                 this.$router.push({
                path:'/home',
                query:{
                    token:res.data.token
                }
                })
            }
        }) 
        }
      
        


    }
    
    


}
</script>

