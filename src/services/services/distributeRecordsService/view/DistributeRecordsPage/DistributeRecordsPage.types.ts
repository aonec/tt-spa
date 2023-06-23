import {
  AppointmentResponse,
  AppointmentsSetRequest,
  ControllerResponse,
  DistrictResponse,
} from 'myApi';
import { AppointmentsByHousingStocks } from './DistrictsMap/DistrictsMap.types';
import { AppointmentsCountingByDistrictsResponse } from '../../distributeRecordsService.types';
import { AppointmentsIdWithController } from './DistributeAppointmentsPanel/DistributeAppointmentsPanel.types';

export type Props = {
  districtsList: DistrictResponse[];
  isLoadingDistricts: boolean;
  handleSelectDistrict: (payload: string) => void;
  handleUnselectDistrict: () => void;
  selectedDistrict: string | null;
  handleSetAppointmentDate: (date: string) => void;
  appointmentDate: string | null;
  appointmentsInDistrict: AppointmentResponse[] | null;
  isLoadingAppointments: boolean;
  handleSelectHousingStock: (data: AppointmentsByHousingStocks) => void;
  selectedAppointmentsIds: AppointmentsIdWithController[];
  handleSelectAppointments: (ids: AppointmentsIdWithController[]) => void;
  appointmentsCounting: AppointmentsCountingByDistrictsResponse | null;
  openDistributeAppointmentsModal: () => void;
  closeDistributeAppointmentsModal: () => void;
  isDistributeAppointmentsModalOpen: boolean;
  controllers: ControllerResponse[] | null;
  openCreateControllerModal: () => void;
  setAppointmentsToController: (payload: AppointmentsSetRequest) => void;
  isLoadingDistributeAppointments: boolean;
};
