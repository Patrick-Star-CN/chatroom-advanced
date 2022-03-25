import { useState, createContext } from 'react';
import { io, Socket } from 'socket.io-client';
import './index.css';
import Login from './Login';
import ChatPanel from './ChatPanel';

export const socketExample = io('ws://localhost:3000', {
  reconnection: false,
});

export default function IndexPage() {
  let [panelVisible, setPanelVisible] = useState(false);
  let [userName, setUserName] = useState('');
  // paneVisible 控制聊天窗口是否显示
  // 刚进入是登录页面，所以不显示 (false)
  // userName 记录输入的昵称，用于聊天室面板的渲染

  return (
    <div className="main">
      <Login
        visible={panelVisible}
        setVisible={setPanelVisible}
        setName={setUserName}
      />
      <ChatPanel visible={panelVisible} name={userName} />
    </div>
  );
}
