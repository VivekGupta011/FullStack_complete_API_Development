import React from 'react';
import { Modal } from 'antd';


const CustomModal = ({ open, hideModal, performAction, title }) => {
  return (
    <div>
       <Modal
        title="Confirmation"
        open={open}
        onOk={performAction}
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
      >
        <p>{title}</p>
      </Modal>
    </div>
  );
}

export default CustomModal;
