import React from 'react';
import './register.css'
import { Layout, Breadcrumb } from 'antd';
import RegistrationForm from "../../componet/registerform";
const { Header, Content, Footer } = Layout;
class Register extends React.Component{
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
                    <Breadcrumb.Item>Register</Breadcrumb.Item>
                </Breadcrumb>
            </Content>
            <Content style={{ padding: '200px 800px',position:'center'}}>
                <RegistrationForm />
            </Content>
            <Footer style={{ textAlign: 'center' }}>UPC 2021.7.27</Footer>
        </Layout>
    }
}
export default Register