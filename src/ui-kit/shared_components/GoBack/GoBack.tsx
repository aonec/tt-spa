import React, { FC, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { GoBackTypes } from './GoBack.types';
import { GoBackSC } from './GoBack.styled';

export const GoBack: FC<GoBackTypes> = ({ path = '' }) => {
  const history = useHistory();
  const onClickHandler = () => (path ? history.push(path) : history.goBack());

  return <GoBackSC onClick={onClickHandler}>&lt; Назад</GoBackSC>;
};
