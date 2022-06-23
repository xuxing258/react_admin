import { useNavigate, useLocation } from "react-router-dom"
import {
    PageHeader,
    Form,
    Input,
    Select,
    Button,
    Upload
} from 'antd';
import { useEffect, useState } from "react";
import { getAcountAll, sumbitImg, sumbitGoods,removeImg } from "../../API/AxiosURL";
import { UploadOutlined } from '@ant-design/icons';


// 选项
const { Option } = Select;
// 布局
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
// 初始数据
let initObj = {
    classificationGoods: "",
    nameCommodity: "",
    commodityInformation: "",
    commodityPrices: "",
    goodsImg: []
}

export default function GoodShop() {
    const navigate = useNavigate();
    const [opt,setOpt] = useState([])
    const {state} = useLocation()

    // 判断是编程式导航 还是 路由

    if(state){
        initObj = {
            classificationGoods: state.goodsClass,
            nameCommodity: state.goodsCommodity,
            commodityInformation: state.goodsInfo,
            commodityPrices: state.goodsPrices,
            goodsImg:state.goodsImg.map((item,index)=>{
                return {
                    name: item.imgUrl,
                    uid: index,
                    id: state._id
                }
            })
        }
    }

    useEffect(()=>{
        // 组件销毁了 清空定义的表单初始值
        return ()=>{
            initObj = {
                classificationGoods: "",
                nameCommodity: "",
                commodityInformation: "",
                commodityPrices: "",
                goodsImg: []
            }
        }
    // eslint-disable-next-line
    },[])


    // 获取form表单数据
    const [form] = Form.useForm();
    // 处理提交函
    const handleFinish =async (values) => {
        // 图片有新提交  数据结构处理完成
        if(values.goodsImg.fileList){
            values.goodsImg =  values.goodsImg.fileList.map((item)=>{
                // 存在data
                if(item.response?.data){
                    return item.response.data
                }else{
                    return {
                        imgUrl: item.name
                    }
                }
            })

        }else{ // 没有图片重新提交
            values.goodsImg =   values.goodsImg.map((item)=>{
                return {
                    imgUrl: item.name
                }
            })
        }

        // 选择是更新 还是重新创建
        if(state){ // true 更新
            values.id = state._id
            await sumbitGoods(values);
            navigate(-1)
            // 设置为空
            initObj.goodsImg = []
        }else{  // 重新创建
            await sumbitGoods(values);
        }
        // 发送商品数据存储
        // 清空input框
        form.resetFields()

    }
    // 发送ajax请求获取分类数据
    useEffect(()=>{
        getAcountAll().then(( {data} )=>{
            setOpt(data)
        })
        // 组件销毁进行函数
        return ()=>{
            let bol = form.getFieldValue("goodsImg");
            if(!state){
                if(bol.length){
                    // 离开路由时 上传了图片 为进行存储到数据库的数据进行删除
                    let arr = bol.fileList.map((item)=>{
                        return item.response.data
                    })
                    removeImg({arr})
                } 
            }
            form.resetFields()
        }
    // eslint-disable-next-line
    },[])

    // 删除图片发生变化
    const handleChange =async (file) => {
        let bol = file.response?.data
        if(bol){
            removeImg(bol)
        }else{
            removeImg({imgUrl:file.name,id:file.id})
        }
    }

    
    return (
        <div className='good_shop'>
            <PageHeader
                className="site-page-header"
                onBack={() => {
                    navigate(-1)
                }}
                title="返回添加商品"
            />
            <Form
                {...formItemLayout}
                form={form}
                onFinish={handleFinish}
                initialValues={initObj}
                
            >
                <Form.Item
                    label="商品分类"
                    name="classificationGoods"
                    rules={[
                        {
                          required: true,
                          message: '必须填写',
                        },
                    ]}
                >
                    <Select placeholder="请选择" >
                        {
                            opt.map((item,index)=>{
                                return (
                                    <Option value={item.accountName} key={index}>{item.accountName}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    label="商品名称"
                    name="nameCommodity"
                    rules={[
                        {
                          required: true,
                          message: '必须填写',
                        },
                    ]}
                >
                    <Input placeholder="输入商品名称" />
                </Form.Item>


                <Form.Item
                    label="商品描述"
                    name="commodityInformation"
                    rules={[
                        {
                          required: true,
                          message: '必须填写',
                        },
                    ]}

                >
                    <Input.TextArea placeholder="商品描述信息" />
                </Form.Item>


                <Form.Item
                    label="商品价格"
                    name="commodityPrices"
                    rules={[
                        {
                          required: true,
                          message: '必须填写',
                        },
                    ]}
                >
                    <Input placeholder="输入价格" addonAfter="元"/>
                </Form.Item>

                <Form.Item
                    label="商品图片"
                    name="goodsImg"
                    // 表单与Upload 数据关联
                    valuePropName="file"
                >
                    <Upload
                        accept=".jpg,.png"
                        name='file'
                        action={sumbitImg}
                        onRemove={handleChange}
                        multiple={true}
                        maxCount={5}
                        defaultFileList={initObj.goodsImg}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}
