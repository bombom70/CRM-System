import { FC } from 'react';
import { TodoItem } from '../TodoItem';
import style from './TodoList.module.scss';
import { Todo } from '../../shared/types';

type Props = {
  todos?: Todo[];
  changeDoneTodo: (todo: Todo, isDone: boolean) => void;
  getData: () => void;
};

export const TodoList: FC<Props> = ({ todos, changeDoneTodo, getData }) => {
  return (
    <div className={style['todo-list']}>
      {todos?.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          changeDoneTodo={changeDoneTodo}
          getData={getData}
        />
      ))}
    </div>
  );
};
