<template>
  <div class="select_wrap">
    <div class="select_item">
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
        <div class="right">
          <select name="" v-model="selectArea" @change="getStreet(false)">
            <option value="">请选择所在行政区</option>
            <option v-for="(items,index) in areaList"
                    :value="{id:items.id,name:items.areaName}"
                    :key="index">
              {{items.areaName}}
            </option>
          </select>
          <img src="@/assets/icon_right.png" alt=""></div>
      </div>
      <div class="title" v-if="selectArea">
        <div class="left"></div>
        <div class="right">
          <select name="" v-model="selectStreet" @change="getCommunity">
            <option value="">请选择所在街道/镇</option>
            <option v-for="(items,index) in streetList"
                    :value="{id:items.area.id,index:index,name:items.area.areaName}"
                    :key="index">
              {{items.area.areaName}}
            </option>
          </select>
          <img src="@/assets/icon_right.png" alt=""></div>
      </div>
      <div class="title" v-if="selectStreet">
        <div class="left"></div>
        <div class="right">
          <select name="" v-model="selectCommunity">
            <option value="">请选择所在小区名称</option>
            <option v-for="(items,index) in communityList"
                    :value="{id:items.id,name:items.name}"
                    :key="index">
              {{items.name}}
            </option>
          </select>
          <img src="@/assets/icon_right.png" alt=""></div>
      </div>
      <div class="title">
        <div class="left">详细地址</div>
        <div class="right"><input type="text" placeholder="请输入街道、楼牌号等" v-model="form.address"></div>
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
        form: {
          name: '',
          tel: '',
          address: '',
        },
        areaList: [],
        streetList: [],
        communityList: [],
        selectArea: '',
        selectStreet: '',
        selectCommunity: '',
      }
    },
    mounted() {
      //存储token到本地
      var token = this.$route.query.token;
      window.localStorage.setItem('token', token);
      this.selectMemberAddress();
    },
    watch: {
      selectArea(val){
      }
    },
    methods: {
      selectMemberAddress() {
        api.SelectMemberAddress({
          "app_key": "app_id_1",
          token: this.$store.state.token,
          "data": {
            "id": this.$route.query.id
          },
        }).then((res) => {
          this.form.name = res.data.memberAddress.name;
          this.form.tel = res.data.memberAddress.tel;
          this.form.address = res.data.memberAddress.houseNumber;
          this.selectArea = {
            id: res.data.memberAddress.areaId,
            name: res.data.areaName
          };
          this.getAreaList();
          this.getStreet(true, (streetList) => {
            const streetIndex = streetList.findIndex((items) => {
              return items.area.areaName === res.data.streeName
            });
            this.selectStreet = {
              id: res.data.memberAddress.streetId,
              name: res.data.streeName,
              index: streetIndex
            };
            this.selectCommunity = {
              id: res.data.memberAddress.communityId,
              name: res.data.communityName
            };
          });
        }).catch((error) => {
          console.log(error)
        })
      },
      getAreaList(){
        api.getAreaList({
          "app_key": "app_id_1",
          "data": {
            "id": 1,
            "level": 0
          },
          token: this.$store.state.token,
        }).then((res) => {
          this.areaList = res.data;
        }).catch((error) => {
          console.log(error)
        })
      },
      getStreet(status, cb){
        api.areaChildList({
          "app_key": "app_id_1",
          "data": {
            "id": this.selectArea.id,
            "level": 1
          },
          token: this.$store.state.token,
        }).then((res) => {
          this.streetList = res.data;
          if (cb) {
            cb(res.data)
          }
          if (!status) {
            this.selectStreet = '';
            this.selectCommunity = '';
          } else {
            this.communityList = this.streetList[this.selectStreet.index].community
          }
        }).catch((erro) => {
          console.log(erro)
        })
      },
      getCommunity(){
        this.selectCommunity = '';
        this.communityList = this.streetList[this.selectStreet.index].community
      },
      saveData() {
        api.SaveMemberAddress({
          "app_key": "app_id_1",
          token: this.$store.state.token,
          "data": {
            "address": this.selectArea.name + this.selectStreet.name + this.selectCommunity.name + this.form.address,
            "areaId": this.selectArea.id,
            "houseNumber": this.form.address,
            "name": this.form.name,
            "tel": this.form.tel,
            "id": this.$route.query.id,  //id传入有值时是保存修改地址，当地不传或传空时为新增地址
            "communityId": this.selectCommunity.id,
            "streetId": this.selectStreet.id,
          },
        }).then((res) => {
          this.$router.push({
            path: '/adressList'
          })
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>
