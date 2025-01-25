import { FC } from 'react';
import style from './Checkbox.module.scss';
import { Todo } from '../../shared/types';
import { fetchDoneTodo } from '../../api';

type Props = {
  todo: Todo;
  getData: () => void;
};

export const Checkbox: FC<Props> = ({ todo, getData }) => {
  const changeDoneTodo = async (todo: Todo) => {
    try {
      const data = {
        isDone: !todo.isDone,
        title: todo.title,
      };
      await fetchDoneTodo(+todo.id, data);
      await getData();
    } catch (error) {
      alert('OOops, Failed to change done on todo');
    }
  };

  return (
    <div className={style.checkbox}>
      <input
        id={todo.id}
        type="checkbox"
        checked={todo.isDone}
        className={style['checkbox__input']}
        onChange={() => changeDoneTodo(todo)}
      />
    </div>
  );
};
