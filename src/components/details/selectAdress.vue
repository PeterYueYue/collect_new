<template>
  <div class="select_wrap">
    <div class="select_item">
      <div class="title">
        <div class="left">联系人</div>
        <div class="right"><input type="text" placeholder="请输入姓名" v-model="form.name"></div>
      </div>
      <div class="title">
        <div class="left">手机号码</div>
        <div class="right"><input type="number" placeholder="请输入手机号" v-model="form.tel"></div>
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
          <select name="" v-model="selectStreet" @change="getCommunity" @focus="getCommunity">
            <option value="">请选择所在街道/镇</option>
            <option v-for="(items,index) in streetList"
                    :value="{id:items.area.id,index:index,name:items.area.areaName}"
                    :key="index">
              {{items.area.areaName}}
            </option>
          </select>
          <img src="@/assets/icon_right.png" alt=""></div>
      </div>
      <div class="title" v-if="selectStreet" v-show="!showArea">
        <div class="left">小区名称</div>
        <div class="right">
          <select name="" v-model="selectCommunity" @change="communityChange">
            <option value="">请选择所在小区名称</option>
            <option v-for="(items,index) in communityList"
                    :value="{id:items.id,name:items.name}"
                    :key="index">
              {{items.name}}
            </option>
            <option value="noVal">找不到所在小区</option>
          </select>
          <img src="@/assets/icon_right.png" alt="">
        </div>
      </div>
      <div class="title" v-show="showArea">
        <div class="left">小区名称</div>
        <div class="right new">
          <input type="text" placeholder="请输入小区名称" v-model="form.area">
          <span class="modify" @click="modifyData">修改</span>
        </div>
      </div>
      <div class="title">
        <div class="left">详细地址</div>
        <div class="right"><input type="text" placeholder="请输入楼牌号等" v-model="form.address"></div>
      </div>
    </div>
    <div class="select_btn" @click="saveData">保存</div>
    <!-- 弹窗 -->
    <div class="add_shadow" v-if="showShadow"></div>
    <div class="add_shadow_box" v-if="showCance">
      <div>手机号格式不正确</div>
      <div class="add_shadow_btn" @click="closeShadow">确定</div>
    </div>
    <div class="add_shadow_box" v-if="showCance2">
      <div>联系人格式不正确</div>
      <div class="add_shadow_btn" @click="closeShadow">确定</div>
    </div>
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
          area: '',
          address: '',
        },
        areaList: [],
        streetList: [],
        communityList: [],
        selectArea: '',
        selectStreet: '',
        selectCommunity: '',
        showShadow: false,
        showCance: false,
        showCance2: false,
        showArea: true,
        areaValue: '',
        location:{}
      }
    },
    mounted() {

      //获取经纬度
      // AlipayJSBridge.call('getCurrentLocation', { bizType: 'didi',requestType:0 },  (result) => {
      //   if (result.error) {
      //     alert(result.errorMessage);
      //     return;
      //   }
      //   this.location = result
      // });
      // 存储token到本地
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
          this.areaValue = res.data.memberAddress.communityId;
          if (this.areaValue > 0) {
            this.showArea = false;
          } else if (this.areaValue && this.areaValue === -1) {
            this.showArea = true;
          } else if (!this.areaValue) {
            this.showArea = true;
          }
          this.form.name = res.data.memberAddress.name;
          this.form.tel = res.data.memberAddress.tel;
          this.form.area = res.data.communityName;
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
            "level": 1,
            "latitude"  :this.location.latitude?this.location.latitude:'',
            "longitude" :this.location.longitude?this.location.longitude:''
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
        this.showArea = true;
        this.selectCommunity = '';
        this.communityList = this.streetList[this.selectStreet.index].community;
        if (this.communityList.length !== 0) {
          this.showArea = false
        }
      },
      saveData() {
        //联系人正则
        let rn = /^[\u4E00-\u9FA5A-Za-z]+$/;
        let resultName = rn.test(this.form.name);
        if (!resultName) {
          this.showShadow = true;
          this.showCance2 = true;
          this.form.name = '';
          return;
        }
        //手机正则
        let rs = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|19[0-9]|16[0-9])[0-9]{8}$/;
        let resultTel = rs.test(this.form.tel);
        if (!resultTel) {
          this.showShadow = true;
          this.showCance = true;
          this.form.tel = '';
          return;
        }
        api.SaveMemberAddress({
          "app_key": "app_id_1",
          token: this.$store.state.token,
          "data": {
            "address": this.selectCommunity !== '' && this.selectCommunity !== 'noVal' && this.selectCommunity.id > 0 ? this.selectArea.name + this.selectStreet.name + this.selectCommunity.name + this.form.address : this.selectArea.name + this.selectStreet.name + this.form.area + this.form.address,
            "areaId": this.selectArea.id,
            "houseNumber": this.form.address,
            "name": this.form.name,
            "tel": this.form.tel,
            "id": this.$route.query.id,  //id传入有值时是保存修改地址，当地不传或传空时为新增地址
            "communityId": this.selectCommunity.id,
            "streetId": this.selectStreet.id,
            "commByUserInput": this.form.area,
          },
        }).then((res) => {
          this.$router.push({
            path: '/adressList'
          })
        }).catch((error) => {
          console.log(error)
        })
      },
      closeShadow() {
        this.showShadow = false;
        this.showCance = false;
        this.showCance2 = false;
      },
      modifyData() {
        if (this.communityList.length === 0 || this.selectCommunity === 'noVal' || this.selectCommunity.id < 0) {
          this.form.area = ''
        }
      },
      communityChange(){
        if (this.selectCommunity === 'noVal') {
          this.showArea = true
        } else {
          this.showArea = false
        }
      }
    }
  }
</script>
