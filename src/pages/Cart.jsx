import React, { useContext } from 'react';
import CartContext from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext); // Função para remover item

  return (
    <div className="fixed right-0 top-0 w-64 h-full bg-white shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Seu Carrinho</h2>

      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>{item.price.toFixed(2)}</p>
              </div>

              {/* Botão de remover item */}
              <button
                onClick={() => removeFromCart(item.id)} // Chama a função de remoção
                className="text-red-500 hover:text-red-700 transition"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
