import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../store/products/thunk';
import { RootState } from '../../store';
import AddModal from '../Modals/AddModal';
import { Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import DeleteModal from '../Modals/DeleteModal';

enum SortOption {
  Alphabetical = 'Alphabetical',
  Count = 'Count',
}

const ProductList: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>();
  const products = useSelector((state: RootState) => state.products.products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number>();
  const [sortOption, setSortOption] = useState<SortOption>(
    SortOption.Alphabetical
  );

  const handleSortChange = (event: SelectChangeEvent<SortOption>) => {
    setSortOption(event.target.value as SortOption);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === SortOption.Alphabetical) {
      return a.name.localeCompare(b.name) || a.count - b.count;
    } else if (sortOption === SortOption.Count) {
      return a.count - b.count || a.name.localeCompare(b.name);
    }
    return 0;
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const openDeleteModal = (id: number) => {
    setIsDeleteModalOpen(true);
    setSelectedProduct(id);
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) dispatch(deleteProduct(selectedProduct));
  };

  return (
    <div>
      <Button
        onClick={() => setIsModalOpen(true)}
        style={{ fontSize: '20px', width: '100%', margin: 'auto' }}
      >
        Add Product
      </Button>
      <Select
        value={sortOption}
        onChange={handleSortChange}
        style={{ margin: '20px', width: '200px' }}
      >
        <MenuItem value={SortOption.Alphabetical}>Sort by Alphabet</MenuItem>
        <MenuItem value={SortOption.Count}>Sort by Count</MenuItem>
      </Select>
      <div
        style={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}
      >
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: '#e4f7ab',
              margin: '20px',
              borderRadius: '14px',
            }}
          >
            <img src={product.imageUrl} style={{ width: '100px' }} />
            <h3>Name: {product.name}</h3>
            <p>Count: {product.count}</p>
            <div style={{ border: 'solid 1px #000' }}>
              Size:
              <p>height: {product.size.height}</p>
              <p>width: {product.size.width}</p>
              <p>Weight: {product.weight}</p>
            </div>
            <div>
              <Button
                onClick={() => openDeleteModal(product.id)}
                style={{ color: 'red' }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
        <AddModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          toggleOpen={setIsDeleteModalOpen}
          handleDeleteProduct={handleDeleteProduct}
        />
      </div>
    </div>
  );
};

export default ProductList;
