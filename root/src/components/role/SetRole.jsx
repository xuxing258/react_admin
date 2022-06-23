import React, { useState, useRef } from 'react';
import { Modal, Button ,Input} from 'antd';
import { setRole } from '../../API/AxiosURL';

export default function SetRole({roleArr,setRoleArr}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const inpRef = useRef()

    const showModal = () => {
        setIsModalVisible(true);
    };

    // 点击添加发送数据到数据库
    const handleOk =async () => {
        let value = inpRef.current.input.value.trim()
        if(!value)return;
        // 添加数据角色
        let {data} = await setRole({role:value})
        setRoleArr([data,...roleArr])
        inpRef.current.input.value = ""
        setIsModalVisible(false);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <div style={{ display:"inline-block",marginRight:"15px"}}>
            <Button type="primary" onClick={showModal}>
                添加角色
            </Button>
            <Modal title="添加角色" footer visible={isModalVisible} onCancel={handleCancel}>
               <Input ref={inpRef} style={{width:"80%",marginRight:"8px"}} placeholder="请输入角色名称"></Input>
               <Button type='primary' onClick={handleOk }>添加</Button>
            </Modal>
        </div>
    )
}

