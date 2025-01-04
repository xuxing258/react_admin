### 简介

> 使用的react - antd - node - mongoodb 创建的后台管理系统

- root文件夹前端页面
- react_node搭建node后端

### 启动

```js
// node文件夹 
npm install //安装
node app.js

// 前端页面
npm install   // 安装
npm run start // 启动
```

### 使用

```js
#账号 root	
#密码 123123
```

### 功能

1. 登录注册
2. 分类管理
3. 商品管理
4. 图形管理
5. 用户权限设置
6. 用户管理
7. 天气与地址
8. 添加与修改商品

### 项目维护

- mongoose:   更新到8.9.3版本
  - 不支持使用localhost，需要使用127.0.0.1
    - 链接数据库，与session使用127.0.01
-  punycode 库弃用
  - 通过` node --trace-deprecation app.js ` 获取弃用位置
  - 将 **require('punycode');** 替换为 **require('punycode/');**
- 天气接口已失效

