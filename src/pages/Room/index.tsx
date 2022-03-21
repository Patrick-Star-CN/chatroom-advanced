import React from 'react';
import { Layout, Button, Divider } from 'antd';
const { Sider, Header, Content, Footer } = Layout;
import './index.css';
import { locationsAreEqual } from 'history-with-query';
import ToolsBar from '../components/ToolsBar';
import Textarea from '../components/Textarea';
import SendLine from '../components/SendLine';

export default function Room() {
  const myName: string = 'j10c';
  const roomName: string = 'room1';
  return (
    <div className="main">
      <Layout>
        <Sider>
          <h1>{myName}</h1>
          <div className="friend-box"></div>
        </Sider>
        <Layout>
          <Header>{roomName}</Header>
          <Content></Content>
          <Footer>
            <ToolsBar />
            <Textarea />
            <SendLine />
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}
