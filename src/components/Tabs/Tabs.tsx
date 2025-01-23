import { FC } from 'react';
import style from './Tabs.module.scss';

type Props = {
  tabs: string[];
};

export const Tabs: FC<Props> = ({ tabs }) => {
  return (
    <div className={style.tabs}>
      {tabs.map((tab) => (
        <div
          className={`${style['tabs__item']} ${style['tabs__item--selected']}`}
          key={tab}
        >
          {tab} (4)
        </div>
      ))}
    </div>
  );
};
