import React, { useState,useEffect } from 'react';
import { Modal, Button } from 'antd';
import { Form, Input, Select } from 'antd';
import { getAddUser,AddloginUser,chagneUser } from '../../API/AxiosURL';

const { Option } = Select;
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
};

export default function AddUser({useArr,setUseArr,setObjId,isModalVisible, setIsModalVisible,objId}) {
    // 设置表单
    const [form] = Form.useForm();
    // 设置select选项
    const [sele,setSele] = useState([]);
    // 显示
    const showModal = () => { setIsModalVisible(true); };
    // 取消
    const handleCancel = () => { 
        form.resetFields()
        setIsModalVisible(false);
    };
   
    // 修改
    useEffect(()=>{ // 初始化 修改objId触发
       form.setFieldsValue({
            user:objId.loginName,
            role:objId.LoginAbout?._id,
            phone:objId.LoginPhone,
            pass:objId.loginPass
       })  
    // eslint-disable-next-line
    },[objId])

    // 表单提交触发    判断是新增还是修改
    const onFinish =async (value) => {
        if(objId.loginName){  //存在就是修改
            let {data} = await  chagneUser({value,id:objId._id});
            setUseArr(useArr.map(item=> item._id === data._id ? data : item))

        }else{    // 不存在新增
            let data = await AddloginUser(value);
            setUseArr([data.data,...useArr])
        }   
        
        // 清空输入框
        form.resetFields()
        // 清除修改内容
        setObjId({})
        // 关闭弹窗
        setIsModalVisible(false)
    };

    // 获取职位
    useEffect(()=>{
        getAddUser().then(({data})=>{
            setSele(data)
        })
    },[])

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                添加用户
            </Button>
            <Modal title="添加用户" forceRender  footer visible={isModalVisible}  onCancel={handleCancel}>
                <Form {...layout} form={form} onFinish={onFinish}>
                    <Form.Item name="user" label="用户名" rules={[{ required: true,message:"必须输入" }]}>
                        <Input  placeholder="输入用户名"/>
                    </Form.Item>
                    <Form.Item name="pass" label="密码" rules={[{ required: true ,message:"必须输入"}]}>
                        <Input.Password placeholder="密码"/>
                    </Form.Item>
                    <Form.Item name="phone" label="手机号码" rules={[{ required: true,message:"必须输入" }]}>
                        <Input placeholder="手机号码"/>
                    </Form.Item>
                    <Form.Item name="role" label="角色" rules={[{ required: true,message:"必须输入" }]}>
                        <Select
                            placeholder="请选择职位"
                        >
                            {
                                sele.map((item,index)=><Option value={item._id} key={index}>{item.roleName}</Option> )
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
