import React, { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]); // Estado para produtos local

  // Função para carregar produtos (no caso local, pode ser inicializado com alguns produtos)
  const loadProducts = () => {
    setProducts([
      { id: 1, name: 'Produto A', price: 10 },
      { id: 2, name: 'Produto B', price: 20 },
      // Adicione mais produtos se quiser
    ]);
  };

  // Função para adicionar um novo produto
  const addProduct = (product) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { id: prevProducts.length + 1, ...product },
    ]);
  };

  // Função para atualizar um produto existente
  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  // Função para remover um produto
  const removeProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  // Funções de gerenciamento de carrinho
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemInCart = prevItems.find((cartItem) => cartItem.id === item.id);
      if (itemInCart) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((cartItem) =>
          cartItem.id === itemId && cartItem.quantity > 1
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        products, // Produtos locais
        loadProducts, // Carregar produtos
        addProduct, // Adicionar produto
        updateProduct, // Atualizar produto
        removeProduct, // Remover produto
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
