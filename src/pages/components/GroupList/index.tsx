import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { List, Divider, message, Space } from 'antd';
import { LockFilled, UnlockFilled } from '@ant-design/icons';
import UserInfo from '../UserInfo';
import Comfirm from '../Comfirm';
import './index.css';
import { io } from 'socket.io-client';

// 聊天室名称
let groupList = [
  { name: 'abc', state: false, locked: true },
  { name: 'hello', state: false, locked: true },
  { name: '123GTD', state: false },
  { name: 'SummersDay1', state: false },
  { name: 'SummersDay2', state: false },
  { name: 'SummersDay3', state: false },
  { name: 'SummersDay4', state: false },
  { name: 'SummersDay5', state: false, locked: false },
  { name: 'SummersDay6', state: false, locked: false },
  { name: 'SummersDay7', state: false, locked: false },
  { name: 'SummersDay8', state: false, locked: false },
  { name: 'SummersDay9', state: false, locked: false },
];
// 获取 state 的时候记得用 useState() 初始化一遍，因为状态要进入聊天室后会更新

let toUnlock: number;
export default function GroupList(props: any) {
  const [confirmVisible, setConfirmVisible] = useState(false);
  return (
    <>
      <UserInfo name={props.name} />
      <div className="group-list">
        <div className="list">
          <List
            size="large"
            dataSource={groupList}
            renderItem={(item, index) => (
              <List.Item
                onClick={(e) => {
                  Enter(
                    index,
                    props.changeGroupName,
                    props.setCurGroup,
                    props.curGroup,
                    setConfirmVisible,
                  );
                }}
              >
                <Space>
                  <State joined={item.state}></State>
                  {item.name}
                  <Lock locked={item.locked}></Lock>
                </Space>
              </List.Item>
            )}
          />
        </div>
        <Counter></Counter>
        <Comfirm
          confirmVisible={confirmVisible}
          setConfirmVisible={setConfirmVisible}
          unlock={() => {
            // console.log(props.curGroup);
            groupList[toUnlock].locked = false;
          }}
        />
      </div>
    </>
  );
}

// 聊天室相对于用户的状态
function State(props: any) {
  let joined: boolean = props.joined;
  // joioned === true 已经加入该聊天室
  let color = joined ? 'blue' : 'red';
  return <span style={{ color: color }}>#</span>;
}

// 聊天室是否需要密码
function Lock(pros: any) {
  let locked: boolean = pros.locked;
  // locked === ture 私密聊天室
  if (locked === true) return <LockFilled />;
  else if (locked === false) return <UnlockFilled />;
  return null;
}

// 群聊数量计数器
function Counter() {
  return <span className="counter">共计 {groupList.length} 个群聊</span>;
}

function Enter(
  index: number,
  changeGroupName: any,
  setCurGroup: any,
  curGroup: number,
  setConfirmVisible: any,
) {
  if (groupList[index].locked) {
    toUnlock = index;
    setConfirmVisible(true);
    return;
  }
  if (curGroup != -1) groupList[curGroup].state = false;
  setCurGroup(index);
  changeGroupName(groupList[index].name);
  groupList[index].state = true;
}
