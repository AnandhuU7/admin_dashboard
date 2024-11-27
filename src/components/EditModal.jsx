import React, { useState, useEffect } from 'react';
import { Modal, Input, Form, Switch, Select, Checkbox, Button } from 'antd';

const EditModal = ({ open, onClose, personData, onSave }) => {
  const [form] = Form.useForm();
  const [role, setRole] = useState('');
  const [initialValues, setInitialValues] = useState({}); 
  const [isChanged, setIsChanged] = useState(false);

  const rolePermissions = {
    User: ['read', 'write'],
    Viewer: ['read'],
    Editor: ['read', 'edit'],
  };

  const allPermissions = ['read', 'write', 'edit'];

  useEffect(() => {
    if (personData) {
      // Save the initial values to compare later
      const initialValues = {
        ...personData,
        permissions: personData.permissions || [],
      };
      setInitialValues(initialValues);
      form.setFieldsValue(initialValues);
      setRole(personData.role);
      setIsChanged(false);
    }
  }, [personData, form]);

  useEffect(() => {
    if (role) {
      form.setFieldsValue({ permissions: rolePermissions[role] || [] });
    }
  }, [role, form]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave({ ...personData, ...values });
        setIsChanged(false);
      })
      .catch((info) => console.log('Form validation failed:', info));
  };

  const handleFormChange = (changedFields) => {
    const formValues = form.getFieldsValue();
    const isModified = Object.keys(formValues).some(
      (key) => formValues[key] !== initialValues[key]
    );
    setIsChanged(isModified);
  };

  return (
    <Modal
      title="Edit Person"
      open={open}
      onCancel={onClose}
      onOk={handleSave}
      okText="Save"
      cancelText="Cancel"
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave} disabled={!isChanged}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFieldsChange={handleFormChange}>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter the email' },
            { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, message: 'Please enter a valid email address' },
            { pattern: /@.*\.com$/, message: 'Email should contain @ and end with .com' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter the username' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please select the role' }]}>
          <Select placeholder="Select a role" onChange={setRole}>
            {['Editor', 'User', 'Viewer'].map((role) => (
              <Select.Option key={role} value={role}>
                {role}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="isActive" label="Active Status" valuePropName="checked">
          <Switch />
        </Form.Item>
        {role && (
          <Form.Item name="permissions" label="Permissions" rules={[{ required: true, message: 'Please select permissions' }]}>
            <Checkbox.Group>
              {allPermissions.map((permission) => (
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
        )}
      </Form>
    </Modal>
  );
};

export default EditModal;
