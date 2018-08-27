
<style>
#app：{

  display: flex;
  display: -ms-flexbox;
  display: -webkit-flex;
}
.slide-fade-enter-active {

  transition: all 0.25s ease;
}
.slide-fade-leave-active {
  /* transition-delay: 0.25s; */
  transition: all 0.25s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(7.5rem);
  opacity: 0;
}
.slide-fade-leave-to{

  transform: translateX(-7.5rem);
  opacity: 0;
}


.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 300ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translateX(-7.5rem);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translateX(7.5rem);
}
.slide-left-enter {
  opacity: 0;
  transform: translateX(7.5rem);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translateX(-7.5rem);
}
</style>
<template>
  <div style="height:100%;" id="app">
    <transition :name="transitionName" >
      <router-view />
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
        //设置动画名称
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    }
  },
  data(){
    return{
      transitionName:''
    }
  },
  }
</script>



