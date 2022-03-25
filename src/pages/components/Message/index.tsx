import { useState } from 'react';
import { Avatar } from 'antd';
import './index.css';

export default function Message() {
  const userName = 'j10c';
  const text = 'Hello world!';
  const [myself, setMyself] = useState(false);
  // myself === true 表示该消息为用户本人所发
  if (myself) {
    return (
      <div className="content my-msg" title={userName}>
        <div className="text">{text}</div>
        <Avatar>{userName.substring(0, 1)}</Avatar>
      </div>
    );
  } else {
    return (
      <div className="content other-msg" title={userName}>
        <Avatar>{userName.substring(0, 1)}</Avatar>
        <div className="text">{text}</div>
      </div>
    );
  }
}
