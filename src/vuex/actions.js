import * as types from './mutation-types'
// import store      from './../../static/store.js'


getToken
export var getToken                 = ({commit},data)     => {   // 获取用户token
    commit(types.Get_Token,data);
}
export var changePointIndex         = ({commit},data)     => {
    commit(types.SET_CHANGE_INDEX,data);
}
export var changeItem                = ({ commit }, data) => {
    commit(types.Set_user_info, data)
}
export var changeAddress             = ({commit}, data)   => {   //改变选择的地址信息
    commit(types.Change_Address, data)
}
export var changeShowOrHidden        = ({commit}, data)   => {  //控制选不到已服务的小区的提示框
    commit(types.Change_Show_Or_Hidden, data)
}
export var setAddRessId              = ({commit}, data)   =>{  //点击品类存储商品ID
    commit(types.Set_Add_Ress_Id, data)  
}
export var changeIsShowState         = ({commit}, data)   =>{  //来改变类型和商品状况选择里的模块显示第几个
    commit(types.Change_Is_Show_State, data)  
}
export var changeSelected            =  ({commit}, data)  =>{  //选择地址 改变已选的信息
    commit(types.Change_Selected, data)
}
export var changeSelectedSubdistyict = ({commit}, data)   =>{
    commit(types.Change_Selected_Subdistyict, data)
}
export var changeStatisticsPrice     = ({commit}, data)   =>{
    commit(types.Change_StatisticsPrice, data)
}
export var changeFuturePrice         = ({commit}, data)   =>{  // 预估价格
    commit(types.Change_Future_Price, data)
}
export var clearPriceInfo         = ({commit}, data)   =>{  // 清除预估价格判定条件
    commit(types.clear_Price_Info, data)
}


export var changeTextareaValue       = ({commit}, data)   =>{   //图片描述信息
    commit(types.Change_Textarea_Value, data)
}
export var changeAppointmentTime     = ({commit}, data)   =>{   //设定或改变预约时间
    commit(types.Change_Appointment_Time, data)
}
export var addImgsUrl                = ({commit}, data)   =>{   //从服务器请求来的上传的图片呢地址信息
    commit(types.add_Imgs_Url, data)
}
export var removeImg                 = ({commit}, data)   =>{   //删除上传图片
    commit(types.remove_Img, data)
}
export var changeAddressText                 = ({commit}, data)   =>{   //用户地址
    commit(types.change_Address_Text, data)
}
export var clear                = ({commit}, data)   =>{   //清空内容
    commit(types.Clear, data)
}
export var clearfuturePrice      = ({commit}, data)   =>{   //初始预估价格
    commit(types.clear_Future_Price, data)
}
