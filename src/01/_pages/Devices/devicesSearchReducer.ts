import { CalculatorsListRequestPayload } from '01/features/carlculators/calculators/types';
import { Action } from 'redux';
import {
  ECalculatorOrderRule,
  EExpiresCheckingDateAt,
  EOrderByRule,
} from '../../../myApi';

enum DevicesSearchActions {
  SET_EXPIRATION_DATE = 'SET_EXPIRATION_DATE',
  SET_DIAMETER_RANGE = 'SET_DIAMETER_RANGE',
  SET_SEARCHTERM = 'SET_SEARCHTERM',
  SET_DEVICES_FILTER = 'SET_DEVICES_FILTER',
}

export type DeviceSearchReducerStateType = {
  searchTerm: string;
  expirationDate: EExpiresCheckingDateAt;
  diameterRange: [number, number];
  destination: EOrderByRule;
  rule: ECalculatorOrderRule;
};

export type FilterParameterType =
  | 'descendingFutureCheckingDate'
  | 'ascendingFutureCheckingDate'
  | 'descendingStreet'
  | 'ascendingStreet';

const devicesSearchReducer = (
  state: Partial<CalculatorsListRequestPayload>,
  action: DeviceSearchActionTypes
): any => {
  switch (action.type) {
    case DevicesSearchActions.SET_SEARCHTERM:
      return {
        ...state,
        searchTerm: (action as SetSearchTermInterface).searchTerm,
      };

    case DevicesSearchActions.SET_EXPIRATION_DATE:
      return {
        ...state,
        expirationDate: (action as SetExpirationDateInterface).expirationDate,
      };

    case DevicesSearchActions.SET_DIAMETER_RANGE:
      return {
        ...state,
        diameterRange: (action as SetDiameterRangeInterface).diameterRange,
      };

    case DevicesSearchActions.SET_DEVICES_FILTER:
      switch ((action as SetDevicesFilterInterface).filterParameter) {
        case 'descendingFutureCheckingDate':
          return {
            ...state,
            destination: EOrderByRule.Descending,
            rule: ECalculatorOrderRule.FutureCheckingDate,
          };

        case 'ascendingFutureCheckingDate':
          return {
            ...state,
            destination: EOrderByRule.Ascending,
            rule: ECalculatorOrderRule.FutureCheckingDate,
          };

        case 'descendingStreet':
          return {
            ...state,
            destination: EOrderByRule.Descending,
            rule: ECalculatorOrderRule.Street,
          };

        case 'ascendingStreet':
          return {
            ...state,
            destination: EOrderByRule.Ascending,
            rule: ECalculatorOrderRule.Street,
          };
        default:
          throw new Error('Нет такого параметра!');
      }

    default:
      return state;
  }
};

interface ActionCreatorsInterface extends Action<DevicesSearchActions> {
  type: DevicesSearchActions;
}

interface SetExpirationDateInterface extends ActionCreatorsInterface {
  expirationDate: EExpiresCheckingDateAt;
}

export const setExpirationDate = (
  expirationDate: EExpiresCheckingDateAt
): SetExpirationDateInterface => ({
  type: DevicesSearchActions.SET_EXPIRATION_DATE,
  expirationDate,
});

interface SetDiameterRangeInterface extends ActionCreatorsInterface {
  diameterRange: [number, number];
}

export const setDiameterRange = (
  diameterRange: [number, number]
): SetDiameterRangeInterface => ({
  type: DevicesSearchActions.SET_DIAMETER_RANGE,
  diameterRange,
});

interface SetSearchTermInterface extends ActionCreatorsInterface {
  searchTerm: string;
}

export const setSearchTerm = (searchTerm: string): SetSearchTermInterface => ({
  type: DevicesSearchActions.SET_SEARCHTERM,
  searchTerm,
});

interface SetDevicesFilterInterface extends ActionCreatorsInterface {
  filterParameter: FilterParameterType;
}

export const setDevicesFilter = (
  filterParameter: FilterParameterType
): SetDevicesFilterInterface => ({
  type: DevicesSearchActions.SET_DEVICES_FILTER,
  filterParameter,
});

export type DeviceSearchActionTypes =
  | SetExpirationDateInterface
  | SetDiameterRangeInterface
  | SetSearchTermInterface
  | SetDevicesFilterInterface;

export default devicesSearchReducer;
