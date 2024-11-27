import React from 'react';
import { Layout, Row, Col, Avatar, Menu, Dropdown, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons'; 
import '../styles/Header.css';

const { Header } = Layout;

const AppHeader = () => {
  const settingsMenu = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Settings</Menu.Item>
      <Menu.Item key="3">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Header className="header-container">
      <Row className="header-row" justify="space-between" align="middle">
        {/* Left side: Company name */}
        <Col>
          <div className="demo-logo">
            VRV
          </div>
        </Col>

        {/* Right side: Admin profile and Settings */}
        <Col>
          <Row align="middle" justify="end">
            {/* Admin name (no dropdown) */}
            <Col className="header-col">
              <Button type="text" className="admin-button">
                Admin
              </Button>
            </Col>

            {/* Profile Avatar */}
            <Col className="avatar-col">
              <Avatar size={40} src="https://www.w3schools.com/w3images/avatar2.png" />
            </Col>

            {/* Settings icon with dropdown and padding above */}
            <Col className="settings-dropdown-col">
              <Dropdown overlay={settingsMenu} trigger={['click']}>
                <SettingOutlined className="settings-icon" />
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;
