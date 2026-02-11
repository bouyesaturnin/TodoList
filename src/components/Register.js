import React, { useState } from 'react';
import api from '../api/axios';

const Register = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('register/', { username, password });
      setMessage("Compte créé ! Vous pouvez vous connecter.");
      setTimeout(onSwitchToLogin, 2000); // Redirige vers le login après 2s
    } catch (err) {
      setMessage(err.response?.data?.error || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">
        REJOINDRE LE <span className="text-indigo-600">HUB</span>
      </h2>
      
      {message && (
        <div className={`p-3 rounded-lg mb-4 text-center ${message.includes('succès') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-md">
          Créer mon compte
        </button>
      </form>

      <p className="mt-6 text-center text-gray-500 text-sm">
        Déjà un compte ? {" "}
        <button onClick={onSwitchToLogin} className="text-indigo-600 font-bold hover:underline">
          Se connecter
        </button>
      </p>
    </div>
  );
};

export default Register;