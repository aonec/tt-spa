import { CalculatorListResponse, EConnectionStatusType } from 'api/types';
import {
  CalculatorAnalysisType,
  CalculatorsSortedList,
} from './connectionAnalysisService.types';

export const sortCalculator = (
  list: CalculatorListResponse[],
): CalculatorsSortedList => {
  const sortedList: CalculatorsSortedList = {
    Success: [],
    NotPolled: [],
    WithError: [],
    NoArchive: [],
  };

  list.forEach((calculator) => {
    const connectionStatus =
      calculator.connectionInfo?.connectionStatus ||
      EConnectionStatusType.Unknown;

    const preparedCalculator: CalculatorAnalysisType = {
      id: calculator.id,
      model: calculator.model || '',
      serialNumber: calculator.serialNumber || '',
      isConnected: calculator.isConnected || false,
      connectionStatus:
        calculator.connectionInfo?.connectionStatus ||
        EConnectionStatusType.Unknown,
      address: calculator.address,
    };

    if (!calculator.isConnected) {
      sortedList.NotPolled.push(preparedCalculator);
      return;
    }

    if (!calculator.connectionInfo) {
      sortedList.NoArchive.push(preparedCalculator);
      return;
    }

    switch (connectionStatus) {
      case EConnectionStatusType.Success:
        sortedList.Success.push(preparedCalculator);
        break;
      case EConnectionStatusType.NoConnection:
        sortedList.WithError.push(preparedCalculator);
        break;
      case EConnectionStatusType.UnstableConnection:
        sortedList.WithError.push(preparedCalculator);
        break;
      case EConnectionStatusType.DeviceMalfunction:
        sortedList.WithError.push(preparedCalculator);
        break;
      case EConnectionStatusType.Unknown:
        sortedList.NotPolled.push(preparedCalculator);
        break;
      default:
        sortedList.NoArchive.push(preparedCalculator);
        break;
    }
  });

  return sortedList;
};
