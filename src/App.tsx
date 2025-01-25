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

  const getData = async () => {
    try {
      const res = await fetchData(currentTab);
      setTodos(res.data.reverse());
      setTabs(res?.info);
    } catch (error) {
      alert('OOops, request fetchData was droped');
    }
  };

  useEffect(() => {
    getData();
  }, [currentTab]);

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
      <TodoList todos={todos} getData={getData} />
    </div>
  );
}
