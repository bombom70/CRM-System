import { FC } from 'react';
import { Todo } from '../../shared/types';
import { fetchDoneTodo } from '../../api';
import { Checkbox } from 'antd';

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
