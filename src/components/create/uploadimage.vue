<template>
    <div class="uploadimage">
        <!-- <header class="head clearfix">
            <div @click="backbtn()" class="fl">
                <span class="fl headback"></span>
                <span class="fl">返回</span>
            </div>
            <h3 class="fl">上传图片</h3>
        </header> -->
        <div class="imgbtnortext">
            <!-- 上传图片后隐藏 -->
            <div v-show="imgsAddress.length<1"  class="upimg">
                <div style=" width:100% ; height:100%;"> 
                     <div class="show"> 
                         <div class="picture" :style="'backgroundImage:url('+headerImage+')'"></div> 
                     </div> 
                     <div style="width:100%;height:100%"> 
                        <!--  <input style="width:100%;height:100%;  opacity:0;" type="file" id="upload"  accept="image" @change="upload"> 
                         <label for="upload"></label>  -->

                        <van-uploader style="width:100%;height:100%;"       :after-read="onRead"     >
                          <van-icon      name="photograph" />
                        </van-uploader>
                     </div> 
                 </div> 
            </div>
            <!-- 上传图片呢后显示 -->
            <div class="showimge">
                <div  v-for="(item,index) in imgsAddress"  :key="item.id"    class="imgBox"   >
                  <img  :src="imgsAddress[index].thumbnail"   alt="">
                  <div class="zhezhao"></div>
                  <van-icon  @click="removeImg(index)"  class="closeImg" name="clear" />
                </div>
                <!-- <img src="@/assets/upimg2.png" alt=""> -->
                <div v-show="imgsAddress.length>0 && imgsAddress.length<3" class="isaddimg">
                    <span class="level"></span>
                    <span class="verticals"></span>
                    <div style=" width:100% ; height:100%;"> 
                       <div class="show"> 
                           <div class="picture" :style="'backgroundImage:url('+headerImage+')'"></div> 
                       </div> 
                       <div style="width:100%;height:100%"> 
                        <!--   <input style="width:100%;height:100%;  opacity:0;" type="file" id="upload"  accept="image" @change="upload"> 
                          <label for="upload"></label>  -->
                        <van-uploader :after-read="onRead">
                          <!-- <van-icon name="photograph" /> -->
                        </van-uploader>
                       </div> 
                     </div> 
                </div>
            </div>
            <div   class="text">上传物品图片</div>
        </div>
        <div class="recycle_description">
            <h4>回收物品描述</h4>
            <div class="textarea_box">
                <textarea rows="3" maxlength="150"  v-model="textareaValue" placeholder="请输入文字" cols="20"  >
                
                </textarea>
                <span>{{textareaValue.length}}/150</span>
            </div>
            <div class="nextbutton "  @click="getTextareaValue"  >

                <a  v-if="imgsAddress.length<=0"    style="background-color:#bfc5c8;"   href="javascript:;">马上询价</a>
              
                <router-link v-if="imgsAddress.length>=0"   to="/estimate" >马上询价</router-link>
            </div>
        </div>
    </div>

</template>

<style>
.img {
  display: block;
  max-width: 100%;
  margin: 20px auto;
}
</style>
<script>
import Exif from "exif-js";
import api from "@/api/api.js";
import $ from "jquery";
import axios from "axios";

import "@/assets/createstyle/uploadimage.css";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      headerImage: "",
      textareaValue: "", //回收物品描述问文字
      number: 0
    };
  },
  computed: mapGetters({
    imgsAddress: "imgsAddress"
  }),
  methods: {
    backbtn() {
      //执行返回上一个路由；
      this.$router.go(-1);
    },
    removeImg(index) {
      this.$store.dispatch("removeImg", index);
    },
    getTextareaValue() {
      this.$store.dispatch("changeTextareaValue", this.textareaValue); //文字描述信息
    },
    onRead(file) {
      console.log(file);

     

      // var formdata = new FormData();
      // formdata.append("file", file[0]);
      // formdata.append('file', this.headerImage);
      // formdata.append("name", "util.uploadImage");
      // formdata.append("version", "1.0");
      // formdata.append("format", "json");
      // formdata.append(
      //   "token",
      //   "3F3TEMH74565Q5QORHNPE76UZM6VT4JPWVV4OPUNTGAXLLRLC6B5GYU3LW34YHVNOEFL2LXPVT24UAJWCBI7NJ42KSYJ2KXG2OVQSA6ZMU4VMMCLQUKIRXAWTX2BD3K6MDOZDBJ4Q62CYGOB7DVAUP4CYQAHL3JSQRIG7P2UO77IZBN7W3E4RZK42VEEUWCHGAZLS7LGRB4EVIIYSQVYYSGAETEUZC4JUVVV2UDRKIOBGXURUGYCOGKTBVFLZYU2QFPF2G4I7DVNKBWCOFWBQDLZLJYEDSPIL6T46KLPZ4O2ZIFJROTQ"
      // );
      // axios({
      //   url: "http://101.132.165.211:8080/ali/api",
      //   method: "post",
      //   format:'json',
      //   name:"util.uploadImage",
      //   version:"1.0",
      //   data: file.content,
      //   token:'3F3TEMH74565Q5QORHNPE76UZM6VT4JPWVV4OPUNTGAXLLRLC6B5GYU3LW34YHVNOEFL2LXPVT24UAJWCBI7NJ42KSYJ2KXG2OVQSA6ZMU4VMMCLQUKIRXAWTX2BD3K6MDOZDBJ4Q62CYGOB7DVAUP4CYQAHL3JSQRIG7P2UO77IZBN7W3E4RZK42VEEUWCHGAZLS7LGRB4EVIIYSQVYYSGAETEUZC4JUVVV2UDRKIOBGXURUGYCOGKTBVFLZYU2QFPF2G4I7DVNKBWCOFWBQDLZLJYEDSPIL6T46KLPZ4O2ZIFJROTQ',
      //   headers: { "Content-Type": "application/x-www-form-urlencoded" }
      // }).then(res => {
      //   console.log(res.data);
      //   this.$store.dispatch("addImgsUrl", res.data.data);
      // });


      api.upLoader({
        // "app_key": "app_id_1",
          "data": {
                "fileContentBase64": file.content,
                "fileName": file.file.name
              }
        
      }).then((res)=>{


        console.log(res)

        this.$store.dispatch("addImgsUrl", res.data[0]);

      }).catch((err) =>{
        console.log(err,1111)
      })


    },

  }
};
</script>
<style>
* {
   margin: 0;
   padding: 0;
}
.show {
   width: 100px;
   height: 100px;
   overflow: hidden;
   position: relative;
   border-radius: 50%;
   border: 1px solid #d5d5d5;
}
.picture {
   width: 100%;
   height: 100%;
   overflow: hidden;
   background-position: center center;
   background-repeat: no-repeat;
   background-size: cover;
}
</style>