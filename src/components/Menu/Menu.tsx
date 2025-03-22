import { FC, useEffect, useMemo, useState } from 'react';
import { Menu as AntMenu, MenuProps, Skeleton } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { useAppSelector } from '../../store';
import { Roles } from '../../api/profile/types';
import { StatusLoading } from '../../shared/types';

const items = [
  { key: '/', label: 'Список задач', path: '/' },
  {
    key: '/profile',
    label: 'Личный кабинет',
    path: '/profile',
  },
  {
    key: '/users',
    label: 'Пользователи',
    path: '/users',
  },
];

export const Menu: FC = () => {
  const [activeKey, setActiveKey] = useState('');
  const profileData = useAppSelector((state) => state.profile.profileData);
  const loading = useAppSelector((state) => state.profile.loading);
  const isAdmin = useAppSelector((state) => state.profile.isAdmin);
  const location = useLocation();
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    setActiveKey(key);
    navigate(key);
  };

  const menuItems = useMemo(() => {
    return profileData?.roles.includes(Roles.ADMIN)
      ? items
      : items.filter((item) => item.key !== '/users');
  }, [isAdmin]);

  useEffect(() => {
    setActiveKey(location.pathname);
  }, []);

  return (
    <>
      {loading === StatusLoading.PENDING && <Skeleton />}
      {loading === StatusLoading.FULFILLED && (
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
      )}
    </>
  );
};
