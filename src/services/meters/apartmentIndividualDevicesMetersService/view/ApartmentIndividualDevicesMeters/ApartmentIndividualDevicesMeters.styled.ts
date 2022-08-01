import styled from 'styled-components';

export const Wrapper = styled.div``;

export const Header = styled.div`
  min-width: 950px;
  display: grid;
  align-items: center;
  grid-template-columns: 0.65fr 0.8fr 0.6fr 0.6fr 0.6fr;
  grid-gap: 15px;

  background: rgba(39, 47, 90, 0.04);
  height: 48px;
  padding: 0 15px;
  border-bottom: 1px solid #dcdee4;
  font-weight: 400;
  line-height: 16px;
  user-select: none;

  .device-info {
    font-weight: 600;
  }

  .current-reading {
    text-align: center;
  }
`;

export const MonthSliderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .right-chevron {
    transform: rotate(180deg);
  }
`;

export const ArrowContainer = styled.div<{ isDisabled: boolean }>`
  min-width: 10px;
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
