import { ChangeEvent, FC, useEffect, useState } from 'react';
import { validationValue } from '../../shared/validation';
import { Form, Button, Input, Flex } from 'antd';

type Props = {
  title?: string;
  name: string;
  placeholder?: string;
  hasCancelBtn?: boolean;
  handleSubmit: (value?: string) => void;
  handleCancel?: () => void;
};

export const FormAddTodo: FC<Props> = ({
  title,
  name,
  placeholder = 'Task To Be Done...',
  hasCancelBtn,
  handleCancel,
  handleSubmit,
}) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState(title ?? '');
  const initialValues = value ? { [name]: value } : { [name]: '' };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  useEffect(() => {
    form.setFieldsValue({ [name]: value });
  }, [form, initialValues]);

  const handleFinished = async () => {
    try {
      await handleSubmit(value);
      setValue('');
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
      initialValues={initialValues}
      style={{ width: '100%' }}
    >
      <Form.Item
        name={name}
        rules={[
          {
            required: true,
            validator: (_, value) => validationValue(value ?? ''),
          },
        ]}
        style={{ flexGrow: 1 }}
      >
        <Input
          variant="borderless"
          placeholder={placeholder}
          value={value}
          style={{ borderBottom: '1px solid lightgray', borderRadius: 0 }}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item>
        <Flex gap={4}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
          {hasCancelBtn && (
            <Button variant="solid" color="danger" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </Flex>
      </Form.Item>
    </Form>
  );
};
