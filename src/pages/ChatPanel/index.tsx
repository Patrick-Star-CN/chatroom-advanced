import { useState, useContext, createContext, useEffect } from 'react';
import { Layout, Button, Divider, message } from 'antd';
const { Sider, Header, Content, Footer } = Layout;
import './index.css';
import Message from '../components/Message';
import GroupList from '../components/GroupList';
import Editor from '../components/Editor';

let countMessage = 0;
export default function ChatPanel(props: any) {
  let [messageList, setMessageList] = useState([
    { group: 'SummersDay', from: 'cx', content: 'hello' },
  ]);

  let [groupName, setGroupName] = useState('选择一个群组加入聊天吧！');

  // 与子组件共享的 '改变群名称' 函数，用于子组件主动修改父组件状态
  function changeGroupName(newName: string, locked: boolean) {
    if (locked) {
      message.error('请输入密码');

      return;
    }
    setGroupName(newName);
  }

  function addMessage(group: string, from: string, content: string) {
    setMessageList([
      ...messageList,
      { group: group, from: from, content: content },
    ]);
    // TODO:
  }

  if (props.visible) {
    // visible = true 显示 panel
    const userName: string = props.name;
    return (
      <div className="panel shadow">
        <Layout>
          <Sider className="sider">
            <GroupList name={userName} changeGroupName={changeGroupName} />
          </Sider>
          <Layout>
            <Header style={{ textAlign: 'center' }}>
              <h3>{groupName}</h3>
            </Header>
            <Content>
              {messageList.map((item, index) => {
                // console.log(messageList[index])
                if (item.group === groupName)
                  return (
                    <Message
                      key={index}
                      group={item.group}
                      from={item.from}
                      content={item.content}
                      userName={userName}
                    />
                  );
                else return null;
              })}
            </Content>
            <Footer>
              {/* <Editor addMessage={addMessage} /> */}
              <Editor
                addMessage={addMessage}
                groupName={groupName}
                from={props.name}
              />
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  } else return null;
}
