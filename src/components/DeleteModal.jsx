import React from 'react';
import { Modal } from 'antd';
import '../styles/DeleteModal.css';

const DeleteModal = ({ open, onCancel, onDelete, personName }) => (
  <Modal
    title="Delete Confirmation"
    open={open}
    onCancel={onCancel}
    onOk={onDelete}
    okText="Delete"
    cancelText="Cancel"
    okButtonProps={{ className: 'delete-modal-ok-button' }}
  >
    <p>Are you sure you want to delete {personName}?</p>
  </Modal>
);

export default DeleteModal;
