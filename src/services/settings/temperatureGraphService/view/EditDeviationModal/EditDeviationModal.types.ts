import { TemperatureLimitsType } from "../../temperatureGraphService.types";

export type EditDeviationModalProps = {
  isOpen: boolean;
  setModalOpen: (payload: boolean) => void;
  temperatureLimits: TemperatureLimitsType;
};
