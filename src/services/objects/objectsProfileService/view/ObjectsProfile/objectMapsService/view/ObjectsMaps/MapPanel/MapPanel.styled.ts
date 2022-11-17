import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div<{ isWithPaddings: boolean }>`
  width: 352px;
  padding: ${({ isWithPaddings }) => (isWithPaddings ? '15px' : 'none')};
  background: white;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  position: relative;
`;

export const SearchResultWrapper = styled.div`
  display: inline-block;
  position: absolute;
  width: calc(100% - 30px);
  top: 50px;
  overflow: visible;
  background: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
`;

const showAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const SearchResultItem = styled.div`
  padding: 5px;
  border-bottom: 1px solid #dcdee4;
  cursor: pointer;
  transition: 0.2s;
  color: #272f5ab2;

  &:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  &:last-child {
    border-bottom: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  &:hover {
    background: #189ee9;
    border-color: #189ee9;
    color: white;
  }

  animation: 0.2s ${showAnimation} ease;
`;
