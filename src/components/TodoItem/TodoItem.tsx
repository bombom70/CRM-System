import { FC, useState } from 'react';
import { Checkbox } from '../Checkbox';
import { Button } from '../Button';
import { Input } from '../Input';
import basketLogo from '../../assets/basket.svg';
import editLogo from '../../assets/edit.svg';
import style from './TodoItem.module.scss';
import { fetchDeleteTodo, fetchEditTodo } from '../../api';
import { Todo } from '../../shared/types.ts';

type Props = {
  todo: Todo;
  getData: () => void;
};

export const TodoItem: FC<Props> = ({ todo, getData }) => {
  const [isEdit, setIsEdits] = useState(false);
  const [title, setTitle] = useState(todo.title ?? '');

  const handleSave = async () => {
    try {
      await fetchEditTodo(todo.id, {
        title,
        isDone: todo.isDone,
      });
      await getData();
      setIsEdits(false);
    } catch (error) {
      alert('OOops, Failed to save');
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await fetchDeleteTodo(id);
      await getData();
    } catch (error) {
      alert('OOops, Failed to delete todo');
    }
  };

  const handleCancel = () => {
    setIsEdits(false);
    setTitle(todo.title);
  };

  if (isEdit) {
    return (
      <div className={style.todo}>
        <Checkbox todo={todo} getData={getData} />
        <Input value={title} setValue={setTitle} />
        <div className={style['todo__actions']}>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel} variant="danger">
            Cancell
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.todo}>
      <Checkbox todo={todo} getData={getData} />
      <span className={style['todo__title']}>{todo.title}</span>
      <div className={style['todo__actions']}>
        <Button onClick={() => setIsEdits(true)}>
          <img src={editLogo} />
        </Button>
        <Button variant="danger" onClick={() => deleteTodo(+todo.id)}>
          <img src={basketLogo} />
        </Button>
      </div>
    </div>
  );
};
