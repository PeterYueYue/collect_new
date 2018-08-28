import  Vue               from 'vue';
import  Router            from 'vue-router';
import  ClassIfy          from '@/components/create/classify.vue';
// 地址选择
import  AddressOption     from '@/components/create/addressoption.vue';
// 地址选择  区域选择
import  addressel         from '@/components/create/common/addressel.vue';
import  Areaelecte        from '@/components/create/common/areaelecte.vue';
import  TownSelect        from '@/components/create/common/townselect.vue';
import  Cellseletion      from '@/components/create/common/cellseletion.vue';
// 类型选择
import  TypeSelect        from '@/components/create/typeselect.vue';
// 类型选择    类型选择
import  TypeClass         from '@/components/create/common/typeclass.vue'
// 类型选择   年限选择
import  TypeYear          from '@/components/create/common/typeyear.vue'
// 类型选择   功能状况
import  Typestate         from '@/components/create/common/typestate.vue'
// 上传图片
import  UploadImage       from '@/components/create/uploadimage.vue';
import  UploadImage1      from '@/components/create/uploadimage1.vue';
// 马上询价
import  Estimate          from '@/components/create/estimate.vue';
import  OrderInfo         from '@/components/create/orderInfo.vue';
//验证
import  Verifiaction      from '@/components/verification';
// 积分商城
import  IntegralShoping   from '@/components/integralShopping/indexShop/shopping.vue';
// 积分商城 券详情
import  Ticketdetails     from '@/components/integralShopping/details/discount/ticketdetails';
// 实物兑换  详情
import GoodsTicket        from '@/components/integralShopping/details/goods/goodsTicket';



/****************************wang***********************************/
import  home              from '@/components/details/home.vue'
import  details           from '@/components/details/details.vue'
import  orders            from '@/components/details/orders.vue'
import  shopList            from '@/components/details/shopList.vue'
// import  records           from '@/components/details/records.vue'
import  imgView           from '@/components/details/imgView.vue'
import  qrCode            from '@/components/details/qrCode.vue'
import  adressList        from '@/components/details/adressList.vue'
import  addAdress         from '@/components/details/addAdress.vue'
import  selectAdress      from '@/components/details/selectAdress.vue'
import  ad                from '@/components/details/ad.vue'
import active             from '@/components/details/active.vue'
Vue.use(Router)
const router =  new Router({
  routes: [
    {
      path:'/',
      name:'home',
      meta:{index:1},
      component:home
    },
    {
      path: '/home',
      name: 'home',
      meta:{index:1},
      component: home
    },
    {
      path: '/ad',
      name: 'ad',
      component: ad
    },
    {
      path: '/adressList',
      name: 'adressList',
      component: adressList
    },
    {
      path: '/shopList',
      name: 'shopList',
      component: shopList
    },
    {
      path: '/addAdress',
      name: 'addAdress',
      component: addAdress
    },
    {
      path: '/selectAdress',
      name: 'selectAdress',
      component: selectAdress
    },
    {
      path: '/details',
      meta:{index:3},
      name: 'details',
      component: details
    },
    {
      path: '/qrCode',
      name: 'qrCode',
      component: qrCode
    },
    {
      path: '/imgView',
      name: 'imgView',
      component: imgView
    },
    {
      path: '/active',
      name: 'active',
      component: active
    },
    // {
    //   path: '/records',
    //   name: 'records',
    //   component: records
    // },
    {
      path: '/orders',
      name: 'orders',
      meta:{index:2},
      component: orders
    },
    {
      path: '/classIfy/:id',
      meta:{index:2},
      name: 'ClassIfy',
      component: ClassIfy,
    },
    {
      path: '/addressel',
      name: 'addressel',
      component: addressel,
      children:[
        {
          path: 'townSelect/:areaItem',
          name: 'TownSelect',
          component: TownSelect,
        },
        {
          path:'areaelecte',
          name: 'Areaelecte',
          component: Areaelecte,
        },
        {
          path:'cellseletion/:itemAreaId',
          name: 'Cellseletion',
          component: Cellseletion,
        }
      ]
    },
    {
      path: '/addressoption/:id',
      name: 'AddressOption',
      component: AddressOption,
    },
    {
      path: '/typeSelect/:index',
      meta:{index:3},
      name: 'TypeSelect',
      component: TypeSelect,
    },
    {
      path:'/uploadimage',
      name:'UploadImage',
      meta:{index:5},
      component:UploadImage
    },
    {
      path:'/uploadimage1',
      meta:{index:3},
      name:'UploadImage1',
      component:UploadImage1
    },
    {
      path:'/estimate',
      meta:{index:4},
      name:'Estimate',
      component:Estimate
    },
    {
      path:'/orderInfo',
      meta:{index:6},
      name:'OrderInfo',
      component:OrderInfo
    },
    {
      path:'/verifiaction',
      name:'Verifiaction',
      component:Verifiaction
    },
    {
      path:'/integralshoping/:id',

      name:'IntegralShoping',
      component:IntegralShoping,
      meta:{
        keepAlive:true,
        index:2
      }
    },
    {
      path:'/ticketdetails',
      meta:{index:4},
      name:'ticketdetails',
      component:Ticketdetails
    },
    {
      path:'/goodsTicket',
      name:'goodsTicket',
      meta:{index:4},
      component:GoodsTicket
    }
  ]

})
export default router;
