<template>
  <div class="select_wrap">
    <div class="select_item">
      <div class="title">
        <div class="left">联系人</div>
        <div class="right">{{areaList.memberAddress.name}}</div>
      </div>
      <div class="title">
        <div class="left">手机号码</div>
        <div class="right">{{areaList.memberAddress.tel}}</div>
      </div>
      <div class="title">
        <div class="left">所在地址</div>
        <div class="right">{{areaList.areaName}}<img src="@/assets/icon_right.png" alt=""></div>
      </div>
      <div class="title">
        <div class="left">详细地址</div>
        <div class="right">{{areaList.streeName}}{{areaList.communityName}}{{areaList.memberAddress.houseNumber}}</div>
      </div>
    </div>
    <div class="select_btn" @click="saveData">保存</div>
  </div>
</template>

<script>
  import '@/assets/detailstyle/selectAdress.css'
  import api from '@/api/api.js'

  export default {
    data() {
      return {
        areaList: {},
      }
    },
    mounted() {
      //存储token到本地
      var token = this.$route.query.token;
      window.localStorage.setItem('token', token);
      this.selectMemberAddress();
    },
    methods: {
      selectMemberAddress() {
        api.SelectMemberAddress({
          "app_key": "app_id_1",
          token: this.$store.state.token,
          "data": {
            "id": "20"
          },
        }).then((res) => {
          this.areaList = res.data;
        }).catch((error) => {
          console.log(error)
        })
      },
      saveData() {
        this.$router.push({
          path: '/adress'
        })
      }
    }
  }
</script>
