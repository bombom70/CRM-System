import { FC, useEffect } from 'react';
import style from './Tabs.module.scss';
import { Status, TodoInfo } from '../../shared/types';

type Props = {
  tabs: TodoInfo;
  currentTab: string;
  setCurrentTab: (value: Status) => void;
};

const getRuName = (name: string) => {
  switch (name) {
    case 'all':
      return 'Все';
    case 'inWork':
      return 'в работе';
    case 'completed':
      return 'сделано';
    default:
      return '';
  }
};

export const Tabs: FC<Props> = ({ tabs, currentTab, setCurrentTab }) => {
  const handleClick = (value: Status) => {
    setCurrentTab(value);
  };
  return (
    <div className={style.tabs}>
      {Object.entries(tabs).map(([key, val]) => (
        <div
          className={`${style['tabs__item']} ${key === currentTab ? style['tabs__item--selected'] : ''}`}
          key={key}
          onClick={() => handleClick(key as Status)}
        >
          {getRuName(key)} ({val})
        </div>
      ))}
    </div>
  );
};
