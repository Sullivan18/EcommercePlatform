import React from 'react';
import ProductCard from './ProductCard';

const Products = () => {
  const productList = [
    { id: 1, name: 'Produto 1', price: 'R$ 199,99', image: '/images/product1.jpg' },
    { id: 2, name: 'Produto 2', price: 'R$ 299,99', image: '/images/product2.jpg' },
    // Adicione mais produtos conforme necessário
  ];

  return (
    <div className="container mx-auto py-16 px-8">
      <h2 className="text-4xl font-bold text-center mb-12">Produtos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productList.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
