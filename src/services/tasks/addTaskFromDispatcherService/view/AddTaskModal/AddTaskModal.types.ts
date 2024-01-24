import {
  EisTaskType,
  ErpSourceResponse,
  ErpTaskReasonGroupResponse,
  ErpTaskReasonItemResponse,
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
  isManualDeadlineRequired: boolean;
  selectedTaskReasonOption: ErpTaskReasonItemResponse[];
  handleChangeSubscriberName: (payload: string | null) => void;
  handleChangePhoneNumber: (payload: string | null) => void;
  isSavePhoneNumberOpen: boolean;
  handleReplacePhoneNumber: () => void;
  handleClosePhoneNumber: () => void;
};
