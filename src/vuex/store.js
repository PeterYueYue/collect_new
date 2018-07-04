import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import createPersistedState from 'vuex-persistedstate'

import router from '../router/index.js'

Vue.use(Vuex);
// 创建 store 实例

export default new Vuex.Store({
  actions,
  getters,
  state: {
    token: '',
    count: 0,
    msItemId: '',
    useraddress: '8888',
    isShowMeassage: false,    //控制选不到已服务的小区的提示框
    addRessId: {},  //  进入地址组件关联的ID
    isShowForState: 0, //来改变类型和商品状况选择里的模块显示第几个
    selectedInfo: {     //用来存储 地址选择 已选择信息
      areaItem: '', //行政区域信息；object
      subdistyictItem: '',
      cellseletionItem: '',
    },
    categoryAttrOppIds: '',  //商品属性信息
    statisticsPrice: '', //搜集商品属性里的价格指数 来计算预估价格
    futurePrice: '',  //预估价格
    textareaValue: '',  //图片上传时描述信息
    appointmentTime: '',  //上门预约时间
    imgsAddress: [],  //用户拍照上传存储的图片地址信息
    orderPic: {   //图片分类
      picUrl: '',
      origPic: '',
      smallPic: ''
    },
    commodityInformation: {        //这里存储商品的详细信息
    },
    addResstext: {
      address: '',
      areaId: ''
    },
    classID: '',
    adressInfo: {},
  },
  mutations: {
    getSubItemID(state, id) {  //获取子集ID
      this.state.msItemId = id;
    },
    Set_Add_Ress_Id(state, data) {
      this.state.addRessId = Object.assign(this.state.addRessId, data)

    },
    Change_Address(state, data) {
      this.state.useraddress = data;
      this.state.selectedInfo.cellseletionItem = data;
    },
    Change_Show_Or_Hidden(state, data) {  //改变提示框显示状态  默认为隐藏
      this.state.isShowMeassage = !this.state.isShowMeassage;
      // this.state.addRessId      = data;
    },
    Change_Is_Show_State(state, data) { //来改变类型和商品状况选择里的模块显示第几个
      this.state.isShowForState = Object.assign(this.state.isShowForState, data)
    },
    Change_Selected(state, data) {  //用来存储 地址选择 已选择信息
      this.state.selectedInfo.areaItem = data;
      this.state.selectedInfo.subdistyictItem = '';
    },
    Change_Selected_Subdistyict(state, data) {
      this.state.selectedInfo.subdistyictItem = data.area;
    },
    Change_StatisticsPrice(state, data) {   // 搜集预估价格信息
      this.state.statisticsPrice = this.state.statisticsPrice.concat(data.price, ',');
      this.state.categoryAttrOppIds = this.state.categoryAttrOppIds.concat(data.id, ',');
    },
    Change_Future_Price(state, data) {    //改变预估价信息
      this.state.futurePrice = data;
    },
    clear_Price_Info(state, data) {       //清除预估价格判定条件
      this.state.categoryAttrOppIds = ''
    },
    Change_Textarea_Value(state, data) {   //图片信息描述
      this.state.textareaValue = data;
    },
    Change_Appointment_Time(state, data) {  //设定或改变预约时
      this.state.appointmentTime = data;
    },
    add_Imgs_Url(state, data) {  // 把从服务器请求来的图片地址信息存到state状态里面
      this.state.imgsAddress.push(data);
      var b = [];
      var c = [];
      var d = [];
      this.state.imgsAddress.forEach((e) => {
        b.push(e.bigPicture);
        c.push(e.original);
        d.push(e.thumbnail);
      })
      this.state.orderPic.picUrl = b.toString();
      this.state.orderPic.origPic = c.toString();
      this.state.orderPic.smallPic = d.toString();

    },
    remove_Img(state, data) {  // 删除上传的图片
      var a = [];
      var l = this.state.imgsAddress.forEach((e, i) => {
        if (i != data) {
          a.push(e)
        }
      })
      this.state.imgsAddress = a;
    },
    Get_Token(state, data) {   // 获取token
      this.state.token = data
    },
    change_Address_Text(state, data) {
      this.state.addResstext = data;
    },
    Clear(state) {       //清除图片信息
      this.state.imgsAddress = []
    },
    clear_Future_Price(state, data) { // 初始评估价格
      this.state.futurePrice = '';
      this.state.statisticsPrice = ''
    },
    SetClassItemId(state, data) {  // 父级分类id
      this.state.classID = data
    },
    GetAddressInfo(state, data) {  // 默认地址信息
      console.log(data);
      this.state.adressInfo = data
    },
  },
  plugins: [createPersistedState({storage: window.sessionStorage})]
})
