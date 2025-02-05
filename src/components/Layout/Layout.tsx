import { FC } from 'react';
import { Outlet } from 'react-router';
import { Layout as AntLayout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { Menu } from '../Menu';

export const Layout: FC = () => {
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
    maxWidth: '600px',
    margin: '0 auto',
    padding: '24px',
    minHeight: 120,
    lineHeight: '120px',
    background: '#f3f3f3',
  };

  return (
    <AntLayout style={layoutStyle}>
      <Sider width={255} style={siderStyle}>
        <Menu />
      </Sider>
      <AntLayout style={contentStyle}>
        <Content>
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
    // <Row>
    //   <Col span={4}>
    //     <Flex gap={4} vertical>
    //       <Link to="/">Todo list</Link>
    //       <Link to="/profile">Profile</Link>
    //     </Flex>
    //   </Col>
    //   <Col span={12} offset={2}>
    //     <Outlet />
    //   </Col>
    // </Row>
  );
};
