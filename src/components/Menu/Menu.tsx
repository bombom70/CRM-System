import { FC, useEffect, useState } from 'react';
import { Menu as AntMenu, MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router';

export const Menu: FC = () => {
  const [activeKey, setActiveKey] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    { key: '/', label: 'Список задач', path: '/' },
    { key: '/profile', label: 'Личный кабинет', path: '/profile' },
    { key: '/users', label: 'Пользователи', path: '/users' },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    setActiveKey(key);
    navigate(key);
  };

  useEffect(() => {
    setActiveKey(location.pathname);
  }, []);

  return (
    <AntMenu
      theme="light"
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="vertical"
      items={items}
      selectedKeys={[activeKey]}
    />
  );
};
