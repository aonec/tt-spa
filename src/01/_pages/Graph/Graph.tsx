import React, { useEffect, useState } from 'react';
import {
  QueryInterface,
  requestNodeReadings,
  RequestNodeReadingsFunctionInterface,
} from '../../_api/node_readings_page';
import { useAsync } from '../../hooks/useAsync';
import { getGraphParams } from './utils';
import styled from 'styled-components';
import { EResourceType } from '../../../myApi';
import { NoConnection } from '../CalculatorProfile/components/Connection';
import { setDataToStore } from '../../features/graph/graphView/models';
import { GraphView } from './components/GraphView/GraphView';

interface GraphProps {
  nodeId: number;
  resource: EResourceType;
  pipeCount: number;
}

export type GraphParamsType =
  | 'inputMass'
  | 'inputPressure'
  | 'inputTemperature'
  | 'inputVolume'
  | 'outputMass'
  | 'outputPressure'
  | 'outputTemperature'
  | 'outputVolume'
  | 'deltaMass'
  | 'deltaPressure'
  | 'deltaTemperature'
  | 'deltaVolume'
  | 'energy';

const Graph: React.FC<GraphProps> = ({ nodeId, resource, pipeCount }) => {
  const {
    data,
    status,
    run,
  } = useAsync<RequestNodeReadingsFunctionInterface>();

  const [graphParam, setGraphParam] = useState(
    () => getGraphParams(resource, pipeCount)[0]
  );

  return (
    <GraphContainer>
      {status === 'error' ? (
        <NoConnection
          text={
            'Вычислитель не опрашивается, невозможно получить данные с узла'
          }
        />
      ) : null}

      {(status === 'pending' || status === 'idle') && <div>ЗАГРУЗКА...</div>}

      {status === 'error' ? (
        <>
          <div>
            <img src={require('./assets/FallbackGraph.svg')} alt="546" />
          </div>
        </>
      ) : null}

      {status === 'resolved' && data && <GraphParent></GraphParent>}
    </GraphContainer>
  );
};

const GraphParent = styled.div`
  position: absolute;
  top: 80px;
`;

const GraphContainer = styled.div`
  max-width: 670px;
  position: relative;
`;

export default Graph;
