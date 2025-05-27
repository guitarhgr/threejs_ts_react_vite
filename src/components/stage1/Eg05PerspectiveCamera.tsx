import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Eg05PerspectiveCamera = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) {
        return;
    }

    // 创建3D场景
    const scene = new THREE.Scene();

    // 创建网格模型
    const geometry = new THREE.BoxGeometry(50, 50, 50);
    const material = new THREE.MeshBasicMaterial({ color: 0x00aaff, wireframe: true });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 10, 0);

    scene.add(mesh);

    // 创建透视相机
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
    camera.position.set(0, 100, 200);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.render(scene, camera);

    // 将渲染器添加到容器中
    container.appendChild(renderer.domElement);

    return () => {
        geometry.dispose();
        material.dispose();

        renderer.dispose();
        container.removeChild(renderer.domElement);
    };
    
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} />;
};

export default Eg05PerspectiveCamera;