import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, Menu } from 'antd';
import React from 'react'

const items = [
  {
    label: "View Profile",
    key: "0",
  },
  {
    label: "Settings",
    key: "1",
  },
  {
    label: "Logout",
    key: "2",
    dashed: true,
    icon: React.createElement(LogoutOutlined),
  },
];
export default function AvatarProfile() {
  return (
    <Dropdown  menu={{onClick: () => {}, items: items}} placement="bottomRight" trigger={['click']}>
      <Button style={{padding: 0, boxSizing: "border-box", border: "none"}} size='large'>
        <Avatar shape="square" size="large" icon={<UserOutlined />} />
      </Button>
    </Dropdown>
  )
}
