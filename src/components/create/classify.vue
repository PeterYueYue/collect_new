<template>
  <div class="classify">
    <div class="classify_head">
      <ul>
        <li :class="{ cur: showUl }" @click="openUl(true)">家电数码</li>
        <li :class="{ cur: !showUl }" @click="openUl(false)">生活垃圾</li>
      </ul>
    </div>
    <div class="content clearfix">
      <ul class="commodity fl">
        <li
          v-for="(item ,index) in menulist"
          :key="item.id"
          class="item"
          v-bind:class="{ active: isActive == index }"
          @click="getList(item.id,index)"
        >{{item.name}}
        </li>
      </ul>
      <div class="pinlei fl">
        <div class="title clearfix">
          <span class="left_line fl"></span>
          <h5 class="fl">品类</h5>
          <span class="right_line fl"></span>
        </div>
        <ul class="linlei_list clearfix">
          <li class="item  fl" v-for="(item,index) in subList" :key="item.id" @click="getAddressInfo(item,index)">
            <router-link :to="'/addressoption/'+item.id">
              <img :src=item.icon alt="">
              <span>{{item.name}}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>


</template>
<script>
  import api from '@/api/api.js'
  import '@/assets/createstyle/tool.css'
  import '@/assets/createstyle/classify.css'
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        menulist: '',
        isId: '1',
        subList: '',
        isActive: '0',
        showUl: true,
      }
    },
    computed: mapGetters({
      token: "token"
    }),
    created: function () {
      api.getClassify({
        "app_key": "app_id_1",
        "data": {
          "level": "0"
        },
        token: this.token
      }).then((res) => {
        console.log(res);
        this.menulist = res.data;
        this.isId = res.data[0].id;
        api.getSubList({
          "app_key": "app_id_1",
          "data": {
            "id": this.isId
          },
          token: this.token
        }).then((res) => {
          this.subList = res.data;
        }).catch((erro) => {
          console.log(erro)
        })
      }).catch((erro) => {
        console.log(erro)
      });
    },
    methods: {
      getList(id, index) {
        this.isId = id;
        this.isActive = index;
        api.getSubList({
          "app_key": "app_id_1",
          "data": {
            "id": this.isId
          },
          token: this.token
        }).then((res) => {
          this.subList = res.data;
        }).catch((erro) => {
          console.log(erro)
        })
      },
      getAddressInfo(item, id) {  //获取子集列表里的ID
        this.$store.dispatch('setAddRessId', item);
        //获取地址信息
        api.getAddRessList({
          "app_key": "app_id_1",
          "data": {
            "id": 1
          },
          token: "token"
        }).then((res) => {
          this.$store.dispatch('changeAddress', res)
        }).catch((erro) => {
          console.log(erro)
        })
      },
      openUl(type) {
        this.showUl = type;
      },
    }
  }
</script>

