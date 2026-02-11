import React, { useEffect, useState, useCallback } from 'react';
import api from './api/axios';
import TasksCard from './components/TasksCard';
import TasksForm from './components/TasksForm';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [notification, setNotification] = useState(null);

  // 1. Memoisation du Logout pour éviter les boucles infinies
  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setTasks([]);
  }, []);

  // 2. Récupération des tâches (stable avec useCallback)
  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.get('tasks/');
      setTasks(response.data);
    } catch (err) { 
      console.error("Erreur de chargement", err); 
      if (err.response?.status === 401) handleLogout();
    }
  }, [handleLogout]);

  // 3. Effet de chargement initial
  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token, fetchTasks]);

  // 4. Fonctions CRUD
  const handleAddTask = async (formData) => {
    try {
      const response = await api.post('tasks/', formData);
      setTasks([response.data, ...tasks]);
    } catch (err) {
      console.log("Erreur détaillée :", err.response?.data);
    }
  };

  const handleDelete = async (id) => {
  try {
    await api.delete(`tasks/${id}/`);
    setTasks(tasks.filter(t => t.id !== id));
  } catch (err) { 
    showError("Impossible de supprimer la mission. Réessayez plus tard.");
  }
};

  const handleToggle = async (task) => {
    try {
      const response = await api.patch(`tasks/${task.id}/`, {
        completed: !task.completed 
      });
      setTasks(tasks.map(t => t.id === task.id ? response.data : t));
    } catch (err) { console.error(err); }
  };

  const handleUpdate = async (id, updatedFields) => {
    try {
      const response = await api.patch(`tasks/${id}/`, updatedFields);
      setTasks(tasks.map(t => t.id === id ? response.data : t));
    } catch (err) { console.error(err); }
  };

  // Fonction utilitaire pour afficher une erreur
const showError = (msg) => {
  setNotification({ message: msg, type: 'error' });
  setTimeout(() => setNotification(null), 4000); // Disparaît après 4s
};

  // 5. Logique de filtrage
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {notification && (
     <div className={`fixed bottom-5 right-5 p-4 rounded-lg shadow-2xl text-white z-50 ${notification.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
    {notification.message}
  </div>
)}
      {/* Header permanent */}
      <Header user={user} onLogout={handleLogout} />
      
      <main className="py-12 px-4 max-w-6xl mx-auto space-y-12">
        {!token ? (
          /* Écran d'authentification */
          <div className="flex justify-center items-center min-h-[60vh]">
            {isRegistering ? (
              <Register onSwitchToLogin={() => setIsRegistering(false)} />
            ) : (
              <Login 
                setToken={setToken} 
                onSwitchToRegister={() => setIsRegistering(true)} 
              />
            )}
          </div>
        ) : (
          /* Écran principal de l'application */
          <>
            <header className="space-y-8">
              <h1 className="text-4xl font-black text-gray-900 text-center tracking-tight">
                MY MISSIONS <span className="text-indigo-600">HUB</span>
              </h1>
              <TasksForm onAddTask={handleAddTask} />
            </header>
              
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Rechercher une mission..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
              </div>
            </div>

            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {searchTerm ? "Résultats de recherche" : "Missions actives"}
                </h2>
                <span className="text-gray-500 font-medium">
                  {filteredTasks.length} {filteredTasks.length > 1 ? 'tâches' : 'tâche'}
                </span>
              </div>
      
              {filteredTasks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTasks.map(task => (
                    <TasksCard 
                      key={task.id} 
                      task={task} 
                      onDelete={handleDelete} 
                      onToggle={handleToggle}
                      onUpdate={handleUpdate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-400">Aucune mission trouvée.</p>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;