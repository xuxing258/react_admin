import { Card, Button, Table,Image} from 'antd';
import GoodTitle from '../../components/goods/GoodTitle';
import { Link, useNavigate } from "react-router-dom"
import { useEffect,useState } from 'react';
import { getAcountNumber,url,removeAcountNumber,getSerach } from "../../API/AxiosURL";

const { Column } = Table;


export default function GoodsAccount() {
  let [shop, setShop] = useState([]);
  // 分页总数
  let [total, setTotal] = useState(0);
  // 获取子级的分类
  let [acc,SetAcc] = useState("默认")
  // 获取input内容
  let [inT, setIn] = useState(0);

  const avigate = useNavigate()

  // 请求商品信息
  useEffect(()=>{
    getAcountNumber().then(( {data} )=>{
      setShop(data.data)
      setTotal(data.len)
    })
  },[])

  // 修改商品 跳转路由
  const handleChangeA = (r) => {
    avigate("/home/goodshop",{
        state:r
    })
  }

  // 删除商品
  const handleRemoveA =async (value)=>{
    await removeAcountNumber({id:value._id,goodsImg:value.goodsImg})
    setShop(shop.filter((item)=>item._id !== value._id))
  }

  // 点击分液器
  const onChangePage =async (val,age)=>{
    let data 
    // 获取默认数据
    if(acc === "默认"){
      data = await getSerach({val:val,age:age,acc});
    }else if(acc === "按分类搜索"){
      data = await getSerach({val:val,age:age,acc,inT})
    }else if(acc === "按名称搜索"){
      data = await getSerach({val:val,age:age,acc,inT})
    }
    setShop(data.data)
  }


  
  return (
    <div className='goods_account'>
      <Card title={<GoodTitle setIn={setIn} setShop={setShop} setTotal={setTotal} SetAcc={SetAcc}/>} extra={<Button type='primary'><Link to="/home/goodshop">添加商品</Link></Button>} >
        <Table 
          dataSource={shop}
          rowKey="_id"
          pagination={{
            total:total,
            onChange:onChangePage
          }}
        >
          <Column title="分类" dataIndex="goodsClass" />
          <Column title="名称" dataIndex="goodsCommodity" />
          <Column title="描述" dataIndex="goodsInfo" />
          <Column title="价格" dataIndex="goodsPrices" />
          <Column title="图片" 
            render={(r)=>{
              if(r.goodsImg.length){
                return <Image  width={40} height={40} src={url+r?.goodsImg[0]?.imgUrl}></Image>
              }
              return "未上传"
            }}
          />
          <Column title="操作" 
            render={(r)=>{
              return <>
                <Button type="primary" onClick={()=>{handleChangeA(r)}}>修改</Button> &nbsp;
                <Button type="primary"  onClick={()=>{handleRemoveA(r)}}>删除</Button>
              </>
            }}
          />
        </Table>
      </Card>
    </div>
  )
}

