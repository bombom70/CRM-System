import { FC } from 'react';
import { Outlet } from 'react-router';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { Menu } from '../Menu';

export const MainLayout: FC = () => {
  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    background: '#f3f3f3',
  };

  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    background: '#f3f3f3',
  };

  const contentStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '1620px',
    padding: '24px',
    minHeight: 120,
    lineHeight: '120px',
    background: '#f3f3f3',
  };

  return (
    <Layout style={layoutStyle}>
      <Sider width={255} style={siderStyle}>
        <Menu />
      </Sider>
      <Layout style={contentStyle}>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
