import {
  ErpExecutorResponse,
  ErpTaskDeadlineResponse,
  ErpSourceResponse,
  ErpWorkCategoryResponse,
  ErpObjectResponse,
  ResourceDisconnectingResponse,
} from 'api/types';
import { AddTask } from './AddTaskForm/AddTaskForm.types';
import {
  ErpTaskReasons,
  ExistingApartmentNumberType,
  GetTaskDeadlineRequest,
  HomeownerNameOption,
} from '../../addTaskFromDispatcherService.types';

export type AddTaskModalProps = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  ERPSources: ErpSourceResponse[];
  ErpObjects: ErpObjectResponse[];
  leadExecutors: ErpExecutorResponse[];
  workCategories: ErpWorkCategoryResponse[];
  handleCreateTask: (payload: AddTask) => void;
  choоseLeadExecutor: (payload: string) => void;
  executors: ErpExecutorResponse[];
  handleTaskDeadlineRequest: (payload: GetTaskDeadlineRequest) => void;
  taskDeadline: ErpTaskDeadlineResponse | null;
  isCreatePending: boolean;
  handleSelectHousingAddress: (payload: string) => void;
  existingApartmentNumbers: ExistingApartmentNumberType[];
  resourceDisconnection: ResourceDisconnectingResponse[];
  handleSelectApartmentNumber: (payload: string) => void;
  apartmentHomeownerNames: HomeownerNameOption[];
  taskReasons: ErpTaskReasons[];
};
