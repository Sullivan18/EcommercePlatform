import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import product1 from '../assets/gpu.jpeg'; // Certifique-se de que o caminho está correto
import { motion } from 'framer-motion'; // Animações

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    // Simulação de carregamento de produtos com delay
    setTimeout(() => {
      setProducts([
        { id: 1, name: "Produto 1", price: 100.00, imageUrl: product1 },
        { id: 2, name: "Produto 2", price: 150.00, imageUrl: product1 },
        { id: 3, name: "Produto 3", price: 200.00, imageUrl: product1 }
      ]);
      setLoading(false); // Remover o estado de carregamento
    }, 1500);

    document.title = "Produtos - E-Commerce";
    document.querySelector('meta[name="description"]').setAttribute("content", "Confira nossos produtos e ofertas exclusivas!");
  }, []);

  // Controlar o overflow do body para ocultar a barra de rolagem durante o carregamento
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'; // Ocultar barra de rolagem
    } else {
      document.body.style.overflow = 'auto'; // Restaurar barra de rolagem
    }

    // Limpar efeito quando o componente desmontar
    return () => {
      document.body.style.overflow = 'auto'; // Garantir que o overflow seja restaurado ao desmontar
    };
  }, [loading]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 via-blue-200 to-pink-100 p-8">
      <h1 className="text-6xl font-extrabold mb-10 mt-20 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">
        Nossos Produtos
      </h1>

      {loading ? (
        <div className="min-h-[80vh] flex items-center justify-center">
          {/* Placeholder de esqueleto enquanto carrega */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-gray-300 h-72 rounded-lg shadow-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white shadow-2xl rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl"
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-xl">Nenhum produto disponível no momento.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
