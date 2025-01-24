import { FC, SyntheticEvent, useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import style from './Form.module.scss';
import { fetchAddTodo } from '../../api';

type Props = {
  getData: () => void;
};

export const Form: FC<Props> = ({ getData }) => {
  const [value, setValue] = useState('');

  const createTodo = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      isDone: false,
      title: value,
    };
    await fetchAddTodo(data);
    await getData();
    setValue('');
  };

  return (
    <form className={style.form} onSubmit={createTodo}>
      <Input
        value={value}
        setValue={setValue}
        placeholder="Task To Be Done..."
      />
      <Button title="Add" customClass={style['form__btn']} />
    </form>
  );
};
