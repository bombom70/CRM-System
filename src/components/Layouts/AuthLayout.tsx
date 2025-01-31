import { Row, Col, Image } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router';
import authLogo from '../../assets/auth.svg';

export const AuthLayout: FC = () => {
  return (
    <Row align="middle">
      <Col span={12}>
        <Image
          src={authLogo}
          preview={false}
          height="100%"
          style={{ objectFit: 'cover', height: '100vh' }}
        />
      </Col>
      <Col span={8} offset={2}>
        <Outlet />
      </Col>
    </Row>
  );
};
