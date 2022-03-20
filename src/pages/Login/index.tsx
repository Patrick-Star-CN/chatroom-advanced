import React from 'react';
import { useState } from 'react';
import { Card, Form, Input, Button, Checkbox } from 'antd';
import './index.css';

export default function Login() {
  let [isUser, setIsUser] = useState(false);

  const onFinish = (values: any) => {
    console.log('userName: ', values.username);
    console.log('password: ', values.password);
    disappear();
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const resiger = () => {
    setIsUser(true);
  };
  const disappear = () => {
    document.querySelector('.login')?.classList.add('disappear');
  };
  return (
    <div className="login">
      <Card
        title="登录聊天室"
        bordered={true}
        extra={
          <Button onClick={resiger} type="link">
            还没有帐号?
          </Button>
        }
        style={{ width: 400 }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入你的用户名！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入你的密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>记住我！</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {!isUser ? '登录' : '注册'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
