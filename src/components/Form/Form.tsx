import { FC } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import style from './Form.module.scss';

export const Form: FC = () => {
  return (
    <div className={style.form}>
      <Input placeholder="Task To Be Done..." />
      <Button title="Add" customClass={style['form__btn']} />
    </div>
  );
};
