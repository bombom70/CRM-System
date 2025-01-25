import { FC } from 'react';
import style from './TodoFilters.module.scss';
import { TODO_STATUS, TodoInfo } from '../../shared/types';

type Props = {
  tabs: TodoInfo;
  currentTab: string;
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
    <div className={style['todo-filters']}>
      {Object.entries(tabs).map(([key, val]) => (
        <div
          className={`${style['todo-filters__item']} ${key === currentTab ? style['todo-filters__item--selected'] : ''}`}
          key={key}
          onClick={() => handleClick(key as TODO_STATUS)}
        >
          {translatedFiltersLabel[key as TODO_STATUS]} ({val})
        </div>
      ))}
    </div>
  );
};
