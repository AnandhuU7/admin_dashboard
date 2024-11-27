import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../styles/SearchButton.css';

const SearchButton = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // This function handles the input change and calls the parent onSearch function
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="search-button-container"> 
      <Input
        placeholder="Search by name, email"
        value={searchQuery}
        onChange={handleSearch}
        className="search-input" 
        prefix={<SearchOutlined />}
      />
    </div>
  );
};

export default SearchButton;
