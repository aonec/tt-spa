import React from 'react';
import { ChevronDoubleUp, ChevronUp, StopCircle } from 'react-bootstrap-icons';
import { useUpPage } from './TopButton.hook';
import { Botton, Wrapper } from './TopButton.styled';

export const TopButton = () => {
  const { fastUp, slowUp, isUpRunnung, stopUp } = useUpPage();
  
  return (
    <Wrapper>
      <Botton onClick={isUpRunnung ? stopUp : slowUp}>
        {isUpRunnung ? <StopCircle /> : <ChevronUp />}
      </Botton>
      <Botton onClick={fastUp}>
        <ChevronDoubleUp />
      </Botton>
    </Wrapper>
  );
};
