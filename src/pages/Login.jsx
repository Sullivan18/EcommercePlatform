import React, { useState } from 'react';
import { auth } from '../firebase';  // Importe o auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Alternar entre login e registro

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Lógica de login
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login realizado com sucesso!");
      } catch (error) {
        alert("Erro no login: " + error.message);
      }
    } else {
      // Lógica de registro
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Conta criada com sucesso!");
      } catch (error) {
        alert("Erro ao criar conta: " + error.message);
      }
    }
  };

  return (
    <div className="container mx-auto py-16 px-8">
      <h2 className="text-4xl font-bold text-center mb-12">{isLogin ? "Login" : "Criar Conta"}</h2>
      <form className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full w-full hover:bg-blue-600 transition">
          {isLogin ? "Entrar" : "Registrar"}
        </button>
        <p
          className="text-center mt-4 text-blue-500 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Criar uma conta" : "Já tem uma conta? Entrar"}
        </p>
      </form>
    </div>
  );
};

export default Login;
