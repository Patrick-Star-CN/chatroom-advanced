import './index.css';

export default function UserInfo(props: any) {
  const myName: string = props.name;
  return (
    <div className="user-info">
      <h2 style={{ padding: '10px 20px' }}>{myName}</h2>
    </div>
  );
}
