import {
  ErpExecutorResponse,
  ErpSourceResponse,
  ResourceDisconnectingResponse,
} from 'api/types';
import { AddTask } from './AddTaskForm/AddTaskForm.types';
import {
  ErpTaskReasons,
  ExistingApartmentNumberType,
  HomeownerNameOption,
  PreparedAddress,
} from '../../addTaskFromDispatcherService.types';

export type AddTaskModalProps = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  ERPSources: ErpSourceResponse[];
  preparedForOptionsAddresses: PreparedAddress[];
  leadExecutors: ErpExecutorResponse[];
  handleCreateTask: (payload: AddTask) => void;
  choоseLeadExecutor: (payload: string) => void;
  executors: ErpExecutorResponse[];
  isCreatePending: boolean;
  handleSelectHousingAddress: (payload: string) => void;
  existingApartmentNumbers: ExistingApartmentNumberType[];
  resourceDisconnection: ResourceDisconnectingResponse[];
  handleSelectApartmentNumber: (payload: string) => void;
  apartmentHomeownerNames: HomeownerNameOption[];
  taskReasons: ErpTaskReasons[];
  handleSelectTaskReason: (payload: string) => void;
};
