import { FC } from 'react';
import style from './Button.module.scss';

type Props = {
  title?: string;
  children?: JSX.Element | string;
  variant?: 'primary' | 'danger';
  customClass?: string;
};

export const Button: FC<Props> = ({
  title,
  variant = 'primary',
  children,
  customClass = '',
}) => {
  return (
    <button className={`${style.button} ${style[variant]} ${customClass}`}>
      {title}
      {children}
    </button>
  );
};
