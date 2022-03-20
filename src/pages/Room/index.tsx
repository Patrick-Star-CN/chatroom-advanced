import React from 'react';
import { Layout, Button } from 'antd';
const { Sider, Header, Content, Footer } = Layout;
import './index.css';
import { locationsAreEqual } from 'history-with-query';
import Toolsbar from '../components/Toolsbar';
import Textarea from '../components/Textarea';

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
            <div className="reply">
              <Toolsbar />
            </div>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}
