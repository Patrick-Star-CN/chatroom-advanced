import { Button, Space } from 'antd';

export default function ToolsBar() {
  return (
    <div className="tools-bar">
      <Space>
        <Button size="small">表情</Button>
        <Button size="small">图片</Button>
        <Button size="small">文件</Button>
      </Space>
    </div>
  );
}
