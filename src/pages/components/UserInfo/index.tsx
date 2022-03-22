import './index.css';

export default function UserInfo() {
  const myName: string = 'j10c';
  return (
    <div className="user-info">
      <h2 style={{ padding: '10px 20px' }}>{myName}</h2>
    </div>
  );
}
