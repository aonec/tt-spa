import styled from 'styled-components';

export const GroupWrapper = styled.div<{ isDatePicker: boolean }>`
  display: grid;
  align-items: flex-start;

  grid-template-columns: 1fr ${({ isDatePicker }) =>
      isDatePicker ? '1fr' : ''};
  grid-gap: 16px;
`;
