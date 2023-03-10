import styled from 'styled-components';

export const Wrapper = styled.div<{ isConfirmed: boolean }>`
  display: flex;
  align-items: center;
  margin-left: 12px;
  gap: 8px;

  padding: 6px 8px;
  border-radius: 4px;

  font-size: 14px;
  color: ${({ isConfirmed }) => (isConfirmed ? '#FC525B' : '#272f5a')};
  background-color: ${({ isConfirmed }) =>
    isConfirmed ? '#FC525B1A' : '#17b45a1a'};

  path {
    fill: ${({ isConfirmed }) => (isConfirmed ? '#FC525B' : '#272f5a')};
  }
`;
