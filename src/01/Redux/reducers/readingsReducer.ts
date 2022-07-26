import { ReadingsStateType } from '01/_api/houses_readings_page';
import { IndividualDeviceType } from '../../../types';
import { ActionTypes } from '../ducks/readings/actionCreators';
import { ReadingsActionsType } from '../ducks/readings/contracts/actionTypes';
import { IndividualDeviceListItemResponse } from '.../../api/types';

export type DisabledStateType = {
  deviceId: number;
  isDisabled: boolean;
}[];

const ReadingsState = {
  hasNextPage: false,
  hasPreviousPage: false,
  nextPageNumber: 2,
  pageNumber: 1,
  pageSize: 5,
  previousPageNumber: 0,
  totalItems: 10,
  totalPages: 0,
  items: [] as IndividualDeviceListItemResponse[],
  disabledState: [] as DisabledStateType,
};

export type DevicesType = typeof ReadingsState.items;

const readingsReducer = (
  state: ReadingsStateType = ReadingsState,
  action: ActionTypes
): ReadingsStateType => {
  switch (action.type) {
    case ReadingsActionsType.SET_DEVICES:
      return {
        ...state,
        items: action.devices,
        disabledState: action.devices.map((device) => ({
          deviceId: device.id,
          isDisabled: false,
        })),
      };

    case ReadingsActionsType.UPDATE_READINGS:
      return {
        ...state,
        items: state.items.map((device) =>
          device.id === action.deviceId
            ? {
                ...device,
                readings:
                  device.readings?.map((reading, index) => {
                    return index === 0
                      ? {
                          ...reading,
                          [`value${action.readingNumber}`]: action.readingValue,
                        }
                      : reading;
                  }) || [],
              }
            : device
        ),
      };

    case ReadingsActionsType.SET_INPUT_FOCUSED:
      return {
        ...state,
        disabledState: state.disabledState?.map((disabledObj) => {
          return action.deviceId === disabledObj.deviceId
            ? { ...disabledObj, isDisabled: false }
            : { ...disabledObj, isDisabled: true };
        }),
      };

    case ReadingsActionsType.SET_INPUT_UNFOCUSED:
      return {
        ...state,
        disabledState: state.disabledState?.map((disabledObj) => {
          return { ...disabledObj, isDisabled: false };
        }),
      };

    default:
      return state;
  }
};

export default readingsReducer;
