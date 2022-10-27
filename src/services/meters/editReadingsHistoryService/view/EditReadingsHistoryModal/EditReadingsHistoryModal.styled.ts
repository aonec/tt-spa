import styled from 'styled-components';
import { DatePicker } from 'ui-kit/DatePicker';

export const Wrapper = styled.div`
  padding: 10px 15px;
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 15px;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
`;

export const Header = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 3fr 2fr;
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
`;

export const DatePickerSC = styled(DatePicker)`
  width: 200px;

  background-color: transparent !important;
  border: none !important;
  cursor: pointer;
  input {
    text-transform: capitalize;
    text-align: center;
    cursor: pointer;
  }

  span.ant-picker-clear {
    display: none;
  }
`;

export const MonthSliderWrapper = styled.div`
  width: 100%;
  max-width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .right-chevron {
    transform: rotate(180deg);
  }
`;

export const ArrowContainer = styled.div<{ isDisabled?: boolean }>`
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
