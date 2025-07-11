import { useContext, useEffect, useState } from 'react';
import { BarChart3, Eye, Settings, LogOut, Minimize, Maximize, Plus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { ClassroomContext } from '../hooks/ClassroomContext';
import { Dashboard } from '../components/Dashboard';
import { Scene3D } from '../components/Scene3D';
import { AddClassroomModal } from '../components/AddClassroomModal';
import Logo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { ClassroomData } from '../types/classroom';
import { useToast, ToastProvider } from '../hooks/useToast';

export function AppContentPage() {
  const {
    toggleClassroom,
    stats,
    classrooms,
    selectedClassroom,
    setSelectedClassroom,
    removeClassroom,
    addClassroom,
    moveClassroom,
  } = useContext(ClassroomContext);

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleFullscreen = async () => {
    const sceneContainer = document.getElementById('scene-container');
    
    if (!isFullscreen && sceneContainer) {
      try {
        await sceneContainer.requestFullscreen();
      } catch (error) {
        console.error('Erreur lors du passage en plein écran:', error);
      }
    } else if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (error) {
        console.error('Erreur lors de la sortie du plein écran:', error);
      }
    }
  };

  const [activeTab, setActiveTab] = useState<'3d' | 'dashboard'>('3d');
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { showError } = useToast();

  function handleLogout() {
    navigate('/');
    logout();
  }

  const handleAddClassroom = (classroom: Omit<ClassroomData, 'id'>) => {
    const [x, , z] = classroom.position;
    
    // Vérifier si la position est dans les limites de la scène
    if (x < -12.5 || x > 12.5 || z < -7.5 || z > 7.5) {
      showError('La position de la salle doit être dans les limites de la scène (X: -12.5 à 12.5, Z: -7.5 à 7.5)');
      return;
    }
    
    const newClassroom: ClassroomData = {
      ...classroom,
      id: (classrooms.length + 1).toString(),
    };
    addClassroom(newClassroom);
    setShowAddModal(false);
  };

  const handleDeleteClassroom = () => {
    if (selectedClassroom) {
      removeClassroom(selectedClassroom.id);
      setSelectedClassroom(null);
    }
  };

   const canMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (!selectedClassroom) return false;

    const classroom = classrooms.find(c => c.id === selectedClassroom?.id);
    if (!classroom) return false;

    const [x, y, z] = classroom.position;
    let newX = x, newY = y, newZ = z;

    switch (direction) {
      case 'up':
        newZ -= 3;
        break;
      case 'down':
        newZ += 3;
        break;
      case 'left':
        newX -= 3;
        break;
      case 'right':
        newX += 3;
        break;
    }

    if (newX < -12.5 || newX > 12.5 || newZ < -7.5 || newZ > 7.5) {
      return false;
    } else {
      return true;
    }
  };

  const moveSelectedClassroom = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (!selectedClassroom) return;

    const classroom = classrooms.find(c => c.id === selectedClassroom?.id);
    if (!classroom) return;

    const [x, y, z] = classroom.position;
    let newX = x, newY = y, newZ = z;

    switch (direction) {
      case 'up':
        newZ -= 3;
        break;
      case 'down':
        newZ += 3;
        break;
      case 'left':
        newX -= 3;
        break;
      case 'right':
        newX += 3;
        break;
    }

    // Vérifier si la nouvelle position est dans les limites et libre
    if (newX < -12.5 || newX > 12.5 || newZ < -7.5 || newZ > 7.5) {
      return;
    } else {
      moveClassroom(classroom.id, [newX, y, newZ]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <img src={Logo} alt='logo' className='w-20' />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('3d')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === '3d'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Vue 3D</span>
                </button>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
              </div>
              <button
                onClick={handleLogout}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-red-900 transition-colors background-transparent hover:bg-red-50`}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === '3d' ? (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Bienvenue, {user?.name} !
                  </h3>
                  <p className="text-slate-600 mt-1">
                    Cliquez sur les salles pour les sélectionner, double-cliquez pour changer leur état.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Settings className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-900">Instructions</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      • Clic simple : Sélectionner une salle • Double-clic : Changer l'état (libre/occupé) • Utilisez les flèches pour déplacer la salle sélectionnée • La grille facilite le positionnement
                    </p>
                  </div>
                </div>
              </div>

            {selectedClassroom && (
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">
                  Salle sélectionnée : {selectedClassroom.name}
                </h2>
                <p className="text-sm text-slate-600">
                  Capacité : {selectedClassroom.capacity} personnes
                </p>
               <div className="mt-2 flex items-center space-x-2">
                <span className="text-sm text-slate-600">
                  Etat : 
                </span>
                 <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedClassroom.isOccupied
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {selectedClassroom.isOccupied ? 'Occupée' : 'Disponible'}
                </span>
               </div>
                <button
                  onClick={() => {
                    toggleClassroom(selectedClassroom.id);
                    setSelectedClassroom(null);
                  }}
                  disabled={selectedClassroom.isOccupied}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  style={{
                    cursor: selectedClassroom.isOccupied ? 'not-allowed' : 'pointer',
                    opacity: selectedClassroom.isOccupied ? 0.6 : 1
                  }}
                >
                  Reserver la salle
                </button>
              </div>
            )}

            <div className="relative">
              <div 
                id="scene-container"
                className={`relative ${
                  isFullscreen 
                    ? 'fixed inset-0 z-50 bg-gradient-to-br from-slate-900 to-slate-800 h-screen w-screen' 
                    : 'w-full h-[500px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden shadow-2xl'
                }`}
              >
                  <Scene3D 
                    classrooms={classrooms}
                    onToggleClassroom={toggleClassroom}
                  />

                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={handleFullscreen}
                      className="bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                      title={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
                    >
                      {isFullscreen ? (
                        <Minimize className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      ) : (
                        <Maximize className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      )}
                    </button>
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                      title="Ajouter une classe"
                    >
                      <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                  {selectedClassroom && (
                    <div className="absolute bottom-4 right-4">
                      <button
                        onClick={handleDeleteClassroom}
                        className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                        title={`Supprimer la salle ${selectedClassroom?.letter}`}
                      >
                        <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  )}
                  {selectedClassroom && (
                    <div className='absolute bottom-4 left-4 flex items-center space-x-4'>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => moveSelectedClassroom('left')}
                          disabled={!canMove('left')}
                          className="bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Vers la gauche (X-)"
                        >
                          <ArrowLeft className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                        
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg shadow-lg flex items-center justify-center min-w-[32px] min-h-[32px]">
                          <span className="text-sm font-bold">{selectedClassroom?.letter}</span>
                        </div>
                        
                        <button
                          onClick={() => moveSelectedClassroom('right')}
                          disabled={!canMove('right')}
                          className="bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Vers la droite (X+)"
                        >
                          <ArrowRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                  <p className="text-sm text-slate-600">Total</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{stats.available}</p>
                  <p className="text-sm text-slate-600">Disponibles</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{stats.occupied}</p>
                  <p className="text-sm text-slate-600">Occupées</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{stats.occupancyRate}%</p>
                  <p className="text-sm text-slate-600">Occupation</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Dashboard classrooms={classrooms} stats={stats} />
        )}
      </main>

      <AddClassroomModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddClassroom}
        classrooms={classrooms}
      />
      
      <ToastProvider />
    </div>
  );
}
