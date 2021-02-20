import React, {useEffect, useState} from 'react';
import GraphView, { ReportType, ResourceType} from "./components/GraphView";
import GraphFilterForm from "./components/GraphFilterForm";
import moment from "moment";
import {requestNodeReadings, RequestNodeReadingsFunctionInterface} from "../../_api/node_readings_page";
import {useAsync} from "../../hooks/useAsync";
import {Alert} from "antd";
import {getGraphParams} from "./utils";

interface GraphProps {
  nodeId: number
  resource: ResourceType
  pipeCount: 1 | 2
}

export type GraphParamsType =
  | "InputMass"
  | "InputPressure"
  | "InputTemperature"
  | "InputVolume"
  | "OutputMass"
  | "OutputPressure"
  | "OutputTemperature"
  | "OutputVolume"
  | "DeltaMass"
  | "DeltaPressure"
  | "DeltaTemperature"
  | "DeltaVolume"
  | "Energy"


const Graph: React.FC<GraphProps> = ({ nodeId, resource, pipeCount }) => {


  const { data, status, run} = useAsync();

  const reportType = 'daily' as ReportType;

  const from = moment().subtract(1, 'week').set({hour:23,minute:0,second:0,millisecond:0}).toISOString();

  const to = moment().set({hour:0,minute:0,second:0,millisecond:0}).toISOString();

  const getInitialState = () => {
    return {
      nodeId,
      reportType,
      from,
      to
    }
  }

  const [graphParam, setGraphParam] = useState(() => getGraphParams(resource, pipeCount)[0]);
  const [searchQuery, setSearchQuery] = useState<RequestNodeReadingsFunctionInterface>(getInitialState);

  useEffect(() => {
    run(requestNodeReadings(searchQuery))
  }, [searchQuery, run])

  return (
    <div style={{paddingBottom: 80}}>
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
          data={data}
          reportType={searchQuery.reportType}
      />}
    </div>
  )
};

export default Graph;
