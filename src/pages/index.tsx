import { useState, createContext, useEffect } from 'react';
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
  toggleMessageList: (msg: any) => {},
});

export default function IndexPage() {
  let [panelVisible, setPanelVisible] = useState(false);
  let [userName, setUserName] = useState('');
  // paneVisible 控制聊天窗口是否显示
  // 刚进入是登录页面，所以不显示 (false)
  // userName 记录输入的昵称，用于聊天室面板的渲染

  useEffect(() => {
    socketExample.on('receiveMessage', (msg) => {
      // console.log(msg);
      toggleMessageList(msg);
    });
  }, []);
  let [messageList, setMessageList] = useState(initialMessageList.slice(1));
  /* let [messageList, setMessageList] = useState([
    { group: '123GTD', from: 'cx', content: 'hello, welcome to 123GRD' },
    { group: 'SummersDay1', from: 'cx', content: 'This is SummersDay' },
    { group: 'SummersDay2', from: 'cx', content: 'hello' },
    { group: 'SummersDay3', from: 'cx', content: 'Whats the weather today?' },
    { group: 'SummersDay4', from: 'cx', content: 'good night' },
    { group: 'SummersDay5', from: 'cx', content: '???' },
  ]); */

  function toggleMessageList(msg: any) {
    // console.log(msg);
    setMessageList((state) => {
      return state.concat([msg]);
    });
  }

  return (
    <div className="main">
      <MessageListContext.Provider value={{ messageList, toggleMessageList }}>
        <Login
          visible={panelVisible}
          setVisible={setPanelVisible}
          setName={setUserName}
        />
        <ChatPanel visible={panelVisible} name={userName} />
      </MessageListContext.Provider>
    </div>
  );
}
