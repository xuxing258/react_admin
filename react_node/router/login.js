const express = require("express");
const router = express.Router();
const axios = require("axios");
const {
  setLogin,
  setAdd,
  getRoot,
  getPage,
  removeUser,
  changeUser,
} = require("../module/manage/handleLogin");
const mongoLogin = require("../mongodb/mongoLogin");
const mogoRole = require("../mongodb/mogoRole");

//退出session路由
router.get("/removeexit", (req, res) => {
  req.session.adminRoot = "";
  res.send({ code: 0, value: "退出session", data: {} });
});

// 免登录路由
router.post("/avoidLand", (req, res) => {
  if (req.session.adminRoot) {
    res.send({ code: 1, value: "免登录测试", data: req.session.adminRoot });
  } else {
    res.send({ code: 0, value: "session不存在", data: {} });
  }
});

// 登录路由
router.post("/sumbit", async (req, res) => {
  let result = await setLogin(req.body);
  if (result.code) {
    req.session.adminRoot = result;
  }
  res.send(result);
});

// 配置天气路由
router.get("/weather", async (req, res) => {
  let { data } = await axios.get("http://pv.sohu.com/cityjson?ie=utf-8");
  // 剪切的时候  市字不能存在
  let url = data.split("省")[1].split("市")[0];
  axios
    .get(
      `https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=${encodeURIComponent(
        url
      )}`
    )
    .then(({ data }) => {
      res.send({
        code: 1,
        value: "天气测试",
        data: {
          value: data.data[0],
          city: data.city,
          update_time: data.update_time,
        },
      });
    })
    .catch(() => {
      res.send({ code: 0, value: "天气获取失败", data: {} });
    });
});

// 添加用户路由
router.post("/add", async (req, res) => {
  let result = await setAdd(req.body);
  res.send(result);
});

// 获取所有账号路由
router.get("/root", async (req, res) => {
  let result = await getRoot();
  res.send(result);
});

// 分页获取账号路由
router.get("/getpage", async (req, res) => {
  let result = await getPage(req.query);
  res.send(result);
});

// 删除账号路由
router.post("/delete", (req, res) => {
  removeUser(req.body);
  res.send({ code: 1, value: "删除成功", data: {} });
});

// 修改账号路由
router.post("/change", async (req, res) => {
  let result = await changeUser(req.body);
  res.send(result);
});

// 设置默认账号密码 权限
(async () => {
  let result = await mogoRole.findOne({ roleName: "管理者" });
  if (result) return;
  let bol = await mogoRole.create({
    roleName: "管理者",
    roleTime: Date.now(),
    roleAbout: "root",
    roleArr: [
      {
        title: "首页",
        key: "0-0",
        to: "/home/homepage",
        icon: "HomeOutlined",
      },
      {
        title: "商品",
        key: "0-1",
        icon: "AppstoreOutlined",
        children: [
          {
            title: "分类管理",
            key: "0-1-1",
            to: "/home/homeshop",
            icon: "BarsOutlined",
            disabled: true,
          },
          {
            title: "商品管理",
            key: "0-1-2",
            to: "/home/manage",
            icon: "ToolOutlined",
            disabled: true,
          },
        ],
      },
      {
        title: "用户管理",
        key: "0-2",
        to: "/home/user",
        icon: "UserOutlined",
      },
      {
        title: "角色管理",
        key: "0-3",
        to: "/home/username",
        icon: "UsergroupDeleteOutlined",
      },
      {
        title: "图形管理",
        key: "0-4",
        icon: "PieChartOutlined",
        children: [
          {
            title: "柱形图",
            key: "0-4-1",
            disabled: true,
            to: "/home/brokenLine",
            icon: "BarChartOutlined",
          },
          {
            title: "折线图",
            key: "0-4-2",
            disabled: true,
            to: "/home/cylinder",
            icon: "LineChartOutlined",
          },
          {
            title: "饼图",
            key: "0-4-3",
            to: "/home/pieChart",
            disabled: true,
            icon: "PieChartOutlined",
          },
        ],
      },
    ],
    roleShowArr: ["0-0", "0-1", "0-2", "0-3", "0-4"],
  });
  let bol1 = await mongoLogin.findOne({ loginName: "root" });
  if (bol1) return;

  await mongoLogin.create({
    loginName: "root", //用户名
    loginPass: "123123", // 密码
    LoginTime: Date.now(), // 创建事件
    LoginPhone: "13877772222", // 手机号码
    LoginAbout: bol._id,
  });
})();

module.exports = router;
