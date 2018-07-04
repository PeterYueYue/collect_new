<template>
  <div class="addressopt">
    <!-- <header class="head clearfix">
        <div @click="backbtn()" class="fl">
            <span class="fl headback"></span>
            <span class="fl">返回</span>
        </div>
        <h3 class="fl">地址选择</h3>
    </header> -->
    <div class="step_call">
      <h3>四步变现</h3>
      <ul class="step_list">
        <li class="item">
          <div class="step_num">1</div>
          <span>旧机评估</span>
          <div class="xuxian"></div>
        </li>
        <li class="item">
          <div class="step_num">2</div>
          <span>获得报价</span>
          <div class="xuxian"></div>
        </li>
        <li class="item">
          <div class="step_num">3</div>
          <span>上门鉴定</span>
          <div class="xuxian"></div>
        </li>
        <li class="item">
          <div class="step_num">4</div>
          <span>完成回收</span>
          <!-- <div class="xuxian"></div> -->
        </li>
      </ul>
      <div class="icon_smaell"></div>
      <h5 class="reward">交易成功即可获得1积分</h5>
    </div>
    <!-- 获取用户的地址信息来判断位置 -->
    <div class="hsdiqu clearfix">
      <h5 class="fl">回收地址</h5>
      <router-link class="text fl" to="/addressel/areaelecte">
        {{userAddressInfo.address}}
      </router-link>
      <span class="fr"></span>
    </div>
    <div class="next">
      <span class="add_info" @click="openArea">找不到我的小区?</span>
      <h1 id="demo"></h1>
      <div class="nextbutton  ">
        <a v-show="!isEnter" class="dontEnter" href="javascript:;">下一步</a>
        <router-link v-show="isEnter" class="yesEnter" :to="'/typeSelect/'+addRessId.id">下一步</router-link>
      </div>
    </div>
    <!-- 如果选择的地址没有弹出此提示框 -->
    <!--<prompt-box></prompt-box>-->
    <div class="add_shadow" v-if="showShadow" @click.prevent="closeArea"></div>
    <div class="shadow_box" v-if="showArea">
      <img src="@/assets/close_icon.png" alt="" class="close_icon" @click="closeArea">
      <div>温馨提示</div>
      <div class="show_title">您所在的小区暂时不在回收服务范围,正在努力成长中......</div>
    </div>

  </div>
</template>
<script>
  import '@/assets/createstyle/tool.css'
  import '@/assets/createstyle/addressopt.css'
  import api from '@/api/api.js'
  import PromptBox from './common/promptbox.vue'

  import {mapGetters} from 'vuex'

  export default {
    components: {
      PromptBox
    },
    data() {
      return {
        itemID: '',
        userAddressInfo: {
          areaId: '',
          address: ''
        },
        areaList: '',
        id: '',
        isEnter: false,
        showShadow: false,
        showArea: false,
      }
    },
    computed: mapGetters({
      useraddress: 'useraddress',
      addRessId: 'addRessId',
      token: 'token',

    }),
    created() {
      this.itemID = this.$store.state.msItemId;
      var {id} = this.$route.params;   //商品ID
      this.id = id;
      api.MemberAddress({
        "app_key": "app_id_1",
        token: this.token
      }).then((res) => {
        // 判断地址栏的默认信息以及修改后的显示逻辑
        if (this.useraddress.address) {
          this.isEnter = true;
          this.userAddressInfo.address = this.useraddress.address + this.useraddress.name;
        } else {
          if (res.data.isExist) {
            this.isEnter = true;
            this.userAddressInfo.address = res.data.address + res.data.name;
            this.userAddressInfo.areaId = res.data.areaId;
            this.userAddressInfo.id = res.data.id;
            this.$store.dispatch('changeAddressText', this.userAddressInfo)
          } else {
            this.isEnter = false;
            this.userAddressInfo.address = '请输入您的详细地址'
          }
        }
      }).catch((erro) => {
        console.log(erro)
      })
    },
    methods: {
      backbtn() { //执行返回上一个路由；
        this.$router.go(-1);
      },
      openArea() {
        this.showShadow = true;
        this.showArea = true;
      },
      closeArea() {
        this.showShadow = false;
        this.showArea = false;
      }
    }
  }
</script>
