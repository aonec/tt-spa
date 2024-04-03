import {
  TemperatureNormativeRow,
  TemperatureNormativeRowUpdate,
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
  toggleDeletingRows: (payload: number | null) => void;
  deletingRowIds: number[];
  handleDeleteRows: () => void;
  isLoadingDeliting: boolean;
  handleCreateRow: (payload: TemperatureNormativeRowUpdate) => void;
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
