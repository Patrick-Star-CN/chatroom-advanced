import { useState, useContext, createContext } from 'react';
import ToolsBar from '../ToolsBar';
import { Button, Space } from 'antd';
import './index.css';

const MessageContext = createContext({});
let MessageContent = '';
function SendLine(props: any) {
  const style = {
    display: 'flex',
    justifyContent: 'flex-end',
  };
  const newMessage = useContext(MessageContext);
  function submit() {
    // addMessage
    // console.log(newMessage[0]);
  }
  return (
    <div className="sendLine" style={style}>
      <Space size="large">
        <span style={{ color: 'lightgray' }}>Enter换行，Ctrl+Enter发送</span>
        <Button
          onClick={() => {
            submit();
          }}
          type="primary"
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
  newMessage.group = props.groupName;
  newMessage.from = props.from;
  console.log(newMessage);
  return (
    <div className="eitor">
      <MessageContext.Provider value={[newMessage, setNewMessage]}>
        <ToolsBar></ToolsBar>
        <Textarea></Textarea>
        <SendLine addMessage={props.addMessage}></SendLine>
      </MessageContext.Provider>
    </div>
  );
}
