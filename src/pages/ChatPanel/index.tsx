import { useState, useContext, createContext } from 'react';
import { Layout, Button, Divider, message } from 'antd';
const { Sider, Header, Content, Footer } = Layout;
import './index.css';
import Message from '../components/Message';
import GroupList from '../components/GroupList';
import Editor from '../components/Editor';

const messageList = [
  { group: 'SummersDay', from: 'j10c', content: 'hello' },
  { group: 'SummersDay', from: 'sqj', content: 'hello1' },
  { group: 'SummersDay', from: 'j10c', content: 'hello' },
  { group: 'SummersDay', from: 'j10c', content: 'hello' },
  { group: 'SummersDay', from: 'j10c', content: 'hello' },
  { group: 'SummersDay', from: 'j10c', content: 'hello world' },
  { group: 'SummersDay', from: 'j10c', content: 'hello' },
  { group: 'SummersDay', from: 'j10c', content: 'hello' },
  { group: 'SummersDay', from: 'j10c', content: 'hello' },
  { group: 'SummersDay', from: 'j10c', content: 'hello' },
  { group: 'SummersDay', from: 'j10c', content: 'hello' },
  { group: 'SummersDay', from: 'j10c', content: 'hi' },
  { group: 'SummersDay', from: 'j10c', content: 'hello' },
  { group: 'SummersDay', from: 'j10c', content: 'thank' },
  { group: 'SummersDay', from: 'j10c', content: 'hello' },
  { group: 'SummersDay', from: 'j10c', content: 'hello' },
];

export default function ChatPanel(props: any) {
  let [groupName, setGroupName] = useState('选择一个群组加入聊天吧！');

  // 与子组件共享的 '改变群名称' 函数，用于子组件主动修改父组件状态
  function changeGroupName(newName: string, locked: boolean) {
    if (locked) {
      message.error('请输入密码');

      return;
    }

    setGroupName(newName);
  }

  /* function addMessage(newMessage: object) {
    messageList.push(newMessage);
  } */

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
                return (
                  <Message
                    group={item.group}
                    from={item.from}
                    content={item.content}
                  />
                );
              })}
            </Content>
            <Footer>
              {/* <Editor addMessage={addMessage} /> */}
              <Editor groupName={groupName} from={props.name} />
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  } else return null;
}
