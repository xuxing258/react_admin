import createAxios from "./Axios"
// 请求配置默认值
export let url = 'http://localhost:8080/';


// login组件 请求登录数据
export const login = (data) => createAxios("post", url+"login/sumbit",data);
// home组件 请求天气与地址
export const weather = () => createAxios("get", url+"login/weather");
// app组件的session配置 自动登录
export const avoidLand = () =>  createAxios("post", url+"login/avoidLand");
// home组件退出session
export const exitSession = () => createAxios("get", url+"login/removeexit");

// goodsadd组件添加分类
export const addAcount = value =>   createAxios("post", url+"goods/add",value);
// goodsAcca组件请求分类 
export const getAcount = () =>   createAxios("get", url+"goods/getacot");
// goodsAcca组件通过分页器请求 
export const getPgeAcount = (value) =>   createAxios("get", url+"goods/page",value);
// goodsAcca组件修改分类名
export const updateAcoun = (value) =>   createAxios("post", url+"goods/update",value);
// goodsAcca组件删除分类名
export const removeAcoun = (value) =>   createAxios("post", url+"goods/delete",value);

// goodShop组件获取所有分类
export const getAcountAll = () => createAxios("get", url+"goods/acount");
// goodShop组件上传图片地址
export const sumbitImg = url+"goods/sumbit"
// goodShop组件上传商品信息
export const sumbitGoods = (value) => createAxios("post", url+"goods/conclusion",value);
// goodShop组件删除图片
export const removeImg = (value) => createAxios("post", url+"goods/rmoimg",value);

// goodAccount组件获取商品数据
export const getAcountNumber = () => createAxios("get", url+"goods/getacount");
// goodAccount组件删除商品数据
export const removeAcountNumber = (value) => createAxios("post", url+"goods/removec",value);

// goodtitle组件分类搜索
export const getAcountSerach = (value) => createAxios("get", url+"goods/serach",value);
// goodtitle组件分液器分类搜索
export const getSerach = (value) => createAxios("get", url+"goods/serachpage",value);

// setRole组件添加员工权限
export const setRole = (value) => createAxios("post", url+"role/setadd",value);
// Role组件获取角色
export const getRoleAll = () => createAxios("get", url+"role/getrole");
// Role组件删除角色
export const rmoveRole = (value) => createAxios("post", url+"role/rmover",value);
// setPerm组件添加角色权限
export const addRolePower = (value) => createAxios("post", url+"role/power",value);

// addUser组件获取用户权限
export const getAddUser = () => createAxios("get", url+"role/getuser")
// addUser组件添加账号
export const AddloginUser = (data) => createAxios("post", url+"login/add",data);
// User组件获取用户
export const getUser = () => createAxios("get", url+"login/root");
// User组件获取分页
export const getPage = (value) => createAxios("get", url+"login/getpage",value);
// User组件删除账号
export const removeUser = (value) => createAxios("post", url+"login/delete",value);
// AddUser组件修改账号
export const chagneUser = (value) => createAxios("post", url+"login/change",value);