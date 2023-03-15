import React, { FC, useCallback } from 'react';
import { Wrapper } from './Button.styled';
import { ButtonProps } from './Button.types';

export const Button: FC<ButtonProps> = (props) => {
  const {
    type = 'default',
    className,
    onClick,
    disabled = props.isLoading,
    size = 'middle',
    sidePadding,
  } = props;

  const classNameString = [
    className,
    ...(disabled ? ['tt-button-disabled'] : []),
  ].join(' ');

  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (disabled) {
        return;
      }
      if (onClick) {
        return onClick(e);
      }
    },
    [onClick, disabled],
  );

  return (
    <Wrapper
      {...props}
      type={type}
      onClick={handleSubmit}
      className={classNameString}
      size={size}
      sidePadding={sidePadding}
    />
  );
};
