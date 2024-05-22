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
import { Event } from 'effector';

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
  selectedTaskReasonOption: ErpTaskReasonGroupResponse | null;
  handleChangeSubscriberName: (payload: string | null) => void;
  handleChangePhoneNumber: (payload: string | null) => void;
  isSavePhoneNumberOpen: boolean;
  handleReplacePhoneNumber: () => void;
  handleClosePhoneNumber: () => void;
  onSuccessSavePhone: Event<void>;
  existingCities: string[] | null;
  defaultCity: string | null;
  handleChangeCity: (payload: string) => void;
};
