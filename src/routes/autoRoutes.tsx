/* eslint-disable @typescript-eslint/no-explicit-any */

import { lazy } from 'react';

export const modules = import.meta.glob('../components/**/[A-Z]*.tsx');

export const routes = Object.entries(modules).map(([path, component]) => {
    const match = path.match(/components\/(.*?)\/(.*?)\.tsx$/);

    if (!match) {
        return null;
    }

    const [, stage, componentName] = match;
    const routePath = `${stage}/${componentName.charAt(0).toLowerCase()}${componentName.slice(1)}`;

    return {
        path: routePath,
        element: lazy(component as any),
        key: `${stage}-${componentName}`,
        label: componentName,
        stage: stage,
    };
}).filter(Boolean) as {
    path: string;
    element: React.LazyExoticComponent<any>;
    key: string;
    label: string;
    stage: string;
  }[];