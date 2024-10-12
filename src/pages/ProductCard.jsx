import React, { useContext } from 'react';
import CartContext from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg text-center">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4 rounded-md" />
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="text-lg text-gray-700">{product.price}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 hover:bg-blue-600 transition"
        onClick={() => addToCart(product)}
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ProductCard;
