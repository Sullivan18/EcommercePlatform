import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation, 
  Navigate
} from "react-router-dom"; // Alterado para HashRouter
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminPanel from "./components/AdminPanel"; // Importa o componente AdminPanel
import { CartProvider } from "./context/CartContext";
import LoadingSpinner from "./components/LoadingSpinner"; // Carregador de animação

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
      document.body.classList.add("overflow-hidden"); // Ocultar rolagem
    } else {
      document.body.classList.remove("overflow-hidden"); // Restaurar rolagem
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
                key={location.key} // Use location.key para forçar o React a atualizar
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <Routes location={location} key={location.key}>
                  <Route path="/EcommercePlatform" element={<Home />} />
                  <Route
                    path="/"
                    element={<Navigate to="/EcommercePlatform" />}
                  />{" "}
                  {/* Redireciona da raiz para a Home */}
                  <Route path="/products" element={<Products />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/EcommercePlatform/admin" element={<AdminPanel />} /> {/* Somente administradores podem acessar */}

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
