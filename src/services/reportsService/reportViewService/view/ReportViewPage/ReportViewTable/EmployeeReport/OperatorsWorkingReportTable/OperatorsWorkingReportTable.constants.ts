import { EIndividualDeviceReadingsSource } from 'myApi';

export const ReadingNameToSourceDictionary: {
  [key: string]: EIndividualDeviceReadingsSource;
} = {
  Госуслуги: EIndividualDeviceReadingsSource.GosUslugi,
  Банк: EIndividualDeviceReadingsSource.Bank,
  ЕРЦ: EIndividualDeviceReadingsSource.Erc,
  'Телеграм бот': EIndividualDeviceReadingsSource.TelegramBot,
};
