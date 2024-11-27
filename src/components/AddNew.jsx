// AddNewButton.js
import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons'; 
import '../styles/AddNew.css';

const AddNew = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Button
      type="primary"
      size="large"
      className="gradient-button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      icon={<PlusOutlined />} // Always show the Plus icon
      onClick={onClick} // Handle click to trigger the "Add New User" modal
    >
      <span className={`button-text ${hovered ? 'show' : ''}`}>
        {hovered ? 'Add New User' : ''} 
      </span>
    </Button>
  );
};

export default AddNew;
