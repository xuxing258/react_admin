const mongoose = require("mongoose");
const mogoRole = require("./mogoRole")
// 登录数据库
let schema = new mongoose.Schema(
    {
        loginName:String,  //用户名
        loginPass:String,  // 密码
        LoginTime:Date,    // 创建事件
        LoginPhone:String, // 手机号码
        LoginAbout:{        // 管理职位
            type:mongoose.Types.ObjectId,
            ref:mogoRole
        }
    },
)


module.exports = mongoose.model("mongoLogin",schema)