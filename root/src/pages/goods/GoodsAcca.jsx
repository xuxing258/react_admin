import { Card,Table,Tag,Popconfirm,Input  } from 'antd';
import GoogsAdd from '../../components/goods/GoogsAdd';
import { useGood,useAdd } from '../../hooks/useGoodAcca';
import "../../assets/css/account.scss"
const { Column } = Table;


function Add({handleView}){
  let [inpRef,handlINput] = useAdd(handleView)
  return (
    <>
      <p>修改分类名</p>
      <Input ref={inpRef}></Input>
      <button onClick={handlINput}>确认</button>
    </>
  )
}

export default function GoodsAcca() {
  let [arr, setArr,len,handlePag,handleView,handleRemove] =  useGood()

  return (
    <div className='goodsa_cca'>
      <Card  title="一级分类" extra={<GoogsAdd arr={arr} setArr={setArr}></GoogsAdd>} >
        <Table 
          dataSource={arr}
          pagination={{ total:len,hideOnSinglePage:true }}
          onChange={handlePag}
        >
          <Column title="分类名" dataIndex="accountName" />
          <Column  
            title="操作" 
            dataIndex="accountTime"
            render={(_,val)=>{
              return <>
                <Tag  color="blue">
                  
                  <Popconfirm
                    title={<Add handleView={handleView.bind(null,val)}/>}
                  >
                    修改分类
                  </Popconfirm>
                </Tag>
                <Tag  color="blue">
                  
                  <Popconfirm
                    title="是否删除?"
                    onConfirm={handleRemove.bind(null,val)}
                  >
                    删除分类
                  </Popconfirm>
                </Tag>
              </>
            }}
          />
        </Table>
      </Card>
    </div>
  )
}
