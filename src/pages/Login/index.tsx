import { useContext, createContext, useState } from 'react';
import { Card, Form, Input, Button, Checkbox, message } from 'antd';
import ChatPanel from '../ChatPanel';
import './index.css';
import { io } from "socket.io-client";
import { DefaultEventsMap } from '@socket.io/component-emitter';
const UserNameContext = createContext('');

export let data : object[] = [
  // { name: 'abc', state: false, locked: true },
  // { name: 'hello', state: true, locked: true },
  // { name: '123GTD', state: false, locked: false },
  // { name: 'SummersDay', state: false, locked: true },
  // { name: 'SummersDay', state: false, locked: true },
  // { name: 'SummersDay', state: false, locked: false },
  // { name: 'SummersDay', state: false, locked: false },
  // { name: 'SummersDay', state: false, locked: false },
  // { name: 'SummersDay', state: false, locked: false },
]
export let socket:any;
export let user : string;
export let messageList : Array<object>;
export default function Login(props: any) {
  let temp
  setTimeout(() => {
    temp = data.push({ name: 'abc', state: false, locked: true });
    console.log(data)
   
    },10000)
    useState({data : temp})
  const onFinish = (values: any) => {
    user = values.username;
    if (values.username.length > 8) {
      message.error('请设定 8 个字符长度以下的昵称');
      return;
    }
    // 已经完成表单
    props.setName(values.username);
    alert("登录成功" + values.username)
    socket = io({

      query: {         
          name: values.username
      },
      reconnection: false,
    });
    socket.on('connect', function () { // 'connect' 为保留字
      socket.emit('getGroupList', (datas : object[]) => {
        // 请求 groupList，只在第一次登录的时候请求
        data = datas
      });
    })
    socket.on('disconnect', () => { // 'disconnect' 为保留字
      // 提示关闭页面
      socket.emit('disconnect', values.usernames);
    });
     socket.on('online', (chats : any) => {
      //监听在线群聊
      // chats = [
      //   { name: 'abc', state: false, locked: true },
      //   { name: 'hello', state: true, locked: true },
      //   { name: '123GTD', state: false, locked: false },
      //   { name: 'SummersDay', state: false, locked: true },
      //   { name: 'SummersDay', state: false, locked: true },
      //   { name: 'SummersDay', state: false, locked: false },
      //   { name: 'SummersDay', state: false, locked: false },
      //   { name: 'SummersDay', state: false, locked: false },
      //   { name: 'SummersDay', state: false, locked: false },
      // ]
      chats.forEach((item : object) => {
      data.push(item)
    });
    socket.on('receiveMessage', (message : any) => {
      // 存入消息到 messageList
      messageList.push(message);
      // 调用添加消息函数渲染函数到窗口底部
    });

    })
    disappear();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    // 这里写用户名重复的情况，弹出警告
    socket.on('connect_error', (err : any) => { // 'connect_error' 为保留字  
      if (err && err.message === 'SAME_NAME_ERROR') {
        // 提示重新设定昵称
        alert("昵称重复！！！")
        return;
      }
      alert('连接失败，请检查 websocket 服务器');
    });
    message.error('未知错误');
  };

  // 登录页面消失
  const disappear = () => {
    document.querySelector('.login')?.classList.add('disappear');
    props.setVisible(true); // ChatPanel 出现
  };


  if (!props.visible) {
    return (
      <Card title="进入聊天室大厅" bordered={true} className="login shadow">
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
            label="昵称"
            name="username"
            rules={[{ required: true, message: '请输入你的昵称！' }]}
          >
            <Input style={{ width: '80%' }} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>记住我！</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ width: '50%' }}>
              进入
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  } else return null;
}
