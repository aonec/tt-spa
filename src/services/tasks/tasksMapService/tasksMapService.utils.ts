import {
  GetHousingStocksWithTasksRequestPayload,
  HousingStocksWithTasksFiltrationValues,
} from './tasksMapService.types';

export const getHousingStocksWithTasksRequestPayload = ({
  engineeringElement,
  resourceTypes,
  timeStatus,
  type,
  executorId,
}: HousingStocksWithTasksFiltrationValues): GetHousingStocksWithTasksRequestPayload => {
  return {
    EngineeringElement: engineeringElement || undefined,
    ResourceTypes: resourceTypes,
    TimeStatus: timeStatus || undefined,
    TaskType: type || undefined,
    ExecutorId: executorId || undefined,
  };
};
