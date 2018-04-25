<template>
  <div>
    <div id='code'></div>
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
  import QRCode from 'qrcode'
  export default{
    data(){
      return {
        codes: ''
      }
    },
    props: ['url'],
    methods: {
      useQrcode(){
        let canvas = document.getElementById('canvas');
        const url = this.url + '';
        QRCode.toCanvas(canvas, url, function (error) {
          if (error) console.log(error);
          console.log('success!');
        })
      }
    },
    mounted(){
      this.useQrcode();
    }
  }
</script>
<style>
  #canvas {
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 4.1rem !important;
    height: 4.1rem !important;
  }
</style>
