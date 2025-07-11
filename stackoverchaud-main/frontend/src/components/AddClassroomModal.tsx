import React, { useState } from 'react';
import { X, AlertTriangle, Settings } from 'lucide-react';
import { Modal } from '@mui/material';
import { ClassroomData } from '../types/classroom';

interface AddClassroomModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (classroom: Omit<ClassroomData, 'id'>) => void;
  classrooms: ClassroomData[];
}

export const AddClassroomModal: React.FC<AddClassroomModalProps> = ({
  open,
  onClose,
  onAdd,
  classrooms
}) => {
  const [newClassroom, setNewClassroom] = useState({
    name: '',
    letter: '',
    capacity: 30,
    positionX: 0,
    positionY: 0,
    positionZ: 0
  });
  const [positionError, setPositionError] = useState('');

  // Vérifier si une position est déjà occupée
  const isPositionOccupied = (x: number, y: number, z: number) => {
    return classrooms.some(classroom => {
      const [cx, cy, cz] = classroom.position;
      return Math.abs(cx - x) < 1 && Math.abs(cy - y) < 1 && Math.abs(cz - z) < 1;
    });
  };

  // Vérifier si une lettre est déjà utilisée
  const isLetterUsed = (letter: string) => {
    return classrooms.some(classroom => 
      classroom.letter.toLowerCase() === letter.toLowerCase()
    );
  };

  const validatePosition = (x: number, y: number, z: number) => {
    if (isPositionOccupied(x, y, z)) {
      setPositionError('Cette position est déjà occupée par une autre salle');
      return false;
    }
    setPositionError('');
    return true;
  };

  const handleAddClassroom = () => {
    if (!newClassroom.name || !newClassroom.letter) {
      return;
    }

    if (isLetterUsed(newClassroom.letter)) {
      setPositionError('Cette lettre est déjà utilisée par une autre salle');
      return;
    }

    if (!validatePosition(newClassroom.positionX, newClassroom.positionY, newClassroom.positionZ)) {
      return;
    }

    const classroom: Omit<ClassroomData, 'id'> = {
      name: newClassroom.name,
      letter: newClassroom.letter.toUpperCase(),
      capacity: newClassroom.capacity,
      isOccupied: false,
      position: [newClassroom.positionX, newClassroom.positionY, newClassroom.positionZ]
    };
    
    onAdd(classroom);
    handleClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'capacity' || name.startsWith('position') ? Number(value) : value;
    
    setNewClassroom(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (name.startsWith('position')) {
      const updatedClassroom = { ...newClassroom, [name]: newValue };
      validatePosition(updatedClassroom.positionX, updatedClassroom.positionY, updatedClassroom.positionZ);
    }

    if (name === 'letter' && value) {
      if (isLetterUsed(value)) {
        setPositionError('Cette lettre est déjà utilisée par une autre salle');
      } else {
        setPositionError('');
      }
    }
  };

  const getSuggestedPositions = () => {
    const suggestions = [
      { x: -6, y: 0, z: -3, label: 'Avant gauche' },
      { x: 0, y: 0, z: -3, label: 'Avant centre' },
      { x: 6, y: 0, z: -3, label: 'Avant droite' },
      { x: -6, y: 0, z: 3, label: 'Arrière gauche' },
      { x: 0, y: 0, z: 3, label: 'Arrière centre' },
      { x: 6, y: 0, z: 3, label: 'Arrière droite' },
      { x: -9, y: 0, z: 0, label: 'Côté gauche' },
      { x: 9, y: 0, z: 0, label: 'Côté droit' },
    ];

    const filtered = suggestions.filter(pos => !isPositionOccupied(pos.x, pos.y, pos.z));
    console.log('Suggestions:', suggestions.length, 'Filtered:', filtered.length, 'Classrooms:', classrooms.length);
    return filtered;
  };

  const applySuggestedPosition = (x: number, y: number, z: number) => {
    setNewClassroom(prev => ({
      ...prev,
      positionX: x,
      positionY: y,
      positionZ: z
    }));
    setPositionError('');
  };

  const handleClose = () => {
    setNewClassroom({
      name: '',
      letter: '',
      capacity: 30,
      positionX: 0,
      positionY: 0,
      positionZ: 0
    });
    setPositionError('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-classroom-modal"
      aria-describedby="add-classroom-form"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Ajouter une nouvelle classe</h2>
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Erreur globale */}
            {positionError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{positionError}</p>
              </div>
            )}

            {/* Nom de la classe */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Nom de la classe
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newClassroom.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="ex: Salle G"
                required
              />
            </div>

            {/* Lettre d'identification */}
            <div>
              <label htmlFor="letter" className="block text-sm font-medium text-slate-700 mb-2">
                Lettre d'identification
              </label>
              <input
                type="text"
                id="letter"
                name="letter"
                value={newClassroom.letter}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="ex: G"
                maxLength={1}
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                Lettres utilisées : {classrooms.map(c => c.letter).join(', ')}
              </p>
            </div>

            {/* Capacité */}
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-slate-700 mb-2">
                Capacité (nombre d'étudiants)
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={newClassroom.capacity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                min="1"
                max="100"
                required
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Position dans l'espace 3D (suivez la grille)
              </label>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <label htmlFor="positionX" className="block text-xs text-slate-600 mb-1">X (gauche/droite)</label>
                  <input
                    type="number"
                    id="positionX"
                    name="positionX"
                    value={newClassroom.positionX}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                    step="3"
                  />
                </div>
                <div>
                  <label htmlFor="positionY" className="block text-xs text-slate-600 mb-1">Y (hauteur)</label>
                  <input
                    type="number"
                    id="positionY"
                    name="positionY"
                    value={newClassroom.positionY}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                    step="1"
                  />
                </div>
                <div>
                  <label htmlFor="positionZ" className="block text-xs text-slate-600 mb-1">Z (avant/arrière)</label>
                  <input
                    type="number"
                    id="positionZ"
                    name="positionZ"
                    value={newClassroom.positionZ}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                    step="3"
                  />
                </div>
              </div>

              {/* Positions suggérées */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Settings className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-900">Positions libres suggérées</h3>
                    <div className="mt-1">
                      {getSuggestedPositions().length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {getSuggestedPositions().slice(0, 6).map((pos, index) => (
                            <button
                              key={index}
                              onClick={() => applySuggestedPosition(pos.x, pos.y, pos.z)}
                              className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded transition-colors"
                            >
                              {pos.label} ({pos.x}, {pos.y}, {pos.z})
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-blue-700">Toutes les positions suggérées sont occupées</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Aperçu */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-slate-700 mb-2">Aperçu</h4>
              <div className="text-sm text-slate-600 space-y-1">
                <p><span className="font-medium">Nom:</span> {newClassroom.name || 'Non défini'}</p>
                <p><span className="font-medium">Lettre:</span> {newClassroom.letter.toUpperCase() || 'Non définie'}</p>
                <p><span className="font-medium">Capacité:</span> {newClassroom.capacity} étudiants</p>
                <p><span className="font-medium">Position:</span> ({newClassroom.positionX}, {newClassroom.positionY}, {newClassroom.positionZ})</p>
                <p><span className="font-medium">État:</span> <span className="text-green-600">Disponible</span></p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex space-x-3 p-6 border-t border-slate-200">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleAddClassroom}
              disabled={
                !newClassroom.name || 
                !newClassroom.letter || 
                !!positionError ||
                isLetterUsed(newClassroom.letter) ||
                isPositionOccupied(newClassroom.positionX, newClassroom.positionY, newClassroom.positionZ)
              }
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ajouter la classe
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};