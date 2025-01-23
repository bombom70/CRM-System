import { FC } from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '@/shared/types.ts';
import style from './TodoList.module.scss';

type Props = {
  todos?: Todo[];
  changeDoneTodo: (todo: Todo, done: boolean) => void;
};

export const TodoList: FC<Props> = ({ todos, changeDoneTodo }) => {
  return (
    <div className={style['todo-list']}>
      {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} changeDoneTodo={changeDoneTodo} />
      ))}
    </div>
  );
};
