import { Button,Modal, Input  } from "antd"
import {useState} from "react"
import { addAcount } from "../../API/AxiosURL";

export default function GoogsAdd({setArr,arr}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    let valAccount = null;
    const showModal = () => {
        setIsModalVisible(true);
    };
    
    // 添加确认
    const handleOk =async () => {
      let {data} = await addAcount({valAccount})
      setArr([data,...arr])
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    
    const handleChange =(ev)=>{
      valAccount = ev.target.value
    }
  return (
    <div>
        <Button type="primary" onClick={showModal}>添加分类</Button>
        <Modal 
            title="添加分类" 
            visible={isModalVisible} 
            onOk={handleOk} 
            onCancel={handleCancel}
            okText="确认"
            cancelText="取消"
        >
            <Input onChange={handleChange}/>
      </Modal>
    </div>
  )
}
