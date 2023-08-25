import { EIndividualDeviceReadingsSource } from 'api/types';

export const ReadingNameToSourceDictionary: {
  [key: string]: EIndividualDeviceReadingsSource;
} = {
  Госуслуги: EIndividualDeviceReadingsSource.GosUslugi,
  Банк: EIndividualDeviceReadingsSource.Bank,
  ЕРЦ: EIndividualDeviceReadingsSource.Erc,
  'Телеграм бот': EIndividualDeviceReadingsSource.TelegramBot,
};
