import { DevicesType } from "../../../reducers/readingsReducer";

export enum ReadingsActionsType {
  SET_DEVICES = 'readings/SET_DEVICES',
  UPDATE_READINGS = 'readings/UPDATE_READINGS',
  SET_INPUT_FOCUSED = 'readings/SET_INPUT_FOCUSED',
  SET_INPUT_UNFOCUSED = 'readings/SET_INPUT_UNFOCUSED',
}

export type SetDevicesActionType = {
  type: ReadingsActionsType.SET_DEVICES;
  devices: DevicesType;
};

export type UpdateReadingsActionType = {
  type: ReadingsActionsType.UPDATE_READINGS;
  deviceId: number;
  readingNumber: number;
  readingValue: number;
};

export type SetInputFocusedActionType = {
  type: ReadingsActionsType.SET_INPUT_FOCUSED;
  deviceId: number;
};

export type SetInputUnfocusedActionType = {
  type: ReadingsActionsType.SET_INPUT_UNFOCUSED;
};
