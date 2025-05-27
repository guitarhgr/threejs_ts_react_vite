import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import Drawer from 'antd/es/drawer';
import Grid from 'antd/es/grid';
import Button from 'antd/es/button';
import Layout, { Header, Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { MenuFoldOutlined, MenuUnfoldOutlined, AppstoreOutlined } from '@ant-design/icons';

import type { RootState } from './store/store';
import { setIsCollapsed, setIsDrawerOpen } from './store/uiSlice';

import SidebarMenu from './menu/SidebarMenu';

const { useBreakpoint } = Grid;

export default function App() {
    const dispatch = useDispatch();
    const isCollapsed = useSelector((state: RootState) => state.ui.isCollapsed);
    const isDrawerOpen = useSelector((state: RootState) => state.ui.isDrawerOpen);

    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const handleMenuClick = () => {
        if (isMobile) {
            dispatch(setIsDrawerOpen(false));
        } else {
            dispatch(setIsCollapsed(true));
        };
    };

    return (
        <Layout style={{ minHeight: '100vh', minWidth: '100vw' }}>
        {/* 侧边栏 */}
        {isMobile ? (
            <Drawer
                placement="left"
                open={ isDrawerOpen }
                styles={{ body: { padding: 0 } }}
                width={ 220 }
                onClose={ () => dispatch(setIsDrawerOpen(false)) }
            >
            <SidebarMenu collapsed={ false } onMenuClick={ handleMenuClick } />
            </Drawer>
        ) : (
            <Sider
                collapsible
                collapsed={ isCollapsed }
                onCollapse={ () => dispatch(setIsCollapsed(false)) }
                width={ 220 }
                style={{
                    background: '#001529',
                    transition: 'all 0.2s',
                    boxShadow: '2px 0 8px #0001',
                    minHeight: '100vh',
                }}
            >
            <div
                style={{
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isCollapsed ? 'center' : 'left',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 20,
                    letterSpacing: 1,
                    paddingLeft: isCollapsed ? 0 : 24,
                    transition: 'all 0.2s',
                }}
            >
                <AppstoreOutlined style={{ marginRight: 8 }} />
                <span>{ !isCollapsed && 'Three.js Demo' }</span>
            </div>
            <SidebarMenu collapsed={ true } onMenuClick={ handleMenuClick } />
            </Sider>
        )}

        {/* 右侧主区域（Header+Content） */}
            <Layout style={{ minHeight: '100vh', width: '100%' }}>
                <Header
                style={{
                    background: '#fff',
                    padding: '0 16px',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 2px 8px #0001',
                    minHeight: 48,
                }}
                >
                {isMobile ? (
                    <Button
                        icon={<MenuFoldOutlined />}
                        type="text"
                        style={{ fontSize: 20, marginRight: 8 }}
                        onClick={ () => dispatch(setIsDrawerOpen(true)) }
                    />
                ) : (
                    <Button
                    icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    type="text"
                    style={{ fontSize: 20, marginRight: 8 }}
                    onClick={ () => dispatch(setIsCollapsed(!isCollapsed)) }
                    />
                )}
                <span style={{ fontWeight: 600, fontSize: 18 }}>Three.js Learn</span>
                </Header>
                <Content
                style={{
                    margin: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: 0,
                    padding: 0,
                    background: '#fff',
                    borderRadius: 12,
                    boxShadow: isMobile ? 'none' : '0 2px 16px #0001',
                    flex: 1,
                    minHeight: 'calc(100vh - 48px - 48px)',
                    overflow: 'auto',
                }}
                >
                <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}