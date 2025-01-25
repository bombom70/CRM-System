import { FC } from 'react';
import style from './Button.module.scss';

type Props = {
  title?: string;
  children?: JSX.Element | string;
  variant?: 'primary' | 'danger';
  customClass?: string;
  onClick?: () => void;
};

export const Button: FC<Props> = ({
  title,
  variant = 'primary',
  children,
  customClass = '',
  onClick,
}) => {
  return (
    <button
      className={`${style.button} ${style[variant]} ${customClass}`}
      onClick={onClick}
    >
      {title}
      {children}
    </button>
  );
};
