import { FC, SyntheticEvent, useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import style from './Form.module.scss';
import { fetchAddTodo } from '../../api';

type Props = {
  getData: () => void;
};

const validationValue = (value: string) => {
  let textError = '';
  let hasError = false;
  if (value.length < 2) {
    textError = 'minimum number of characters 2';
    hasError = true;
  }
  if (value.length > 64) {
    textError = 'maximum number of characters 64';
    hasError = true;
  }
  return {
    textError,
    hasError,
  };
};

export const Form: FC<Props> = ({ getData }) => {
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

    await fetchAddTodo(data);
    await getData();
    setError('');
    setValue('');
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
