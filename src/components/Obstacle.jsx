import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Obstacle = ({ position, gltfScene, gltfAnimations, onAnimationComplete, id, animate, onUpdate }) => {
  const objectRef = useRef(new THREE.Group());
  const mixerRef = useRef();
  const clockRef = useRef(new THREE.Clock(false));

  useEffect(() => {
    const object = gltfScene.clone();
    object.rotation.x = -Math.PI / 2;
    object.rotation.y = Math.PI;
    objectRef.current.add(object);

    mixerRef.current = new THREE.AnimationMixer(object);
  }, [gltfScene]);

  useEffect(() => {
    if (animate) {
      const clip = THREE.AnimationClip.findByName(gltfAnimations, '00_Cube_Animation');
      const action = mixerRef.current.clipAction(clip);
      action.reset();
      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;
      action.play();
      clockRef.current.start();

      mixerRef.current.addEventListener('finished', () => onAnimationComplete(id));
    }
  }, [animate, gltfAnimations, id, onAnimationComplete]);

  useFrame(() => {
    if (mixerRef.current) {
      mixerRef.current.update(clockRef.current.getDelta());
    }

    if (objectRef.current.position.z > -250) {
      objectRef.current.position.z -= 0.1;
      onUpdate(id, objectRef.current.position.clone());
    }
  });

  return <primitive object={objectRef.current} position={[position.x, 0, position.z]} />;
};

export default Obstacle;