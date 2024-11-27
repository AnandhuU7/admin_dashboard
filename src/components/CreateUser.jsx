import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Switch, Checkbox } from 'antd';

const CreateUser = ({ open, onClose, onCreate }) => {
  const [form] = Form.useForm();
  const [role, setRole] = useState('');
  const [isFormDirty, setIsFormDirty] = useState(false);

  // Role-based permissions
  const rolePermissions = {
    User: ['read', 'write'],
    Viewer: ['read'],
    Editor: ['read', 'edit'],
  };

  // Update permissions when role changes
  useEffect(() => {
    form.setFieldsValue({ permissions: rolePermissions[role] || [] });
  }, [role, form, rolePermissions]);

  // Handle form submission
  const handleCreate = () => {
    form.validateFields()
      .then((values) => {
        try {
          onCreate(values);
          form.resetFields();
          onClose();
        } catch (error) {
          console.error("Error while creating user:", error.message || error); 
        }
      })
      .catch((errorInfo) => {
        console.error("Form validation error:", errorInfo);
      });
  };

  // Detect form changes to enable/disable the save button
  const handleFormChange = () => {
    const formValues = form.getFieldsValue();
    const isDirty = Object.values(formValues).some((value) => value !== undefined && value !== '');
    setIsFormDirty(isDirty);
  };

  return (
    <Modal
      title="Create New User"
      open={open}
      onCancel={onClose}
      onOk={handleCreate}
      okText="Create"
      cancelText="Cancel"
      okButtonProps={{ disabled: !isFormDirty }}
    >
      <Form form={form} layout="vertical" onValuesChange={handleFormChange}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter the email' },
            { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, message: 'Please enter a valid email address' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please enter the username' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select the role' }]}
        >
          <Select placeholder="Select a role" onChange={setRole}>
            {['Editor', 'User', 'Viewer'].map((role) => (
              <Select.Option key={role} value={role}>{role}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="isActive" label="Active Status" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item
          name="permissions"
          label="Permissions"
          rules={[{ required: true, message: 'Please select permissions' }]}
        >
          <Checkbox.Group>
            {['read', 'write', 'edit'].map((permission) => (
              <Checkbox
                key={permission}
                value={permission}
                disabled={!rolePermissions[role]?.includes(permission)}
              >
                {permission}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUser;
