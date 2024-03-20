import { TemperatureNormativeRowUpdate } from 'api/types';

export type Props = {
  temp: string;
  onCancel: () => void;
  handleCreateRow: (payload: TemperatureNormativeRowUpdate) => void;
};
