import { Layout, Menu, Breadcrumb,Image,Descriptions,Button,InputNumber,Input } from 'antd';
import React from "react";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import axios from 'axios';
import './goodspage.css'
import Dashboard from "../dashboard/dashboard";
import Login from "../login/Login";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const username=localStorage.getItem('username')
const url=["https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg",'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg']
let req,num,addre
let Name,Description, Goods_Left,Price
class GoodInfo extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            list:[]
        }
    }
    componentDidMount() {
        function GetRequest() {
            let url = window.location.href;
            let qIndex = url.indexOf('=');
            let qtext = url.substring(qIndex + 1);
            return qtext;
        }
        req=parseInt(GetRequest())
        console.log(req)
        axios.get(`/getgoods?num=${req}`)
            .then(
                res => {
                    console.log(res);
                    const  goodlists  = res.data;
                    this.setState({
                        list: goodlists
                    })
                }
            )
            .catch(err => console.log(err))
    }

    render() {
        const data=[...this.state.list]
        let finaldata=data[req-1]
        console.log(finaldata)

        if(finaldata!=null)
        {
            Name=finaldata.Name
            Description=finaldata.Description
            Goods_Left=finaldata.Goods_Left
            Price=finaldata.Price
        }
        return <div className="content"><div style={{ padding: '0 100px', }}><Image width={200} src={url[(req-1)%2]}/></div>
                <div><Descriptions title="Good Info" layout="vertical">
                    <Descriptions.Item label="Name">{Name}</Descriptions.Item>
                    <Descriptions.Item label="Price">{Price}</Descriptions.Item>
                    <Descriptions.Item label="Description">{Description}</Descriptions.Item>
                    <Descriptions.Item label="Good_Left">{Goods_Left}</Descriptions.Item>
                </Descriptions></div>
        </div>
    }
}

class Goodspage extends React.Component{

    render() {
        function onclick(){
            if(num>Goods_Left)alert("商品不足")
            else if(localStorage.getItem('username')!=null){
                alert("购买成功")
                let Mydate=new Date()

                let val={
                    UserName:username,
                    GoodsName:Name,
                    Address:"UPC",
                    Num:num,
                    Date:Mydate.toLocaleDateString()
                }
                axios.post('/order/makeorder',val)
                    .then(
                        res => {
                            console.log(res);
                        }
                    )
                    .catch(err => console.log(err))
            }
            else{
                alert("请登录")
                window.location.href="http://localhost:3000/login"
            }
        }
        function onchange(value) {
            num=value;
        }
        function getstring(value){
            addre=value
        }
        return  <Layout>
            <Header className="header">
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="0"><span className="logo" ><img src="https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg"/></span></Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><a href='/'>Home</a></Breadcrumb.Item>
                    <Breadcrumb.Item>GoodsInfo</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Content className="content" style={{ padding: '0 24px', minHeight: 280 }}>
                        <GoodInfo/>
                        <div>
                            <Input placeholder="Address" onChange={getstring} style={{ margin: '5px 0' }}/>
                            <InputNumber  placeholder="Num" onChange={onchange} style={{ margin: '5px 0' }}/>
                        <Button type="primary" onClick={onclick} style={{ margin: '5px 0' }}>购买</Button>
                        </div>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>UPC 2021.7.27</Footer>
        </Layout>

    }
}
export default Goodspage