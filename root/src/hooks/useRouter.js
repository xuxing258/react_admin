import {useNavigate} from "react-router-dom"
import {useEffect} from "react"

export default function Redirect({to}){
    const navigate  = useNavigate()
    useEffect(()=>{
        navigate(to)
    // eslint-disable-next-line
    },[])
}

