import { Card, Form, Input, Button, Checkbox, message } from 'antd';
import './index.css';

export default function Login(props: any) {
  const onFinish = (values: any) => {
    if (values.username.length > 8) {
      message.error('请设定 8 个字符长度以下的昵称');
      return;
    }
    // 已经完成表单
    props.setName(values.username);
    disappear();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    // 这里写用户名重复的情况，弹出警告
    message.error('未知错误');
  };

  // 登录页面消失
  const disappear = () => {
    document.querySelector('.login')?.classList.add('disappear');
    props.setVisible(true); // ChatPanel 出现
  };

  if (!props.visible) {
    return (
      <Card title="进入聊天室大厅" bordered={true} className="login shadow">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="昵称"
            name="username"
            rules={[{ required: true, message: '请输入你的昵称！' }]}
          >
            <Input style={{ width: '80%' }} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>记住我！</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ width: '50%' }}>
              进入
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  } else return null;
}
