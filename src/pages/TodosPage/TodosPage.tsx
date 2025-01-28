import { FC, useEffect, useState } from 'react';
import { TODO_STATUS, Todo, TodoInfo } from '../../shared/types';
import { fetchAddTodo, fetchData } from '../../api';
import { FormAddTodo } from '../../components/FormAddTodo';
import { TodoFilters } from '../../components/TodoFilters';
import { TodoList } from '../../components/TodoList';

export const TodosPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tabs, setTabs] = useState<TodoInfo>();
  const [currentTab, setCurrentTab] = useState<TODO_STATUS>(TODO_STATUS.ALL);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetchData(currentTab);
      setTodos(res.data.reverse());
      setTabs(res?.info);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
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
    <>
      <FormAddTodo name="todoItem" handleSubmit={createTodo} />
      {tabs && (
        <TodoFilters
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      )}
      {loading && 'Loading...'}
      {!loading && <TodoList todos={todos} getData={getData} />}
    </>
  );
};
