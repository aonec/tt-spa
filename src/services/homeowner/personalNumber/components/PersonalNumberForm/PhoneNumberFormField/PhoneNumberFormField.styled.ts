import styled from 'styled-components';

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
`;

export const TextWrapper = styled.span`
  max-width: 220px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  justify-content: space-between;
`;