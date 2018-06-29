<template>
  <div class="add_wrap">
    <div class="add_item">
      <div class="title">
        <div class="left">联系人</div>
        <div class="right"><input type="text" placeholder="请输入姓名" v-model="form.name"></div>
      </div>
      <div class="title">
        <div class="left">手机号码</div>
        <div class="right"><input type="text" placeholder="请输入手机号" v-model="form.tel"></div>
      </div>
      <div class="title">
        <div class="left">所在地址</div>
        <div class="right">请选择所在地区<img src="@/assets/icon_right.png" alt=""></div>
      </div>
      <div class="title">
        <div class="left">详细地址</div>
        <div class="right"><input type="text" placeholder="请输入街道、楼牌号等" v-model="form.address"></div>
      </div>
    </div>
    <div class="add_btn" @click="saveData">保存</div>
  </div>
</template>

<script>
  import '@/assets/detailstyle/addAdress.css'
  import api from '@/api/api.js'

  export default {
    data() {
      return {
        form: {
          name: '',
          tel: '',
          address: '',
        }
      }
    },
    methods: {
      saveData(){
        api.SaveMemberAddress({
          "app_key": "app_id_1",
          token: this.$store.state.token,
          "data": {
            "address": "测试地址好长6",
            "areaId": "4",
            "houseNumber": "106弄",
            "name": this.form.name,
            "tel": this.form.tel,
            "id": "19",   //id传入有值时是保存修改地址，当地不传或传空时为新增地址
            "communityId": "6",
            "streetId": this.form.address,
          },
        }).then((res) => {
          this.$router.push({
            path: '/adressList'
          })
        }).catch((error) => {
          console.log(error)
        })
      },
    }
  }
</script>
