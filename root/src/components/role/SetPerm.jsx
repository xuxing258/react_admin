import { useEffect, useState } from 'react';
import { Modal, Button, Input, Tree } from 'antd';
import roleArr from '../../assets/js/roleData';
import { addRolePower } from '../../API/AxiosURL';


export default function SetPerm({rol,setRoleArr,roleNewArr}) {
    // 子级设置权限开关
    const [isModalVisible, setIsModalVisible] = useState(false);
    // 存储角色数据
    // eslint-disable-next-line
    const [stData,setData] = useState({roleArr:[], roleShowArr:[]})

    // 设置勾选默认中  处理初始化勾选
    useEffect(()=>{
        setData({roleArr:[],roleShowArr:rol[0]?.roleShowArr})
    },[rol])

    // 打开对话框
    const showModal = () => {
        if(!rol.length)return;
        setIsModalVisible(true);
    };

    // 提交设置权限
    const handleOk =async () => {
        let {data} = await addRolePower({stData,_id:rol[0]._id})
        setRoleArr([...roleNewArr.map((item)=>item._id === data._id ?  data :item)])
        // 还要
        setIsModalVisible(false);
    };


    // 取消
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // 选中复选框
    const handleCheck =(checkedKeys, e)=>{
        setData({roleArr: e.checkedNodes,roleShowArr:checkedKeys})
    }

    return (
        <div style={{ display:"inline-block" }}>
            <Button type={rol.length ? "primary" : ""} onClick={showModal}>
                设置角色权限
            </Button>
            <Modal title="设置角色权限" footer visible={isModalVisible}  onCancel={handleCancel}>
                <div style={{marginBottom:"20px"}}>
                    <span>角色名称:</span> &nbsp; &nbsp;
                    <Input disabled  style={{width:"50%"}} value={"大哥"}/>
                </div>
                
                <Tree
                    checkable
                    defaultExpandAll
                    // 通过key进行选中
                    checkedKeys={stData.roleShowArr}
                    onCheck={handleCheck}
                    treeData={roleArr}
                />

                <Button type='primary' onClick={handleOk}>确认修改</Button>
            </Modal>
        </div>
    )
}
