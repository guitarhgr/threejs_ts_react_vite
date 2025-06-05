import { useEffect, useRef } from 'react';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export const meta = {
  title: '03.网格模型渲染顶点数据',
};

const Eg03GeoBufferAttributeMesh = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;

    const scene = new THREE.Scene();

    // 创建缓冲几何体
    const geometry = new THREE.BufferGeometry();
    
    const vertices = new Float32Array([
      0, 0, 0,
      50, 0, 0,
      0, 100, 0,
      0, 0, 10,
      0, 0, 100,
      50, 0, 10,
    ]);

    const attribute = new THREE.BufferAttribute(vertices, 3);
    geometry.setAttribute('position', attribute);

    const material = new THREE.MeshBasicMaterial({
      color: 0xfff00,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);
  
    const width = container?.clientWidth || window.innerWidth;
    const height = container?.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 3000);
    camera.position.set(292, 223, 185);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    container?.appendChild(renderer.domElement);

    const render = () => {
      renderer.render(scene, camera);

      requestAnimationFrame(render);
    };

    render();

    const oribitControls = new OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', () => {
      const currentWidth = container?.clientWidth || window.innerWidth;
      const currentHeight = container?.clientHeight || window.innerHeight;

      renderer.setSize(currentWidth, currentHeight);

      camera.aspect = currentWidth / currentHeight;

      camera.updateProjectionMatrix();
    });

  }, []);

  return (
    <div ref={mountRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>

    </div>
  );
};

export default Eg03GeoBufferAttributeMesh;