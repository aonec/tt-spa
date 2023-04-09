import styled from 'styled-components';

export const ArrowContainer = styled.div<{ isDisabled: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${({ isDisabled }) => !isDisabled && 'cursor: pointer;'}
  svg {
    opacity: 0.7;
    fill: ${({ isDisabled }) =>
      isDisabled ? 'var(--main-32)' : 'var(--main-100)'};
    &:hover {
      opacity: ${({ isDisabled }) => (isDisabled ? 0.7 : 1)};
      fill: ${({ isDisabled }) =>
        isDisabled ? 'var(--main-32)' : 'var(--primary-100)'};
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 150px;
  height: 32px;
`;

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: #272f5ae5;

  user-select: none;
`;
