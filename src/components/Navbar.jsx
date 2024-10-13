import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX, FiTrash2 } from 'react-icons/fi';
import CartContext from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false); // Função para fechar o carrinho
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Monitora mudanças nos itens do carrinho
  useEffect(() => {
    if (cartItems.length > cartItemCount) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  // Função para calcular o total do carrinho
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">E-Shop</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-600 hover:text-blue-600 transition">Home</Link>
          <Link to="/products" className="text-gray-600 hover:text-blue-600 transition">Produtos</Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600 transition">Sobre Nós</Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition">Contato</Link>
        </div>

        {/* Barra de Busca */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-2 text-gray-500 hover:text-blue-500">
              <FiSearch size={20} />
            </button>
          </div>
          <motion.button
            onClick={toggleCart}
            className="relative"
            animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <FiShoppingCart size={24} className="text-gray-600 hover:text-blue-600 transition" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} {/* Quantidade total */}
              </span>
            )}
          </motion.button>
          <Link to="/login">
            <FiUser size={24} className="text-gray-600 hover:text-blue-600 transition" />
          </Link>
        </div>

        {/* Menu Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600 transition">
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar do Carrinho */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className="fixed right-0 top-0 w-80 h-full bg-white shadow-lg z-50 rounded-l-lg overflow-hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-2xl font-bold">Carrinho de Compras</h2>
              {/* Botão para fechar o carrinho */}
              <button onClick={closeCart} className="text-gray-500 hover:text-red-500 transition">
                <FiX size={24} />
              </button>
            </div>

            <div className="p-4 h-full overflow-auto">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-600">Seu carrinho está vazio.</p>
              ) : (
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-md">
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="ml-4 flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.quantity}x ${item.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 border-t bg-white shadow-inner">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full w-full mt-4 hover:bg-blue-600 transition">
                  Finalizar Compra
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
