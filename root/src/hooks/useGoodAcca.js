import { useState, useEffect,useRef } from 'react';
import { getAcount, getPgeAcount, updateAcoun, removeAcoun } from '../API/AxiosURL';

let len = 0;
//GoodAcca 组件内容
export function useGood() {
    //设置分类展示
    let [arr, setArr] = useState([]);

    // 获取分类
    useEffect(() => {
        getAcount().then(({ data }) => {
            setArr(data.data)
            len = data.len
        })
    }, [])

    // 分页点击获取
    const handlePag = async (value) => {
        let data = await getPgeAcount({
            current: value.current,
            pageSize: value.pageSize
        })
        setArr(data.data)
    }

    const handleView = async (value, result) => {
        // 发送ajax请求修改后端数据
        let { data } = await updateAcoun({ id: value._id, result })
        let res = data[0]
        let result1 = arr.filter((item) => item._id !== res._id)
        setArr([res, ...result1])
    }

    // 删除分类
    const handleRemove = (value) => {
        let result1 = arr.filter((item) => item._id !== value._id)
        setArr([...result1])
        // 删除分类
        removeAcoun({ id: value._id })
    }

    return [arr, setArr, len, handlePag, handleView, handleRemove]
}



export function useAdd(handleView) {
    let inpRef = useRef()
    // 点击获取input框数据
    const handlINput = () => {
        let value = inpRef.current.input.value;
        handleView(value)
    }

    return [inpRef,handlINput]
}