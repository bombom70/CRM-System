import { FC, useEffect, useState } from 'react';
import { Menu as AntMenu, MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { useIsAdmin } from '../../shared/utils';
import { useAppSelector } from '../../store';

const items = [
  { key: '/', label: 'Список задач', path: '/' },
  { key: '/profile', label: 'Личный кабинет', path: '/profile' },
  { key: '/users', label: 'Пользователи', path: '/users' },
];

export const Menu: FC = () => {
  const [activeKey, setActiveKey] = useState('');
  const profileData = useAppSelector((state) => state.profile.profileData);
  const [menuItems, setMenuItems] = useState(items);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    setActiveKey(key);
    navigate(key);
  };

  useEffect(() => {
    setActiveKey(location.pathname);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      setMenuItems(items);
    } else {
      setMenuItems((prev) => prev.filter((item) => item.key !== '/users'));
    }
  }, [profileData]);

  return (
    <AntMenu
      theme="light"
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="vertical"
      items={menuItems}
      selectedKeys={[activeKey]}
    />
  );
};
