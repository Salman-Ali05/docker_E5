import React, { useContext } from 'react';
import { Building2, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { ClassroomData, ClassroomStats } from '../types/classroom';
import { ClassroomContext } from '../hooks/ClassroomContext';

interface DashboardProps {
  classrooms: ClassroomData[];
  stats: ClassroomStats;
}

export const Dashboard: React.FC<DashboardProps> = ({ classrooms, stats }) => {

  const { selectedClassroom } = useContext(ClassroomContext);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <div className="flex items-center space-x-3">
            <Building2 className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-slate-600">Total Salles</p>
              <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm font-medium text-slate-600">Disponibles</p>
              <p className="text-2xl font-bold text-green-600">{stats.available}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-sm font-medium text-slate-600">Occupées</p>
              <p className="text-2xl font-bold text-red-600">{stats.occupied}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-slate-600">Taux d'occupation</p>
              <p className="text-2xl font-bold text-purple-600">{stats.occupancyRate}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">État des Salles de Classe</h3>
        </div>
        <div className="divide-y divide-slate-200">
          {classrooms.map((classroom) => {
            const isSelected = selectedClassroom && selectedClassroom.id === classroom.id;

            return (
              <div
                key={classroom.id}
                className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      isSelected ? 'bg-blue-500' : classroom.isOccupied ? 'bg-red-500' : 'bg-green-500'
                    }`}
                  />
                  <div>
                    <h4 className="font-medium text-slate-900">{classroom.name}</h4>
                    <p className="text-sm text-slate-600">
                      Capacité : {classroom.capacity} étudiants
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      isSelected
                        ? 'bg-blue-100 text-blue-800'
                        : classroom.isOccupied
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {isSelected ? 'Sélectionner' : classroom.isOccupied ? 'Occupée' : 'Disponible'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};