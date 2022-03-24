import { useState, useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';

export default function Comfirm(props: any) {
  const [form] = Form.useForm();
  const handleOk = () => {
    console.log(form.getFieldValue('password'));
    if (!form.getFieldValue('password')) {
      message.error('请输入密码');
      return;
    }
    props.setConfirmVisible(false);
    form.resetFields();
    props.unlock();
  };
  const handleCancel = () => {
    props.setConfirmVisible(false);
    form.resetFields();
  };
  return (
    <Modal
      title="输入群聊密码"
      visible={props.confirmVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
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
