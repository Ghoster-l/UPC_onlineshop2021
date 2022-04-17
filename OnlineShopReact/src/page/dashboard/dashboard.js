import { Layout, Menu, Breadcrumb,Descriptions, Table, Space,InputNumber } from 'antd';
import React from "react";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import axios from 'axios';
import './dashboard.css'
import Normalform from "../../componet/normalform";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const username=localStorage.getItem('username')
let num;
class UserInfo extends React.Component
{
    render() {
        return <div><Descriptions title="User Info" layout="vertical">
            <Descriptions.Item label="UserName">{username}</Descriptions.Item>
            <Descriptions.Item label="Telephone">N/A</Descriptions.Item>
            <Descriptions.Item label="Live">N/A</Descriptions.Item>
            <Descriptions.Item label="Remark">N/A</Descriptions.Item>
            <Descriptions.Item label="Address">N/A</Descriptions.Item>
        </Descriptions>
            <UserOrderInfo/>
            </div>

    }
}
class GoodInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:[]
        }
    }
    componentDidMount() {
        axios.get('/getgoods?num=99')
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
    deleteRow = (a) => {
        console.log(a,"delete");
        axios.get(`/admin/deletegoods?GoodsName=${a.Name}`)
            .then(
                res => {
                    console.log(res);
                    alert("删除成功")
                }
            )
            .catch(err => console.log(err))
    }
    preview = (a,b) => {
        console.log(a,"预览");
        axios.get(`/admin/updategoods?Attributes=Goods_Left&Value=${num}&GoodsName=${a.Name}`)
            .then(
                res => {
                    console.log(res);
                    alert("修改成功")
                }
            )
            .catch(err => console.log(err))

    }
    render() {

        function onchange(value)
        {
            num=value;
        }
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Name',
                dataIndex: 'Name',
                key: 'Name',
            },
            {
                title: 'Goods_Left',
                dataIndex: 'Goods_Left',
                key: 'Goods_Left',
            },
            {
                title: 'Price',
                dataIndex: 'Price',
                key: 'Price',
            },
            {
                title: 'Description',
                dataIndex: 'Description',
                key: 'Description',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <InputNumber onChange={onchange}/>
                        <a onClick={this.preview.bind(this,record)}>Change</a>
                        <a onClick={()=>this.deleteRow(record)}>delete</a>
                    </Space>
                ),
            },
        ];
        console.log(this.state.list)
        const data=[...this.state.list]
        return <Table columns={columns} dataSource={data} />
    }
}
class OrderInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:[]
        }
    }
    componentDidMount() {
        axios.get('/admin/getallorder')
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
    deleteRow = (a) => {
        if(a.State==-1)
        {
            axios.get(`/admin/deleteorder?OrderId=${a.OrderId}`)
                .then(
                    res => {
                        console.log(res);
                        alert("删除成功")
                    }
                )
                .catch(err => console.log(err))
        }
        else alert("用户未取消订单，无法删除")
    }
    Change = (a,b) => {
        if(a.State!=-1)
        {
            axios.get(`/admin/updateorder?OrderId=${a.OrderId}`)
                .then(
                    res => {
                        console.log(res);
                        alert("发货成功")
                    }
                )
                .catch(err => console.log(err))
        }
        else alert("用户已取消订单,无法发货")

    }
    render() {
        function onchange(value)
        {
            num=value;
        }
        const columns = [
            {
                title: 'OrderId',
                dataIndex: 'OrderId',
                key: 'OrderId',
            },
            {
                title: 'UserName',
                dataIndex: 'UserName',
                key: 'UserName',
            },
            {
                title: 'GoodsName',
                dataIndex: 'GoodsName',
                key: 'GoodsName',
            },
            {
                title: 'Num',
                dataIndex: 'Num',
                key: 'Num',
            },
            {
                title: 'Address',
                dataIndex: 'Address',
                key: 'Address',
            },
            {
                title: 'Date',
                dataIndex: 'Date',
                key: 'Date',
            },
            {
                title: 'State',
                dataIndex: 'State',
                key: 'State',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a onClick={this.Change.bind(this,record)}>Change</a>
                        <a onClick={()=>this.deleteRow(record)}>delete</a>
                    </Space>
                ),
            },
        ];
        console.log(this.state.list)
        const data=[...this.state.list]
        return <Table columns={columns} dataSource={data} />
    }
}
class UserOrderInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:[]
        }
    }
    componentDidMount() {
        axios.get(`/order/getorder?name=${username}`)
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
    change= (a) =>{
        if(a.State==1)
        {
            axios.get(`/order/confirmorder?OrderId=${a.OrderId}`)
                .then(
                    res => {
                        console.log(res);
                        alert("收货成功")
                    }
                )
                .catch(err => console.log(err))
        }
        else alert("货物未发出，无法收货")
    }
    deleteRow = (a) => {
        if(a.State!=1)
        {
            console.log(a,"delete");
            axios.get(`/order/cancelorder?OrderId=${a.OrderId}`)
                .then(
                    res => {
                        console.log(res);
                        alert("取消成功")
                    }
                )
                .catch(err => console.log(err))
        }
        else alert("货物已发出，无法取消")
    }

    render() {
        function onchange(value)
        {
            num=value;
        }
        const columns = [
            {
                title: 'OrderId',
                dataIndex: 'OrderId',
                key: 'OrderId',
            },
            {
                title: 'GoodsName',
                dataIndex: 'GoodsName',
                key: 'GoodsName',
            },
            {
                title: 'Num',
                dataIndex: 'Num',
                key: 'Num',
            },
            {
                title: 'Address',
                dataIndex: 'Address',
                key: 'Address',
            },
            {
                title: 'Date',
                dataIndex: 'Date',
                key: 'Date',
            },
            {
                title: 'State',
                dataIndex: 'State',
                key: 'State',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a onClick={()=>this.change(record)}>confirm</a>
                        <a onClick={()=>this.deleteRow(record)}>cancel</a>
                    </Space>
                ),
            },
        ];
        console.log(this.state.list)
        const data=[...this.state.list]
        return <Table columns={columns} dataSource={data} />
    }
}
class AdminView extends React.Component{
    constructor(props) {
        super(props);
        this.state=props
    }
    render() {

        return <div >
            <GoodInfo/>
            <div className="adminbox"><Normalform/></div>
            <OrderInfo/>
        </div>

    }
}
class Selecter extends  React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return username==='admin'?<AdminView props={this.props}/>:<UserInfo/>
    }
}
class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            view:"1"
        }
    }
    render() {
        function handleclick()
        {
            localStorage.removeItem('username')
            alert("注销成功")
            window.location.href='http://localhost:3000/'
        }
        onclick=(key)=>{
            console.log(key.key)
            this.setState({view:key.key})
        }
        return  <Layout>
            <Header className="header">

                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="0"><span className="logo" ><img src="https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg"/></span></Menu.Item>
                    <Menu.Item key="1" onClick={handleclick}>注销</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><a href='/'>Home</a></Breadcrumb.Item>
                    <Breadcrumb.Item>dashboard</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Sider className="site-layout-background" width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="商品信息">
                                <Menu.Item key="1" onClick={onclick}>商品管理</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="订单信息">
                                <Menu.Item key="2" onClick={onclick}>订单管理</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined />} title="用户">
                                <Menu.Item key="3" onClick={onclick}>用户信息</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Selecter/>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>UPC 2021.7.27</Footer>
        </Layout>

    }
}
export default Dashboard