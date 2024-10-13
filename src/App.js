import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import { CartProvider } from './context/CartContext';
import LoadingSpinner from './components/LoadingSpinner'; // Carregador de animação

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulação de tempo de carregamento

    return () => clearTimeout(timeoutId);
  }, [location]);

  // Controlando a visibilidade da barra de rolagem
  useEffect(() => {
    if (loading) {
      document.body.classList.add('overflow-hidden'); // Ocultar rolagem
    } else {
      document.body.classList.remove('overflow-hidden'); // Restaurar rolagem
    }
  }, [loading]);

  const pageTransition = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.5 },
  };

  return (
    <CartProvider>
      <div className="min-h-screen">
        {loading && <LoadingSpinner />}
        {!loading && (
          <>
            <Navbar />
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </CartProvider>
  );
};

export default App;
