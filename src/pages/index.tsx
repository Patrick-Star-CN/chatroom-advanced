import { useState } from 'react';
import './index.css';
import Login from './Login';
import Room from './Room';

export default function IndexPage() {
  let [roomVisible, setRoomVisible] = useState(false);
  // roomVisible 控制聊天窗口是否显示
  // 刚进入是登录页面，所以不显示 (false)
  return (
    <div className="main">
      <Login visible={roomVisible} setVisible={setRoomVisible} />
      <Room visible={roomVisible} />
    </div>
  );
}
