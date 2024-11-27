import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  UserOutlined, 
  DashboardOutlined, 
  SettingOutlined, 
  FileTextOutlined,
  BranchesOutlined, 
  FileSyncOutlined, 
  ShareAltOutlined,  
  UnorderedListOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'; 
import '../styles/Sidebar.css';

const { Sider } = Layout;

const menuItems = [
  { key: '1', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: '2', icon: <UserOutlined />, label: 'Users' },
  { key: '3', icon: <SettingOutlined />, label: 'Settings', disabled: true },
  { key: '4', icon: <FileTextOutlined />, label: 'Reports', disabled: true },
  { key: '7', icon: <BranchesOutlined />, label: 'Branches', disabled: true },
  { key: '8', icon: <FileSyncOutlined />, label: 'Sync Data', disabled: true },
  { key: '9', icon: <ShareAltOutlined />, label: 'Share', disabled: true },
  { key: '11', icon: <UnorderedListOutlined />, label: 'Tasks', disabled: true },
];

const Sidebar = ({ collapsed, toggleSidebar }) => {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleSidebar}
      width={250}
      trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      style={{ height: 'calc(100vh - 64px)' }}
    >
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        {menuItems.map(({ key, icon, label, disabled }) => (
          <Menu.Item key={key} icon={icon} disabled={disabled}>
            {label}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
