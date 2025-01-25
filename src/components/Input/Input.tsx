import { ChangeEvent, FC } from 'react';
import style from './Input.module.scss';

type Props = {
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
};

export const Input: FC<Props> = ({ value, placeholder, setValue }) => {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  return (
    <div className={style.input}>
      <input
        className={style['input__search']}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required
      />
      <div></div>
    </div>
  );
};
