<style>

  .verifi {
    width: 100%;
    background-color: #fff;
    text-align: center;
  }

  .verifi .phoneNumber {
    margin-top: 1rem;
    width: 6.34rem;
    display: inline-block;
  }

  .verifi .phoneNumber input {
    border: 0;
    outline: none;
    width: 6.34rem;
    height: 1rem;
    font-size: 0.35rem;
    border-bottom: 0.01rem solid #888888;
    position: relative;
    z-index: 99;
  }

  .verifi .phoneNumber .phone {
    position: relative;
  }

  .verifi .phoneNumber .phone span {
    font-size: 0.4rem;
    color: #888888;
    position: absolute;
    top: 0;
    left: 0;
  }

  .verifi .phoneNumber .phone .err {
    position: absolute;
    bottom: -0.4rem;
    left: 0.2rem;
    font-size: 0.24rem;
    word-spacing: 0.1rem;
    color: red;
  }

  .verifi .phoneNumber .verifibox {
    margin-top: 0.5rem;
    position: relative;
  }

  .verifi .phoneNumber .verifibox span {
    position: absolute;
    bottom: 0.2rem;
    left: 0;
    font-size: 0.4rem;
    color: #888888;
  }

  .verifi .phoneNumber .verifibox .enter {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 0.34rem;
    color: #888888;
  }

  .verifi .phoneNumber .verifibox .timebox {
    position: absolute;
    right: 0.1rem;
    bottom: 0.2rem;
    font-size: 0.4rem;
    color: #888888;
  }

  .verifi .btn {
    width: 6.9rem;
    height: 0.84rem;
    background-color: #dddddd;
    font-size: 0.36rem;
    display: inline-block;
    margin-top: 2rem;
    line-height: 0.84rem;
    border-radius: 0.08rem;
    color: #bfbfbf;
  }

  .verifi .okcolor {
    color: #00a0e9 !important;
    z-index: 100;
  }

  .verifi .bacor {
    background-color: #00a0e9;
    color: #fff;
  }
</style>

<template>
  <div class="verifi">
    <div class="phoneNumber">
      <div @click="isShowPhone = false" class="phone">
        <input v-model="phonenumber" type="number" placeholder="请输入手机号" v-on:input="watchPhone" @blur="revisePhone">
        <!-- <span  v-show="isShowPhone">请输入手机号</span> -->
        <div v-show="isErr" class="err">手机格式不正确</div>
      </div>
      <div class="verifibox">
        <input @click="isShowVer = false" placeholder="输入验证码" v-on:input="watchVer" v-model="vercon" @blur="reviseVer"
               type="number">
        <div v-show="isShowTime" class="timebox">{{times}}秒</div>
        <!-- <span v-show="isShowVer">输入验证码</span> -->
        <div :class="{okcolor:isEnter}" @click="action" v-show="isShowTime == false " class="enter ">发送验证码</div>
      </div>
    </div>
    <div :class="{bacor:isEnter}" @click="submit" class="btn">提交</div>
  </div>
</template>
<script>
  // import './verification.css';
  import api from '@/api/api.js';
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        isShowPhone: true,
        phonenumber: '',
        isShowVer: true,
        vercon: '',
        isErr: false,
        isEnter: false,
        isShowTime: false,
        times: 59
      }
    },
    computed: mapGetters({
      token: "token"
    }),
    methods: {
      revisePhone() {
        var myreg = /^[1][3,4,6,5,7,8][0-9]{9}$/;
        if (this.phonenumber === '') {
          this.isShowPhone = true;
          this.isErr = false;
          this.isEnter = false;
        } else {
          if (!myreg.test(this.phonenumber)) {
            this.isErr = true;
            this.isEnter = false;
          } else {
            this.isEnter = true;
          }
        }
      },
      watchPhone() {
        var myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
        if (this.phonenumber === '') {
          this.isShowPhone = true;
          this.isEnter = false;
        } else {
          if (!myreg.test(this.phonenumber)) {
            this.isShowPhone = false;
            this.isEnter = false;
          } else {
            this.isEnter = true;
          }
        }
      },
      reviseVer() {
        if (this.vercon === '') {
          this.isShowVer = true;
        }
      },
      watchVer() {
        if (this.vercon != '') {
          this.isShowVer = false;
        }
      },
      action() {
        this.times = 59;
        this.isShowTime = true;
        api.getverifiMessage({
          "app_key": "app_id_1",
          "data": {
            "tel": this.phonenumber
          }
        }).then(res => {
          console.log(res)
        })

        let time1
        time1 = setInterval(() => {
          this.times = this.times - 1;
          if (this.times == 0) {
            clearInterval(time1)
            this.isShowTime = false;
          }
        }, 1000)
      },
      submit() {
        if (this.isEnter && this.vercon !== '') {
          api.submitAuthCode({
            "app_key": "app_id_1",
            "data": {
              "id": this.$route.query.id,
              "messageCode": this.vercon,
              "mobile": this.phonenumber
            }
          }).then(res => {
            this.$router.push({ path: '/home'});
            this.$store.dispatch('getToken',res.data.token)

          })
        }

      }
    }

  }
</script>
