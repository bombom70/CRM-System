import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { TodosStatus, Todo, TodoInfo } from '../../shared/types';
import { fetchData } from '../../api';
import { FormAddTodo } from '../../components/FormAddTodo';
import { TodoFilters } from '../../components/TodoFilters';
import { TodoList } from '../../components/TodoList';

const initialTabs = {
  all: 0,
  completed: 0,
  inWork: 0,
};

export const TodosPage: FC = () => {
  const prevTodos = useRef<Todo[] | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tabs, setTabs] = useState<TodoInfo>(initialTabs);
  const [currentTab, setCurrentTab] = useState<TodosStatus>(TodosStatus.ALL);

  const getData = useCallback(async () => {
    try {
      const res = await fetchData(currentTab);
      if (
        prevTodos.current &&
        JSON.stringify(prevTodos.current) === JSON.stringify(res.data)
      )
        return;
      prevTodos.current = res.data;
      setTodos(res.data);
      setTabs(res?.info ?? initialTabs);
    } catch (error) {
      alert(error);
    }
  }, [currentTab]);

  useEffect(() => {
    getData();
  }, [currentTab, getData]);

  useEffect(() => {
    const timer = setInterval(() => {
      getData();
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [currentTab, getData]);

  return (
    <>
      <FormAddTodo getData={getData} />
      <TodoFilters
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <TodoList todos={todos} getData={getData} />
    </>
  );
};
