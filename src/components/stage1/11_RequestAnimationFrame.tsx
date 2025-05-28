import { useEffect, useRef } from 'react';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export const meta = {
  title: '11.循环渲染',
};

const Eg11RequestAnimationFrame = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) {
      return;
    }

    /**
     * 创建3D场景
     */
    const scene = new THREE.Scene();

    /**
     * 创建网格模型
     */
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshLambertMaterial({ 
      color: 0x00aaff,
      transparent: true, // 启用透明度
      opacity: 0.5, // 设置透明度
    });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    /**
     * 创建辅助坐标系
     */
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    /**
     * 创建光源
     */
    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(100, 60, 50);
    scene.add(directionalLight);

    // 环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    /**
     * 创建透视相机
     */
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
    camera.position.set(292, 223, 185);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    /**
     * 创建渲染器
     */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    const render = () => {
      renderer.render(scene, camera);
      mesh.rotateY(0.01);

      requestAnimationFrame(render); // 使用requestAnimationFrame循环渲染
    };

    render();

    /**
     * 添加相机控制器
     */
    const orbitControls = new OrbitControls(camera, renderer.domElement); 
    orbitControls.enableDamping = true; // 启用阻尼效果
    orbitControls.addEventListener('change', () => {
      renderer.render(scene, camera);
      console.log('Camera position:', camera.position);
    });

    return () => {
      // 清理资源
      geometry.dispose();
      // 释放材质
      material.dispose();
      // 释放光源
      ambientLight.dispose();
      // 释放渲染器
      renderer.dispose();
      // 清理场景
      scene.clear();
      // 清理相机
      camera.clear();
      // 释放辅助坐标系
      axesHelper.dispose();

      // 从容器中移除渲染器的DOM元素
      container.removeChild(renderer.domElement);

      mountRef.current = null;
    };
    
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} />;
};

export default Eg11RequestAnimationFrame;