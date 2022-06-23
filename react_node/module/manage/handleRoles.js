const mongoRole = require("../../mongodb/mogoRole")

// 添加角色功能
exports.setAdd =async ({role},Id)=>{
    // 判断角色是否存在
    let bol = await mongoRole.findOne({roleName:role});
    if(bol) return {code:0,value:"已存在该角色",data:{}};
    // 不存在
    let result =  await mongoRole.create({
        roleName:role,     // 角色名称
        roleTime:Date.now(),       //创建时间
        roleAbout: Id.data.loginName,    // 谁给权限
    })
    return {code:1,value:"添加成功",data:result};
}

// 获取角色
exports.getRole = async ()=>{
    let result = await mongoRole.find({});
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

// 删除角色
exports.rmoveRole =async ({id})=>{
    await mongoRole.deleteOne({_id:id});
}

// 设置角色权限
exports.setPower = async ({stData,_id})=>{
    await mongoRole.updateOne({_id},{
        roleArr:stData.roleArr,
        roleShowArr:stData.roleShowArr
    });

    return await mongoRole.findOne({_id});
}


// 获取所有的角色
exports.getUser = async ()=>{
    return await mongoRole.find();
}