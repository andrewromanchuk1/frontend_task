import { Button, Modal } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import style from './Modal.module.css';

type DeleteModalProps = {
  isOpen: boolean;
  toggleOpen: Dispatch<SetStateAction<boolean>>;
  handleDeleteProduct: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  toggleOpen,
  handleDeleteProduct,
}) => {
  return (
    <Modal open={isOpen} className={style.modal}>
      <div>
        <h3>Are you sure you want delete this product?</h3>
        <Button style={{ color: 'blue' }} onClick={() => handleDeleteProduct()}>
          Yes
        </Button>
        <Button onClick={() => toggleOpen(false)} style={{ color: 'red' }}>
          Cacel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
