import React from 'react';
import './404.css'
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;
class Undefined extends React.Component{
    render() {
        return  <Layout className="layout">
            <Header>
                <div className="logo" >
                    <img src="https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg" alt='23333'/>
                </div>
            </Header>
            <Content style={{ padding: '0px 300px',textAlign:'center'}}>
                <h1>404 NOT FOUND!</h1>
                <h1>return to <a href="/">Home</a></h1>
            </Content>

            <Footer style={{ textAlign: 'center' }}>UPC 2021.7.27</Footer>
        </Layout>
    }
}
export default Undefined