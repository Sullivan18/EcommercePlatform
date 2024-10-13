import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import product from "../assets/gpu.jpeg";
import elec from "../assets/eletronic.jpeg";
import fasion from "../assets/fashion.jpeg";
import kitchen from "../assets/kitchen.jpeg";
import sports from "../assets/sports.jpeg";

// Criando um componente motion personalizado para o Link
const MotionLink = motion(
  React.forwardRef((props, ref) => <Link {...props} ref={ref} />)
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 via-blue-200 to-pink-100">
      {/* Hero Section */}
      <section className="relative text-center py-20">
        <div className="container mx-auto px-8 text-center relative z-10">
          <motion.h1
            className="text-6xl font-bold mb-4 mt-20 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Explore as Melhores Ofertas!
          </motion.h1>
          <motion.p
            className="text-2xl mb-8 text-gray-700"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Descontos incríveis em todos os nossos produtos por tempo limitado.
          </motion.p>

          {/* Animação aplicada diretamente ao MotionLink */}
          <MotionLink
            to="/products"
            className="inline-block bg-white text-blue-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition relative z-20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Compre Agora
          </MotionLink>
        </div>

        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
          style={{ backgroundImage: `url('/assets/hero-image.jpg')` }}
        ></div>
      </section>

      {/* Seção de Categorias em Destaque */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600 leading-relaxed">
            Categorias em Destaque
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <motion.div
              className="bg-white p-6 shadow-lg text-center rounded-lg transform hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold mb-4">Eletrônicos</h3>
              <img
                src={elec}
                alt="Eletrônicos"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <Link
                to="/products?category=electronics"
                className="text-blue-500 font-semibold hover:underline"
              >
                Ver Produtos
              </Link>
            </motion.div>
            <motion.div
              className="bg-white p-6 shadow-lg text-center rounded-lg transform hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold mb-4">Moda</h3>
              <img
                src={fasion}
                alt="Moda"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <Link
                to="/products?category=fashion"
                className="text-blue-500 font-semibold hover:underline"
              >
                Ver Produtos
              </Link>
            </motion.div>
            <motion.div
              className="bg-white p-6 shadow-lg text-center rounded-lg transform hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold mb-4">Casa e Cozinha</h3>
              <img
                src={kitchen}
                alt="Casa e Cozinha"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <Link
                to="/products?category=home"
                className="text-blue-500 font-semibold hover:underline"
              >
                Ver Produtos
              </Link>
            </motion.div>
            <motion.div
              className="bg-white p-6 shadow-lg text-center rounded-lg transform hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold mb-4">Esportes</h3>
              <img
                src={sports}
                alt="Esportes"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <Link
                to="/products?category=sports"
                className="text-blue-500 font-semibold hover:underline"
              >
                Ver Produtos
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seção de Produtos Populares */}
      <section className="py-16">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">
            Produtos Populares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Produto 1 */}
            <motion.div
              className="bg-white p-6 shadow-lg text-center rounded-lg transform hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={product}
                alt="Produto 1"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Smartphone XYZ</h3>
              <p className="text-lg font-bold text-blue-500">$499,99</p>
              <Link
                to="/products/1"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
              >
                Comprar
              </Link>
            </motion.div>
            {/* Produto 2 */}
            <motion.div
              className="bg-white p-6 shadow-lg text-center rounded-lg transform hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={product}
                alt="Produto 2"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Headphones ABC</h3>
              <p className="text-lg font-bold text-blue-500">$199,99</p>
              <Link
                to="/products/2"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
              >
                Comprar
              </Link>
            </motion.div>
            {/* Produto 3 */}
            <motion.div
              className="bg-white p-6 shadow-lg text-center rounded-lg transform hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={product}
                alt="Produto 3"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Laptop Gamer</h3>
              <p className="text-lg font-bold text-blue-500">$1.499,99</p>
              <Link
                to="/products/3"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
              >
                Comprar
              </Link>
            </motion.div>
            {/* Produto 4 */}
            <motion.div
              className="bg-white p-6 shadow-lg text-center rounded-lg transform hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={product}
                alt="Produto 4"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Smartwatch DEF</h3>
              <p className="text-lg font-bold text-blue-500">$299,99</p>
              <Link
                to="/products/4"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
              >
                Comprar
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Receba Ofertas Exclusivas</h2>
          <p className="text-lg mb-8">
            Inscreva-se em nossa newsletter e receba as melhores promoções
            direto no seu e-mail.
          </p>

          {/* Caixa de Inscrição */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full px-6 py-3 text-gray-700 rounded-l-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
              />
              <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-2 rounded-2xl font-semibold shadow-lg hover:opacity-90 transition-opacity duration-300 ease-in-out transform hover:scale-105">
                Inscrever-se
              </button>
            </div>
          </div>

          {/* Mensagem de agradecimento */}
          <p className="mt-4 text-sm text-gray-200">
            Não compartilhamos seu e-mail com ninguém. Cancele a inscrição a
            qualquer momento.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
