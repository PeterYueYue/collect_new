<template>
  <div class="uploadimage">
    <div class="imgbtnortext">
      <!-- 上传图片后隐藏 -->
      <div v-show="imgsAddress.length<1" class="upimg">
        <div class="bcphotoimg" style=" width:100% ; height:100%;">
          <div class="show"> 
            <div class="picture" :style="'backgroundImage:url('+headerImage+')'"></div>
          </div>
          <div style="width:100%;height:100%">
            <input style="width:100%;height:100%;opacity:0;" type="file" id="upload" accept="image/*"
                   @change="upload">
            <label for="upload"></label>
          </div>
        </div>
      </div>
      <!-- 上传图片呢后显示 -->
      <div class="showimge">
        <div v-for="(item,index) in imgsAddress" :key="item.id" class="imgBox">
          <img :src="imgsAddress[index].thumbnail" alt="">
          <div class="zhezhao"></div>
          <img src="@/assets/icon/delete.png" alt="" @click="removeImg(index)" class="closeImg" name="clear">
        </div>
        <!-- <img src="@/assets/upimg2.png" alt=""> -->
        <div v-show="imgsAddress.length>0 && imgsAddress.length<3" class="isaddimg">
          <span class="level"></span>
          <span class="verticals"></span>
          <div style=" width:100% ; height:100%;"> 
            <div class="show">
              <div class="picture"></div>
            </div>
            <div style="width:100%;height:100%">
              <input style="width:100%;height:100%;opacity:0;" type="file" id="upload" accept="image/*"
                     @change="upload">
              <label for="upload"></label>
            </div>
          </div>
        </div>
      </div>
      <div class="text">上传物品图片</div>
    </div>

    <!-- 生活垃圾 -->
    <div class="upload_main">
      <div class="upload_head">已选回收物<span   v-if="false" >预估总计：<span>￥{{priceTotal}}</span></span></div>
      <div class="up_group">
        <div class="upload_rubsh" v-for="(data,index) in productList" :key="index">
          <div class="utrash_title">{{data.pName}}<span  v-if="false">预估价格：<span>￥{{data.price.toFixed(2)}}</span></span></div>
            <div class="utrash_item" v-for="(items,index) in data.data" :key="index">
              <span  v-if="fileContentBase64" class="weight">x {{items.number+items.unit}}</span>
              <div class="name" v-html="items.name"></div>
              <div class="price"   v-if="items.price !==0" >¥<span>{{items.price}}/{{items.unit}}</span></div>
            </div>
        </div>
      </div>
    </div>

    <div class="recycle_description">
      <div class="nextbutton2" @click="getTextareaValue" v-if="imgsAddress.length<=0" >
       <input style="width: 100%;background-color:#bfc5c8;color:#ddd;opacity:0;" type="file" id="upload"
              accept="image/*" @change="upload">
        <label for="upload">请上传回收物图片完成预约</label>
      </div>
      <div class="nextbutton1" @click="getTextareaValue" v-if="imgsAddress.length>0">
        <router-link to="/orderInfo">马上预约</router-link>
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

  .van-field .van-cell__value {
    border: none !important;
  }
</style>
<script>

  import Exif from "exif-js";
  import api from "@/api/api.js";
  import $ from "jquery";
  import axios from "axios";
  import 'vant/lib/vant-css/icon-local.css';
  import "@/assets/createstyle/uploadimage.css";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        headerImage: "",
        textareaValue: "", //回收物品描述问文字
        number: 0,
        productList: [],
        priceTotal: window.sessionStorage.getItem('productTotal') ? JSON.parse(window.sessionStorage.getItem('productTotal')).priceTotal : 0,
        numTotal: window.sessionStorage.getItem('productTotal') ? JSON.parse(window.sessionStorage.getItem('productTotal')).numTotal : 0
      };
    },
    computed: mapGetters({
      imgsAddress: "imgsAddress",
      token: 'token'
    }),
    mounted(){
      document.setTitle('回收物描述');
      if (!window.sessionStorage.getItem('productList')) {
        this.productList = [];
        return
      }
      let data = JSON.parse(window.sessionStorage.getItem('productList'));

      console.log(data,"shuju")
      let productList = [];
      data.map((items) => {
        let index = productList.findIndex((el) => {
          return el.pName === items.pName
        });
        if (index > -1) {
          productList[index].data.push(items);
          productList[index].price += items.price * items.number
        } else {
          productList.push({ pName: items.pName, data: [items], price: items.price * items.number })
        }
      });
      this.productList = productList
    },
    methods: {
      actionFocus() {
        var textaress = $('#textareas');
        textaress[0].removeAttribute("readonly", "readonly")
      },
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
      upload(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.picValue = files[0];
        this.imgPreview(this.picValue);
      },
      imgPreview(file) {
        let self = this;
        let Orientation;
        //去获取拍照时的信息，解决拍出来的照片旋转问题
        Exif.getData(file, function () {
          Orientation = Exif.getTag(this, "Orientation");
        });
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return;
        if (/^image/.test(file.type)) {
          // 创建一个reader
          let reader = new FileReader();
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(file);
          // 读取成功后的回调
          reader.onloadend = async function () {
            let result = this.result;
            let img = new Image();
            img.src = result;
            //判断图片是否大于100K,是就直接上传，反之压缩图片
            if (this.result.length <= 100 * 1024) {
              self.headerImage = this.result;
              self.postImg();
            } else {
              img.onload = function () {
                let data = self.compress(img, Orientation);
                self.headerImage = data;
                self.postImg();
              };
            }
          };
        }
      },
      postImg() {
        //这里写接口
        ap.showLoading({
          content: '请稍后',
        });
        api.upLoader({
          "app_key": "app_id_1",
          "data": {
            "fileContentBase64": this.headerImage,
            "fileName": ''
          },
          token: this.token
        }).then((res) => {
          this.$store.dispatch("addImgsUrl", res.data[0]);
          ap.hideLoading()
        }).catch((err) => {
          console.log(err)
        })

      },
      rotateImg(img, direction, canvas) {
        //最小与最大旋转方向，图片旋转4次后回到原方向
        const min_step = 0;
        const max_step = 3;
        if (img == null) return;
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        let height = img.height;
        let width = img.width;
        let step = 2;
        if (step == null) {
          step = min_step;
        }
        if (direction == "right") {
          step++;
          //旋转到原位置，即超过最大值
          step > max_step && (step = min_step);
        } else {
          step--;
          step < min_step && (step = max_step);
        }
        //旋转角度以弧度值为参数
        let degree = step * 90 * Math.PI / 180;
        let ctx = canvas.getContext("2d");
        switch (step) {
          case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
          case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
          case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
          case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
        }
      },
      compress(img, Orientation) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        //瓦片canvas
        let tCanvas = document.createElement("canvas");
        let tctx = tCanvas.getContext("2d");
        let initSize = img.src.length;
        let width = img.width;
        let height = img.height;
        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio;
        if ((ratio = width * height / 4000000) > 1) {
          console.log("大于400万像素");
          ratio = Math.sqrt(ratio);
          width /= ratio;
          height /= ratio;
        } else {
          ratio = 1;
        }
        canvas.width = width;
        canvas.height = height;
        // 铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //如果图片像素大于100万则使用瓦片绘制
        let count;
        if ((count = width * height / 1000000) > 1) {
          console.log("超过100W像素");
          count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
          //  计算每块瓦片的宽和高
          let nw = ~~(width / count);
          let nh = ~~(height / count);
          tCanvas.width = nw;
          tCanvas.height = nh;
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(
                img,
                i * nw * ratio,
                j * nh * ratio,
                nw * ratio,
                nh * ratio,
                0,
                0,
                nw,
                nh
              );
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height);
        }
        //修复ios上传图片的时候 被旋转的问题
        if (Orientation != "" && Orientation != 1) {
          switch (Orientation) {
            case 6: //需要顺时针（向左）90度旋转
              this.rotateImg(img, "left", canvas);
              break;
            case 8: //需要逆时针（向右）90度旋转
              this.rotateImg(img, "right", canvas);
              break;
            case 3: //需要180度旋转
              this.rotateImg(img, "right", canvas); //转两次
              this.rotateImg(img, "right", canvas);
              break;
          }
        }
        //进行最小压缩
        let ndata = canvas.toDataURL("image/jpeg", 0.1);
        console.log("压缩前：" + initSize);
        console.log("压缩后：" + ndata.length);
        console.log(
          "压缩率：" + ~~(100 * (initSize - ndata.length) / initSize) + "%"
        );
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        return ndata;
      }
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

  .yd-loading {
    transform: scale(2);
  }
</style>


