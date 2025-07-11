export interface ClassroomData {
  id: string;
  name: string;
  letter: string;
  isOccupied: boolean;
  capacity: number;
  position: [number, number, number];
}

export interface ClassroomStats {
  total: number;
  occupied: number;
  available: number;
  occupancyRate: number;
}