import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from './types';

export const fetchProducts: AsyncThunk<Product[], void, object> =
  createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('http://localhost:5001/products');
    return response.data;
  });

export const addProduct: AsyncThunk<Product, Product, object> =
  createAsyncThunk('products/addProduct', async (product: Product) => {
    const response = await axios.post(
      'http://localhost:5001/products',
      product
    );
    return response.data;
  });

export const deleteProduct: AsyncThunk<number, number, object> =
  createAsyncThunk('products/deleteProduct', async (productId: number) => {
    const response = await axios.delete(
      `http://localhost:5001/products/${productId}`
    );
    console.log(response.data);
    return productId;
  });
