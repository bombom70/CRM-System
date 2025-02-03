import { FC } from 'react';
import { Menu as AntMenu, MenuProps } from 'antd';
import { useNavigate } from 'react-router';

export const Menu: FC = () => {
  const navigate = useNavigate();

  const items = [
    { key: '1', label: 'Todo list', path: '/' },
    { key: '2', label: 'Profile', path: '/profile' },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    const { path } = items.find((item) => item.key === key) || {};
    if (path) {
      navigate(path);
    }
  };

  return (
    <AntMenu
      theme="light"
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="vertical"
      items={items}
    />
  );
};
