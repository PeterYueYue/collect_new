import  Vue               from 'vue'
import  Router            from 'vue-router'
import  HelloWorld        from '@/components/HelloWorld'
import  ClassIfy          from '@/components/create/classify.vue'
// 地址选择
import  AddressOption     from '@/components/create/addressoption.vue'
// 地址选择  区域选择
import  addressel         from '@/components/create/common/addressel.vue'
import  Areaelecte        from '@/components/create/common/areaelecte.vue'
import  TownSelect        from '@/components/create/common/townselect.vue'
import  Cellseletion      from '@/components/create/common/cellseletion.vue'
// 类型选择
import  TypeSelect        from '@/components/create/typeselect.vue'
// 类型选择    类型选择
import  TypeClass         from '@/components/create/common/typeclass.vue'
// 类型选择   年限选择
import  TypeYear          from '@/components/create/common/typeyear.vue'
// 类型选择   功能状况
import  Typestate         from '@/components/create/common/typestate.vue'
// 上传图片
import  UploadImage       from '@/components/create/uploadimage.vue'
import  UploadImage1      from '@/components/create/uploadimage1.vue'
// 马上询价
import  Estimate          from '@/components/create/estimate.vue'
import  OrderInfo         from '@/components/create/orderInfo.vue'
//验证
import  Verifiaction      from '@/components/verification'
//login
import  Login             from '@/components/login.vue'
// 积分商城
import  IntegralShoping   from '@/components/integralShopping/shopping.vue'
// 积分商城 券详情
import  Ticketdetails     from '@/components/integralShopping/ticketdetails'

/****************************wang***********************************/
import  home              from '@/components/details/home.vue'
import  details           from '@/components/details/details.vue'
import  orders            from '@/components/details/orders.vue'
// import  records           from '@/components/details/records.vue'
import  imgView           from '@/components/details/imgView.vue'
import  qrCode            from '@/components/details/qrCode.vue'
import  adressList        from '@/components/details/adressList.vue'
import  addAdress         from '@/components/details/addAdress.vue'
import  selectAdress      from '@/components/details/selectAdress.vue'
import  ad                from '@/components/details/ad.vue'
Vue.use(Router)
const router =  new Router({
  routes: [
    {
      path:'/',
      name:'login',
      component:Login
    },
    {
      path: '/home',
      name: 'home',
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
    // {
    //   path: '/records',
    //   name: 'records',
    //   component: records
    // },
    {
      path: '/orders',
      name: 'orders',
      component: orders
    },
    {
      path: '/classIfy',
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
      name: 'TypeSelect',
      component: TypeSelect,
    },
    {
      path:'/uploadimage',
      name:'UploadImage',
      component:UploadImage
    },
    {
      path:'/uploadimage1',
      name:'UploadImage1',
      component:UploadImage1
    },
    {
      path:'/estimate',
      name:'Estimate',
      component:Estimate
    },
    {
      path:'/orderInfo',
      name:'OrderInfo',
      component:OrderInfo
    },
    {
      path:'/verifiaction',
      name:'Verifiaction',
      component:Verifiaction
    },
    {
      path:'/integralshoping',
      name:'IntegralShoping',
      component:IntegralShoping
    },
    {
      path:'/ticketdetails',
      name:'ticketdetails',
      component:Ticketdetails
    }
  ]

})
export default router;
