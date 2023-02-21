import {
  EClosingReason,
  EIndividualDeviceReportOption,
  EMagistralType,
  ENodeCommercialAccountStatus,
  EResourceType,
} from 'myApi';

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
    'Некорректные даты повероки приборов',
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
