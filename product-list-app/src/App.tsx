import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductList from '../src/components/ProductList/ProductList';

const App: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<ProductList/>} />
    </Routes>
  );
};

export default App;