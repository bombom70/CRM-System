import { FC } from 'react';
import { Todo } from '../../shared/types';
import { fetchDoneTodo } from '../../api';
import style from './TodoStatusToggler.module.scss';

type Props = {
  todo: Todo;
  getData: () => void;
};

export const TodoStatusToggler: FC<Props> = ({ todo, getData }) => {
  const changeDoneTodo = async (todo: Todo) => {
    try {
      const data = {
        isDone: !todo.isDone,
        title: todo.title,
      };
      await fetchDoneTodo(+todo.id, data);
      await getData();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={style['todo-status-toggler']}>
      <input
        id={todo.id}
        type="checkbox"
        checked={todo.isDone}
        className={style['todo-status-toggler__input']}
        onChange={() => changeDoneTodo(todo)}
      />
    </div>
  );
};
