import { FC } from 'react';
import { TodoItem } from '../TodoItem';
import style from './TodoList.module.scss';
import { Todo } from '../../shared/types';

type Props = {
  todos?: Todo[];
  getData: () => void;
};

export const TodoList: FC<Props> = ({ todos, getData }) => {
  if (!todos?.length) {
    return <div>List is empty</div>;
  }
  return (
    <div className={style['todo-list']}>
      {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} getData={getData} />
      ))}
    </div>
  );
};
