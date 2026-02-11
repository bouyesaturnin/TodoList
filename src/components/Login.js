import React, { useState } from 'react';
// CORRECTION : Import de l'instance api pour résoudre 'api' is not defined
import api from '../api/axios'; 

const Login = ({ setToken, onSwitchToRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // État pour l'erreur
  const [loading, setLoading] = useState(false); // État pour le chargement

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // On réinitialise l'erreur à chaque tentative
    setLoading(true);

    try {
      const response = await api.post('login/', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setToken(token);
    } catch (err) {
      // Django renvoie souvent des détails dans err.response.data
      if (err.response?.status === 400) {
        setError("Identifiants incorrects. Veuillez réessayer.");
      } else {
        setError("Erreur de connexion au serveur.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-black text-gray-900 mb-6 text-center tracking-tight">CONNEXION</h2>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded shadow-sm animate-pulse">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
          type="text" 
          placeholder="Nom d'utilisateur" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          required
        />
        <input 
          className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
          type="password" 
          placeholder="Mot de passe" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required
        />
        <button 
          disabled={loading}
          className={`w-full font-bold py-3 rounded-xl transition shadow-md ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
        >
          {loading ? "Chargement..." : "Se connecter"}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-500 text-sm">
        Pas encore de compte ?{" "}
        <button 
          type="button"
          onClick={onSwitchToRegister} 
          className="text-indigo-600 font-bold hover:underline"
        >
          S'inscrire
        </button>
      </p>
    </div>
  );
};

// CORRECTION : Ajout de l'export default pour que App.js puisse l'importer
export default Login;