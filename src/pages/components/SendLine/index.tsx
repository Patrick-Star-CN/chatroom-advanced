import React from 'react';
import { Button, Space } from 'antd';
import './index.css';
import { socket } from '@/pages/Login';
import { user } from '@/pages/Login';
export default function SendLine() {
  const style = {
    display: 'flex',
    justifyContent: 'flex-end',
  };

  const sendMessage = () => {
    //const message  = document.querySelector("textarea")?.value;
    const message = {
      content: document.querySelector("textarea")?.value,
      from: user,
      chatNum:1

    }
    socket.emit("message",message)
  }
  return (
    <div className="sendLine" style={style}>
      <Space size="large">
        <span style={{ color: 'lightgray' }}>Enter换行，Ctrl+Enter发送</span>
        <Button type="primary" onClick={sendMessage}>发送</Button>
      </Space>
    </div>
  );
}
