import { Layout,Popconfirm } from 'antd';
import "../assets/css/home.scss"
import SiderContent from '../components/sider/SiderContent';
import useHome from '../hooks/useHome';
import { Outlet, useLocation } from "react-router-dom"
// 布局
const { Header,Sider, Content } = Layout;

export default function Home() {
  let [weat,loginName,handlExit] =  useHome();
  const local = useLocation()

  return (
    <div className='home'>
        <Layout>
            <Sider width="256">
                <SiderContent></SiderContent>
            </Sider>
            <Layout>
                <Header>
                  <div className='fr'>
                    <span className='welcome'>欢迎</span>
                    <span className='welcome color_luyao'>{loginName}</span>
                    <span className='exit color_luyao'>
                      <Popconfirm
                          title="确定退出嘛?"
                          okText="确定"
                          onConfirm={handlExit}
                          cancelText="取消"
                      >
                        退出
                      </Popconfirm>
                    </span>
                  </div>
                </Header>
                <Content>
                  <div className='display_content'>
                      <p className='fl tilte'>{local.state?.name}</p>
                      <p className='fr weather'>
                        {weat.city}
                        {weat.update_time}
                        {weat.value?.wea}
                        {weat.value?.week}
                      </p>
                  </div>
                  {/* 路由组件 */}
                  <div className='center_page'>
                    <Outlet></Outlet>
                  </div>
                </Content>
            </Layout>
        </Layout>
    </div>
  )
}
