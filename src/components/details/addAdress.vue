<template>
  <div class="add_wrap">
    <div class="add_item">
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
          <select name="" v-model="selectArea" @change="getStreet">
            <option value="">请选择所在行政区</option>
            <option :value="{id:items.id,name:items.areaName}" v-for="(items,index) in areaList" :key="index">
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
            <option :value="{id:items.area.id,index:index,name:items.area.areaName}" v-for="(items,index) in streetList"
                    :key="index">
              {{items.area.areaName}}
            </option>
          </select>
          <img src="@/assets/icon_right.png" alt=""></div>
      </div>
      <div class="title" v-if="selectStreet" v-show="showStreet && this.selectCommunity!== 'noVal'">
        <div class="left">所在小区</div>
        <div class="right">
          <select name="" v-model="selectCommunity">
            <option value="">请选择所在小区名称</option>
            <option :value="{id:items.id,name:items.name}" v-for="(items,index) in communityList" :key="index">
              {{items.name}}
            </option>
            <option value="noVal">找不到所在小区</option>
          </select>
          <img src="@/assets/icon_right.png" alt=""></div>
      </div>
      <div class="title" v-show="!showStreet || this.selectCommunity === 'noVal'">
        <div class="left">所在小区</div>
        <div class="right"><input type="text" placeholder="请输入小区名称" v-model="form.area"></div>
      </div>
      <div class="title">
        <div class="left">详细地址</div>
        <div class="right"><input type="text" placeholder="请输入楼牌号等" v-model="form.address"></div>
      </div>
    </div>
    <div class="add_btn" @click="saveData">保存</div>

    <!-- 弹窗 -->
    <div class="add_shadow" v-if="showShadow"></div>
    <div class="add_shadow_box" v-if="showNul">
      <div>上述信息不能为空</div>
      <div class="add_shadow_btn" @click="closeShadow">确定</div>
    </div>
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
  import '@/assets/detailstyle/addAdress.css'
  import api from '@/api/api.js'
  import {mapGetters} from 'vuex'

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
        showNul: false,
        showCance: false,
        showCance2: false,
        showStreet: true,
        location: {}
      }
    },
    computed: mapGetters({
      cityId: "cityId",
    }),
    mounted() {
      //获取经纬度
      // AlipayJSBridge.call('getCurrentLocation', {bizType: 'didi', requestType: 0}, (result) => {
      //   if (result.error) {
      //     alert("请您开启定位功能");
      //     return;
      //   }
      //   this.location = result
      // });
      this.getAreaList();
    },
    methods: {
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
            "address": !this.selectCommunity ? (this.selectArea.name + this.selectStreet.name +
            this.form.area + this.form.address) : (this.selectCommunity === 'noVal' ? this.selectArea.name +
              this.selectStreet.name +
              this.form.area + this.form.address : this.selectArea.name + this.selectStreet.name +
              this.selectCommunity.name + this.form.address),
            "areaId": this.selectArea.id,
            "houseNumber": this.form.address,
            "name": this.form.name,
            "tel": this.form.tel,
            "id": "",   //id传入有值时是保存修改地址，当地不传或传空时为新增地址
            "communityId": this.selectCommunity.id,
            "streetId": this.selectStreet.id,
            "commByUserInput": this.form.area,
            "cityId": this.cityId,
          },
        }).then((res) => {
          console.log(res.data)
          if (res.data == '保存地址成功') {
            let jumpUrl = window.sessionStorage.getItem('jumpUrl');
            if (jumpUrl) {
              this.$router.push({
                path: jumpUrl,
              });
              window.sessionStorage.removeItem('jumpUrl')
            } else {
              this.$router.push({
                path: '/adressList',
              })
            }
          } else {
            this.showShadow = true;
            this.showNul = true;
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      getAreaList() {

        api.getAreaList({
          "app_key": "app_id_1",
          "data": {
            "level": 0,
            "cityId": this.cityId,
          },
          token: this.$store.state.token,
        }).then((res) => {
          this.areaList = res.data;
        }).catch((error) => {
          console.log(error)
        })
      },
      getStreet() {
        // 支付宝内加载提示
        ap.showLoading({content: '请稍候',});
        // 请求区域数据
        api.areaChildList({
          "app_key": "app_id_1",
          "data": {
            "id": this.selectArea.id,
            "level": 1,
            "latitude": this.location.latitude ? this.location.latitude : '',
            "longitude": this.location.longitude ? this.location.longitude : ''


          },
          token: this.$store.state.token,
        })
          .then((res) => {
            this.selectStreet = '';
            this.selectCommunity = '';
            this.streetList = res.data;
            // 关闭支付宝加载提示
            ap.hideLoading();
          })

      },
      getCommunity() {
        this.selectCommunity = '';
        this.showStreet = true;
        this.communityList = this.streetList[this.selectStreet.index].community;
        if (this.communityList.length === 0) {
          this.showStreet = false
        }
      },
      closeShadow() {
        this.showShadow = false;
        this.showNul = false;
        this.showCance = false;
        this.showCance2 = false;
      },
    }
  }
</script>
