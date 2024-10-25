import { ConnectionStatuses } from '../connectionAnalysisService.types';

export const PanelTitleDictionary: {
  [key in ConnectionStatuses]: string;
} = {
  [ConnectionStatuses.Success]: 'В норме',
  [ConnectionStatuses.NotPolled]: 'Не опрашивается',
  [ConnectionStatuses.WithError]: 'С ошибкой',
  [ConnectionStatuses.NoArchive]: 'Нет архивов',
};
