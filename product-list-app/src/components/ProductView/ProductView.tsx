import React from 'react';
import { Product } from '../../store/products/types';
import { Link } from 'react-router-dom';

type ProductViewProps = {
  products?: Product[];
};

const ProductView: React.FC<ProductViewProps> = () => {
  return (
    <div>
      <Link to="/">Product list</Link>
    </div>
  );
};

export default ProductView;
