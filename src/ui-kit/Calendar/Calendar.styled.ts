import styled, { css } from 'styled-components';
import { Calendar } from 'antd';

const circleRadius = 16;

export const Wrapper = styled.div`
  width: 320px;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
`;

export const CalendarSC = styled(Calendar)`
  th {
    color: #272f5a52;
    text-transform: uppercase;
  }
`;

const selectedDateStyle = css`
  background-color: #189ee9 !important;
  color: white;
  border: none;
`;

const currentDateStyle = css`
  border: 1px solid #dcdee4;
`;

const eventDateStyle = css`
  background-color: #189ee929;
`;

export const DateCircle = styled.div<{
  isSelectedDate?: boolean;
  isCurrentDate?: boolean;
  isEventDate?: boolean;
}>`
  position: relative;
  left: 50%;
  transform: translateX(-${circleRadius}px);
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  width: ${2 * circleRadius}px;
  height: ${2 * circleRadius}px;
  border-radius: ${circleRadius}px;

  cursor: pointer;
  transition: 0.2s;

  font-weight: 500;
  line-height: 0px;

  &:hover {
    background-color: #dcdee4;
  }

  ${({ isEventDate }) => isEventDate && eventDateStyle};
  ${({ isCurrentDate }) => isCurrentDate && currentDateStyle};
  ${({ isSelectedDate }) => isSelectedDate && selectedDateStyle};
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  padding: 8px 8px 0 8px;
`;

export const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  .right-chevron {
    transform: rotate(180deg);
  }

  svg {
    cursor: pointer;
  }
`;

const TextWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  color: #272f5a;
  font-weight: 600;
  text-transform: capitalize;
`;

export const MonthWrapper = styled(TextWrapper)`
  width: 96px;
`;

export const YearWrapper = styled(TextWrapper)`
  width: 48px;
`;
