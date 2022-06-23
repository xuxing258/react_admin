import { Card,Table, Tag} from 'antd';
import SetRole from '../components/role/SetRole';
import SetPerm from '../components/role/SetPerm';
import { useEffect, useState } from 'react';
import { getRoleAll,rmoveRole } from '../API/AxiosURL';

const {Column}  = Table

export default function Role() {
    // 定义角色信息数组   
    let [roleArr,setRoleArr] = useState([])
    // 定义单选按钮
    let [ra,setRa] = useState([])
    // 定义角色权限数据
    let [rol,setRol] = useState([])
    // 定义分页器
    let [len,setLen] = useState(0)


  


    // 初始化渲染角色
    useEffect(()=>{
        getRoleAll().then(( {data} )=>{
            setRoleArr(data.data)
            setLen(data.len)
        })
    },[])

    // 删除角色
    const handlRoleRemove = (r) => {
        return ()=>{
            rmoveRole({id:r._id})
            setRoleArr([...roleArr.filter((item)=> item._id !== r._id)])
        }
    }



    return (
        <div className='role'>
            <Card
                title={<>
                    <SetRole roleArr={roleArr} setRoleArr={setRoleArr}></SetRole>
                    <SetPerm rol={rol}  roleNewArr={roleArr}  setRoleArr={setRoleArr} ></SetPerm>
                </>}
            >
                <Table
                    dataSource={roleArr}
                    pagination={{ 
                        total: len, 
                        hideOnSinglePage:true
                    }}
                    rowKey="_id"
                    // 设置选
                    rowSelection={{
                        type:"radio",
                        onChange:(selectedRowKeys, selectedRows)=>{
                            setRol(selectedRows)
                            setRa(selectedRowKeys)
                        },
                        selectedRowKeys:ra
                    }}
                    // 行属性
                    onRow={(record)=>{
                        return {
                            onClick: event => {
                                setRol([record])
                                setRa([record._id])
                            }, // 点击行
                        };
                    }}
                >
                    <Column title="角色" dataIndex="roleName" />
                    <Column title="授权时间" dataIndex="roleTime" />
                    <Column title="授权人" dataIndex="roleAbout" />
                    <Column title="操作" 
                        render={(r)=>{

                            return <Tag color={"#1890ff"} onClick={handlRoleRemove(r)}>删除</Tag>
                        }}
                    />
                </Table>
            </Card>
        </div>
    )
}
