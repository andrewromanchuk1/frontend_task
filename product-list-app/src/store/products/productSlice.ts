import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, addProduct, deleteProduct } from "./thunk";
import { Product, ProductState } from "./types";

const initialState: ProductState = {
   products: [],
   status: 'idle',
   error: null,
 };

const productSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
     builder
       .addCase(fetchProducts.pending, (state) => {
         state.status = 'loading';
       })
       .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
         state.status = 'succeeded';
         state.products = action.payload;
       })
       .addCase(fetchProducts.rejected, (state, action) => {
         state.status = 'failed';
         state.error = action.error.message || null;
       })
       .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
         state.products.push(action.payload);
       })
       .addCase(deleteProduct.fulfilled, (state, action) => {
         state.products = state.products.filter(product => product.id !== action.payload);
       });
   },
 });  
 
 export default productSlice.reducer;