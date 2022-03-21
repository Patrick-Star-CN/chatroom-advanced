import React from 'react';
import { Button, Space } from 'antd';
import './index.css';

export default function SendLine() {
  const style = {
    display: 'flex',
    'justify-content': 'flex-end',
  };
  return (
    <div className="sendLine" style={style}>
      <Space size="large">
        <span style={{ color: 'lightgray' }}>Enter换行，Ctrl+Enter发送</span>
        <Button type="primary">发送</Button>
      </Space>
    </div>
  );
}
