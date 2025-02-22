import { Button, Dropdown, MenuProps } from 'antd';
import { FC } from 'react';

type Props = {
  onSelectFilter: (block: boolean | null) => void;
};

const items = [
  {
    key: 'all',
    label: 'Все',
  },
  {
    key: 'block',
    label: 'Заблокированные',
  },
  {
    key: 'active',
    label: 'Активные',
  },
];

export const Filter: FC<Props> = ({ onSelectFilter }) => {
  const onClick: MenuProps['onClick'] = ({ key }) => {
    const isBlock = key === 'all' ? null : key === 'block';
    onSelectFilter(isBlock);
  };

  return (
    <Dropdown menu={{ items, onClick }} trigger={['click']}>
      <Button color="default" variant="outlined">
        Фильтр
      </Button>
    </Dropdown>
  );
};
