import { Layout, Button, Divider } from 'antd';
const { Sider, Header, Content, Footer } = Layout;
import './index.css';
import Context from '../components/Context';
import Message from '../components/Message';
import GroupList from '../components/GroupList';
import Editor from '../components/Editor';

export default function ChatPanel(props: any) {
  let roomName: string = props.roomName;
  // const roomName: string = '相亲相爱一家人';
  if (props.visible) {
    // roomVisible = true 显示房间
    return (
      <div className="panel shadow">
        <Layout>
          <Sider className="sider">
            <GroupList name={props.name} />
          </Sider>
          <Layout>
            <Header style={{ textAlign: 'center' }}>
              <h3>{roomName}</h3>
            </Header>
            <Content>
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
            </Content>
            <Footer>
              <Editor />
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  } else return null;
}
