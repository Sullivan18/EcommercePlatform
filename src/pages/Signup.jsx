import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { setDoc, doc } from "firebase/firestore"; // Importa funções do Firestore
import { firestore } from "../firebase"; // Importa Firestore

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" }); // Removi o campo role
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Força a barra de rolagem a ser sempre visível, evitando o "flicker"
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";

    return () => {};
  }, [loading]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = userCredential.user;
  
      // Cria o documento no Firestore com o campo `role` como "user"
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        role: "user" // Define o `role` como "user" por padrão
      });
  
      setLoading(false);
  
      // Exibe o alerta de sucesso
      toast.success("Conta criada com sucesso!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
      setTimeout(() => navigate("/login"), 4000); // Navega após o alerta
    } catch (error) {
      setLoading(false);
      setError("Erro ao criar conta.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Criar Conta
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              placeholder="Insira seu email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Senha
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              placeholder="Crie sua senha"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition"
          >
            Criar Conta
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700">Já tem uma conta?</p>
          <Link
            to="/login"
            className="inline-block mt-2 bg-gray-100 text-blue-500 px-4 py-2 rounded-full hover:bg-gray-200 transition"
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
