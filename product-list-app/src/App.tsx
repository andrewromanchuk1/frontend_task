import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductList from '../src/components/ProductList/ProductList';
import ProductView from './components/ProductView/ProductView';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/view" element={<ProductView />} />
    </Routes>
  );
};

export default App;
