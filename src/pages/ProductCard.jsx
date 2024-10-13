// components/ProductCard.jsx
import React, { useContext } from "react";
import CartContext from "../context/CartContext";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <motion.div
      className="bg-white p-6 shadow-lg text-center rounded-lg transform hover:scale-105 transition-transform"
    >
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-lg font-bold text-blue-500">${product.price.toFixed(2)}</p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        onClick={() => addToCart(product)}
      >
        Adicionar ao Carrinho
      </button>
    </motion.div>
  );
};

export default ProductCard;
