import React,{useRef,useEffect} from "react";

// rotate the cube animation
export const Rotate = () => {
  const mesh = useRef();
  useEffect(() => {
    const animate = () => {
      mesh.current.rotation.x += 0.02;
    };
    const id = window.setInterval(animate, 1000 / 60);
    return () => window.clearInterval(id);
  }, []);
  return (
    <mesh ref={mesh} position={[0, 0.2, -5]}>
      <icosahedronBufferGeometry args={[1, 0]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

// Export the MainObject component
export  const MainObject = () => {
  return (
    <group>
      <Rotate />
    </group>
  );
};
