import { FC } from 'react';
import { Form, Button, Input, Flex, FormProps } from 'antd';
import { fetchAddTodo } from '../../api';
import { Todo } from '../../shared/types';

type Props = {
  todos: Todo[];
  getData: (todos: Todo[]) => void;
};

type FieldType = {
  title: string;
};

export const FormAddTodo: FC<Props> = ({ todos, getData }) => {
  const [form] = Form.useForm();
  const handleFinished: FormProps<FieldType>['onFinish'] = async ({
    title,
  }) => {
    const data = {
      isDone: false,
      title,
    };

    try {
      await fetchAddTodo(data);
      await getData(todos);
      form.resetFields();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleFinished}
      autoComplete="off"
      layout="inline"
      initialValues={{ title: '' }}
      style={{ width: '100%' }}
      validateMessages={{ required: 'Task name is required' }}
    >
      <Form.Item<FieldType>
        name="title"
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
          placeholder="Task To Be Done..."
          style={{ borderBottom: '1px solid lightgray', borderRadius: 0 }}
        />
      </Form.Item>
      <Form.Item>
        <Flex gap={4}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};
