import axios from 'axios';

// 正式
let base ='http://101.132.111.141:80';

// 测试
// let base = 'http://180.153.19.161:9000';

// 张强
// let base ='http://192.168.1.155:9000';

// 王灿
// let base ='http://192.168.1.163:9000';

// import state   from './../vuex/store.js'
// var uesrToken = state.getters.token;

// var uesrToken ="3F3TEMH74565Q5QORHNPE76UZM6VT4JPWVV4OPUNTGAXLLRLC6B5GYU3LW34YHVNOEFL2LXPVT24UAJWCBI7NJ42KSYJ2KXG2OVQSA6ZMU4VMMCLQUKIRXAWTX2BD3K6MDOZDBJ4Q62CYGOB7DVAUP4CYQAHL3JSQRIG7P2UO77IZBN7W3E4RZK42VEEUWCHGAZLS7LGRB4EVIIYSQVYYSGAETEUZC4JUVVV2UDRKIOBGXURUGYCOGKTBVFLZYU2QFPF2G4I7DVNKBWCOFWBQDLZLJYEDSPIL6T46KLPZ4O2ZIFJROTQ"

//首页home
const configGetHome = {
  "name": "order.unfinishlist",
  "format": "json",
  "sign": "5DE6544B4B82AE8881BC71D2427AC0EF",
  "version": "1.0",
}

//公司地址
const configCompanyByIds = {
  "name": "order.getCompanyByIds",
  "format": "json",
  "sign": "46AEDAD711B963EBDE7F1C82AA107BD6",
  "version": "1.0",
}

//定点投放
const configGetCommunity = {
  "name": "community.getCommunity",
  "format": "json",
  "version": "1.0",
}

//订单记录
const configGetOrders = {
  "name": "order.orderlist",
  "format": "json",
  "sign": "176D6FFA5466BFCC1C44134832EEEB9D",
  "version": "1.0",
}

//收呗记录
const configGetRecords = {
  "name": "point.getPointListByType",
  "format": "json",
  "sign": "1477CDE9A873B0E4E133668007BF8215",
  "version": "1.0",
}

//订单详情
const configGetDetails = {
  "name": "order.detail",
  "format": "json",
  "sign": "B8BF37CA674C715F6406114DF5FF2059",
  "version": "1.0",
}

//取消订单
const configCancelOrders = {
  "name": "order.cancel",
  "format": "json",
  "sign": "A1D4D59E78C7CE00F17C98AFF3AC03F5",
  "version": "1.0",
}

//获取评价
const configGetEvaluate = {
  "name": "evaluation.getEvaluationByOrder",
  "format": "json",
  "sign": "49964CA877CA34368E2BC8D6FD331D2B",
  "version": "1.0",
}

//进行评价
const configEvaluate = {
  "name": "evaluation.evaluationByOrder",
  "format": "json",
  "sign": "A8CBAEB3389FC1988825201836E39BE2",
  "version": "1.0",
}

let configGetClassify = {  //回收分类
  "name": "category.listTop",
  "format": "json",
  "sign": "150181CDB909BC6EB4F3FF8EFFF5AFD4",
  "version": "1.0",
}

let configGetSubList = {   //根据一级分类id取得所有二级分类
  "name": "category.listchild",
  "format": "json",
  "sign": "5708373CF8855D4ED3D5429770083CEB",
  "version": "1.0",
}

let configAddressList = {
  "name": "community.defaultAddress",
  "format": "json",
  "sign": "40AFD5662C2FFA919683D5DE60B37A7D",
  "version": "1.0",
}

let configGetAreaList = {   //根据层级取得所有该层地区
  "name": "area.getByArea",
  "format": "json",
  "sign": "13D87277BCBF3A55F7D1BB13A6E00723",
  "version": "1.0",
}

let configAreaChildList = {  //根据父级取得所有子地区
  "name": "area.child",
  "format": "json",
  "sign": "A81DE37CBFECB1C01F50A634006095E4",
  "version": "1.0",
}

// let cofigGetCellSeleTion = {  //根据区域id，取得该区域下所有小区 ，仅支持上一级，不支持跨层
//   "name": "community.areaCommunity",
//   "format": "json",
//   "sign": "6313A5BCEC3EC1C9BA62B8904544782D",
//   "version": "1.0",
//   "timestamp": 1520832048762,
// }

let cofigGetCellSeleTion = {  //根据一级分类id获取该分类服务的回收企业，并取出这些企业服务的小区，并且去除重复
  "name": "community.listareaByCategory",
  "format": "json",
  "sign": "A42E4270F0EC3DBA5BC972AED16E8DB0",
  "version": "1.0",
}

let configCategoryAttrOption = {  //根据分类 的属性取 分类属性选项
  "name": "categoryAttrOption.listCategoryAttrOption",
  "format": "json",
  "sign": "49964CA877CA34368E2BC8D6FD331D2B",
  "version": "1.0",
}

let configGetAllattrOption = {
  "name": "categoryAttr.listCategoryAttrs",
  "format": "json",
  "sign": "22C2AF422064DD456A2E81A5140AB310",
  "version": "1.0",
}

let configUpLoader = {
  "name": "util.uploadImage",
  "format": "json",
  "version": "1.0",
}

let configFturePrices = {   //请求预估价格
  "name": "categoryAttr.computeValue",
  "format": "json",
  "sign": "50A96A5A5CB4FCCEDCE5BE844F410ED1",
  "version": "1.0",
}

var configComplete = {  //下单提交信息
  "name": "order.create",
  "format": "json",
  "sign": "823385CC5F251B3D1D3135F85F7D32F7",
  "version": "1.0",
}

var confiGetverifiMessage = {  //手机验证信息
  "name": "app.message.getcode",
  "format": "json",
  "sign": "EAC51C3A5FE6BCF908BEE7325841AFB0",
  "version": "1.0",
}

var configIsAuthorization = { //判断是否授权
  "name": "member.getAuthCode",
  "format": "json",
  "version": "1.0",
}

var configSubmitAuthCode = { //提交手机验证码
  "name": "member.getMessageCode",
  "format": "json",
  "version": "1.0",
}

var configMemberAddress = { //对外提供默认地址
  "name": "memberAddress.memberAddress",
  "format": "json",
  "sign": "E9A93A4B470B500879274B37482EFF04",
  "version": "1.0",
}

var configMAddress = { //对外提供默认地址2
  "name": "memberAddress.getMemberAddressById",
  "format": "json",
  "sign": "E9A93A4B470B500879274B37482EFF04",
  "version": "1.0",
}

var configMemberAddressList = { //用户地址的列表
  "name": "memberAddress.memberAddressList",
  "format": "json",
  "sign": "FC9A826D26B306554FA6EEA9F5633520",
  "version": "1.0",
}

var configDelectMemberAddress = { //用户删除地址
  "name": "memberAddress.delectMemberAddress",
  "format": "json",
  "sign": "AE164CF0097F206E387E3100A4F992BC",
  "version": "1.0",
}

var configSelectMemberAddress = { //修改地址
  "name": "memberAddress.selectMemberAddress",
  "format": "json",
  "sign": "C6FB38926CA6CB5E167FE3DF137C6ED0",
  "version": "1.0",
}

var configSaveMemberAddress = { //保存地址
  "name": "memberAddress.saveMemberAddress",
  "format": "json",
  "sign": "D34DE788B8744895B68C6158DE6258CA",
  "version": "1.0",
}

var configUpdateIsSelectedAddress = { //设置默认地址
  "name": "memberAddress.updateIsSelectedAddress",
  "format": "json",
  "sign": "3A5A37498A59CA357725E68D420A1B75",
  "version": "1.0",
}

var configGetIntegralList = { /*获取积分商城券列表*/

  "app_key": "app_id_1",
	"name": "product.getProductListYes",
	"format": "json",
	"sign": "32B4691EE78E15C09BE465DE9D757562",
	"version": "1.0",
}

var configSendVoucher = { /*给用户发券*/
  "app_key": "app_id_1",
	"name": "product.sendVoucher",
	"format": "json",
	"sign": "6054CC1246723770F13844BED9C1A4F1",
	"version": "1.0",
}

var configProductListNo = {//消耗0积分的列表
	"name": "product.getProductListNo",
	"format": "json",
	"sign": "32B4691EE78E15C09BE465DE9D757562",
	"version": "1.0",
}

let configGetGoodsList = { //实物兑换列表
  "app_key": "app_id_1",
	"name": "product.getProductGoodsList",
	"format": "json",
	"version": "1.0",
}
let configGoodsOrder = {
  "app_key": "app_id_1",
	"name": "product.sendGoodsProduct",
	"format": "json",
	"version": "1.0",
}

let confiGetUserToken = {
  "app_key": "app_id_1",
  "name": "member.getUserToken",
	"format": "json",
	"version": "1.0",
}


//回收分类
export default {
  Uuid (){
    return new Date().valueOf()+Math.random()
  },
  timestamp(){
    return new Date().valueOf();
  },
  getClassify(params) {  //取得所有一级分类
    let config = Object.assign(configGetClassify, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, configGetClassify).then(res => res.data);
  },
  getSubList(params) {  //取得所有一级分类
    let config = Object.assign(configGetSubList, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getAddRessList(params) {  //根据最近一次订单的地址，取出该地址。并且判断传入分类是否在该地址支持服务
    let config = Object.assign(configAddressList, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getAreaList(params) {  //根据层级获取所有的区
    let config = Object.assign(configGetAreaList, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  areaChildList(params) {  //根据父级取得所有子地区
    let config = Object.assign(configAreaChildList, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getCellSeleTion(params) {//根据区域id，取得该区域下所有小区 ，仅支持上一级，不支持跨层
    let config = Object.assign(cofigGetCellSeleTion, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  categoryAttrOption(params) {  //根据分类 的属性取 分类属性选项
    let config = Object.assign(configCategoryAttrOption, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getAllattrOption(params) {  //根据分类id取得所有分类属性
    let config = Object.assign(configGetAllattrOption, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  upLoader(params) {  //拍照上传 获取图片链接地址；
    let config = Object.assign(configUpLoader, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  completeOrder(params) {
    var config = Object.assign(configComplete, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data)
  },
  futurePrices(params) {   //请求商品的预估价格
    let config = Object.assign(configFturePrices, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getHome(params) {  //首页未完成订单
    let config = Object.assign(configGetHome, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getOrders(params) {  //订单记录
    let config = Object.assign(configGetOrders, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getRecords(params) {  //收呗记录
    let config = Object.assign(configGetRecords, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getDetails(params) {  //订单详情
    let config = Object.assign(configGetDetails, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  cancelOrders(params) {  //取消订单
    let config = Object.assign(configCancelOrders, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getEvaluate(params) {  //获取评价
    let config = Object.assign(configGetEvaluate, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  setEvaluate(params) {  //获取评价
    let config = Object.assign(configEvaluate, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  companyByIds(params) {  //公司地址
    let config = Object.assign(configCompanyByIds, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  GetCommunity(params) {  //定点投放
    let config = Object.assign(configGetCommunity, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getverifiMessage(params) { //手机验证信息
    let config = Object.assign(confiGetverifiMessage, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  isAuthorization(params) { //判断是否授权
    let config = Object.assign(configIsAuthorization, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  submitAuthCode(params) { //提交手机验证码
    let config = Object.assign(configSubmitAuthCode, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  MemberAddress(params) { //对外提供默认地址
    let config = Object.assign(configMemberAddress, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  MAddress(params) { //对外提供默认地址2
    let config = Object.assign(configMAddress, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  MemberAddressList(params) { //用户地址的列表
    let config = Object.assign(configMemberAddressList, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  DelectMemberAddress(params) { //用户删除地址
    let config = Object.assign(configDelectMemberAddress, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  SelectMemberAddress(params) { //修改地址
    let config = Object.assign(configSelectMemberAddress, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  SaveMemberAddress(params) { //保存地址
    let config = Object.assign(configSaveMemberAddress, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  UpdateIsSelectedAddress(params) { //设置默认地址
    let config = Object.assign(configUpdateIsSelectedAddress, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },

  GetIntegralList(params) { /*获取积分商城券列表*/
    let config = Object.assign(configGetIntegralList, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  ProductListYes(params){ //获取零积分列表
    let config = Object.assign(configProductListNo,params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`,config).then(res => res.data);
  },
  SendVoucher(params) { /*给用户发券*/
    let config = Object.assign(configSendVoucher, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data)
  },
  GetGoodsList(params){ //实物兑换列表
    let config = Object.assign(configGetGoodsList, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data)
  },
  GoodsOrder(params){ //兑换下单
    let config = Object.assign(configGoodsOrder, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data)
  },
  GetUserToken(params){
    let config = Object.assign(confiGetUserToken, params,{"nonce":this.Uuid()},{"timestamp":this.timestamp()});
    return axios.post(`${base}/ali/api`, config).then(res => res.data)
  }





}


