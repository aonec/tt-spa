import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 16px 0 16px;
  display: flex;
  align-items: center;
`;

export const StatusBar = styled.div<{ isActive: boolean }>`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? '#00b300' : '#ff0000')};
`;

export const StatusText = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

export const ClosingReasonText = styled.span`
  &::before {
    content: '(';
  }

  &::after {
    content: ')';
  }
`;
