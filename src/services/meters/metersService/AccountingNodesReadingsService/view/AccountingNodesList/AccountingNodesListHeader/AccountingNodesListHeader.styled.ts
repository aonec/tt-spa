import styled from 'styled-components';
import { ChevronIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 0.38fr 0.6fr 0.6fr 0.35fr 0.6fr 70px;

  color: #616161;
  align-items: center;
  background: rgba(39, 47, 90, 0.04);
  padding: 16px;
  border-bottom: 2px solid #dcdee4;
  user-select: none;
`;

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  font-size: 12px;
  color: rgba(39, 47, 90, 0, 9);
`;

export const MonthWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 16px;
  font-weight: 500;
  font-size: 12px;
  color: rgba(39, 47, 90, 0, 9);
`;

export const ArrowContainer = styled.div<{ isDisabled: boolean }>`
  min-width: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  ${({ isDisabled }) => !isDisabled && 'cursor: pointer;'}

  svg path {
    opacity: ${({ isDisabled }) => (isDisabled ? 0.4 : 1)};
  }

  &:hover {
    svg path {
      transition: 0.2s;
      ${({ isDisabled }) => (isDisabled ? '' : 'fill: #189EE9 !important;')}
    }
  }
`;

export const RightChevronIcon = styled(ChevronIcon)`
  transform: rotate(180deg);
`;
