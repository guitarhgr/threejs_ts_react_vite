import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';

import App from '../App';
import { routes } from './autoRoutes';
import Example1 from '../components/stage1/Example1';

import Eg04Create3dScene from '../components/stage1/Eg04Create3dScene';
import Eg05PerspectiveCamera from '../components/stage1/Eg05PerspectiveCamera';

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route
                    index
                    element={
                    <div style={{ textAlign: 'center', marginTop: 60 }}>
                        <h2>欢迎！请选择左侧菜单体验 Three.js 示例。</h2>
                    </div>
                    }
                />
                {routes.map(({ path, element: Component, key }) => (
                    <Route 
                        key={key}
                        path={path}
                        element={
                            <Suspense fallback={<div>Loading...</div>}>
                                <Component />
                            </Suspense>
                        }
                    />
                ))}
                {/* <Route path="stage1/example1" element={<Example1 />} />
                <Route path="stage1/eg04Create3dScene" element={<Eg04Create3dScene />} />
                <Route path="stage1/eg05PerspectiveCamera" element={<Eg05PerspectiveCamera />} />
                <Route path="*" element={<Navigate to="/" />} /> */}
            </Route>
        </Routes>
    </BrowserRouter>
  );
}