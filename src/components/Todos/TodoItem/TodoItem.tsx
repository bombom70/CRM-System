import { FC, useState } from 'react';
import { TodoStatusToggler } from '../TodoStatusToggler';
import { Button, Flex, Typography, Avatar, FormProps, Form, Input } from 'antd';
import { fetchEditTodo, fetchDeleteTodo } from '../../../api/todos.ts';
import { Todo } from '../../../shared/types.ts';
import basketLogo from '../../../assets/basket.svg';
import editLogo from '../../../assets/edit.svg';

type Props = {
  todo: Todo;
  getData: () => void;
};

type FieldType = {
  task: string;
};

export const TodoItem: FC<Props> = ({ todo, getData }) => {
  const [isEdit, setIsEdits] = useState(false);

  const handleFinished: FormProps<FieldType>['onFinish'] = async ({ task }) => {
    try {
      await fetchEditTodo(todo.id, {
        title: task,
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
        <Form
          onFinish={handleFinished}
          autoComplete="off"
          layout="inline"
          initialValues={{ task: todo.title }}
          style={{ width: '100%' }}
          validateMessages={{ required: 'Task name is required' }}
        >
          <Form.Item<FieldType>
            name="task"
            rules={[
              {
                required: true,
              },
              { whitespace: true },
              { min: 2, message: 'Minimum number of characters 2' },
              { max: 64, message: 'Maximum number of characters 64' },
            ]}
            style={{ flexGrow: 1 }}
          >
            <Input
              variant="borderless"
              style={{ borderBottom: '1px solid lightgray', borderRadius: 0 }}
            />
          </Form.Item>
          <Form.Item>
            <Flex gap={4}>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
              <Button variant="solid" color="danger" onClick={handleCancel}>
                Cancel
              </Button>
            </Flex>
          </Form.Item>
        </Form>
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
