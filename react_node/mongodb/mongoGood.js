const mongoose = require("mongoose");
const mongoLogin = require("./mongoLogin")

// 登录数据库
let schema = new mongoose.Schema(
    {
        goodsClass:String,  //分类
        goodsInfo:String,   // 名称
        goodsCommodity:String, // 价格
        goodsPrices:String, // 价格
        goodsImg:Array,     // 图片
        goodsTime:Date,     // 创建事件
        goodsAbout:{
            type:mongoose.Schema.Types.ObjectId,   // 表关联
            ref:mongoLogin
        },
    },
)

module.exports = mongoose.model("mongoGoods",schema)