import React, { useEffect, useState, useContext } from "react";
import { auth, firestore } from "../firebase"; // Mantenha o Firestore apenas para a verificação de role
import { doc, getDoc } from "firebase/firestore"; // Importa apenas o necessário para verificar o usuário
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartContext from "../context/CartContext"; // Importa o CartContext para o gerenciamento local de produtos

const AdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [updating, setUpdating] = useState(null);
  const { products, addProduct, updateProduct, removeProduct } = useContext(CartContext); // Usa o contexto para acessar produtos locais e funções
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async (user) => {
      try {
        const userDoc = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.role === "admin") {
            setIsAdmin(true);
          } else {
            toast.error("Acesso negado. Somente administradores podem acessar esta página.");
            navigate("/");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Erro ao verificar o papel do usuário:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        checkUserRole(user);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Função para adicionar um novo produto
  const handleAddProduct = () => {
    if (newProduct.name === "" || newProduct.price === "") {
      toast.error("Preencha todos os campos.");
      return;
    }
  
    // Certifica-se de que o preço é convertido para número
    const productToAdd = { ...newProduct, price: parseFloat(newProduct.price) };
    
    addProduct(productToAdd); // Adiciona o produto localmente
    setNewProduct({ name: "", price: "" });
    toast.success("Produto adicionado com sucesso!");
  };

  // Função para atualizar um produto existente
  const handleUpdateProduct = (id) => {
    if (updating.name === "" || updating.price === "") {
      toast.error("Preencha todos os campos.");
      return;
    }
    updateProduct({ id, ...updating }); // Atualiza produto localmente
    setUpdating(null);
    toast.success("Produto atualizado com sucesso!");
  };

  // Função para remover um produto
  const handleRemoveProduct = (id) => {
    removeProduct(id); // Remove produto localmente
    toast.success("Produto removido com sucesso!");
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAdmin) {
    return null; // Não renderiza nada se não for administrador
  }

  return (
    <div className="mt-24 mx-auto max-w-4xl text-center">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Adicionar Novo Produto</h2>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 mb-4"
        />
        <input
          type="number"
          placeholder="Preço"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border p-2 mb-4"
        />
        <button onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Adicionar Produto
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Lista de Produtos</h2>
        {products.length === 0 ? (
          <p className="text-gray-600">Nenhum produto encontrado.</p>
        ) : (
          <table className="table-auto w-full mb-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Preço</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">
                    {updating?.id === product.id ? (
                      <input
                        type="text"
                        value={updating.name}
                        onChange={(e) => setUpdating({ ...updating, name: e.target.value })}
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {updating?.id === product.id ? (
                      <input
                        type="number"
                        value={updating.price}
                        onChange={(e) => setUpdating({ ...updating, price: e.target.value })}
                      />
                    ) : (
                      `$${product.price}`
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {updating?.id === product.id ? (
                      <button onClick={() => handleUpdateProduct(product.id)} className="bg-green-500 text-white px-2 py-1 rounded-lg">
                        Salvar
                      </button>
                    ) : (
                      <>
                        <button onClick={() => setUpdating(product)} className="bg-yellow-500 text-white px-2 py-1 rounded-lg">
                          Editar
                        </button>
                        <button onClick={() => handleRemoveProduct(product.id)} className="bg-red-500 text-white px-2 py-1 rounded-lg ml-2">
                          Remover
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
