import { TemperatureNormativeResponse } from 'api/types';

export type TemperatureGraphProps = {
  temperatureNormative: TemperatureNormativeResponse[];
  isEditing: boolean;
  handleEditTemperatureNormative: (payload: boolean) => void;
};
