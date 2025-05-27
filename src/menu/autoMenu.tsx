import { type JSX } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes/autoRoutes';

import {
  AppstoreOutlined,
  ExperimentOutlined,
} from '@ant-design/icons';

const stageIconMap: Record<string, JSX.Element> = {
  stage1: <AppstoreOutlined />,
  stage2: <ExperimentOutlined />,
};

// 将路由按 stage 分组
const grouped = routes.reduce((acc, route) => {
  if (!route) {
    return acc;
  }
  
  if (!acc[route.stage]) {
    acc[route.stage] = [];
  }

  acc[route.stage].push(route);

  return acc;
}, {} as Record<string, typeof routes>);

function formatStageTitle(stage: string) {
  const match = stage.match(/^stage(\d+)/);
  
  const stageMap: Record<string, string> = {
    'stage1': '第一阶段 新手入门',
  };

  return stageMap[stage] || `阶段 ${match ? match[1] : stage}`; // 默认返回阶段数字
}

export const menuItems = [
  ...Object.entries(grouped).map(([stage, items]) => ({
    key: stage,
    icon: stageIconMap[stage] || <AppstoreOutlined />,
    label: formatStageTitle(stage),
    children: items
      .sort((a, b) => a.order - b.order)
      .map((item) => ({
        key: item.key,
        label: <Link to={`/${item.path}`}>{ item.label }</Link>,
      })),
  })),
];