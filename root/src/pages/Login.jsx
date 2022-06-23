import { Form, Input, Button } from 'antd';
import { useCallback} from "react"
import "../assets/css/login.scss"
import { login } from '../API/AxiosURL';
import { useNavigate } from "react-router-dom"
import { setSession } from '../API/session';

export default function Login() {
    // 设置表单数据
    const [form] = Form.useForm();
    const navigate = useNavigate()

    // 获取数据 values 是form表单的数据
    const onFinish = async (values) => {
        if(values.username && values.password){
            let result = await login(values)
            setSession("key",result.data)
            // 跳转主页 
            if(result.code) navigate("/home",{state:{name:"首页"}});
        }
    };

    // 账号验证
    const validatorName = useCallback((_, value)=>{
        let reg = /^[\u4e00-\u9fa5_\w]{3,14}$/;
        return new Promise((res,rej)=>{
            if (value === " ") {
                rej("不能为空");
            }else if (!reg.test(value)) {
                rej("需要提供3-6");
            } else {
                res();
            }
        })
    },[])

    // 验证密码
    const validatorPass = useCallback((_, value)=>{
        let reg = /^[\w_`~!@#$%^&*()+=-\\\]\]{}:;',.<>/?]{6,15}$/;
        return new Promise((res,rej)=>{
            if (value === " ") {
               rej("需要输入密码");
            }else if (!reg.test(value)) {
                rej("6到15,不能为中文");
            } else {
                res();
            }
        })
    },[])


    return (
        <div className='login_box'>
            <div className="center">
                <h2>后端登录入口</h2>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    autoComplete="off"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="账号"
                        name="username"
                        // 收集数据的行为 
                        validateTrigger="onBlur"
                        // rules验证设置  
                        rules={[
                            {
                                required: true,   // mongosse 必须传入
                                validator: validatorName, // 自定义验证函数  需要返回一个promise
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        validateTrigger="onBlur"
                        rules={[
                            {
                                required: true,
                                validator: validatorPass
                            },
                        ]}
                    >
                        <Input type="password"/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 9,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
