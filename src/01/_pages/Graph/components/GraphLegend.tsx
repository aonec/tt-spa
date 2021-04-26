import React from 'react';
import { ResourceType } from './GraphView';
import { getResourceColor } from '../../../utils/getResourceColor';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { $graphData } from '../../../features/graph/graphView/models';
import { Tooltip } from 'antd';

interface Props {
  resource: ResourceType;
}

const GraphLegend = () => {
  const graphData = useStore($graphData);
  const { averageDeltaMass, deltaMassAccuracy, resource } = graphData.data;
  const absoluteDelta = Number(
    Math.abs((averageDeltaMass * deltaMassAccuracy) / 100).toFixed(1)
  );

  debugger;
  return (
    <LegendWrapper>
      <CurrentPeriod resource={resource}>Текущий период</CurrentPeriod>
      {resource === 'Heat' ? (
        <div>
          <Tooltip
            // title={`${Math.abs(
            //   (averageDeltaMass * deltaMassAccuracy) / 100
            // ).toFixed(1)}т`}
            //
            title={
              absoluteDelta == 0
                ? 'Абсолютная погрешность крайне мала'
                : absoluteDelta
            }
          >
            {Math.abs(deltaMassAccuracy).toFixed(1)}% - Относительная
            погрешность
          </Tooltip>
        </div>
      ) : null}
    </LegendWrapper>
  );
};

const LegendWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: -100px;
  left: 75px;
`;

const CurrentPeriod = styled.div<Props>`
  color: var(--main-70);
  margin-right: 16px;

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

export default GraphLegend;
