import { Form } from './components/Form';
import { Tabs } from './components/Tabs';
import { TodoList } from './components/TodoList';
import { Todo } from './shared/types';

export function App() {
  const todos = [
    { id: 0, done: false, title: 'review files' },
    { id: 1, done: true, title: 'Купить хлеб' },
    { id: 3, done: false, title: 'Покакать' },
  ];
  const tabs = ['Все', 'в работе', 'сделано'];

  const changeDoneTodo = (todo: Todo, done: boolean) => {
    todo.done = done;
  };
  return (
    <div className="container">
      <Form />
      <Tabs tabs={tabs} />
      <TodoList todos={todos} changeDoneTodo={changeDoneTodo} />
    </div>
  );
}
