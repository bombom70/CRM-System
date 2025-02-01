import { FC, useEffect, useMemo, useState } from 'react';
import { TODO_STATUS, Todo, TodoInfo } from '../../shared/types';
import { fetchAddTodo, fetchData } from '../../api';
import { FormAddTodo } from '../../components/FormAddTodo';
import { TodoFilters } from '../../components/TodoFilters';
import { TodoList } from '../../components/TodoList';

export const TodosPage: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tabs, setTabs] = useState<TodoInfo>();
  const [currentTab, setCurrentTab] = useState<TODO_STATUS>(TODO_STATUS.ALL);

  const getData = useMemo(() => {
    let prevTodos: Todo[];

    return async (todos?: Todo[]) => {
      if (JSON.stringify(prevTodos) === JSON.stringify(todos)) return;
      prevTodos = todos ?? [];

      try {
        const res = await fetchData(currentTab);
        setTodos(res.data.reverse());
        setTabs(res?.info);
      } catch (error) {
        alert(error);
      }
    };
  }, [currentTab]);

  const createTodo = async (title?: string) => {
    const data = {
      isDone: false,
      title,
    };

    try {
      await fetchAddTodo(data);
      await getData(todos);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getData(todos);
  }, [currentTab]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getData(todos);
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  });

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
      <TodoList todos={todos} getData={getData} />
    </>
  );
};
