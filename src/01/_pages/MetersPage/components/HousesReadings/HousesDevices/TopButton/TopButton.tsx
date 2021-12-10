import React from 'react';
import { ChevronDoubleUp, ChevronUp, StopCircle } from 'react-bootstrap-icons';
import { useState } from 'react';
import styled from 'styled-components';

export const TopButton = () => {
  const { fastUp, slowUp, isUpRunnung, stopUp } = useUpPage();
  return (
    <Wrap>
      <Botton onClick={isUpRunnung ? stopUp : slowUp}>
        {isUpRunnung ? <StopCircle /> : <ChevronUp />}
      </Botton>
      <Botton onClick={fastUp}>
        <ChevronDoubleUp />
      </Botton>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  z-index: 5;
`;

const Botton = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;
  background: white;

  &:first-child {
    border-right: 1px solid lightgray;
    border-radius: 8px 0 0 8px;
  }

  &:last-child {
    border-radius: 0 8px 8px 0;
  }

  &:hover {
    background: #0099ff;
    color: white;

    font-size: 22px;

    &:first-child {
      border-right: none;
    }
  }
`;

function useUpPage() {
  const [intervalNumber, setIntervalNumber] = useState<number | null>(null);

  return {
    fastUp() {
      window.scrollTo(0, 0);
    },
    slowUp: () => {
      const intervalId = setInterval(() => {
        window.scrollBy(0, -1);

        if (window.scrollY === 0 && intervalNumber) {
          clearInterval(intervalNumber);
          setIntervalNumber(null);
        }
      }, 3);

      setIntervalNumber(intervalId as any);
    },
    isUpRunnung: Boolean(intervalNumber),
    stopUp() {
      if (intervalNumber) {
        clearInterval(intervalNumber);
        setIntervalNumber(null);
      }
    },
  };
}
