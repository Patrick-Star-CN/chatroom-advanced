import { useState, useContext, createContext, useEffect } from 'react';
import { Layout, Empty, message } from 'antd';
const { Sider, Header, Content, Footer } = Layout;
import './index.css';
import Message from '../components/Message';
import GroupList from '../components/GroupList';
import Editor from '../components/Editor';
import { socketExample } from '../Login';
import { MessageListContext } from '..';

export default function ChatPanel(props: any) {
  // TODO:socket 接受消息放这里会连续触发多次，不知道为啥？？？
  /* socket.on('receiveMessage', (msg) => {
    console.log(msg)
    console.log(counter)
    // addMessage(msg.group, msg.from, msg.content, false)
  }) */

  let elem = useContext(MessageListContext);
  let [groupName, setGroupName] = useState('选择一个群组加入聊天吧！');
  let [curGroup, setCurGroup] = useState(-1);

  // 与子组件共享的 '改变群名称' 函数，用于子组件主动修改父组件状态
  function changeGroupName(newName: string) {
    setGroupName(newName);
  }

  function addMessage(
    group: string,
    from: string,
    content: string,
    active: boolean,
  ) {
    /* setMessageList([
      ...messageList,
      { group: group, from: from, content: content },
    ]); */
    /* elem.toggleMessageList((state) => {
      return state.concat([{ group: group, from: from, content: content }]);
    }); */
    elem.toggleMessageList({ group: group, from: from, content: content });

    // socket 发送消息
    if (active)
      socketExample.emit('sendMessage', {
        name: from,
        content: content,
        group: group,
      });
  }

  if (props.visible) {
    // visible = true 显示 panel
    const userName: string = props.name;
    return (
      <div className="panel shadow rcorner smd-border">
        <Layout className="rcorner">
          <Sider className="sider rcorner-left">
            <GroupList
              name={userName}
              curGroup={curGroup}
              setCurGroup={setCurGroup}
              changeGroupName={changeGroupName}
            />
          </Sider>
          <Layout
            className="rcorner"
            style={{ justifyContent: 'space-between' }}
          >
            <Header className="rcorner" style={{ textAlign: 'center' }}>
              <h3>{groupName}</h3>
            </Header>
            {curGroup != -1 ? (
              <Content>
                {elem.messageList.map((item, index) => {
                  // console.log(elem.messageList[index])
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
            ) : (
              <Empty
                description={
                  curGroup != -1 ? '还没有任何消息' : '在左侧选择一个群聊吧！'
                }
              />
            )}
            <Footer className="rcorner">
              <Editor
                addMessage={addMessage}
                groupName={groupName}
                from={props.name}
                curGroup={curGroup}
              />
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  } else return null;
}
