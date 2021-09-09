import React from 'react';
import transformDate from '../../utils/transformDate';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  font-weight: 500;
  color: rgba(39, 47, 90, 1);
  line-height: 1.2;
  align-items: center;
  white-space: nowrap;
`;

export const DateLine = ({ lastCheckingDate, futureCheckingDate }) => {
  const last = transformDate(lastCheckingDate);
  const future = transformDate(futureCheckingDate);
  return (
    <Container>
      {last} {!!(last && future) && '—'} {future}
    </Container>
  );
};
