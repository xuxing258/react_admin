import { Select,Input, Button } from 'antd';
import { useRef, useState } from 'react';
import { getAcountSerach } from "../../API/AxiosURL"

const { Option } = Select;

export default function GoodTitle({setShop,setTotal,SetAcc,setIn}) {
    let [val,setVal] = useState(null);
    // 获取分类
    const handleChange = (value) => {
        setVal(value)
        SetAcc(value)
    };
    // 获取input数据
    const refInp = useRef()

    // 点击提交搜索
    const handleClick = async ()=>{
        let data = null;
        // 默认获取全部
        if(val === "默认"){
            data = await getAcountSerach({age:10})

        }else if(val === "按分类搜索"){
            data = await getAcountSerach({name:refInp.current.input.value})

        }else if(val === "按名称搜索"){
            data = await getAcountSerach({name1:refInp.current.input.value})
        }
        setTotal(data.data.len)
        setShop(data.data.data)
        setIn(refInp.current.input.value)
    }

    return (
        <div className="good_title"  style={{ width: "260px" }}>
            <Select defaultValue="默认" onChange={handleChange} style={{ width: 140 }}>
                <Option value="默认">默认</Option>
                <Option value="按分类搜索">按分类搜索</Option>
                <Option value="按名称搜索">按名称搜索</Option>
            </Select>
            <Input placeholder='输入关键词' ref={refInp}></Input>
            <Button type='primary' onClick={handleClick}>搜索</Button>
        </div>
    )
}
