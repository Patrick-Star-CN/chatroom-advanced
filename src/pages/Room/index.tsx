import React from 'react';
import { Layout, Button, Divider } from 'antd';
const { Sider, Header, Content, Footer } = Layout;
import './index.css';
import ToolsBar from '../components/ToolsBar';
import Textarea from '../components/Textarea';
import SendLine from '../components/SendLine';
import Message from '../components/Message';

export default function Room(props: any) {
  const myName: string = 'j10c';
  const roomName: string = 'room1';
  if (props.visible) {
    // roomVisible = true 显示房间
    return (
      <div className="room shadow">
        <Layout>
          <Sider>
            <h1>{myName}</h1>
            <div className="friend-box"></div>
          </Sider>
          <Layout>
            <Header>{roomName}</Header>
            <Content>
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
            </Content>
            <Footer>
              <ToolsBar />
              <Textarea />
              <SendLine />
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  } else return null;
}
