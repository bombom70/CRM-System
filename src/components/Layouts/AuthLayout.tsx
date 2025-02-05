import { FC } from 'react';
import { Outlet } from 'react-router';
import { Image, Layout, Flex } from 'antd';
import authLogo from '../../assets/auth.svg';
import { Content } from 'antd/es/layout/layout';

export const AuthLayout: FC = () => {
  return (
    <Flex gap="middle" align="center">
      <Image
        src={authLogo}
        preview={false}
        height="100%"
        style={{ objectFit: 'cover', height: '100vh' }}
      />
      <Layout>
        <Content
          style={{
            width: '100%',
            maxWidth: '600px',
            paddingRight: '40px',
            margin: '0 auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Flex>
  );
};
