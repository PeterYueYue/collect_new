

<template>
    <!-- <yd-slider index="2" autoplay="3000">
        
        <yd-slider-item>
            <a href="http://106.15.157.147/green/my/goADPage.jhtml">
                <img src="@/assets/banner5.png">
            </a>
        </yd-slider-item>
        <yd-slider-item>
            <a href="javascript:;">
                <img src="@/assets/banner1.png">
            </a>
        </yd-slider-item>
        <yd-slider-item>
            <a href="javascript:;">
                <img src="@/assets/banner3.png">
            </a>
        </yd-slider-item>
        
    </yd-slider> -->
    <div class="swiper-container">
        <div class="swiper-wrapper">
            
            <div class="swiper-slide">
                <a href="http://106.15.157.147/green/my/goADPage.jhtml">
                     <img src="@/assets/banner5.png">
                 </a>
            </div>
            <div class="swiper-slide"><img src="@/assets/banner1.png"/></div>
            <div class="swiper-slide"><img src="@/assets/banner3.png"/></div>
        </div>
        <div class="swiper-pagination"></div>
    </div>


</template>


<style>

.yd-slider-pagination-item{
    width: 0.15rem;
    height:0.15rem;
}
</style>
<script>
require('../../../static/swiper-4.2.0.min.css');
let Swiper              = require('../../../static/swiper-4.2.0.min');
export default {
   
    mounted: function() {

        let ll = document.querySelector('.swiper-container')

        this.$nextTick(function() {
            console.log(ll)

            
            var mySwiper = new Swiper('.swiper-container', {
                direction: 'horizontal',
                loop: true,
                autoplay:true,

                // 如果需要分页器
                // pagination: {
                //     el: '.swiper-pagination',
                //     type : 'fraction'
                // },
            })
        })
    }

}
</script>
