const mongoLogin = require("../../mongodb/mongoLogin");

// 设置登录功能
const setLogin =async ({username,password}) => {
    let bol = await mongoLogin.findOne({loginName:username}).populate("LoginAbout")
    console.log(bol);
    if(!bol) return {code:0,value:"账号不存在",data:{}};
    if(bol.loginPass !== password) return {code:0,value:"密码错误",data:{}};
    bol.password = ""
    return {code:1,value:"登录成功",data:bol}
}

// 添加账号
const setAdd = async ({user,pass,phone,role})=>{
    let bol = await mongoLogin.findOne({loginName:user}) 
    if(bol) return {code:0,value:"账号已存在",data:{}};

    let result = await mongoLogin.create({
        loginName:user, 
        loginPass:pass,  
        LoginTime: Date.now(),    
        LoginPhone:phone,
        LoginAbout:role,
    })
    let result1 = await mongoLogin.findById(result._id).populate("LoginAbout",{roleName:1});
    return {code:1,value:"创建成功",data:result1};
}

// 获取账号
const getRoot =async ()=>{
    let result = await mongoLogin.find({}).populate("LoginAbout",{roleName:1});
    let len = result.length;
    let data = result.splice(0,10);
    return {
        code:1,
        value:"获取角色",
        data:{
            len,
            data
        }
    }
}

// 分页获取账号
const getPage = async ({num,age})=>{
    let val = num * age - age
    let result = await mongoLogin.find({},{},{skip:val,limit:age}).populate("LoginAbout",{roleName:1})
    return {code:1,value:"分页获取分类数据",data:result}
}

// 删除账号
const removeUser = async ({_id})=>{
    await mongoLogin.deleteOne({_id})
}

//修改账号
const changeUser =async ({value:{pass,phone,role,user},id}) =>{
    await mongoLogin.updateOne({_id:id},{
        loginName:user, 
        loginPass:pass,  
        LoginPhone:phone,
        LoginAbout:role,
    })

    let bol = await mongoLogin.findById(id).populate("LoginAbout",{roleName:1})
    return {code:1,value:"修改成功",data:bol}
}
module.exports = {
    setLogin ,
    setAdd,
    getRoot,
    getPage,
    removeUser,
    changeUser
}