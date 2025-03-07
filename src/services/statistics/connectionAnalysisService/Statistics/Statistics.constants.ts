import { ConnectionStatuses } from '../connectionAnalysisService.types';

export const PanelTitleDictionary: {
  [key in ConnectionStatuses]: string;
} = {
  [ConnectionStatuses.Success]: 'В норме',
  [ConnectionStatuses.NotPolling]: 'Не опрашивается',
  [ConnectionStatuses.Error]: 'С ошибкой',
  [ConnectionStatuses.NoArchives]: 'Нет архивов',
};
