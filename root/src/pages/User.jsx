import { Card,Table,Button} from 'antd';
import AddUser from '../components/user/AddUser';
import React, { useState,useEffect } from 'react';
import { getUser, getPage,removeUser } from '../API/AxiosURL';

const { Column } = Table;

export default function User() {
  let [useArr,setUseArr] = useState([]);
  let [len,setLen] = useState([]);
  let [isModalVisible, setIsModalVisible] = useState(false);
  let [objId, setObjId] = useState({});


   // 获取职位
  useEffect(()=>{
    getUser().then(({data})=>{
        setLen(data.len)
        setUseArr(data.data)
    })
  },[])

  // 设置修改函数
  const handleChangeA= (r)=>{
    setIsModalVisible(true);
    setObjId(r)
  }
  // 设置删除
  const handleRemoveA=async (r)=>{
    await removeUser({_id:r._id})
    setUseArr(useArr.filter(item=> item._id !== r._id))
  }
  // 分页设置
  const handleTotalChange=async (num,age)=>{
    let data =await getPage({num,age})
    setUseArr(data.data)
  }
  return (
    <div>
      <Card title={<AddUser objId={objId} setObjId={setObjId} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}  useArr={useArr} setUseArr={setUseArr}></AddUser>} >
        <Table 
          dataSource={useArr}
          rowKey="_id"
          pagination={{
            total:len,
            onChange:handleTotalChange
          }}
        >
          <Column title="用户名" dataIndex="loginName"  />
          <Column title="创建时间" dataIndex="LoginTime"/>
          <Column title="手机号码" dataIndex="LoginPhone"/>
          <Column title="角色" dataIndex={["LoginAbout","roleName"]}/>
          <Column title="操作" render={(r)=>{
            return <>
                <Button type="primary" onClick={()=>{handleChangeA(r)}}>修改</Button> &nbsp;
                <Button type="primary"  onClick={()=>{handleRemoveA(r)}}>删除</Button>
            </>
          }}/>  
        </Table>
      </Card>
    </div>
  )
}
