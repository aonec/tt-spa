import {
  EManagingFirmTaskFilterType,
  EOrderByRule,
  EResourceType,
  ETaskClosingStatus,
  ETaskEngineeringElement,
  ETaskTargetType,
  ETaskTimeStatus,
  TaskGroupingFilter,
} from 'myApi';

export type GetTasksListRequestPayload = {
  TargetType?: ETaskTargetType;
  TaskId?: string;
  TaskType?: EManagingFirmTaskFilterType | null;
  HouseManagementId?: string;
  GroupType?: TaskGroupingFilter;
  DeviceId?: number;
  HousingStockId?: number;
  ApartmentId?: number;
  HasChanged?: boolean;
  PipeNodeId?: number;
  ClosingStatuses?: ETaskClosingStatus[];
  ApplicationCompetenceId?: string;
  TimeStatus?: ETaskTimeStatus;
  PerpetratorId?: number;
  Resource?: EResourceType;
  EngineeringElement?: ETaskEngineeringElement;
  City?: string;
  Street?: string;
  HousingStockNumber?: string;
  Corpus?: string;
  ApartmentNumber?: string;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
};

export function getEngineeringElement(type: ETaskEngineeringElement) {
  const types: { [Kye in ETaskEngineeringElement]: string } = {
    [ETaskEngineeringElement.Node]: 'Узел учета',
    [ETaskEngineeringElement.IndividualDevice]: 'Индивидуальный прибор учета',
  };

  return types[type];
}

export function getTimeStatuses(type: ETaskTimeStatus) {
  const types: { [key in ETaskTimeStatus]: string } = {
    [ETaskTimeStatus.Normal]: 'Нормально',
    [ETaskTimeStatus.RunningOut]: 'Истекает',
    [ETaskTimeStatus.Expired]: 'Просроченно',
  };

  return types[type];
}

export function getResource(type: EResourceType) {
  const types: { [key in EResourceType]: string } = {
    [EResourceType.ColdWaterSupply]: 'Холодная вода',
    [EResourceType.HotWaterSupply]: 'Горячая вода',
    [EResourceType.Heat]: 'Тепло',
    [EResourceType.Electricity]: 'Электричество',
  };

  return types[type];
}
