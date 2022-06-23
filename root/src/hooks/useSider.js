// 图标
import {
    HomeOutlined,
    LineChartOutlined,
    PieChartOutlined,
    BarChartOutlined,
    UserOutlined,
    UsergroupDeleteOutlined,
    BarsOutlined,
    FireOutlined,
    MailOutlined,
    AppstoreOutlined,
    ToolOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom"

// 侧边栏内容设置
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
// 
let obj = {
    HomeOutlined: <HomeOutlined/>,
    LineChartOutlined:<LineChartOutlined/>,
    PieChartOutlined:<PieChartOutlined/>,
    BarChartOutlined:<BarChartOutlined/>,
    UserOutlined:<UserOutlined/>,
    UsergroupDeleteOutlined:<UsergroupDeleteOutlined/>,
    BarsOutlined:<BarsOutlined/>,
    FireOutlined:<FireOutlined/>,
    MailOutlined:<MailOutlined/>,
    AppstoreOutlined:<AppstoreOutlined/>,
    ToolOutlined:<ToolOutlined />
}


// 处理数据结构
function handleItems(arr = [],p = []){
    if(!arr.length) return [];
    arr.forEach(ele => {
        if(ele.children){  // 有存在子集
            p.push(getItem(ele.title, ele.key, obj[ele.icon], handleItems(ele.children)))
        }else{
            p.push(getItem(<Link to={ele.to} state={{ name: ele.title }}>{ele.title}</Link> ,ele.key, obj[ele.icon]))
        }
    });
    return p
}



function item({LoginAbout}) {
    return handleItems(LoginAbout?.roleArr)
}

export default item