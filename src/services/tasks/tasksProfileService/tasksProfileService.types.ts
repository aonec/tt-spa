import {
  EManagingFirmTaskFilterType,
  EOrderByRule,
  EResourceType,
  ETaskClosingStatus,
  ETaskEngineeringElement,
  ETaskTargetType,
  EStageTimeStatus,
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
  TimeStatus?: EStageTimeStatus;
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

export const EngineeringElementLookUp: {
  [key in ETaskEngineeringElement]: string;
} = {
  [ETaskEngineeringElement.Node]: 'Общедомовой узел учета',
  [ETaskEngineeringElement.IndividualDevice]: 'Индивидуальный прибор учета',
  [ETaskEngineeringElement.HouseNetwork]: 'Общедомовые сети',
};

export const TimeStatusesLookUp: { [key in EStageTimeStatus]: string } = {
  [EStageTimeStatus.Normal]: 'Нормально',
  [EStageTimeStatus.RunningOut]: 'Истекает',
  [EStageTimeStatus.Expired]: 'Просроченно',
};

export const ResourceLookUp: { [key in EResourceType]: string } = {
  [EResourceType.ColdWaterSupply]: 'Холодная вода',
  [EResourceType.HotWaterSupply]: 'Горячая вода',
  [EResourceType.Heat]: 'Тепло',
  [EResourceType.Electricity]: 'Электричество',
};
