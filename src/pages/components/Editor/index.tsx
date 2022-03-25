import { useState, createContext } from 'react';
import ToolsBar from '../ToolsBar';
import { Button, Space, message } from 'antd';
import './index.css';

function SendLine(props: any) {
  const style = {
    display: 'flex',
    justifyContent: 'flex-end',
  };

  function submit(content?: string) {
    if (content === '') {
      message.error('请输入内容后再发送！');
      return;
    }
    props.setNewMessageContent(content);
    // TODO: backend
  }

  return (
    <div className="sendLine" style={style}>
      <Space size="large">
        <span style={{ color: 'lightgray' }}>Enter换行，Ctrl+Enter发送</span>
        <Button
          onClick={() => {
            let ele = document.querySelector('.textarea');
            if (ele) {
              const content = ele.innerHTML;
              submit(content);
              ele.innerHTML = '';
            }
          }}
          type="primary"
          disabled={props.curGroup === -1 ? true : false}
        >
          发送
        </Button>
      </Space>
    </div>
  );
}

function Textarea() {
  return <div className="textarea" contentEditable="true"></div>;
}

export default function Editor(props: any) {
  let [newMessage, setNewMessage] = useState({
    group: '',
    from: '',
    content: '',
  });

  function setNewMessageContent(content: any) {
    setNewMessage((data) => {
      // 待处理的值
      let new_data = data;
      new_data.content = content;
      return new_data;
    });
    props.addMessage(
      newMessage.group,
      newMessage.from,
      newMessage.content,
      true,
    );
  }

  newMessage.group = props.groupName;
  newMessage.from = props.from;
  return (
    <div className="eitor">
      <ToolsBar />
      <Textarea></Textarea>
      <SendLine
        addMessage={props.addMessage}
        setNewMessageContent={setNewMessageContent}
        curGroup={props.curGroup}
      ></SendLine>
    </div>
  );
}
