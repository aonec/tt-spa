import {
  EisTaskType,
  ErpSourceResponse,
  ErpTaskReasonGroupResponse,
  ResourceDisconnectingResponse,
} from 'api/types';
import { AddTask } from './AddTaskForm/AddTaskForm.types';
import {
  ExistingApartmentNumberType,
  HomeownerNameOption,
  PreparedAddress,
} from '../../addTaskFromDispatcherService.types';

export type AddTaskModalProps = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  ERPSources: ErpSourceResponse[];
  preparedForOptionsAddresses: PreparedAddress[];
  handleCreateTask: (payload: AddTask) => void;
  isCreatePending: boolean;
  handleSelectHousingAddress: (payload: string) => void;
  existingApartmentNumbers: ExistingApartmentNumberType[];
  resourceDisconnection: ResourceDisconnectingResponse[];
  handleSelectApartmentNumber: (payload: string) => void;
  apartmentHomeownerNames: HomeownerNameOption[];
  taskReasons: ErpTaskReasonGroupResponse[];
  handleSelectTaskReason: (payload: string) => void;
  handleSelectTaskType: (payload: EisTaskType) => void;
};
