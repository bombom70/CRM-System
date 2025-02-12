import { FC } from 'react';
import { Button } from 'antd';
import { TodoInfo, TodosStatus } from '../../../api/todos/types';

type Props = {
  tabs: TodoInfo;
  currentTab: TodosStatus;
  setCurrentTab: (value: TodosStatus) => void;
};

const translatedFiltersLabel: Record<TodosStatus, string> = {
  [TodosStatus.ALL]: 'Все',
  [TodosStatus.COMPLETED]: 'Завершенные',
  [TodosStatus.IN_WORK]: 'В прогрессе',
};

export const TodoFilters: FC<Props> = ({ tabs, currentTab, setCurrentTab }) => {
  const handleClick = (value: TodosStatus) => {
    setCurrentTab(value);
  };
  return (
    <div>
      {Object.entries(tabs).map(([key, val]) => (
        <Button
          key={key}
          onClick={() => handleClick(key as TodosStatus)}
          color={key === currentTab ? 'primary' : 'default'}
          variant="link"
        >
          {translatedFiltersLabel[key as TodosStatus]} ({val})
        </Button>
      ))}
    </div>
  );
};
