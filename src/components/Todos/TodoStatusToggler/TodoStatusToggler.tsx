import { FC } from 'react';
import { fetchDoneTodo } from '../../../api/todos/todos';
import { Checkbox } from 'antd';
import { Todo } from '../../../api/todos/types';

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
    <Checkbox onChange={() => changeDoneTodo(todo)} checked={todo.isDone} />
  );
};
