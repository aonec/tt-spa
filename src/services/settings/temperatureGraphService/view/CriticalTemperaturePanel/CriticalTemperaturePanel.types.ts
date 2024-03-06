import { TemperatureLimitsType } from 'services/settings/temperatureGraphService/temperatureGraphService.types';

export type CriticalTemperaturePanelProps = {
  temperatureLimits: TemperatureLimitsType;
  setEditDeviationModalOpen: (payload: boolean) => void;
};
