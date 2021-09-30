import React from 'react';
import { ChevronUp } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { closeExpandedSearch } from '../../models';

export const ExpandedSearch = () => {
  return (
    <Wrap>
      <SquareButton onClick={() => closeExpandedSearch()}>
        <ChevronUp style={{ color: 'white' }} />
      </SquareButton>
    </Wrap>
  );
};

const Wrap = styled.div`
  transform: translate(-10px, -10px);
  box-shadow: 0 4px 7px #02004b1f;
  height: 250px;
  border-radius: 8px;
  padding: 10px;
`;

const SquareButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: #189ee9;
`;
