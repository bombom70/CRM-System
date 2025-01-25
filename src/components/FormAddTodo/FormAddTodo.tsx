import { FC, SyntheticEvent, useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { fetchAddTodo } from '../../api';
import style from './FormAddTodo.module.scss';
import { validationValue } from '../../shared/validation';

type Props = {
  getData: () => void;
};

export const FormAddTodo: FC<Props> = ({ getData }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const createTodo = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { textError, hasError } = validationValue(value);
    if (hasError) {
      setError(textError);
      return;
    }
    const data = {
      isDone: false,
      title: value,
    };

    try {
      await fetchAddTodo(data);
      await getData();
      setError('');
      setValue('');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={style['form-wrapper']}>
      <form className={style.form} onSubmit={createTodo}>
        <Input
          value={value}
          setValue={setValue}
          placeholder="Task To Be Done..."
        />
        <Button title="Add" customClass={style['form__btn']} />
      </form>
      {!!error.length && (
        <span className={style['form-wrapper__text-error']}>{error}</span>
      )}
    </div>
  );
};
