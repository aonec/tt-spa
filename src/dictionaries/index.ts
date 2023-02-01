import { EIndividualDeviceReportOption, EMagistralType } from 'myApi';

export const MagistralsDisctionary: { [key in EMagistralType]: string } = {
  [EMagistralType.FeedFlow]: 'Подающая',
  [EMagistralType.FeedBackFlow]: 'Обратная',
  [EMagistralType.Recharge]: 'Подпитка',
};

export const ReportOptionsDictionary: {
  [key in EIndividualDeviceReportOption]: string;
} = {
  [EIndividualDeviceReportOption.ClosedDeviceOnOneOfRisers]:
    'Закрытые на одном из стояков',
  [EIndividualDeviceReportOption.ClosedDevices]: 'Закрытые приборы',
  [EIndividualDeviceReportOption.DeviceCheckingDateExpiration]:
    'Дата выхода поверки прибора',
  [EIndividualDeviceReportOption.InvalidCheckingDates]:
    'Некорректные даты поверок',
  [EIndividualDeviceReportOption.SkippedReadingOnOneOfRisers]:
    'Пропущенное показание на одном из стояков',
};
