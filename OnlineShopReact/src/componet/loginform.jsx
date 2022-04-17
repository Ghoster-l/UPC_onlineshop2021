import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import React from "react";
class NormalLoginForm extends React.Component
{
    render() {
        const onFinish = (values) => {
            console.log('Received values of form: ', values);
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
            });
            axios.post('/login', formData)
                .then(
                    function (response) {
                        console.log("response: ", response);
                        if(response.data==='successful') {
                            window.userinfo={name:values.name,loginstate:true}
                            alert("登录成功")
                            localStorage.setItem('username',values.name)
                            window.location.href="http://localhost:3000/dashboard"
                        }
                        else {
                            alert("用户不存在或密码错误")
                        }

                    }
                )
                .catch(err => console.log(err))
        };

        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="passwd"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" >
                        登录
                    </Button>
                    <a href="/register">注册</a>
                </Form.Item>
            </Form>
        );
    }
}

export default NormalLoginForm;
