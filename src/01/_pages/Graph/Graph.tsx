import React, {useEffect, useState} from 'react';
import GraphView, { ReportType, ResourceType} from "./components/GraphView";
import GraphFilterForm from "./components/GraphFilterForm";
import moment from "moment";
import {
  QueryInterface,
  requestNodeReadings,
  RequestNodeReadingsFunctionInterface
} from "../../_api/node_readings_page";
import {useAsync} from "../../hooks/useAsync";
import {Alert} from "antd";
import {getGraphParams} from "./utils";
import styled from "styled-components";
import GraphLegend from "./components/GraphLegend";

interface GraphProps {
  nodeId: number
  resource: ResourceType
  pipeCount: 1 | 2
}

export type GraphParamsType =
  | "inputMass"
  | "inputPressure"
  | "inputTemperature"
  | "inputVolume"
  | "outputMass"
  | "outputPressure"
  | "outputTemperature"
  | "outputVolume"
  | "deltaMass"
  | "deltaPressure"
  | "deltaTemperature"
  | "deltaVolume"
  | "energy"


const Graph: React.FC<GraphProps> = ({ nodeId, resource, pipeCount }) => {


  const { data, status, run} = useAsync();

  console.log(moment().utcOffset())

  const reportType = 'daily' as ReportType;

  const from = moment().subtract(1, 'week').set({hour:0,minute:0,second:0,millisecond:0}).add(moment().utcOffset(), 'minute').toISOString();

  const to = moment().set({hour:23,minute:0,second:0,millisecond:0}).add(moment().utcOffset(), 'minute').toISOString();

  const getInitialState = () => {
    return {
      nodeId,
      reportType,
      from,
      to
    }
  }

  const [graphParam, setGraphParam] = useState(() => getGraphParams(resource, pipeCount)[0]);
  const [searchQuery, setSearchQuery] = useState<QueryInterface>(getInitialState);

  useEffect(() => {
    run(requestNodeReadings(searchQuery))
  }, [searchQuery, run])



  return (
    <GraphContainer>
      <GraphFilterForm paramsList={getGraphParams(resource, pipeCount)} setGraphParam={setGraphParam} setSearchQuery={setSearchQuery}/>
      {status === 'pending' || status === 'idle' && <div>ЗАГРУЗКА...</div>}

      {status === 'rejected' && <Alert
          message="Ошибка"
          description="Нет данных за выбранный период. Пожалуйста, измените период для формирования новой статистики."
          type="error"
          showIcon
          closable
      />}

      {status === 'resolved' && <GraphView
          graphParam={graphParam}
          dataObject={data}
      />}
      {data && <GraphLegend resource={data.data.resource}/>}
    </GraphContainer>
  )
};

const GraphContainer = styled.div`
  max-width: 670px;
  position: relative;
  //padding-bottom: 80px;
`

export default Graph;
