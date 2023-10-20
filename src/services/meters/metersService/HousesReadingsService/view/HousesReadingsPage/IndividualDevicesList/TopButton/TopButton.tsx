import React from 'react';
import { ChevronDoubleUp, ChevronUp, StopCircle } from 'react-bootstrap-icons';
import { useUpPage } from './TopButton.hook';
import { Button, Wrapper } from './TopButton.styled';

export const TopButton = () => {
  const { fastUp, slowUp, isUpRunnung, stopUp } = useUpPage();

  return (
    <Wrapper>
      <Button onClick={isUpRunnung ? stopUp : slowUp}>
        {isUpRunnung ? <StopCircle /> : <ChevronUp />}
      </Button>
      <Button onClick={fastUp}>
        <ChevronDoubleUp />
      </Button>
    </Wrapper>
  );
};
