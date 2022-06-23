const mongoAccount = require("../../mongodb/mogoAccount")
const mongoGoods = require("../../mongodb/mongoGood")
const fs =require("fs");
const path = require("path")

// 添加分类
const addGoogAccount =async ({valAccount},Id) =>{
    if(!Id) return {code:0,value:"账号未登录",data:{}};
    // 查询是否已经存在
    let bol = await mongoAccount.findOne({accountAbout:Id.data._id,accountName:valAccount});
    if(bol) return {code:0,value:"已存在",data:{}};
    let date = Date.now() + ""
    let result = await mongoAccount.create({
        accountAbout:Id.data._id,
        accountName:valAccount,
        accountTime:new Date(),
        key: date
    });
    return {code:1,value:"分类添加成功",data:result}
}

// 获取分类 十个数据
const getAcot =async ()=>{
    let result = await mongoAccount.find({})
    let len = result.length;
    let data = result.splice(0,10)
    return {code:1,value:"获取分类成功",data:{
        len,
        data
    }}
}

// 获取分页器的 分类数据
const getPage = async ({current,pageSize}) =>{
    let num = current * pageSize - pageSize
    let result = await mongoAccount.find({},{},{skip:num,limit:pageSize})
    return {code:1,value:"分页获取分类数据",data:result}
}

// 修改分类名
const postUpdateAcount = async ({id,result})=>{
    await mongoAccount.updateOne({_id:id},{accountName:result});
    let data =  await mongoAccount.find({_id:id})
    return {code:1,value:"修改分类",data:data}
}

// 删除分类
const removeAccount =async ({id})=>{
    await mongoAccount.deleteOne({_id:id});
}

// 获取所有分类数据
const getAccountAll =async () =>{
    return await mongoAccount.find();
}

// 设置商品数据
const setConclusion =async ({classificationGoods,commodityInformation,commodityPrices,goodsImg,nameCommodity,id},Id)=>{
    //通过id判断是否已经创建成功
    let bol = await mongoGoods.findById(id)
    if(bol){ // 存在就修改
        await mongoGoods.updateOne(
            {_id:id},
            {
                goodsClass:classificationGoods,  //分类
                goodsInfo:commodityInformation,   // 名称
                goodsCommodity:nameCommodity, // 描述
                goodsPrices:commodityPrices, // 价格
                goodsImg:goodsImg,     // 图片
            }
        )

        return {}
    }else{
        return await mongoGoods.create({
            goodsClass:classificationGoods,  //分类
            goodsInfo:commodityInformation,   // 名称
            goodsCommodity:nameCommodity, // 描述
            goodsPrices:commodityPrices, // 价格
            goodsImg:goodsImg,     // 图片
            goodsTime:new Date(),     // 创建事件
            goodsAbout: Id.data?._id // 表关联
        })
    }
   
}

// 删除图片
const rmoImg =async (arr)=>{
    if(Array.isArray(arr.arr)){
        arr.arr.forEach((item)=>{
            let url  = path.resolve(__dirname,"../../public/"+item.imgUrl)
            fs.unlink(url,()=>{})
        })
    }else{
        let url  = path.resolve(__dirname,"../../public/"+arr.imgUrl)
        fs.unlinkSync(url)
        // 删除数据库的图片
        await mongoGoods.updateOne({_id:arr.id},{
            $pull:{
                goodsImg:{imgUrl:arr.imgUrl}
            }
        })
    }
  
}

// 获取商品数据
const getAcount =async () =>{
    let result = await mongoGoods.find({})
    let len = result.length;
    let data = result.splice(0,10)

    return {code:1,value:"获取商品数据",data:{
        len,
        data
    }}
}

// 删除商品
const removeCount =async ({id,goodsImg}) =>{
    await mongoGoods.deleteOne({_id:id})
    goodsImg.forEach((item)=>{
        let url  = path.resolve(__dirname,"../../public/"+item.imgUrl)
        fs.unlink(url,()=>{})
    })
}

// 搜索商品数据
const getAccountSerach = async (val)=>{
    let result
    if(val.age){     // 默认获取全部 十条数据
        result = await mongoGoods.find({})
        
    }else if(val.name){
        result = await mongoGoods.find({goodsClass:val.name})
        
    }else if(val.name1){
        result = await mongoGoods.find({goodsCommodity:val.name1})
    }

    let len = result.length;
    let data = result.splice(0,10)
    return {code:1,value:"获取分类商品成功",data:{
        len,
        data
    }}
}

// 分页获取搜索内容
const getSerachPage =async  ({val,age,acc,inT}) => {
    let num = val * age - age
    let result
    if(acc == "默认"){
        result = await mongoGoods.find({},{},{skip:num,limit:age})
    }else if(acc === "按分类搜索"){
        result = await mongoGoods.find({goodsClass:inT},{},{skip:num,limit:age})
    }else if(acc === "按名称搜索"){
        result = await mongoGoods.find({goodsCommodity:inT},{},{skip:num,limit:age})
    }
    return {code:1,value:"分页获取分类数据",data:result}
}

module.exports = {
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
}