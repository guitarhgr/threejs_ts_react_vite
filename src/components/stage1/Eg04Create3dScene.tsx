import { useEffect, useRef } from 'react';

import * as THREE from 'three';

export const meta = {
  title: '04.创建一个3D场景',
};

const Eg04Create3dScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) {
      return;
    }

    // 创建3d场景
    const scene = new THREE.Scene();

    // create a geometry
    const geometry = new THREE.BoxGeometry(50, 50, 50);
    const material = new THREE.MeshBasicMaterial({ color: 0x00aaff, wireframe: true });
    
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, 10, 0);

    scene.add(mesh);

    console.log('scene', scene);

    return () => {
      geometry.dispose();
      material.dispose();

      // renderer.dispose();
      // container.removeChild(renderer.domElement);
    };
    
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} />;
};

export default Eg04Create3dScene;