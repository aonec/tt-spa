import { Action } from 'redux';

enum DevicesSearchActions {
  SET_EXPIRATION_DATE = 'SET_EXPIRATION_DATE',
  SET_LOWER_DIAMETER_RANGE = 'SET_LOWER_DIAMETER_RANGE',
  SET_UPPER_DIAMETER_RANGE = 'SET_UPPER_DIAMETER_RANGE',
  SET_SEARCHTERM = 'SET_SEARCHTERM',
  SET_DEVICES_FILTER = 'SET_DEVICES_FILTER',
}

export type DeviceSearchReducerStateType = {
  searchTerm: string;
  expirationDate: string;
  lowerDiameterRange: string;
  upperDiameterRange: string;
  destination: 'Descending' | 'Ascending';
  rule: 'FutureCheckingDate' | 'Street';
};

export type FilterParameterType =
  | 'descendingFutureCheckingDate'
  | 'ascendingFutureCheckingDate'
  | 'descendingStreet'
  | 'ascendingStreet';

const devicesSearchReducer = (
  state: Partial<DeviceSearchReducerStateType>,
  action: DeviceSearchActionTypes
): Partial<DeviceSearchReducerStateType> => {
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

    case DevicesSearchActions.SET_LOWER_DIAMETER_RANGE:
      return {
        ...state,
        lowerDiameterRange: (action as SetLowerDiameterRange)
          .lowerDiameterRange,
      };

    case DevicesSearchActions.SET_UPPER_DIAMETER_RANGE:
      return {
        ...state,
        upperDiameterRange: (action as SetUpperDiameterRangeInterface)
          .upperDiameterRange,
      };

    case DevicesSearchActions.SET_DEVICES_FILTER:
      switch ((action as SetDevicesFilterInterface).filterParameter) {
        case 'descendingFutureCheckingDate':
          return {
            ...state,
            destination: 'Descending',
            rule: 'FutureCheckingDate',
          };

        case 'ascendingFutureCheckingDate':
          return {
            ...state,
            destination: 'Ascending',
            rule: 'FutureCheckingDate',
          };

        case 'descendingStreet':
          return {
            ...state,
            destination: 'Descending',
            rule: 'Street',
          };

        case 'ascendingStreet':
          return {
            ...state,
            destination: 'Ascending',
            rule: 'Street',
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
  expirationDate: string;
}

export const setExpirationDate = (
  expirationDate: string
): SetExpirationDateInterface => ({
  type: DevicesSearchActions.SET_EXPIRATION_DATE,
  expirationDate,
});

interface SetLowerDiameterRange extends ActionCreatorsInterface {
  lowerDiameterRange: string;
}

export const setLowerDiameterRange = (
  lowerDiameterRange: string
): SetLowerDiameterRange => ({
  type: DevicesSearchActions.SET_LOWER_DIAMETER_RANGE,
  lowerDiameterRange,
});

interface SetUpperDiameterRangeInterface extends ActionCreatorsInterface {
  upperDiameterRange: string;
}

export const setUpperDiameterRange = (
  upperDiameterRange: string
): SetUpperDiameterRangeInterface => ({
  type: DevicesSearchActions.SET_UPPER_DIAMETER_RANGE,
  upperDiameterRange,
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
  | SetLowerDiameterRange
  | SetUpperDiameterRangeInterface
  | SetSearchTermInterface
  | SetDevicesFilterInterface;

export default devicesSearchReducer;
