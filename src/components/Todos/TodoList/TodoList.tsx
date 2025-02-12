import { FC } from 'react';
import { TodoItem } from '../TodoItem';
import { Flex } from 'antd';
import { Todo } from '../../../api/todos/types';

type Props = {
  todos?: Todo[];
  getData: () => void;
};

export const TodoList: FC<Props> = ({ todos, getData }) => {
  if (!todos?.length) {
    return <div>List is empty</div>;
  }
  return (
    <Flex vertical gap={8}>
      {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} getData={getData} />
      ))}
    </Flex>
  );
};
