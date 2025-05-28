import { useEffect, useRef } from 'react';

import * as THREE from 'three';
import { AxesHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export const meta = {
  title: '09.相机控制器',
};

const Eg09OrbitControls = () => {
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

    // 基础网格材质MeshBasicMaterial不受光照影响，漫反射网格材质MeshLambertMaterial
    const material = new THREE.MeshLambertMaterial({ color: 0x00aaff });
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    /**
     * 创建辅助坐标系
     */
    const axesHelper = new AxesHelper(100);
    scene.add(axesHelper);

    /**
     * 创建点光源
     */
    const pointLight = new THREE.PointLight(0xffffff, 1.0);
    // 衰减系数, 默认值为1.0, 光源光照强度不随距离改变而衰减
    pointLight.decay = 0.0; 

    // 光源位置
    pointLight.position.set(0, 400, 300);
    scene.add(pointLight);

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
    
    // 设置渲染器的大小
    renderer.setSize(width, height);
    // 设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
    // 将渲染器添加到容器中
    renderer.render(scene, camera);

    // 添加相机控制器
    const orbitControls = new OrbitControls(camera, renderer.domElement);

    orbitControls.addEventListener('change', () => {
      renderer.render(scene, camera);

      console.log('Camera position:', camera.position);
    });

    container.appendChild(renderer.domElement);

    return () => {
      // 清理资源
      geometry.dispose();
      // 释放材质
      material.dispose();
      // 释放光源
      pointLight.dispose();
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

export default Eg09OrbitControls;