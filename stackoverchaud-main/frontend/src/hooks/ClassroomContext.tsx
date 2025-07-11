import { createContext, useState, ReactNode, useMemo } from 'react';
import { ClassroomData, ClassroomStats } from '../types/classroom';

const initialClassrooms: ClassroomData[] = [
  {
    id: '1',
    name: 'Salle A',
    letter: 'A',
    isOccupied: false,
    capacity: 30,
    position: [-6, 0, -3],
  },
  {
    id: '2',
    name: 'Salle B',
    letter: 'B',
    isOccupied: false,
    capacity: 25,
    position: [0, 0, -3],
  },
  {
    id: '3',
    name: 'Salle C',
    letter: 'C',
    isOccupied: true,
    capacity: 35,
    position: [6, 0, -3],
  },
  {
    id: '4',
    name: 'Salle D',
    letter: 'D',
    isOccupied: false,
    capacity: 40,
    position: [-6, 0, 3],
  },
  {
    id: '5',
    name: 'Salle E',
    letter: 'E',
    isOccupied: true,
    capacity: 20,
    position: [0, 0, 3],
  },
  {
    id: '6',
    name: 'Salle F',
    letter: 'F',
    isOccupied: false,
    capacity: 45,
    position: [6, 0, 3],
  },
];

interface ClassroomContextProps {
  classrooms: ClassroomData[];
  setClassrooms: (classrooms: ClassroomData[]) => void;
  selectedClassroom: ClassroomData | null;
  setSelectedClassroom: (c: ClassroomData | null) => void;
  toggleClassroom: (id: string) => void;
  stats: ClassroomStats;
  removeClassroom: (id: string) => void;
  addClassroom: (newClassroom: Omit<ClassroomData, 'id'>) => void;
  moveClassroom: (id: string, newPosition: [number, number, number]) => void;
}

export const ClassroomContext = createContext<ClassroomContextProps>({
  classrooms: [],
  setClassrooms: () => {},
  selectedClassroom: null,
  setSelectedClassroom: () => {},
  toggleClassroom: () => {},
  stats: {
    total: 0,
    occupied: 0,
    available: 0,
    occupancyRate: 0,
  },
  removeClassroom: () => {},
  addClassroom: () => {},
  moveClassroom: () => {},
});

export const ClassroomProvider = ({ children }: { children: ReactNode }) => {
  const [classrooms, setClassrooms] = useState<ClassroomData[]>(initialClassrooms);
  const [selectedClassroom, setSelectedClassroom] = useState<ClassroomData | null>(null);

  const toggleClassroom = (id: string) => {
    setClassrooms(prev =>
      prev.map(c =>
        c.id === id ? { ...c, isOccupied: !c.isOccupied } : c
      )
    );
  };

  const addClassroom = (newClassroom: Omit<ClassroomData, 'id'>) => {
    const id = (classrooms.length + 1).toString();
    const classroom: ClassroomData = {
      ...newClassroom,
      id,
    };
    setClassrooms(prev => [...prev, classroom]);
  };

  const stats: ClassroomStats = useMemo(() => {
    const total = classrooms.length;
    const occupied = classrooms.filter(c => c.isOccupied).length;
    const available = total - occupied;
    const occupancyRate = Math.round((occupied / total) * 100);
    return { total, occupied, available, occupancyRate };
  }, [classrooms]);

  const removeClassroom = (id: string) => {
    setClassrooms(prev => prev.filter(classroom => classroom.id !== id));
  };

  const moveClassroom = (id: string, newPosition: [number, number, number]) => {
    setClassrooms(prev =>
      prev.map(classroom =>
        classroom.id === id
          ? { ...classroom, position: newPosition }
          : classroom
      )
    );
  };

  return (
    <ClassroomContext.Provider
      value={{
        classrooms,
        setClassrooms,
        selectedClassroom,
        setSelectedClassroom,
        toggleClassroom,
        stats,
        removeClassroom,
        addClassroom,
        moveClassroom,
      }}
    >
      {children}
    </ClassroomContext.Provider>
  );
};
