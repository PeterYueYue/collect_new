<template>
  <div class="adress_wrap">
    <div class="adress_item" v-for="item in addressList" :key="item.id">
      <div class="name">{{item.name}} {{item.tel}}</div>
      <div class="adress">{{item.address}}{{item.houseNumber}}</div>
      <div class="btn">
        <div class="holder">
          <input
            type="radio"
            :id="'radio'+item.id"
            name="radio"
            class="radio"
            :value="'radio'+item.id"
            v-model="radio"/>
          <label :for="'radio'+item.id"><i></i>默认地址</label>
        </div>
        <div class="btn_del" @click="delectMemberAddress()">删除</div>
        <router-link to="selectAdress"><div class="btn_edit">修改</div></router-link>
      </div>
    </div>

    <router-link to="addAdress"><div class="adress_add">+ 新增地址</div></router-link>

    <div class="adress_footer">确认选择</div>
  </div>
</template>

<script>
  import '@/assets/detailstyle/addAdress.css'
  import api from '@/api/api.js'

  export default {
    data() {
      return {
        radio: 'radio19',
        addressList: {},
      }
    },
    mounted() {
      //存储token到本地
      var token = this.$route.query.token;
      window.localStorage.setItem('token', token);
      this.memberAddressList();
    },
    methods: {
      //地址列表
      memberAddressList() {
        api.MemberAddressList({
          "app_key": "app_id_1",
          token: this.$store.state.token,
        }).then((res) => {
          this.addressList = res.data;
        }).catch((error) => {
          console.log(error)
        })
      },
      //删除
      delectMemberAddress() {
        api.DelectMemberAddress({
          "app_key": "app_id_1",
          token: this.$store.state.token,
          "data": {
            "id": "20"
          },
        }).then((res) => {
          console.log(res);
        }).catch((error) => {
          console.log(error)
        })
      },
    }
  }
</script>
