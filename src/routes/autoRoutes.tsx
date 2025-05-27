/* eslint-disable @typescript-eslint/no-explicit-any */

import { lazy } from 'react';

// 自动从文件名提取排序号
function extractOrder(name: string): number {
  const match = name.match(/^(\d+)/i);

  return match ? parseInt(match[1], 10) : 999;
}

// 没有 meta.title 的时候自动生成标题
function autoFormatTitle(name: string): string {
  console.log(name);
  const match = name.match(/^(\d+)_([A-Z].*)$/);
  if (match) {
    const [, num, title] = match;

    return `${num}. ${splitCamelCase(title)}`;
  }

  return name;
}

function splitCamelCase(text: string): string {
  return text.replace(/([a-z])([A-Z])/g, '$1 $2');
}

// 批量导入文件
export const modules = import.meta.glob('../components/**/[0-9]*_*.tsx', {
  /** 是否立即加载模块，同步加载 */
  eager: true,
});

export const routes = Object.entries(modules).map(([path, mod]: any) => {
  console.log(path);
  const match = path.match(/components\/(.*?)\/(\d+_[A-Za-z0-9]+)\.tsx$/);

  if (!match) {
    return null;
  }

  const [, stage, componentName] = match;
  const Component = mod.default || lazy(() => import(/* @vite-ignore */ path));
  const meta = mod.meta || {};
  const routePath = `${stage}/${componentName.charAt(0).toLowerCase()}${componentName.slice(1)}`;

  const label = meta.title || autoFormatTitle(componentName);

  return {
    path: routePath,
    element: Component,
    key: `${stage}-${componentName}`,
    label: label,
    stage: stage,
    order: extractOrder(componentName),
  };
}).filter(Boolean) as {
  path: string;
  element: React.LazyExoticComponent<any>;
  key: string;
  label: string;
  stage: string;
  order: number;
}[];