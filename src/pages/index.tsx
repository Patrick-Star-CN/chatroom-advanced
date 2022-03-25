import { useState } from 'react';
import './index.css';
import Login from './Login';
import ChatPanel from './ChatPanel';

export default function IndexPage() {
  let [panelVisible, setPanelVisible] = useState(false);
  let [userName, setUserName] = useState('');
  // roomVisible 控制聊天窗口是否显示
  // 刚进入是登录页面，所以不显示 (false)
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
