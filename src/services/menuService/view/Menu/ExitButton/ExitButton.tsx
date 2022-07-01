import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { ExitIconSC, Text, Wrapper } from './ExitButton.styled';

export const ExitButton: FC = () => {
  const history = useHistory();

  const handleExit = useCallback(() => {
    localStorage.clear();
    history.push('/login');
  }, []);

  return (
    <Wrapper onClick={handleExit}>
      <ExitIconSC className="exit-button-icon" />
      <Text>Выйти</Text>
    </Wrapper>
  );
};
