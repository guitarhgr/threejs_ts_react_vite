import { useEffect, useRef } from 'react';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export const meta = {
  title: '01.几何体顶点位置数据和点模型对象',
};

const Eg01GeoBufferAttributePoint = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) {
      return;
    }
    
    const scene = new THREE.Scene();
    
    // 创建缓冲几何体
    const geometry = new THREE.BufferGeometry();
    
    // 创建顶点位置属性
    const vertices = new Float32Array([
        0, 0, 0,
        50, 0, 0,
        0, 100, 0,
        0, 0, 10,
        0, 0, 100,
        50, 0, 10,
    ]);

    // 创建顶点缓冲区对象 3个分量表示一个顶点的x、y、z坐标
    const bufferAttribute = new THREE.BufferAttribute(vertices, 3);

    geometry.setAttribute('position', bufferAttribute);

    const material = new THREE.PointsMaterial({
        color: 0xfff00,
        size: 10.0,
    });

    const points = new THREE.Points(geometry, material);

    scene.add(points);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const axesHelper = new THREE.AxesHelper(100);
    const sceneHelper = new THREE.GridHelper(200, 20);

    scene.add(axesHelper);
    scene.add(sceneHelper);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 3000);
    camera.position.set(292, 223, 185);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();

    const orbitControls = new OrbitControls(camera, renderer.domElement);

    orbitControls.addEventListener('change', () => {
      renderer.render(scene, camera);
    });

    const render = () => {
        const delta = clock.getDelta();
        
        // console.log('两帧渲染时间间隔(毫秒)', delta * 1000);
        // console.log('帧率FPS', delta);

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    };

    render();
    

    window.addEventListener('resize', () => {

      // 重置渲染器输出画布canvas尺寸
      const currentWidth = container.clientWidth || window.innerWidth;
      const currentHeight = container.clientHeight || window.innerHeight;

      renderer.setSize(currentWidth, currentHeight);

      camera.aspect = currentWidth / currentHeight;

      // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
      // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
      // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵

      camera.updateProjectionMatrix();
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

export default Eg01GeoBufferAttributePoint;