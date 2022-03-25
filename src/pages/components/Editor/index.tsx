import ToolsBar from '../ToolsBar';
import Textarea from '../Textarea';
import SendLine from '../SendLine';

export default function Editor() {
  return (
    <div className="eitor">
      <ToolsBar />
      <Textarea />
      <SendLine />
    </div>
  );
}
