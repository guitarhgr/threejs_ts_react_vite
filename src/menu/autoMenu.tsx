import { type JSX } from 'react';

import {
  AppstoreOutlined,
  ExperimentOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { routes } from '../routes/autoRoutes';

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

export const menuItems = [
    ...Object.entries(grouped).map(([stage, items]) => ({
        key: stage,
        icon: stageIconMap[stage] || <AppstoreOutlined />,
        label: stage,
        children: items.map((item) => ({
            key: item.key,
            label: (
                <Link to={`/${item.path}`}>
                    {item.label}
                </Link>
            ),
        })),
    })),
];