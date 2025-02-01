import { FC } from 'react';
import { TODO_STATUS, TodoInfo } from '../../shared/types';
import { Button } from 'antd';

type Props = {
  tabs: TodoInfo;
  currentTab: TODO_STATUS;
  setCurrentTab: (value: TODO_STATUS) => void;
};

const translatedFiltersLabel: Record<TODO_STATUS, string> = {
  [TODO_STATUS.ALL]: 'Все',
  [TODO_STATUS.COMPLETED]: 'Завершенные',
  [TODO_STATUS.IN_WORK]: 'В прогрессе',
};

export const TodoFilters: FC<Props> = ({ tabs, currentTab, setCurrentTab }) => {
  const handleClick = (value: TODO_STATUS) => {
    setCurrentTab(value);
  };
  return (
    <div>
      {Object.entries(tabs).map(([key, val]) => (
        <Button
          key={key}
          onClick={() => handleClick(key as TODO_STATUS)}
          color={key === currentTab ? 'primary' : 'default'}
          variant="link"
        >
          {translatedFiltersLabel[key as TODO_STATUS]} ({val})
        </Button>
      ))}
    </div>
  );
};
