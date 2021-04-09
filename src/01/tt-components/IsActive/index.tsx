import React from 'react';
import { IconTT } from '../../tt-components';
import styled from 'styled-components';

export const IsActive = ({ closingDate = null }: any) => {
  console.log('closingDate', closingDate);
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

export default IsActive;

const StyledIsActive = styled.div`
  display: flex;
  align-items: center;
  padding-left: 4px;
  span {
    padding-left: 4px;
  }
`;
