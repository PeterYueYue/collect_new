<template>
  <div class="adress_wrap">
    <div class="adress_item" v-for="item in addressList" :key="item.id">
      <div class="name">{{item.name}} {{item.tel}}</div>
      <div class="adress">{{item.address}}</div>
      <div class="btn">
        <div class="holder">
          <input
            type="radio"
            :id="item.id"
            name="radio"
            class="radio"
            :value="item.id"
            v-model="radio"/>
          <label :for="item.id"><i></i>默认地址</label>
        </div>
        <div class="btn_del" @click="delectMemberAddress(item.id)">删除</div>
        <div class="btn_edit" @click="selectAdress(item.id)">修改</div>
      </div>
    </div>

    <router-link to="addAdress"><div class="adress_add">+ 新增地址</div></router-link>

    <div class="adress_footer" @click="UpdateAddress">确认选择</div>
  </div>
</template>

<script>
  import '@/assets/detailstyle/adressList.css'
  import api from '@/api/api.js'

  export default {
    data() {
      return {
        radio: '',
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
          this.radio = this.addressList[0].id
        }).catch((error) => {
          console.log(error)
        })
      },
      //删除
      delectMemberAddress(id) {
        api.DelectMemberAddress({
          "app_key": "app_id_1",
          token: this.$store.state.token,
          "data": {
            id: id,
          },
        }).then((res) => {
          if (res.status === 'sucess') {
            this.memberAddressList();
          } else {
            alert(res.msg)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      //设置默认
      UpdateAddress() {
        api.UpdateIsSelectedAddress({
          "app_key": "app_id_1",
          token: this.$store.state.token,
          "data": {
            "id": this.radio,
          },
        }).then((res) => {
          console.log(res);
          this.memberAddressList();
        }).catch((error) => {
          console.log(error)
        })
      },
      selectAdress(id) {
        this.$router.push({
          path: '/selectAdress',
          query: {
            id
          }
        })
      },
    }
  }
</script>
