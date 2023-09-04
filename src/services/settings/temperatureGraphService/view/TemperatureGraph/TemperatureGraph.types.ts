import { TemperatureNormativeRow } from 'api/types';

export type TemperatureGraphProps = {
  temperatureNormative: TemperatureNormativeRow[];
  isEditing: boolean;
  handleEditTemperatureNormative: (payload: boolean) => void;
};

export enum ETemteratureTypes {
  dayFeedFlowTemperature = 'dayFeedFlowTemperature',
  nightFeedFlowTemperature = 'nightFeedFlowTemperature',
  dayFeedBackFlowTemperature = 'dayFeedBackFlowTemperature',
  nightFeedBackFlowTemperature = 'nightFeedBackFlowTemperature',
  heatFeedFlowTemperature = 'heatFeedFlowTemperature',
}
