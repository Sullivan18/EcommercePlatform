import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom'; // Importando Link e useNavigate
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Para redirecionar após o login

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Autenticação com Firebase usando email e senha
      await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      setLoading(false);
      navigate('/'); // Redireciona para a Home após o login bem-sucedido
    } catch (error) {
      setLoading(false);
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input 
                type="email" 
                value={credentials.email} 
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                placeholder="Insira seu email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Senha</label>
              <input 
                type="password" 
                value={credentials.password} 
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Insira sua senha"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Entrar
            </button>
          </form>

          {/* Botão de Criar Conta */}
          <div className="mt-6 text-center">
            <p className="text-gray-700">Não tem uma conta?</p>
            <Link 
              to="/signup"
              className="inline-block mt-2 bg-gray-100 text-blue-500 px-4 py-2 rounded-full hover:bg-gray-200 transition"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
