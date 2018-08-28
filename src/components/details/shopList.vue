<template>
  <div class="shop_wrap">
    <div class="shop_item" v-for="item in addressList" :key="item.id" @click="saveJump(item.id)">
      <div class="name">{{item.name}} {{item.tel}}</div>
      <div class="shop">{{item.address}}</div>
      <div class="btn">
        <div class="btn_edit" @click.stop="selectAdress(item.id)">修改</div>
        <div class="btn_del" @click.stop="delectMemberAddress(item.id)">删除</div>
      </div>
    </div>

    <div class="shop_add" @click="goToList">+ 新增地址</div>

  </div>
</template>

<script>
  import '@/assets/detailstyle/shopList.css'
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
          var r = confirm("确认删除该地址？");
          if (r == true) {
            if (res.status === 'sucess') {
              this.memberAddressList();
            } else {
              alert(res.msg)
            }
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      selectAdress(id) {
        window.sessionStorage.setItem('jumpUrl', this.$route.fullPath);
        this.$router.push({
          path: '/selectAdress',
          query: {
            id
          }
        })
      },
      saveJump(id){
        this.$router.push({
          path: '/goodsTicket',
          query: {
            id
          }
        })
      },
      // 跳转的时候插入sessionStorage
      goToList() {
        window.sessionStorage.setItem('jumpUrl', this.$route.fullPath);
        this.$router.push('/addAdress')
      },
    }
  }
</script>
