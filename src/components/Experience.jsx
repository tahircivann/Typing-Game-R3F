import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { MainObject } from './MainObject';
import { useThree } from "@react-three/fiber";
import { useEffect , useState, useFrame} from "react";
import {PlaneObject} from './PlaneObject';
import {CubeObjects} from './CubeObjects';

export const Experience = () => {
  const { camera } = useThree(); // Access the default camera
  useEffect(() => {
    // Initial camera position
    camera.position.set(0, 5, -30);
  }, [camera]);


  
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.3} />
      <spotLight position={[15, 20, 5]} penumbra={1} castShadow />
      <pointLight position={[-10, -10, -5]} />
      <MainObject />
      <PlaneObject />
      <CubeObjects />

    </>
  );
};
