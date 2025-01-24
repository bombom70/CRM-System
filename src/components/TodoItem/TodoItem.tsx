import { FC, useState } from 'react';
import { Checkbox } from '../Checkbox';
import { Button } from '../Button';
import { Input } from '../Input';
import basketLogo from '../../assets/basket.svg';
import editLogo from '../../assets/edit.svg';
import style from './TodoItem.module.scss';
import { fetchEditTodo } from '../../api';
import { Todo } from '../../shared/types.ts';

type Props = {
  todo: Todo;
  changeDoneTodo: (todo: Todo, isDone: boolean) => void;
  getData: () => void;
};

export const TodoItem: FC<Props> = ({ todo, changeDoneTodo, getData }) => {
  const [isEdit, setIsEdits] = useState(false);
  const [title, setTitle] = useState(todo.title ?? '');

  const handleSave = async () => {
    try {
      await fetchEditTodo(todo.id, {
        title,
        isDone: todo.isDone,
      });
      await getData(), setIsEdits(false);
    } catch (error) {
      alert('OOops, Failed to save');
    }
  };

  if (isEdit) {
    return (
      <div className={style.todo}>
        <Checkbox todo={todo} changeDoneTodo={changeDoneTodo} />
        <Input value={title} setValue={setTitle} />
        <div className={style['todo__actions']}>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={() => setIsEdits(false)} variant="danger">
            Cancell
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.todo}>
      <Checkbox todo={todo} changeDoneTodo={changeDoneTodo} />
      <span className={style['todo__title']}>{todo.title}</span>
      <div className={style['todo__actions']}>
        <Button onClick={() => setIsEdits(true)}>
          <img src={editLogo} />
        </Button>
        <Button variant="danger">
          <img src={basketLogo} />
        </Button>
      </div>
    </div>
  );
};
