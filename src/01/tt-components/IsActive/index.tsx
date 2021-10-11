import React from 'react';
import { IconTT } from '../../tt-components';
import styled from 'styled-components';

export const IsActive = ({ closingDate = null }: any) => {
  return (
    <StyledIsActive>
      {closingDate ? (
        <>
          <IconTT icon={'red'} />
          <span>Не активно</span>
        </>
      ) : (
        <>
          <IconTT icon={'green'} />
          <span>Активно</span>
        </>
      )}
    </StyledIsActive>
  );
};

export const IsActiveBool = ({ active }: any) => {
  return (
    <StyledIsActive>
      {active ? (
        <>
          <IconTT icon={'green'} />
          <span>Активно</span>
        </>
      ) : (
        <>
          <IconTT icon={'red'} />
          <span>Не активно</span>
        </>
      )}
    </StyledIsActive>
  );
};

export default IsActive;

const StyledIsActive = styled.div`
  display: flex;
  align-items: center;
  padding-left: 4px;
  span {
    padding-left: 4px;
  }
`;
