const express = require("express");
const router = express.Router();
const {
    addGoogAccount,
    getAcot,
    getPage,
    postUpdateAcount,
    removeAccount,
    getAccountAll,
    setConclusion,
    rmoImg,
    getAcount,
    removeCount,
    getAccountSerach,
    getSerachPage
} = require("../module/manage/handleGoods")
// 上传文件配置
const multer = require('multer')
const upload = require("../module/plugin/multer")

// 存放图片地址路由 
router.post("/sumbit",(req, res)=>{
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.  上传错误
          return res.send({code:0,value:"上传错误",data:{}})
        } else if (err) {
          // An unknown error occurred when uploading.  未知错误
          return res.send({code:0,value:"未知错误",data:{}})
        }
        let imgUrl = "reactImg/" + req.file.filename
        return res.send({code:1,value:"获取分类",data:{imgUrl}})
    })
})

// 商品详情路由
router.post("/conclusion",async (req, res)=>{
    let result = await setConclusion(req.body,req.session.adminRoot)
    res.send({code:1,value:"商品添加",data:result})
})

//删除图片路由
router.post("/rmoimg",(req, res)=>{
    rmoImg(req.body)
    res.send({code:1,value:"删除图片成功",data:{}})
})

// 获取商品路由
router.get("/getacount",async (req, res)=>{
    let result = await  getAcount(req.query)
    res.send(result)
})

// 删除商品
router.post("/removec", (req, res)=>{
    removeCount(req.body)
    res.send({code:1,value:"删除图片成功",data:{}})
})




// 添加分类路由
router.post("/add",async (req,res)=>{
    let result = await addGoogAccount(req.body,req.session.adminRoot);
    res.send(result)
})

// 获取分类路由
router.get("/getacot",async (req,res)=>{
    let result = await getAcot();
    res.send(result)
})

// 分类分页路由
router.get("/page",async (req,res)=>{
    let result = await getPage(req.query);
    res.send(result)
})

// 修改分类路由
router.post("/update",async (req,res)=>{
    let result = await postUpdateAcount(req.body);
    res.send(result)
})

// 删除分类路由
router.post("/delete", (req,res)=>{
    removeAccount(req.body);
    res.send({code:1,value:"删除成",data:{}})
})

// 获取所有分类路由
router.get("/acount",async (req,res)=>{
    let result = await  getAccountAll();
    res.send({code:1,value:"获取分类",data:result})
})

// 搜索商品路由
router.get("/serach",async (req,res)=>{
    let result = await  getAccountSerach(req.query);
    res.send(result)
})

// 分页搜索商品路由
router.get("/serachpage",async (req,res)=>{
    let result = await  getSerachPage(req.query);
    res.send(result)
})

module.exports = router
