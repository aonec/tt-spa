import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoBackTypes } from './GoBack.types';
import { ChevronIconSC, GoBackSC } from './GoBack.styled';

export const GoBack: FC<GoBackTypes> = ({ path = '' }) => {
  const navigate = useNavigate();
  const onClickHandler = () => (path ? navigate(path) : navigate(-1));

  return (
    <GoBackSC onClick={onClickHandler}>
      <ChevronIconSC />
      <div>Назад</div>
    </GoBackSC>
  );
};
