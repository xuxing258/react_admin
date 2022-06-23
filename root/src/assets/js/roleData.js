// 存储在数据库的格式
const roleArr = [
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
];


export default  roleArr