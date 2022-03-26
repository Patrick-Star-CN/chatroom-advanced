import { useState, createContext } from 'react';
import { io } from 'socket.io-client';
import './index.css';
import Login from './Login';
import ChatPanel from './ChatPanel';

const initialMessageList = [{ group: '', from: '', content: '' }];

export const socketExample = io('ws://localhost:3000', {
  reconnection: false,
});

export let MessageListContext = createContext({
  messageList: initialMessageList,
  toggleMessage: (msg: any) => {},
});

socketExample.on('receiveMessage', (msg) => {
  console.log(msg);
  // addMessage(msg.group, msg.from, msg.content, false)
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
