import { useState } from 'react';
import { Modal, Form, Input } from 'antd';

export default function Comfirm(props: any) {
  const handleOk = () => {
    props.setConfirmVisible(false);
    // setIsVisible(false);
  };
  const handleCancel = () => {
    props.setConfirmVisible(false);
    // setIsVisible(false);
  };
  return (
    <Modal
      title="输入群聊密码"
      visible={props.confirmVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ remember: false }}
        autoComplete="off"
      >
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}
