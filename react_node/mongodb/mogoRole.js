const mongoose = require("mongoose");

// 登录数据库
let schema = new mongoose.Schema({
  roleName: String, // 角色名称
  roleTime: Date, //创建时间
  roleAbout: String, // 谁给权限
  roleArr: {
    //存储权限
    type: Array,
    default: [],
  },
  roleShowArr: {
    //已有权限
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("mongoRole", schema);
