import { RequestNodeReadingsFunctionInterface } from '01/_api/node_readings_page';
import { GraphParamsType } from '../../Graph';

export type ArchiveEntryInterface = {
  timestamp: string;
  inputTemperature: number;
  outputTemperature: number;
  deltaTemperature: number;
  inputVolume: number;
  outputVolume: number;
  deltaVolume: number;
  inputMass: number;
  outputMass: number;
  deltaMass: number;
  inputPressure: number;
  outputPressure: number;
  deltaPressure: number;
  energy: number;
  timeWork: number;
};

export type ResourceType =
  | 'Heat'
  | 'ColdWaterSupply'
  | 'HotWaterSupply'
  | 'Electricity';

export type ReadingsInterface = {
  reportType: ReportType;
  resource: ResourceType;
  systemPipeCount: number;
  archiveEntries: ArchiveEntryInterface[];
  averageDeltaMass: number;
  deltaMassAccuracy: number;
};

export type GraphDataInterface = {
  time: string;
  value: number;
};

export type ReportType = 'hourly' | 'daily' | 'monthly';

export type GraphViewProps = {
  graphParam: GraphParamsType;
  data: ReadingsInterface;
  reportType: ReportType;
};
