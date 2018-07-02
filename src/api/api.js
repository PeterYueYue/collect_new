import axios from 'axios';

// 测试
// let base ='http://101.132.111.141:80';
// let base ='http://192.168.1.155:9000';
let base = 'http://180.153.19.161:9000';
// let base = 'http://192.168.1.162:9000';
// import state   from './../vuex/store.js'
// var uesrToken = state.getters.token;

// var uesrToken ="3F3TEMH74565Q5QORHNPE76UZM6VT4JPWVV4OPUNTGAXLLRLC6B5GYU3LW34YHVNOEFL2LXPVT24UAJWCBI7NJ42KSYJ2KXG2OVQSA6ZMU4VMMCLQUKIRXAWTX2BD3K6MDOZDBJ4Q62CYGOB7DVAUP4CYQAHL3JSQRIG7P2UO77IZBN7W3E4RZK42VEEUWCHGAZLS7LGRB4EVIIYSQVYYSGAETEUZC4JUVVV2UDRKIOBGXURUGYCOGKTBVFLZYU2QFPF2G4I7DVNKBWCOFWBQDLZLJYEDSPIL6T46KLPZ4O2ZIFJROTQ"

//首页home
const configGetHome = {
  "name": "order.unfinishlist",
  "format": "json",
  "sign": "5DE6544B4B82AE8881BC71D2427AC0EF",
  "version": "1.0",
  "nonce": "3cfb4919-211e-4737-a284-566c9a6ad016",
  "timestamp": 1520922311285,
}

//公司地址
const configCompanyByIds = {
  "name": "order.getCompanyByIds",
  "format": "json",
  "sign": "46AEDAD711B963EBDE7F1C82AA107BD6",
  "version": "1.0",
  "nonce": "8c98709e-db4a-409b-b76c-8cad56ab0199",
  "timestamp": 1524810140095,
}

//订单记录
const configGetOrders = {
  "name": "order.orderlist",
  "format": "json",
  "sign": "176D6FFA5466BFCC1C44134832EEEB9D",
  "version": "1.0",
  "nonce": "a5d64ec0-fbcb-434d-8684-fd9b6ce7bba0",
  "timestamp": 1522132341898,
}

//收呗记录
const configGetRecords = {
  "name": "point.getPointListByType",
  "format": "json",
  "sign": "1477CDE9A873B0E4E133668007BF8215",
  "version": "1.0",
  "nonce": "ffe42777-4692-4e76-be13-b8823c1bb5f3",
  "timestamp": 1520416397474,
}

//订单详情
const configGetDetails = {
  "name": "order.detail",
  "format": "json",
  "sign": "B8BF37CA674C715F6406114DF5FF2059",
  "version": "1.0",
  "nonce": "ed4fa93f-b19f-4f38-96c6-2e6647ccf254",
  "timestamp": 1521424523443,
}

//取消订单
const configCancelOrders = {
  "name": "order.cancel",
  "format": "json",
  "sign": "A1D4D59E78C7CE00F17C98AFF3AC03F5",
  "version": "1.0",
  "nonce": "05eb3311-72e6-467c-860a-faf7dd4237a3",
  "timestamp": 1520924873517,
}

//获取评价
const configGetEvaluate = {
  "name": "evaluation.getEvaluationByOrder",
  "format": "json",
  "sign": "49964CA877CA34368E2BC8D6FD331D2B",
  "version": "1.0",
  "nonce": "45418cfc-5ad2-4f48-8fe7-09ded212d999",
  "timestamp": 1520579620270,
}

//进行评价
const configEvaluate = {
  "name": "evaluation.evaluationByOrder",
  "format": "json",
  "sign": "A8CBAEB3389FC1988825201836E39BE2",
  "version": "1.0",
  "nonce": "8576168a-27e9-4043-8d56-140a79b81b13",
  "timestamp": 1522047122519,
}

let configGetClassify = {  //回收分类
  "name": "category.listTop",
  "format": "json",
  "sign": "150181CDB909BC6EB4F3FF8EFFF5AFD4",
  "version": "1.0",
  "nonce": "518d8cb1-4e7a-49da-941f-72669ee547f6",
  "timestamp": 1521084409360,
}

let configGetSubList = {   //根据一级分类id取得所有二级分类
  "name": "category.listchild",
  "format": "json",
  "sign": "5708373CF8855D4ED3D5429770083CEB",
  "version": "1.0",
  "nonce": "7a3e111a-4c92-411d-8683-220eacfde115",
  "timestamp": 1521091926280,
}

let configAddressList = {
  "name": "community.defaultAddress",
  "format": "json",
  "sign": "40AFD5662C2FFA919683D5DE60B37A7D",
  "version": "1.0",
  "nonce": "16412db9-5f3b-4af2-90cd-bdc85a98ef17",
  "timestamp": 1520835093965,
}

let configGetAreaList = {   //根据层级取得所有该层地区
  "name": "area.getByArea",
  "format": "json",
  "sign": "13D87277BCBF3A55F7D1BB13A6E00723",
  "version": "1.0",
  "nonce": "fc1874cb-af8d-4feb-bed2-39914f6dc098",
  "timestamp": 1520403875676,
}

let configAreaChildList = {  //根据父级取得所有子地区
  "name": "area.child",
  "format": "json",
  "sign": "A81DE37CBFECB1C01F50A634006095E4",
  "version": "1.0",
  "nonce": "ebe3fcb8-4ab5-49a7-accc-4eade3ce7446",
  "timestamp": 1520404216901,
}

// let cofigGetCellSeleTion = {  //根据区域id，取得该区域下所有小区 ，仅支持上一级，不支持跨层
//   "name": "community.areaCommunity",
//   "format": "json",
//   "sign": "6313A5BCEC3EC1C9BA62B8904544782D",
//   "version": "1.0",
//   "nonce": "53832d71-cd35-48de-8784-d154edd924c7",
//   "timestamp": 1520832048762,
// }

let cofigGetCellSeleTion = {  //根据一级分类id获取该分类服务的回收企业，并取出这些企业服务的小区，并且去除重复
  "name": "community.listareaByCategory",
  "format": "json",
  "sign": "A42E4270F0EC3DBA5BC972AED16E8DB0",
  "version": "1.0",
  "nonce": "96a999c2-387b-4284-bd77-ec5105eb8d57",
  "timestamp": 1521103227642,
}

let configCategoryAttrOption = {  //根据分类 的属性取 分类属性选项
  "name": "categoryAttrOption.listCategoryAttrOption",
  "format": "json",
  "sign": "49964CA877CA34368E2BC8D6FD331D2B",
  "version": "1.0",
  "nonce": "45418cfc-5ad2-4f48-8fe7-09ded212d999",
  "timestamp": 1520579620270,
}

let configGetAllattrOption = {
  "name": "categoryAttr.listCategoryAttrs",
  "format": "json",
  "sign": "22C2AF422064DD456A2E81A5140AB310",
  "version": "1.0",
  "nonce": "83552b17-c9a4-4bfb-9ceb-ef31dc82faa9",
  "timestamp": 1520496356565,
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
  "nonce": "11fb0dbe-3816-467d-80a3-7c35558a94ef",
  "timestamp": 1521595483415,
}

var configComplete = {  //下单提交信息
  "name": "order.create",
  "format": "json",
  "sign": "823385CC5F251B3D1D3135F85F7D32F7",
  "version": "1.0",
  "nonce": "7e79e517-85fe-4431-ad1b-098b445bc4aa",
  "timestamp": 1522215112803,
}

var confiGetverifiMessage = {  //手机验证信息
  "name": "app.message.getcode",
  "format": "json",
  "sign": "EAC51C3A5FE6BCF908BEE7325841AFB0",
  "version": "1.0",
  "nonce": "b4a189f1-a043-402a-8c5b-f58257f1e6c2",
  "timestamp": 1528784831707
}

var configIsAuthorization = { //判断是否授权
  "name": "member.getAuthCode",
  "format": "json",
  "version": "1.0",
  "nonce": "e99c8460-6e55-4fbc-ba96-03d13992314c",
  "timestamp": 1528789323533
}

var configSubmitAuthCode = { //提交手机验证码
  "name": "member.getMessageCode",
  "format": "json",
  "version": "1.0",
  "nonce": "9c66cada-6fce-4588-9f11-c2a956aca21a",
  "timestamp": 1528791473231
}

var configMemberAddress = { //对外提供默认地址
  "name": "memberAddress.memberAddress",
  "format": "json",
  "sign": "E9A93A4B470B500879274B37482EFF04",
  "version": "1.0",
  "nonce": "c3c0b328-6ef0-42b8-8085-843e684b81f7",
  "timestamp": 1530088173679,
}

var configMemberAddressList = { //用户地址的列表
  "name": "memberAddress.memberAddressList",
  "format": "json",
  "sign": "FC9A826D26B306554FA6EEA9F5633520",
  "version": "1.0",
  "nonce": "20c0ef73-d253-45a1-a734-4cdbee46fa34",
  "timestamp": 1530083092219,
}

var configDelectMemberAddress = { //用户删除地址
  "name": "memberAddress.delectMemberAddress",
  "format": "json",
  "sign": "AE164CF0097F206E387E3100A4F992BC",
  "version": "1.0",
  "nonce": "a66d6695-e3db-45d6-9d5c-7bbb69818bc3",
  "timestamp": 1530083261196,
}

var configSelectMemberAddress = { //修改地址
  "name": "memberAddress.selectMemberAddress",
  "format": "json",
  "sign": "C6FB38926CA6CB5E167FE3DF137C6ED0",
  "version": "1.0",
  "nonce": "dfa3f834-3c9a-4479-bf10-96e5ccba5f35",
  "timestamp": 1530083447807,
}

var configSaveMemberAddress = { //保存地址
  "name": "memberAddress.saveMemberAddress",
  "format": "json",
  "sign": "D34DE788B8744895B68C6158DE6258CA",
  "version": "1.0",
  "nonce": "34b91916-c225-4b6e-8a9b-5d3609068e57",
  "timestamp": 1530082221581,
}

var configUpdateIsSelectedAddress = { //设置默认地址
  "name": "memberAddress.updateIsSelectedAddress",
  "format": "json",
  "sign": "3A5A37498A59CA357725E68D420A1B75",
  "version": "1.0",
  "nonce": "3f109201-1132-4632-8157-418213f84cda",
  "timestamp": 1530239469246,
}




//回收分类
export default {
  getClassify(params) {  //取得所有一级分类
    let config = Object.assign(configGetClassify, params);
    return axios.post(`${base}/ali/api`, configGetClassify).then(res => res.data);
  },
  getSubList(params) {  //取得所有一级分类
    let config = Object.assign(configGetSubList, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getAddRessList(params) {  //根据最近一次订单的地址，取出该地址。并且判断传入分类是否在该地址支持服务
    let config = Object.assign(configAddressList, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getAreaList(params) {  //根据层级获取所有的区
    let config = Object.assign(configGetAreaList, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  areaChildList(params) {  //根据父级取得所有子地区
    let config = Object.assign(configAreaChildList, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getCellSeleTion(params) {//根据区域id，取得该区域下所有小区 ，仅支持上一级，不支持跨层
    let config = Object.assign(cofigGetCellSeleTion, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  categoryAttrOption(params) {  //根据分类 的属性取 分类属性选项
    let config = Object.assign(configCategoryAttrOption, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getAllattrOption(params) {  //根据分类id取得所有分类属性
    let config = Object.assign(configGetAllattrOption, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  upLoader(params) {  //拍照上传 获取图片链接地址；
    let config = Object.assign(configUpLoader, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  completeOrder(params) {
    var config = Object.assign(configComplete, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data)
  },
  futurePrices(params) {   //请求商品的预估价格
    let config = Object.assign(configFturePrices, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getHome(params) {  //首页未完成订单
    let config = Object.assign(configGetHome, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getOrders(params) {  //订单记录
    let config = Object.assign(configGetOrders, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getRecords(params) {  //收呗记录
    let config = Object.assign(configGetRecords, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getDetails(params) {  //订单详情
    let config = Object.assign(configGetDetails, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  cancelOrders(params) {  //取消订单
    let config = Object.assign(configCancelOrders, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getEvaluate(params) {  //获取评价
    let config = Object.assign(configGetEvaluate, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  setEvaluate(params) {  //获取评价
    let config = Object.assign(configEvaluate, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  companyByIds(params) {  //公司地址
    let config = Object.assign(configCompanyByIds, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  getverifiMessage(params) { //手机验证信息
    let config = Object.assign(confiGetverifiMessage, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  isAuthorization(params) { //判断是否授权
    let config = Object.assign(configIsAuthorization, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  submitAuthCode(params) { //提交手机验证码
    let config = Object.assign(configSubmitAuthCode, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  MemberAddress(params) { //对外提供默认地址
    let config = Object.assign(configMemberAddress, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  MemberAddressList(params) { //用户地址的列表
    let config = Object.assign(configMemberAddressList, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  DelectMemberAddress(params) { //用户删除地址
    let config = Object.assign(configDelectMemberAddress, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  SelectMemberAddress(params) { //修改地址
    let config = Object.assign(configSelectMemberAddress, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  SaveMemberAddress(params) { //保存地址
    let config = Object.assign(configSaveMemberAddress, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },
  UpdateIsSelectedAddress(params) { //设置默认地址
    let config = Object.assign(configUpdateIsSelectedAddress, params);
    return axios.post(`${base}/ali/api`, config).then(res => res.data);
  },



}


