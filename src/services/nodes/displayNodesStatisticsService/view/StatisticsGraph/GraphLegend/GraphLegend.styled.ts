import { EResourceType } from 'api/types';
import styled from 'styled-components';
import { GraphColorLookup } from 'utils/Graph.utils';
import { Checkbox } from 'antd';

export const LegendWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 32px;
  position: absolute;
  left: 75px;

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
  resource?: EResourceType;
  color?: string;
}>`
  color: var(--main-70);
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
      resource ? GraphColorLookup[resource] : color};
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

export const LegendColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TaskLegendGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  color: #272f5ab2;
`;

export const CheckboxSC = styled(Checkbox)`
  color: #272f5ae5;
  user-select: none;
`;
