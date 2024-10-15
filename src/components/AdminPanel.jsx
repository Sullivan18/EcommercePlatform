import React, { useEffect, useState } from "react";
import { auth, firestore } from "../firebase"; // Certifique-se de que esses imports estão corretos
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Função para verificar o papel do usuário no Firestore
    const checkUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = doc(firestore, 'users', user.uid);
          const docSnap = await getDoc(userDoc);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.role === "admin") {
              setIsAdmin(true);
            } else {
              toast.error("Acesso negado. Somente administradores podem acessar esta página.");
              navigate("/"); // Redireciona para a página inicial
            }
          } else {
            console.error("Documento do usuário não encontrado.");
            navigate("/login");
          }
        } catch (error) {
          console.error("Erro ao verificar o papel do usuário:", error);
          navigate("/login");
        } finally {
          setLoading(false);
        }
      } else {
        navigate("/login");
      }
    };

    checkUserRole();
  }, [navigate]);

  if (loading) {
    return <div>Carregando...</div>; // Tela de carregamento enquanto verifica o papel
  }

  if (!isAdmin) {
    return null; // Não renderiza nada se não for administrador
  }

  return (
    <div className="mt-24 text-center">
      <h1>Admin Panel</h1>
      <p>Bem-vindo ao painel do administrador.</p>
      {/* Aqui você pode adicionar os formulários para adicionar produtos, alterar preços, etc */}
      <button onClick={() => alert("Função de adicionar produtos")}>
        Adicionar Produto
      </button>
      <button onClick={() => alert("Função de alterar preços")}>
        Alterar Preços
      </button>
      {/* Outros botões e funcionalidades de administrador */}
    </div>
  );
};

export default AdminPanel;
