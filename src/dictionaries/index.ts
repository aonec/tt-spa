import {
  EIndividualDeviceReportOption,
  EMagistralType,
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
