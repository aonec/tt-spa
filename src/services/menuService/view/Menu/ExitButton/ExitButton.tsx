import React, { FC, useCallback } from 'react';
import { ExitIconSC, Text, Wrapper } from './ExitButton.styled';

export const ExitButton: FC = () => {
  const handleExit = useCallback(() => {
    localStorage.clear();
    window.location.replace('/login');
  }, []);

  return (
    <Wrapper onClick={handleExit}>
      <ExitIconSC className="exit-button-icon" />
      <Text>Выйти</Text>
    </Wrapper>
  );
};
