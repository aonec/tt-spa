import { CalculatorListResponse, EConnectionStatusType } from 'api/types';
import {
  CalculatorAnalysisType,
  CalculatorsSortedList,
} from './connectionAnalysisService.types';

export const sortCalculator = (
  list: CalculatorListResponse[],
): CalculatorsSortedList => {
  // Инициализируем объект для хранения отсортированных калькуляторов
  const sortedList: CalculatorsSortedList = {
    Success: [],
    NotPolled: [],
    WithError: [],
    NoArchive: [],
  };

  // Проходим по каждому элементу массива list
  list.forEach((calculator) => {
    const connectionStatus =
      calculator.connectionInfo?.connectionStatus ||
      EConnectionStatusType.Unknown;

    // Создаем объект типа CalculatorAnalysisType
    const preparedCalculator: CalculatorAnalysisType = {
      id: calculator.id,
      model: calculator.model || '',
      serialNumber: calculator.serialNumber || '',
      isConnected: calculator.isConnected || false,
      connectionStatus:
        calculator.connectionInfo?.connectionStatus ||
        EConnectionStatusType.Unknown,
    };

    if(calculator.isConnected === false){
        sortedList.NotPolled.push(preparedCalculator)
    }

    // Добавляем элемент в соответствующий массив в зависимости от connectionStatus
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
      default:
        sortedList.NotPolled.push(preparedCalculator);
        break;
    }
  });

  return sortedList;
};
