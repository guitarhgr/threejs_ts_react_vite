import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

import App from '../App';
import { routes } from './autoRoutes';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}