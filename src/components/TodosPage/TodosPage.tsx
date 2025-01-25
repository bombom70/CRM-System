import { FC, useEffect, useState } from 'react';
import { TODO_STATUS, Todo, TodoInfo } from '../../shared/types';
import { fetchData } from '../../api';
import { FormAddTodo } from '../FormAddTodo';
import { TodoFilters } from '../TodoFilters';
import { TodoList } from '../TodoList';
import style from './TodosPage.module.scss';

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

  useEffect(() => {
    getData();
  }, [currentTab]);

  return (
    <div className={style['todos-page']}>
      <FormAddTodo getData={getData} />
      {tabs && (
        <TodoFilters
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      )}
      <TodoList todos={todos} getData={getData} />
    </div>
  );
};
