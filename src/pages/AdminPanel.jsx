import React, { useState, useEffect } from 'react';
import { DeleteFilled, EditTwoTone } from '@ant-design/icons';
import { Space, Table, Tag, Switch, Layout, Pagination, message } from 'antd';
import { getUsers, createUser, updateUser, deleteUser } from '../api'; // Import API functions
import GradientButton from '../components/AddNew';
import Sidebar from '../components/Sidebar';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import CreateUser from '../components/CreateUser';
import SearchButton from '../components/SearchButton';
import '../styles/AdminPanel.css';

const { Content } = Layout;

const Adminpanel = () => {
  // State variables to manage user data, modals, pagination, etc.
  const [dataState, setData] = useState([]); // Holds the full list of data
  const [filteredData, setFilteredData] = useState([]); // Holds filtered data for the table
  const [collapsed, setCollapsed] = useState(false); // Sidebar collapsed state
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [selectedPerson, setSelectedPerson] = useState(null); // Track the selected person for editing
  const [isModalOpen, setIsModalOpen] = useState(false); // Open/close modal for editing
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Open/close delete modal
  const [personToDelete, setPersonToDelete] = useState(null); // Track the user being deleted
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false); // Open/close create user modal

  const pageSize = 10; // Number of users per page

  // Toggles the sidebar's collapsed state
  const toggleSidebar = () => setCollapsed(!collapsed);

  // Updates the user data and filtered data
  const updateState = (newData) => {
    setData(newData); 
    setFilteredData(newData);
  };

  // Fetches the users from the API
  const fetchUsers = async () => {
    try {
      const users = await getUsers(); // Fetch users from the API
      updateState(users); // Update state with fetched data
    } catch (error) {
      message.error('Failed to load users');
    }
  };

  // Effect hook to fetch users when the component mounts
  useEffect(() => {
    fetchUsers(); // Initial data fetch
  }, []);

  // Handles the deletion of a user
  const handleDelete = async (key) => {
    try {
      await deleteUser(key); // Delete user via API
      const newData = dataState.filter((item) => item.key !== key); // Filter out the deleted user
      updateState(newData); // Update state after deletion
      setIsDeleteModalOpen(false); // Close the Delete Modal
      setPersonToDelete(null); // Reset the person to delete
      message.success('User deleted successfully');
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  // Opens the delete confirmation modal
  const handleDeleteClick = (record) => {
    setPersonToDelete(record); // Set the user to be deleted
    setIsDeleteModalOpen(true); // Open the Delete Modal
  };


  const handleCreateUser = async (newUserData) => {
    try {
      const newUser = await createUser(newUserData);
      setData([...dataState, newUser]); 
      setFilteredData([...filteredData, newUser]);
      setIsCreateUserModalOpen(false);
      message.success('User created successfully');
    } catch (error) {
      message.error('Failed to create user');
    }
  };
  
  const handleSave = async (updatedUser) => {
    try {
      const userUpdated = await updateUser(updatedUser); 
      const updatedData = dataState.map(user =>
        user.key === userUpdated.key ? userUpdated : user
      );
      
      setData(updatedData);
      setFilteredData(updatedData); 
      setIsModalOpen(false);
      message.success('User updated successfully');
    } catch (error) {
      message.error('Failed to update user');
    }
  };

  // Handles searching/filtering users based on query
  const handleSearch = (query) => {
    const filtered = dataState.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.email.toLowerCase().includes(query.toLowerCase()) ||
      item.username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered); // Update filtered data state
    if (currentPage !== 1) setCurrentPage(1); // Reset page only if not on page 1
  };

  // Table column definitions
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>, // Render name as a clickable link
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Active',
      key: 'activeSwitch',
      render: (_, record) => (
        <Switch
          checked={record.isActive} // Show active status
          onChange={(checked) => updateState(dataState.map(item => 
            item.key === record.key ? { ...item, isActive: checked } : item
          ))} // Update user status on switch change
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* Edit and Delete actions */}
          <EditTwoTone onClick={() => { 
            setSelectedPerson(record); 
            setIsModalOpen(true); 
          }} />
          <DeleteFilled style={{ color: 'red' }} onClick={() => handleDeleteClick(record)} />
        </Space>
      ),
    },
  ];

  // Handles page changes for pagination
  const handlePageChange = (page) => setCurrentPage(page);

  // Calculates the slice of data to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredData.slice(startIndex, startIndex + pageSize);

  return (
    <Layout>
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <Layout className="site-layout">
        <Content className="site-layout-content">
          <div className="container">
            <div className="header-section">
              <SearchButton onSearch={handleSearch} />
              <GradientButton onClick={() => setIsCreateUserModalOpen(true)} />
            </div>
            {/* Displaying the table of users */}
            <Table
              bordered
              columns={columns}
              dataSource={currentData} // Data to display in the table
              pagination={false} // Disable built-in pagination
              className="table-container"
              rowKey="key" // Unique key for each row
            />
            <div className="pagination-container">
              <Pagination
                current={currentPage}
                total={filteredData.length} // Total number of items to paginate
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          </div>
        </Content>
      </Layout>

      {/* Modals for editing, deleting, and creating users */}
      <DeleteModal
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onDelete={() => handleDelete(personToDelete.key)}
        personName={personToDelete ? personToDelete.name : ''}
      />

      <EditModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        personData={selectedPerson}
        onSave={handleSave}
        setIsModalOpen={setIsModalOpen}
        setSelectedPerson={setSelectedPerson}
      />

      <CreateUser
        open={isCreateUserModalOpen}
        onClose={() => setIsCreateUserModalOpen(false)}
        onCreate={handleCreateUser}
      />
    </Layout>
  );
};

export default Adminpanel;
