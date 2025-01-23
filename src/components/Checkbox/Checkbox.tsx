import { FC, useState } from 'react';
import style from './Checkbox.module.scss';
import { Todo } from '../../shared/types';

type Props = {
  todo: Todo;
  changeDoneTodo: (todo: Todo, done: boolean) => void;
};

export const Checkbox: FC<Props> = ({ todo, changeDoneTodo }) => {
  const [checked, setChecked] = useState(todo.done);

  const handleChange = () => {
    setChecked((prev) => !prev);
    changeDoneTodo(todo, checked);
  };

  return (
    <div className={style.checkbox}>
      <input
        id={todo.id}
        type="checkbox"
        checked={checked}
        className={style['checkbox__input']}
        onChange={handleChange}
      />
    </div>
  );
};
