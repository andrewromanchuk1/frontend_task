import React, { useState } from 'react';
import { Modal, Button } from '@mui/material';
import style from './Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { RootState } from '../../store';
import { addProduct } from '../../store/products/thunk';

interface AddModalProps {
  isOpen: boolean;
  setIsModalOpen: (e: boolean) => void;
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, setIsModalOpen }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<string>('');

  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>();

  const products = useSelector((state: RootState) => state.products.products);

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(products);
    dispatch(
      addProduct({
        id: products.length + 1,
        imageUrl,
        name,
        count,
        size: {
          width,
          height,
        },
        weight,
      })
    );
    setIsModalOpen(false);
  };

  return (
    <Modal open={isOpen} className={style.modal}>
      <div className={style.text}>
        <h3>Adding new product</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="count">Count:</label>
            <input
              type="text"
              id="count"
              name="count"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="width">Size - Width:</label>
            <input
              type="text"
              id="width"
              name="width"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="height">Size - Height:</label>
            <input
              type="text"
              id="height"
              name="height"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight:</label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>
          <Button style={{ color: 'blue' }} type="submit">
            Create Product
          </Button>
        </form>
        <Button onClick={() => setIsModalOpen(false)} style={{ color: 'red' }}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default AddModal;
