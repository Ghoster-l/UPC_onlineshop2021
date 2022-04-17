import React from 'react';
import './login.css'
import { Layout, Menu, Breadcrumb } from 'antd';
import NormalLoginForm from "../../componet/loginform";
const { Header, Content, Footer } = Layout;
class Login extends React.Component{
    render() {
        return  <Layout className="layout">
            <Header>
                <div className="logo" >
                    <img src="https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg"/>
                </div>
            </Header>
            <Content style={{ padding: '0px 300px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
                    <Breadcrumb.Item>Login</Breadcrumb.Item>
                </Breadcrumb>
            </Content>
            <Content style={{ padding: '200px 800px',position:'center'}}>
                <NormalLoginForm/>
            </Content>
            <Footer style={{ textAlign: 'center' }}>UPC 2021.7.27</Footer>
        </Layout>
    }
}
export default Login