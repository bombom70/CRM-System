import { FC } from 'react';
import style from './Input.module.scss';

type Props = {
  placeholder?: string;
};

export const Input: FC<Props> = ({ placeholder }) => {
  return (
    <div className={style.input}>
      <input
        className={style['input__search']}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};
