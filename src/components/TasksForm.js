import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Le titre est obligatoire");
      return;
    }

    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    
    if (image) {
      data.append('image', image); 
    }

    onAddTask(data);

    // --- REINITIALISATION ---
    setTitle("");
    setDescription("");
    setImage(null);
    // On réinitialise aussi l'input manuellement si besoin
    document.getElementById('image-input').value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Section Image */}
        <div className="w-full md:w-1/3">
          <label className="block text-gray-700 font-bold mb-2">Photo d'illustration</label>
          <div 
            className="border-2 border-dashed border-indigo-200 rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50 transition overflow-hidden"
            onClick={() => document.getElementById('image-input').click()}
          >
            {image ? (
              <img 
                src={URL.createObjectURL(image)} 
                alt="Preview" 
                className="h-full w-full object-cover" 
              />
            ) : (
              <div className="text-center">
                <span className="text-indigo-500 text-2xl font-bold">+</span>
                <p className="text-gray-400 text-xs mt-1">Cliquez pour choisir</p>
              </div>
            )}
          </div>
          {/* Un seul input file bien configuré */}
          <input 
            id="image-input" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => setImage(e.target.files[0])} 
          />
        </div>

        {/* Section Texte */}
        <div className="w-full md:w-2/3 space-y-4">
          <input 
            className="w-full text-2xl font-bold border-b-2 border-gray-100 focus:border-indigo-500 outline-none pb-2 bg-transparent"
            placeholder="Titre de la mission..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea 
            className="w-full p-3 bg-gray-50 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
            placeholder="Description..."
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 shadow-md transition-colors"
          >
            Enregistrer la tâche
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;