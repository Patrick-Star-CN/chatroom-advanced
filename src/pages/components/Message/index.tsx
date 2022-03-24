import { useState } from 'react';
import { Avatar } from 'antd';
import './index.css';

export default function Message(props: any) {
  //group: string, from: string, content: string
  const from = props.from;
  const text = props.content;

  const [myself, setMyself] = useState(from === props.userName ? true : false);
  // myself === true 表示该消息为用户本人所发

  if (myself) {
    return (
      <div className="content my-msg" title={from}>
        <div className="text">{text}</div>
        <Avatar>{from.substring(0, 1)}</Avatar>
      </div>
    );
  } else {
    return (
      <div className="content other-msg" title={from}>
        <Avatar>{from.substring(0, 1)}</Avatar>
        <div className="text">{text}</div>
      </div>
    );
  }
}
