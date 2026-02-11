import React, { useState } from 'react';

const TasksCard = ({ task, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);

  const handleSave = () => {
    onUpdate(task.id, { title: editTitle, description: editDesc });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-5 border-2 border-indigo-500 space-y-3">
        <input 
          className="w-full font-bold border-b p-1 outline-none focus:border-indigo-500"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <textarea 
          className="w-full text-sm text-gray-600 border rounded p-2 outline-none focus:ring-1 focus:ring-indigo-500"
          rows="3"
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
        />
        <div className="flex gap-2">
          <button onClick={handleSave} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-bold">Enregistrer</button>
          <button onClick={() => setIsEditing(false)} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-sm">Annuler</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-all ${task.completed ? 'opacity-75' : ''}`}>
      <div className="h-48 bg-gray-200">
        {task.image ? (
          <img src={task.image} alt={task.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">Pas d'image</div>
        )}
      </div>
      
      <div className="p-5 flex-grow">
        <div className="flex items-start gap-3">
          <input type="checkbox" checked={task.completed} onChange={() => onToggle(task)} className="mt-1 h-5 w-5 cursor-pointer accent-indigo-600"/>
          <div className="flex-grow">
            <h3 className={`text-xl font-bold ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{task.description}</p>
          </div>
          <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-indigo-600">✏️</button>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
        <span className={`text-xs px-2 py-1 rounded ${task.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {task.completed ? 'Terminé' : 'En cours'}
        </span>
        <button onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold transition">Supprimer</button>
      </div>
    </div>
  );
};

export default TasksCard;