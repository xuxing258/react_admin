// 引入路由组件
import Login from "../pages/Login"
import Home from "../pages/Home"
import HomePage from "../pages/HomePage"
import GoodsAcca from "../pages/goods/GoodsAcca"
import GoodsAccount from "../pages/goods/GoodsAccount"
import GoodShop from "../pages/goods/GoodShop"
import User from "../pages/User"
import Role from "../pages/Role"
import  BrokenLine from "../pages/graphics/BrokenLine"
import  PieChart from "../pages/graphics/PieChart"
import  Cylinder from "../pages/graphics/Cylinder"


// 重定向
import Redirect from "../hooks/useRouter"


// 路由表
const route = [
    {
        path:"/",
        element:<Login />
    },
    {
        path:"/home",
        element:<Home />,
        children:[
            {
                path:"homepage",
                element:<HomePage />,
            },
            {
                path:"homeshop",
                element:<GoodsAcca />,
            },
            {
                path:"manage",
                element:<GoodsAccount />,
            },
            {
                path:"goodshop",
                element:<GoodShop />,
            },
            {
                path:"user",
                element:<User />,
            },
            {
                path:"username",
                element:<Role />,
            },
            {
                path:"brokenLine",
                element:<BrokenLine />,
            },
            {
                path:"cylinder",
                element:<Cylinder />,
            },
            {
                path:"pieChart",
                element:<PieChart />,
            },
        ]
    },
    {
        path:"*",
        element: <Redirect to="/home/page" />
    }
]

export default route