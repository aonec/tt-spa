import React, { useEffect, useState } from 'react';
import GraphFilterForm from './components/GraphFilterForm';
import moment from 'moment';
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
import { ReportType } from './components/GraphView/GraphView.types';
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

  const reportType = 'daily' as ReportType;

  const from = moment()
    .subtract(1, 'week')
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

  const to = moment().set({ hour: 23, minute: 0, second: 0, millisecond: 0 });

  const getInitialState = () => {
    return {
      nodeId,
      reportType,
      from,
      to,
    };
  };

  const [graphParam, setGraphParam] = useState(
    () => getGraphParams(resource, pipeCount)[0]
  );
  const [searchQuery, setSearchQuery] = useState<QueryInterface>(
    getInitialState
  );

  useEffect(() => {
    run(requestNodeReadings(searchQuery));
  }, [searchQuery, run]);

  if (data) {
    setDataToStore(data);
  }

  return (
    <GraphContainer>
      {status === 'error' ? (
        <NoConnection
          text={
            'Вычислитель не опрашивается, невозможно получить данные с узла'
          }
        />
      ) : null}
      <GraphFilterForm
        paramsList={getGraphParams(resource, pipeCount)}
        setGraphParam={setGraphParam}
        setSearchQuery={setSearchQuery}
      />

      {(status === 'pending' || status === 'idle') && <div>ЗАГРУЗКА...</div>}

      {status === 'error' ? (
        <>
          <div>
            <img src={require('./assets/FallbackGraph.svg')} alt="546" />
          </div>
        </>
      ) : null}

      {status === 'resolved' && data && (
        <GraphParent>
          <GraphView graphParam={graphParam} dataObject={data} />
        </GraphParent>
      )}
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
