import React from 'react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-16">
        <div className="container mx-auto px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Bem-vindo ao E-Commerce</h1>
          <p className="text-lg mb-8">Ofertas incríveis em produtos de alta qualidade.</p>
          <a href="/products" className="bg-white text-blue-500 px-6 py-3 rounded-full hover:bg-gray-100 transition">Compre Agora</a>
        </div>
      </section>
      
      {/* Categorias em Destaque */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Categorias</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 shadow-lg text-center rounded-lg">
              <h3 className="text-xl font-semibold">Eletrônicos</h3>
            </div>
            <div className="bg-white p-6 shadow-lg text-center rounded-lg">
              <h3 className="text-xl font-semibold">Moda</h3>
            </div>
            {/* Adicione mais categorias conforme necessário */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
