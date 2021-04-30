import React from 'react';
import { ResourceType } from './GraphView';
import { getResourceColor } from '../../../utils/getResourceColor';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { $graphData } from '../../../features/graph/graphView/models';
import { Tooltip } from 'antd';
import { GraphParamsType } from '../Graph';

interface Props {
  resource: ResourceType;
}

const GraphLegend = ({ graphParam }: { graphParam: GraphParamsType }) => {
  const graphData = useStore($graphData);
  const { averageDeltaMass, deltaMassAccuracy, resource } = graphData.data;
  const absoluteDelta = Number(
    Math.abs((averageDeltaMass * deltaMassAccuracy) / 100).toFixed(1)
  );

  debugger;
  return (
    <LegendWrapper>
      <CurrentPeriod resource={resource}>Текущий период</CurrentPeriod>
      {resource === 'Heat' && graphParam === 'deltaMass' ? (
        <div>
          <Tooltip
            getPopupContainer={(triggerNode) =>
              triggerNode.parentNode as HTMLElement
            }
            color={'var(--main-100)'}
            // title={`${Math.abs(
            //   (averageDeltaMass * deltaMassAccuracy) / 100
            // ).toFixed(1)}т`}
            //
            title={
              absoluteDelta == 0
                ? 'Абсолютная погрешность крайне мала'
                : `Абсолютная погрешность ${absoluteDelta} т`
            }
            // title={`Абсолютная погрешность ${absoluteDelta} т`}
            // title={`Абсолютная погрешность 4.66 т`}
          >
            <Percents>{Math.abs(deltaMassAccuracy).toFixed(1)}%</Percents>
            <Accuracy>Относительная погрешность</Accuracy>
          </Tooltip>
        </div>
      ) : null}
    </LegendWrapper>
  );
};

const LegendWrapper = styled.div`
  display: flex;
  width: 100%;
  position: absolute;
  bottom: -100px;
  left: 75px;

  .ant-tooltip-inner {
    border-radius: 4px;
    text-align: center;
    //white-space: nowrap;
  }
`;

const CurrentPeriod = styled.div<Props>`
  color: var(--main-70);
  margin-right: 32px;

  &:before {
    content: '';
    display: block;
    position: absolute;
    left: -51px;
    top: 10px;
    width: 32px;
    height: 2px;
    background: ${(props) => getResourceColor(props.resource)};
  }
`;

const Percents = styled.span`
  color: var(--main-100);
  font-weight: 500;
  margin-right: 8px;
`;

const Accuracy = styled.span`
  color: var(--main-70);
`;

export default GraphLegend;
