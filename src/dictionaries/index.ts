import {
  EActType,
  EClosingReason,
  EIndividualDeviceReportOption,
  EMagistralType,
  ENodeCommercialAccountStatus,
  ENodeRegistrationType,
  EResourceType,
  ESwitchingReason,
  ETaskEngineeringElement,
  EisTaskReasonType,
  EisTaskType,
  GroupReportConfigurationReportPeriodType,
  GroupReportConfigurationSendingPeriodType,
  ManagingFirmTaskType,
  ReportType,
  ResourceType,
} from 'api/types';
import { DistrictColor, DistrictColorData } from 'types';

export const MagistralsDisctionary: { [key in EMagistralType]: string } = {
  [EMagistralType.FeedFlow]: 'Подающая',
  [EMagistralType.FeedBackFlow]: 'Обратная',
  [EMagistralType.Recharge]: 'Подпитка',
};

export const ReportOptionsDictionary: {
  [key in EIndividualDeviceReportOption]: string;
} = {
  [EIndividualDeviceReportOption.ClosedDeviceOnOneOfRisers]:
    'Отчет по закрытым приборам на одном из стояков',
  [EIndividualDeviceReportOption.ClosedDevices]: 'Отчет по закрытым приборам',
  [EIndividualDeviceReportOption.DeviceCheckingDateExpiration]:
    'Отчет по выходу поверки приборов',
  [EIndividualDeviceReportOption.InvalidCheckingDates]:
    'Некорректные даты поверки приборов',
  [EIndividualDeviceReportOption.InvalidBitDepth]: 'Отсутствие разрядности',
};

export const ResourceShortNamesDictionary: {
  [key in EResourceType]: string;
} = {
  [EResourceType.ColdWaterSupply]: 'ХВС',
  [EResourceType.HotWaterSupply]: 'ГВС',
  [EResourceType.Electricity]: 'ЭЭ',
  [EResourceType.Heat]: 'Тепло',
};

export const ResourceMapNamesDictionary: {
  [key in EResourceType]: string;
} = {
  [EResourceType.ColdWaterSupply]: 'ХВС',
  [EResourceType.HotWaterSupply]: 'ГВС',
  [EResourceType.Electricity]: 'Электричество',
  [EResourceType.Heat]: 'Отопление',
};

export const TaskReasonTypeDictionary: {
  [key in EisTaskReasonType]: string;
} = {
  [EisTaskReasonType.ColdWaterSupply]: 'ХВС',
  [EisTaskReasonType.HotWaterSupply]: 'ГВС',
  [EisTaskReasonType.Electricity]: 'ЭЭ',
  [EisTaskReasonType.Heat]: 'Отопление',
};

export const ClosingReasonsDictionary: { [key in EClosingReason]: string } = {
  [EClosingReason.Manually]: 'Плановая замена',
  [EClosingReason.DeviceBroken]: 'Поломка',
  [EClosingReason.CertificateIssued]: 'Выдана справка',
  [EClosingReason.ByLetter]: 'Письмо из УК',
  [EClosingReason.NoReadings]: 'Отсутствие показаний',
  [EClosingReason.MaintainingStopped]: 'Остановлено',
  [EClosingReason.CheckingDate]: 'Выход поверки',
  [EClosingReason.None]: 'Нет',
  [EClosingReason.NoMagneticSeal]: 'Отсутствие пломбы',
};

export const SwitchingReasonsDictionary: { [key in ESwitchingReason]: string } =
  {
    [ESwitchingReason.Manually]: 'Плановая замена',
    [ESwitchingReason.DeviceBroken]: 'Поломка',
    [ESwitchingReason.CertificateIssued]: 'Выдана справка',
    [ESwitchingReason.NoReadings]: 'Отсутствие показаний',
    [ESwitchingReason.MaintainingStopped]: 'Остановлено',
    [ESwitchingReason.CheckingDate]: 'Выход поверки',
  };

export const NodeStatusTextDictionary: {
  [key in ENodeCommercialAccountStatus]: string;
} = {
  [ENodeCommercialAccountStatus.NotRegistered]: 'Не на коммерческом учете',
  [ENodeCommercialAccountStatus.Prepared]: 'Подготовлен к сдаче',
  [ENodeCommercialAccountStatus.OnReview]: 'На утверждении',
  [ENodeCommercialAccountStatus.Registered]: 'Сдан на коммерческий учет',
};

export const EngineeringElementLookUp: {
  [key in ETaskEngineeringElement]: string;
} = {
  [ETaskEngineeringElement.Node]: 'Общедомовой узел учета',
  [ETaskEngineeringElement.IndividualDevice]: 'Индивидуальный прибор учета',
  [ETaskEngineeringElement.HouseNetwork]: 'Общедомовые сети',
};

export const NodeRegistrationTypeLookup: {
  [key in ENodeRegistrationType]: string;
} = {
  [ENodeRegistrationType.Commercial]: 'Коммерческий',
  [ENodeRegistrationType.Technical]: 'Технический',
};

export const ResourceNamesDictionary: { [key in EResourceType]: string } = {
  [EResourceType.ColdWaterSupply]: 'Холодное водоснабжение',
  [EResourceType.HotWaterSupply]: 'Горячее водоснабжение',
  [EResourceType.Electricity]: 'Электроснабжение',
  [EResourceType.Heat]: 'Теплоснабжение',
};

export const ActTypesNamesLookup: { [key in EActType]: string } = {
  [EActType.PlannedCheck]: 'Плановая проверка',
  [EActType.UnplannedCheck]: 'Внеплановая проверка',
  [EActType.ResourceDisconnect]: 'Отключение ресурса',
  [EActType.ResourceConnect]: 'Подключение ресурса',
  [EActType.HomeownerAccountCertificate]: 'Справка о лицевом счете',
  [EActType.Admission]: 'Акт допуска',
  [EActType.NonAdmission]: 'Акт недопуска',
};

export const DistrictColorsList: DistrictColorData[] = [
  {
    type: DistrictColor.Blue,
    name: 'Синий',
    color: '#79AFFF4D',
    strokeColor: '#189EE9',
  },
  {
    type: DistrictColor.Violet,
    name: 'Фиолетовый',
    color: '#9254DE4D',
    strokeColor: '#9254DE',
  },
  {
    type: DistrictColor.Yellow,
    name: 'Желтый',
    color: '#E2B1044D',
    strokeColor: '#E2B104',
  },
  {
    type: DistrictColor.Red,
    name: 'Красный',
    color: '#FF8C684D',
    strokeColor: '#FF8C68',
  },
  {
    type: DistrictColor.Green,
    name: 'Зеленый',
    color: '#17B45A4D',
    strokeColor: '#17B45A',
  },
];

export const TaskTypeDictionary: { [key in EisTaskType]: string } = {
  [EisTaskType.Current]: 'Текущая',
  [EisTaskType.Emergency]: 'Аварийная',
};

export const ActTypeDictionary: { [key in EActType]: string } = {
  [EActType.PlannedCheck]: 'Плановая проверка',
  [EActType.UnplannedCheck]: 'Внеплановая проверка',
  [EActType.ResourceDisconnect]: 'Отключение ресурса',
  [EActType.ResourceConnect]: 'Подключение ресурса',
  [EActType.HomeownerAccountCertificate]: 'Справка о лицевом счете',
  [EActType.Admission]: 'Акт допуска',
  [EActType.NonAdmission]: 'Акт недопуска',
};

export const ResourcesNameDictionary: { [key in ResourceType]: string } = {
  [ResourceType.ColdWaterSupply]: 'ХВС',
  [ResourceType.HotWaterSupply]: 'ГВС',
  [ResourceType.Electricity]: 'ЭЭ',
  [ResourceType.Heat]: 'Тепло',
  [ResourceType.None]: 'Нет',
};

export const GroupReportConfigurationReportPeriodTypeDictionary: {
  [key in GroupReportConfigurationReportPeriodType]: string;
} = {
  [GroupReportConfigurationReportPeriodType.LastMonth]: 'За прошлый месяц',
  [GroupReportConfigurationReportPeriodType.StartMonth]: 'С начала месяца',
};

export const GroupReportConfigurationPeriodDictionary: {
  [key in GroupReportConfigurationSendingPeriodType]: string;
} = {
  [GroupReportConfigurationSendingPeriodType.EveryTwoWeeks]: '1 раз в 2 недели',
  [GroupReportConfigurationSendingPeriodType.EveryMonth]: '1 раз в месяц',
  [GroupReportConfigurationSendingPeriodType.EveryQuarter]: '1 раз в квартал',
};

export const ReportTypeDictionary: {
  [key in ReportType]: string;
} = {
  [ReportType.Daily]: 'Суточная',
  [ReportType.Hourly]: 'Часовая',
  [ReportType.None]: 'Нет',
  [ReportType.Monthly]: 'Месячная',
  [ReportType.Total]: 'Общая',
  [ReportType.Current]: 'Текущая',
  [ReportType.TotalCurrent]: 'Текущая общая',
  [ReportType.Events]: 'Событийная',
  [ReportType.Other]: 'Другая',
  [ReportType.Settings]: 'Настройки',
};

export const MalfunctionTypeDictionary: {
  [key in ManagingFirmTaskType]: string;
} = {
  [ManagingFirmTaskType.CalculatorLackOfConnection]:
    'Отсутствие подключения с прибором',
  [ManagingFirmTaskType.CalculatorMalfunction]: 'Неполадки с вычислителем',
  [ManagingFirmTaskType.CalculatorMalfunctionNonCommercial]: '',
  [ManagingFirmTaskType.CurrentApplication]: '',
  [ManagingFirmTaskType.CurrentApplicationUnassigned]: '',
  [ManagingFirmTaskType.EmergencyApplication]: '',
  [ManagingFirmTaskType.EmergencyApplicationUnassigned]: '',
  [ManagingFirmTaskType.HousingDeviceMalfunction]: 'Неполадки с ОДПУ',
  [ManagingFirmTaskType.HousingDeviceMalfunctionNonCommercial]: '',
  [ManagingFirmTaskType.IndividualDeviceCheck]: '',
  [ManagingFirmTaskType.IndividualDeviceCheckNoReadings]: '',
  [ManagingFirmTaskType.IndividualDeviceReadingsCheck]: '',
  [ManagingFirmTaskType.MeasurementErrorCommercial]:
    'Превышение погрешности измерения',
  [ManagingFirmTaskType.MeasurementErrorNonCommercial]: '',
  [ManagingFirmTaskType.PipeRupture]: '',
  [ManagingFirmTaskType.ResourceDisconnecting]: '',
  [ManagingFirmTaskType.RiserNoReadings]: '',
  [ManagingFirmTaskType.TemperatureNormativeDeviation]: '',
};
