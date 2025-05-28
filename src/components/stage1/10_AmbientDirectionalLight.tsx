import { useEffect, useRef } from 'react';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export const meta = {
  title: '10.平行光和环境光',
};

const Eg10AmbientDirectionalLight = () => {
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
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    /**
     * 创建光源
     */
    // 创建环境光, 环境光没有特定方向，整体改变场景的光照明暗
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // 环境光
    scene.add(ambientLight);

    // 创建平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // 平行光
    directionalLight.position.set(100, 60, 50); // 设置光源位置
    // directionalLight.target = mesh; // 设置光源目标对象
    scene.add(directionalLight);

    // 添加平行光的辅助线
    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000);
    scene.add(directionalLightHelper);

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

export default Eg10AmbientDirectionalLight;