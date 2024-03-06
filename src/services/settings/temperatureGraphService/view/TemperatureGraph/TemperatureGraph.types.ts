import {
  TemperatureNormativeRow,
  TemperatureNormativeUpdateRequest,
} from 'api/types';
import {
  ErrorColumnType,
  TemperatureLimitsType,
} from '../../temperatureGraphService.types';

export type TemperatureGraphProps = {
  temperatureNormative: TemperatureNormativeRow[];
  isEditing: boolean;
  handleEditTemperatureNormative: (payload: boolean) => void;
  setEditedTemperatureNormative: (
    payload: TemperatureNormativeUpdateRequest,
  ) => void;
  isLoading: boolean;
  errorColumns: ErrorColumnType[];
  temperatureLimits: TemperatureLimitsType;
  setEditDeviationModalOpen: (payload: boolean) => void;
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
