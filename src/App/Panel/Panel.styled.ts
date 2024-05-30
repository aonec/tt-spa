import styled from 'styled-components';

export const Wrapper = styled.div<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? '208px' : '48px')};
  padding-top: 10px;
  position: fixed;
  height: 100vh;
  background: #f3f5f6;
  z-index: 5;
`;

export const MenuWrapper = styled.div`
  margin-top: 10px;
`;
