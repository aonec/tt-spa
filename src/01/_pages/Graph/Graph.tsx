import React, {useCallback, useState} from 'react';
import GraphView, {ReadingsInterface, ReportType, ResourceType} from "./components/GraphView";
import GraphFilterForm from "./components/GraphFilterForm";
import {useParams} from "react-router-dom";
import moment from "moment";
import {requestNodeReadings, RequestNodeReadingsFunctionInterface} from "../../_api/node_readings_page";
import {useAsync} from "../../hooks/useAsync";

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
  // const { nodeId } = useParams();
  // const params = useParams();

  const getGraphParams = (resource: ResourceType, pipeCount: 1 | 2):GraphParamsType[] => {
    switch (resource) {
      case "ColdWaterSupply":
        return ["InputVolume"]
      case "HotWaterSupply":
        return pipeCount === 1 ? ["InputVolume", "Energy"] : ["DeltaVolume", "Energy"]
      case "Heat":
        return pipeCount === 1 ? ["InputVolume", "Energy"] : ["DeltaVolume", "Energy"]
      default:
        console.log('Ресурс', resource, 'и количество труб ', pipeCount, 'не предусмотрено');
        return []
    }
  }

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

  return (
    <div>
      <GraphFilterForm paramsList={getGraphParams(resource, pipeCount)} setGraphParam={setGraphParam} setSearchQuery={setSearchQuery}/>
      <GraphView graphParam={graphParam} searchQuery={searchQuery}/>
    </div>
  );
};

export default Graph;
