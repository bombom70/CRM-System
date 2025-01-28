import { FC } from 'react';
import { Link, Outlet } from 'react-router';
import { Row, Col, Flex } from 'antd';

export const Layout: FC = () => {
  return (
    <Row>
      <Col span={4}>
        <Flex gap={4} vertical>
          <Link to="/">Todo list</Link>
          <Link to="/profile">Profile</Link>
        </Flex>
      </Col>
      <Col span={12} offset={2}>
        <Outlet />
      </Col>
    </Row>
  );
};
