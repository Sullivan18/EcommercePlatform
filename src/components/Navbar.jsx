import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">E-Commerce</h1>
        <ul className="flex space-x-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Produtos</Link></li>
          <li><Link to="/cart">Carrinho</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
