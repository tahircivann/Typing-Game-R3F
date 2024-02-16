import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";


// load gltf model 




export const Move = () => {
  const [obstacles, setObstacles] = useState(Array(50).fill(null).map(() => ({
    position: { x: Math.random() * 6 - 3, z: Math.random() *700 + 25 },
    visible: true,
  })));
  const [correctChars, setCorrectChars] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const targetTexts = ["Hello World", "Tahir Civan"];
  const currentTargetText = targetTexts[wordIndex];
  // Assuming a fixed camera position for simplicity; adjust as necessary.
  const cameraZPosition = 5;

  const handleKeyPress = (e) => {
    if (e.key === currentTargetText[correctChars]) {
      const nextCorrectChars = correctChars + 1;
      setCorrectChars(nextCorrectChars);

      if (nextCorrectChars === currentTargetText.length) {
        setCorrectChars(0);
        setWordIndex((wordIndex + 1) % targetTexts.length);
      } else {
        // Logic to hide the closest cube
        hideClosestCube();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [correctChars, currentTargetText, obstacles, wordIndex]);

  const hideClosestCube = () => {
    let closestIndex = -1;
    let closestDistance = Infinity;
    obstacles.forEach((obstacle, index) => {
      const distance = Math.abs(obstacle.position.z - cameraZPosition);
      if (distance < closestDistance && obstacle.visible) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== -1) {
      const updatedObstacles = obstacles.map((obstacle, index) => ({
        ...obstacle,
        visible: index === closestIndex ? false : obstacle.visible,
      }));
      setObstacles(updatedObstacles);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedObstacles = obstacles.map(obstacle => ({
        ...obstacle,
        position: { ...obstacle.position, z: obstacle.position.z - 0.2 },
      })).filter(obstacle => obstacle.visible || obstacle.position.z > -10);
      setObstacles(updatedObstacles);
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [obstacles]);

  return (
    <group>
      {obstacles.map((obstacle, index) => (
        <mesh
          key={index}
          position={[obstacle.position.x, 0, obstacle.position.z]}
          visible={obstacle.visible}
          rotation={[-Math.PI / 2, -Math.PI, 0]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="blue" />
          {[...currentTargetText].map((char, charIndex) => (
            <Text
              key={charIndex}
              color={charIndex < correctChars ? "green" : "red"}
              fontSize={0.5}
              position={[charIndex * 0.55 - currentTargetText.length * 0.275, 1, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              anchorX="center"
              anchorY="middle"
            >
              {char}
            </Text>
          ))}
        </mesh>
      ))}
    </group>
  );
};

export const CubeObjects = () => {
  return (
    <group>
      <Move />
    </group>
  );
};
const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <CubeObjects />
    </Canvas>
  );
};