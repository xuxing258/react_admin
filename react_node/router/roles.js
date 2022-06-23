const express = require("express");
const router = express.Router();
const {
    setAdd,
    getRole,
    rmoveRole,
    setPower,
    getUser
} = require("../module/manage/handleRoles")

// 添加角色路由
router.post("/setadd",async (req, res)=>{
    let result = await setAdd(req.body,req.session.adminRoot)
    res.send(result)
})

// 获取角色路由
router.get("/getrole",async (req, res)=>{
    let result = await getRole()
    res.send(result)
})

// 删除角色路由
router.post("/rmover",(req, res)=>{
    rmoveRole(req.body)
    res.send({code:1,value:"删除成功",data:{}})
})

// 设置角色权限路由
router.post("/power",async (req, res)=>{
    let result = await setPower(req.body)
    res.send({code:1,value:"设置权限成功",data:result})
})

// 获取所有职位
router.get("/getuser",async (req, res)=>{
    let result = await getUser(req.body);
    res.send({code:1,value:"获取成功",data:result})
})

module.exports = router
