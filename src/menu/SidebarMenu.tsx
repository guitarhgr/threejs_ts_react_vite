import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Menu } from 'antd';
import {
  HomeOutlined,
} from '@ant-design/icons';

import { setOpenKeys } from '../store/uiSlice';
import { menuItems } from './autoMenu';

export interface SidebarMenuProps {
  collapsed: boolean;
  onMenuClick?: () => void;
}

// 路径 => 菜单 key 映射
function getSelectedKeys(pathname: string) {
  if (pathname === '/') {
    return ['home'];
  }

  const parts = pathname.split('/').filter(Boolean);
  if (parts.length >= 2) {
    return [`${parts[0]}-${parts[1]}`];
  }
  
  return [];
}

// 路径 => 展开父菜单 key
function getOpenKeys(pathname: string, collapsed: boolean) {
  if (collapsed) {
    return [];
  }

  const parts = pathname.split('/').filter(Boolean);
  if (parts.length >= 2) {
    return [parts[0]];
  }

  return [];
}

export default function SidebarMenu({ collapsed, onMenuClick }: SidebarMenuProps) {
  const location = useLocation();
  const dispatch = useDispatch();
  const openKeys = useSelector((state: any) => state.ui.openKeys);

  // 路由变化/菜单折叠时，展开当前菜单
  useEffect(() => {
    dispatch(setOpenKeys(getOpenKeys(location.pathname, collapsed)));
  }, [location.pathname, collapsed, dispatch]);

  // 菜单项递归渲染（Link包裹）
  const renderMenuItems = () => [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: (
        <Link to="/" onClick={onMenuClick}>
          主页
        </Link>
      ),
    },
    ...menuItems
  ];

  return (
    <Menu
      theme="dark"
      mode="inline"
      openKeys={collapsed ? undefined : openKeys}
      selectedKeys={getSelectedKeys(location.pathname)}
      onOpenChange={(keys) => dispatch(setOpenKeys(keys))}
      items={ renderMenuItems() }
      style={{ height: '100%', borderRight: 0 }}
      onClick={onMenuClick}
    />
  );
}