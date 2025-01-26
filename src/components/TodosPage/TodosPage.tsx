import { FC, useEffect, useState } from 'react';
import { TODO_STATUS, Todo, TodoInfo } from '../../shared/types';
import { fetchAddTodo, fetchData } from '../../api';
import { FormAddTodo } from '../FormAddTodo';
import { TodoFilters } from '../TodoFilters';
import { TodoList } from '../TodoList';
import style from './TodosPage.module.scss';
import { Row, Col } from 'antd';

export const TodosPage: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tabs, setTabs] = useState<TodoInfo>();
  const [currentTab, setCurrentTab] = useState<TODO_STATUS>(TODO_STATUS.ALL);

  const getData = async () => {
    try {
      const res = await fetchData(currentTab);
      setTodos(res.data.reverse());
      setTabs(res?.info);
    } catch (error) {
      alert(error);
    }
  };

  const createTodo = async (title?: string) => {
    const data = {
      isDone: false,
      title,
    };

    try {
      await fetchAddTodo(data);
      await getData();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getData();
  }, [currentTab]);

  return (
    <Row>
      <Col span={8} offset={8}>
        <FormAddTodo name="todoItem" handleSubmit={createTodo} />
        {tabs && (
          <TodoFilters
            tabs={tabs}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        )}
        <TodoList todos={todos} getData={getData} />
      </Col>
    </Row>
  );
};
