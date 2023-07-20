import { BuildingWithTasksResponse, TaskResponse } from 'api/myApi';

export type HousingStockTasksProps = {
  selectedHousingStock: BuildingWithTasksResponse | null;
  clearSelectedHousingStock: () => void;
  task: TaskResponse | null;
  isLoadingTask: boolean;
  handleClickTask: (taskId: number) => void;
  clearTask: () => void;
};
