<template>
  <div class="adress_wrap">
    <div class="adress_item">
      <div class="name">曹小叶 18939223867</div>
      <div class="adress">上海市杨浦区定海路街道阳光花园5幢2202室</div>
      <div class="btn">
        <div class="holder">
          <input type="radio" id="radio1" name="radio" class="radio" value="radio1" v-model="radio"/><label
          for="radio1"><i></i>默认地址
        </label>
        </div>
        <div class="btn_del">删除</div>
        <div class="btn_edit">修改</div>
      </div>
    </div>
    <div class="adress_item">
      <div class="name">曹小叶 18939223867</div>
      <div class="adress">上海市杨浦区定海路街道阳光花园5幢2202室</div>
      <div class="btn">
        <div class="holder">
          <input type="radio" id="radio2" name="radio" class="radio" value="radio2" v-model="radio"/><label
          for="radio2"><i></i>默认地址</label>
        </div>
        <div class="btn_del">删除</div>
        <div class="btn_edit">修改</div>
      </div>
    </div>

    <router-link to="addAdress"><div class="adress_add">新增地址</div></router-link>

    <div class="adress_footer">确认选择</div>
  </div>
</template>

<script>
  import '@/assets/detailstyle/addAdress.css'
  import api from '@/api/api.js'

  export default {
    data() {
      return {
        radio: 'radio1'
      }
    },
    methods: {}
  }
</script>
