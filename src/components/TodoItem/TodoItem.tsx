import { FC } from 'react';
import { Todo } from '@/shared/types.ts';
import { Checkbox } from '../Checkbox';
import { Button } from '../Button';
import basketLogo from '../../assets/basket.svg';
import editLogo from '../../assets/edit.svg';
import style from './TodoItem.module.scss';

type Props = {
  todo?: Todo;
  changeDoneTodo: (todo: Todo, done: boolean) => void;
};

export const TodoItem: FC<Props> = ({ todo, changeDoneTodo }) => {
  return (
    <div className={style.todo}>
      <Checkbox todo={todo} changeDoneTodo={changeDoneTodo} />
      <span className={style['todo__title']}>{todo.title}</span>
      <div className={style['todo__actions']}>
        <Button>
          <img src={editLogo} />
        </Button>
        <Button variant="danger">
          <img src={basketLogo} />
        </Button>
      </div>
    </div>
  );
};
