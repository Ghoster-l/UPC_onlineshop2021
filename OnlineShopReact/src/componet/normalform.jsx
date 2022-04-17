import { Form, Input, Button, } from 'antd';
import React from "react";
import axios from "_axios@0.21.1@axios";
class Normalform extends React.Component
{
    render() {
        const onFinish = (values) => {
            let value=values
            value.Goods_Left=parseInt(value.Goods_Left)
            value.Price=parseFloat(value.Price)
            axios.post('/admin/addgoods', value)
                .then(
                    function (response) {
                        console.log("response: ", response);
                        if(response.statusText==='OK') {
                            alert("添加成功")
                            //window.location.href="http://localhost:3000/dashboard"
                        }

                    }
                )
                .catch(err => console.log(err))
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <Form
                name="basic"
                className="login-form"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Name"
                    name="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Goods_Left"
                    name="Goods_Left"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="Price"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="Description"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Imgbase64"
                    name="Imgbase64"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
export default Normalform;
