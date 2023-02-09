import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { GoBackTypes } from './GoBack.types';
import { ChevronIconSC, GoBackSC } from './GoBack.styled';

export const GoBack: FC<GoBackTypes> = ({ path = '' }) => {
  const history = useHistory();
  const onClickHandler = () => (path ? history.push(path) : history.goBack());

  return (
    <GoBackSC onClick={onClickHandler}>
      <ChevronIconSC />
      <div>Назад</div>
    </GoBackSC>
  );
};
