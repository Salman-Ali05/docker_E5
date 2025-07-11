import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Classroom } from './Classroom';
import { ClassroomData } from '../types/classroom';

interface Scene3DProps {
  classrooms: ClassroomData[];
  onToggleClassroom: (id: string) => void;
}

export const Scene3D: React.FC<Scene3DProps> = ({ classrooms }) => {

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [12, 8, 12], fov: 60 }}
        shadows="soft"
        gl={{ 
          antialias: true,
          shadowMapType: 2,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 12, 8]}
          intensity={0.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={30}
          shadow-camera-left={-12}
          shadow-camera-right={12}
          shadow-camera-top={12}
          shadow-camera-bottom={-12}
          shadow-bias={-0.0001}
          shadow-normalBias={0.02}
        />
        
        <pointLight 
          position={[0, 8, 0]} 
          intensity={0.3} 
          color="#FFFFFF"
          castShadow={false}
        />
        <pointLight 
          position={[-8, 4, 0]} 
          intensity={0.2} 
          color="#3B82F6"
          castShadow={false}
        />
        <pointLight 
          position={[8, 4, 0]} 
          intensity={0.2} 
          color="#8B5CF6"
          castShadow={false}
        />

        <Environment preset="city" environmentIntensity={0.3} />
        
        <ContactShadows
          position={[0, -0.1, 0]}
          opacity={0.25}
          scale={30}
          blur={1.5}
          far={4}
          resolution={512}
          color="#000000"
        />

        <mesh position={[0, -0.2, 0]} receiveShadow>
          <boxGeometry args={[25, 0.2, 15]} />
          <meshStandardMaterial 
            color="#E2E8F0" 
            roughness={0.9}
            metalness={0.05}
          />
        </mesh>

        {classrooms.map((classroom) => (
          <Classroom
            key={classroom.id}
            classroom={classroom}
          />
        ))}

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={8}
          maxDistance={25}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
          panSpeed={0.8}
        />
      </Canvas>
    </div>
  );
};