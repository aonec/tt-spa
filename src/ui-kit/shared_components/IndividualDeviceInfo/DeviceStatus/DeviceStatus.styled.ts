import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-left: 15px;
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
`;

export const ClosingReasonText = styled.span`
  &::before {
    content: '(';
  }

  &::after {
    content: ')';
  }
`;
