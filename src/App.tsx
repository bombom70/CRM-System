import { useEffect, useState } from 'react';
import { Form } from './components/Form';
import { Tabs } from './components/Tabs';
import { TodoList } from './components/TodoList';
import { Todo, TodoInfo, Status } from './shared/types';
import { fetchData } from './api';

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tabs, setTabs] = useState<TodoInfo>();
  const [currentTab, setCurrentTab] = useState<Status>('all');

  const getData = async (status = 'all') => {
    try {
      const res = await fetchData(status);
      setTodos(res.data.reverse());
      setTabs(res?.info);
    } catch (error) {
      alert('OOops, request fetchData was droped');
    }
  };

  useEffect(() => {
    getData(currentTab);
  }, [currentTab]);

  const changeDoneTodo = (todo: Todo, isDone: boolean) => {
    todo.isDone = isDone;
  };

  return (
    <div className="container">
      <Form getData={getData} />
      {tabs && (
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      )}
      <TodoList
        todos={todos}
        changeDoneTodo={changeDoneTodo}
        getData={getData}
      />
    </div>
  );
}
