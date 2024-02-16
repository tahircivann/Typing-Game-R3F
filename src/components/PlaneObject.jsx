import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export const Move = () => {
  const groupRef = useRef();
  const planes = useRef([]);

  useEffect(() => {
    // Initialize plane positions with alternating colors
    planes.current.forEach((plane, index) => {
      // Alternating starting positions
      plane.position.z = index * 20+10; // Closer spacing for smoother transition
    });

    const animate = () => {
      planes.current.forEach((plane, index) => {
          plane.position.z -= 0.1; // Move each plane
          if (plane.position.z < -30) {
          plane.position.z += 10+10; // Reset plane to create a continuous loop
          // Alternate colors when resetting to maintain pattern
          plane.material.color.set(index % 2 === 0 ? "lightblue" : "#80AED8");
        }
      });
    };

    const id = window.setInterval(animate, 1000 / 60); // 60 fps
    return () => window.clearInterval(id);
  }, []);

  return (
    <group ref={groupRef}>
      {[...Array(50)].map((_, index) => (
        <mesh
          key={index}
          position={[0, -1, index * 10 +10]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1, 2, 1]}
          ref={(el) => (planes.current[index] = el)}
        >
          <planeGeometry args={[10, 10, 1, 1]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? "lightblue" : "#80AED8"}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

export const PlaneObject = () => {
  return (
    <group>
      <Move />
    </group>
  );
};