import { HousingStockWithTasksResponse, TaskResponse } from 'myApi';

export type HousingStockTasksProps = {
  selectedHousingStock: HousingStockWithTasksResponse | null;
  clearSelectedHousingStock: () => void;
  task: TaskResponse | null;
  isLoadingTask: boolean;
  handleClickTask: (taskId: number) => void;
  clearTask: () => void;
};
