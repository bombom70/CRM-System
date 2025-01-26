import { FC, useState } from 'react';
import { TodoStatusToggler } from '../TodoStatusToggler';
import { fetchDeleteTodo, fetchEditTodo } from '../../api';
import { Todo } from '../../shared/types.ts';
import { Button, Flex, Typography, Avatar } from 'antd';
import basketLogo from '../../assets/basket.svg';
import editLogo from '../../assets/edit.svg';
import { FormAddTodo } from '../FormAddTodo/FormAddTodo.tsx';

type Props = {
  todo: Todo;
  getData: () => void;
};

export const TodoItem: FC<Props> = ({ todo, getData }) => {
  const [isEdit, setIsEdits] = useState(false);

  const handleSubmit = async (title?: string) => {
    try {
      await fetchEditTodo(todo.id, {
        title,
        isDone: todo.isDone,
      });
      await getData();
      setIsEdits(false);
    } catch (error) {
      alert(error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await fetchDeleteTodo(id);
      await getData();
    } catch (error) {
      alert(error);
    }
  };

  const handleCancel = () => {
    setIsEdits(false);
  };

  const { Text } = Typography;

  return (
    <Flex align="center" gap={4}>
      <TodoStatusToggler todo={todo} getData={getData} />
      {isEdit && (
        <FormAddTodo
          name={`todoItemEdit_${todo.id}`}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          hasCancelBtn
          title={todo.title}
        />
      )}
      {!isEdit && (
        <>
          <Text
            style={{
              width: '100%',
            }}
          >
            {todo.title}
          </Text>
          <Flex gap={4}>
            <Button type="primary" onClick={() => setIsEdits(true)}>
              <Avatar src={editLogo} />
            </Button>
            <Button
              variant="solid"
              color="danger"
              htmlType="submit"
              onClick={() => handleDeleteTodo(+todo.id)}
            >
              <Avatar src={basketLogo} />
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
};
