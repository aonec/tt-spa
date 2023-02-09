import { getResourceColor } from '01/utils/getResourceColor';
import styled from 'styled-components';
import { ResourceType } from '../GraphView/GraphView.types';

export const LegendWrapper = styled.div`
  display: flex;
  width: 100%;
  position: absolute;
  left: 75px;
  bottom: 0px;

  .ant-tooltip-inner {
    border-radius: 4px;
    text-align: center;
  }
`;

export const LegendLineWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Percents = styled.span`
  color: var(--main-100);
  font-weight: 500;
  margin-right: 8px;
`;

export const Accuracy = styled.span`
  color: var(--main-70);
`;

export const LegendLine = styled.div<{
  resource?: ResourceType;
  color?: string;
}>`
  color: var(--main-70);
  margin-right: 64px;
  position: relative;

  &:before {
    content: '';
    display: block;
    position: absolute;
    left: -51px;
    top: 10px;
    width: 32px;
    height: 2px;
    background: ${({ resource, color }) =>
      resource ? getResourceColor(resource) : color};
  }
`;

export const LegendCircle = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;

  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

export const LegendCircleWithBorder = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;

  border: 3px solid ${({ color }) => color};
  border-radius: 50%;

  background-color: transparent;
`;

export const TasksLegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  margin-left: 200px;
`;

export const TaskLegendGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  color: #272f5ab2;
`;
