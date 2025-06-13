import { useEffect, useRef } from 'react';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export const meta = {
  title: '04.矩形平面几何体',
};

const Eg04GeoBufferAttributePlan = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;

    if (!container) {
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
    camera.position.set(292, 223, 185);
    camera.lookAt(0, 0, 0);


    // 创建缓冲几何体
    const vertices = new Float32Array([
      0, 0, 0,
      80, 0, 0,
      80, 80, 0,

      0, 0, 0,
      80, 80, 0,
      0, 80, 0,
    ]);

    // 创建属性缓冲区对象 3个为一组数据，表示每个顶点的x、y、z坐标
    const attribute = new THREE.BufferAttribute(vertices, 3);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', attribute);

    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 添加辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    // 添加光照
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.render(scene, camera);

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.addEventListener('change', () => {
      renderer.render(scene, camera);
    });

    window.addEventListener('resize', () => {
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;

      renderer.setSize(newWidth, newHeight);
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    });


    container.appendChild(renderer.domElement);

    const render = () => {
      renderer.render(scene, camera);

      requestAnimationFrame(render);
    };

    render();

    return () => {
      geometry.dispose();
      material.dispose();
      ambientLight.dispose();
      axesHelper.clear();
      renderer.dispose();
      scene.clear();
      camera.clear();
      
      container.removeChild(renderer.domElement);

      mountRef.current = null;
    };

  }, []);

  return (
    <div ref={mountRef} style={{ width: '100vw', height: '100h', overflow: 'hidden' }}>

    </div>
  );
};

export default Eg04GeoBufferAttributePlan;