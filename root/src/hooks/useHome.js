import { useEffect, useState,useMemo } from 'react';
import { weather,exitSession } from '../API/AxiosURL';
import { getSession, Re } from '../API/session';
import { useNavigate } from 'react-router-dom';

export default function useHome() {
    let [weat, setWeat] = useState({});
    const navigate = useNavigate()

    // 取值
    let loginName = useMemo(() => getSession("key").loginName, [])

    // 请求天气与地址
    useEffect(() => {
        weather().then(({ data }) => {
            setWeat(data)
        })
    }, [])


    // 设置退出
    const handlExit = () => {
        navigate("/");
        Re("key");
        exitSession()
    }


    return [weat, loginName, handlExit]
}
