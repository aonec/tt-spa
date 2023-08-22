import {
  TemperatureNormativeRow,
  TemperatureNormativeUpdateRequest,
} from 'api/types';

export type TemperatureGraphProps = {
  temperatureNormative: TemperatureNormativeRow[];
  isEditing: boolean;
  handleEditTemperatureNormative: (payload: boolean) => void;
  setEditedTemperatureNormative: (
    payload: TemperatureNormativeUpdateRequest,
  ) => void;
  isLoading: boolean;
};

export enum ETemteratureTypes {
  dayFeedFlowTemperature = 'dayFeedFlowTemperature',
  nightFeedFlowTemperature = 'nightFeedFlowTemperature',
  dayFeedBackFlowTemperature = 'dayFeedBackFlowTemperature',
  nightFeedBackFlowTemperature = 'nightFeedBackFlowTemperature',
  heatFeedFlowTemperature = 'heatFeedFlowTemperature',
}
export enum EDayPartError {
  day = 'day',
  night = 'night',
}
