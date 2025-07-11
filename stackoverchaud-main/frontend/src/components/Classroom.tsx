import React, { useContext, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Group } from 'three';
import { ClassroomData } from '../types/classroom';
import { ClassroomContext } from '../hooks/ClassroomContext';

interface ClassroomProps {
  classroom: ClassroomData;
}

export const Classroom: React.FC<ClassroomProps> = ({ classroom }) => {
  const groupRef = useRef<Group>(null);
  const letterRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  const { setSelectedClassroom, selectedClassroom } = useContext(ClassroomContext);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.scale.setScalar(hovered ? 1.02 : 1);
    }
    
    if (letterRef.current) {
      letterRef.current.position.y = 2.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const handleClick = () => {
    if (selectedClassroom?.id === classroom.id) {
      setSelectedClassroom(null);
    } else {
      setSelectedClassroom(classroom);
    }
  };

  const isClassroomSelected = selectedClassroom?.id === classroom.id && !selectedClassroom.isOccupied;

  const floorColor = isClassroomSelected ? '#DBEAFE' : classroom.isOccupied ? '#FEE2E2' : '#DCFCE7';
  const chairColor = isClassroomSelected ? '#2563EB' : classroom.isOccupied ? '#DC2626' : '#16A34A';
  const tableColor = '#8B5CF6';

  return (
    <group 
      ref={groupRef}
      position={classroom.position}
      onClick={() => {
        handleClick();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[4, 0.1, 3]} />
        <meshStandardMaterial 
          color={floorColor}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      <group>
        <mesh position={[0, 1, -1.5]} castShadow>
          <boxGeometry args={[4, 2, 0.1]} />
          <meshStandardMaterial 
            color="#F1F5F9" 
            transparent 
            opacity={0.3}
            roughness={0.9}
          />
        </mesh>
        
        <mesh position={[-2, 1, 0]}>
          <boxGeometry args={[0.1, 2, 3]} />
          <meshStandardMaterial 
            color="#F1F5F9" 
            transparent 
            opacity={0.2}
            roughness={0.9}
          />
        </mesh>
        <mesh position={[2, 1, 0]}>
          <boxGeometry args={[0.1, 2, 3]} />
          <meshStandardMaterial 
            color="#F1F5F9" 
            transparent 
            opacity={0.2}
            roughness={0.9}
          />
        </mesh>
      </group>

      <group position={[0, 0, -0.5]}>
        <mesh position={[-1, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.05, 0.6]} />
          <meshStandardMaterial color={tableColor} roughness={0.3} metalness={0.1} />
        </mesh>
        {[[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]].map((pos, i) => (
          <mesh key={`table1-leg-${i}`} position={[-1 + pos[0] * 0.8, 0.2, pos[1] * 0.4]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.4]} />
            <meshStandardMaterial color="#64748B" />
          </mesh>
        ))}
        
        <mesh position={[-1, 0.2, 0.5]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.05, 0.3]} />
          <meshStandardMaterial color={chairColor} roughness={0.6} />
        </mesh>
        <mesh position={[-1, 0.45, 0.65]} castShadow>
          <boxGeometry args={[0.3, 0.4, 0.05]} />
          <meshStandardMaterial color={chairColor} roughness={0.6} />
        </mesh>

        <mesh position={[1, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.05, 0.6]} />
          <meshStandardMaterial color={tableColor} roughness={0.3} metalness={0.1} />
        </mesh>
        {[[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]].map((pos, i) => (
          <mesh key={`table2-leg-${i}`} position={[1 + pos[0] * 0.8, 0.2, pos[1] * 0.4]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.4]} />
            <meshStandardMaterial color="#64748B" />
          </mesh>
        ))}
        
        <mesh position={[1, 0.2, 0.5]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.05, 0.3]} />
          <meshStandardMaterial color={chairColor} roughness={0.6} />
        </mesh>
        <mesh position={[1, 0.45, 0.65]} castShadow>
          <boxGeometry args={[0.3, 0.4, 0.05]} />
          <meshStandardMaterial color={chairColor} roughness={0.6} />
        </mesh>
      </group>

      <group position={[0, 0, 0.8]}>
        <mesh position={[-1, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.05, 0.6]} />
          <meshStandardMaterial color={tableColor} roughness={0.3} metalness={0.1} />
        </mesh>
        {[[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]].map((pos, i) => (
          <mesh key={`table3-leg-${i}`} position={[-1 + pos[0] * 0.8, 0.2, pos[1] * 0.4]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.4]} />
            <meshStandardMaterial color="#64748B" />
          </mesh>
        ))}
        
        <mesh position={[-1, 0.2, -0.5]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.05, 0.3]} />
          <meshStandardMaterial color={chairColor} roughness={0.6} />
        </mesh>
        <mesh position={[-1, 0.45, -0.65]} castShadow>
          <boxGeometry args={[0.3, 0.4, 0.05]} />
          <meshStandardMaterial color={chairColor} roughness={0.6} />
        </mesh>

        <mesh position={[1, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.05, 0.6]} />
          <meshStandardMaterial color={tableColor} roughness={0.3} metalness={0.1} />
        </mesh>
        {[[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]].map((pos, i) => (
          <mesh key={`table4-leg-${i}`} position={[1 + pos[0] * 0.8, 0.2, pos[1] * 0.4]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.4]} />
            <meshStandardMaterial color="#64748B" />
          </mesh>
        ))}
        
        <mesh position={[1, 0.2, -0.5]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.05, 0.3]} />
          <meshStandardMaterial color={chairColor} roughness={0.6} />
        </mesh>
        <mesh position={[1, 0.45, -0.65]} castShadow>
          <boxGeometry args={[0.3, 0.4, 0.05]} />
          <meshStandardMaterial color={chairColor} roughness={0.6} />
        </mesh>
      </group>

      <group position={[0, 0, -1.2]}>
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.08, 0.8]} />
          <meshStandardMaterial color="#92400E" roughness={0.4} metalness={0.2} />
        </mesh>
        {[[-0.6, -0.3], [0.6, -0.3], [-0.6, 0.3], [0.6, 0.3]].map((pos, i) => (
          <mesh key={`desk-leg-${i}`} position={[pos[0], 0.25, pos[1]]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.5]} />
            <meshStandardMaterial color="#451A03" />
          </mesh>
        ))}
      </group>

      <group ref={letterRef} position={[0, 2.5, 0]}>
        <mesh position={[0, 0, -0.1]}>
          <circleGeometry args={[0.6]} />
          <meshStandardMaterial 
            color={isClassroomSelected ? '#DBEAFE' : classroom.isOccupied ? '#FEE2E2' : '#DCFCE7'}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        <Text
          fontSize={0.8}
          color={isClassroomSelected ? '#2563EB' : classroom.isOccupied ? '#DC2626' : '#16A34A'}
          anchorX="center"
          anchorY="middle"
        >
          {classroom.letter}
        </Text>
      </group>

      <mesh position={[0, 3.2, 0]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial
          color={isClassroomSelected ? '#2563EB' : classroom.isOccupied ? '#DC2626' : '#16A34A'}
          emissive={isClassroomSelected ? '#2563EB' : classroom.isOccupied ? '#7F1D1D' : '#064E3B'}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
};