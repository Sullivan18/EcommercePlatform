import React, { useContext } from 'react';
import CartContext from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="container mx-auto py-16 px-8">
      <h2 className="text-4xl font-bold text-center mb-12">Seu Carrinho</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Seu carrinho está vazio.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 shadow-lg rounded-lg flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-lg text-gray-700">{item.price}</p>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                onClick={() => removeFromCart(item.id)}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
