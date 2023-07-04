import {
  EActType,
  EClosingReason,
  EIndividualDeviceReportOption,
  EMagistralType,
  ENodeCommercialAccountStatus,
  ENodeRegistrationType,
  EResourceType,
  ETaskEngineeringElement,
} from 'myApi';
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
  [EIndividualDeviceReportOption.SkippedReadingOnOneOfRisers]:
    'Отчет по пропущенным показаниям на одном из стояков',
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

export const ClosingReasonsDictionary: { [key in EClosingReason]: string } = {
  [EClosingReason.Manually]: 'Плановая замена',
  [EClosingReason.DeviceBroken]: 'Поломка',
  [EClosingReason.CertificateIssued]: 'Выдана справка',
  [EClosingReason.ByLetter]: 'Письмо из УК',
  [EClosingReason.NoReadings]: 'Отсутствие показаний',
  [EClosingReason.MaintainingStopped]: 'Остановлено',
  [EClosingReason.CheckingDate]: 'Выход даты поверки',
  [EClosingReason.None]: 'Нет',
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
