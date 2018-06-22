<template>
  <div class="add_wrap">
    <div class="add_item">
      <div class="title">
        <div class="left">联系人</div>
        <div class="right"><input type="text" placeholder="请输入姓名"></div>
      </div>
      <div class="title">
        <div class="left">手机号码</div>
        <div class="right"><input type="text" placeholder="请输入手机号"></div>
      </div>
      <div class="title">
        <div class="left">所在地址</div>
        <div class="right">请选择所在地区<img src="@/assets/icon_right.png" alt=""></div>
      </div>
      <div class="title">
        <div class="left">详细地址</div>
        <div class="right"><input type="text" placeholder="请输入街道、楼牌号等"></div>
      </div>
    </div>
    <div class="add_btn">保存</div>
  </div>
</template>

<script>
  import '@/assets/detailstyle/adress.css'
  import api from '@/api/api.js'

  export default {
    data() {
      return {

      }
    },
    methods: {}
  }
</script>
