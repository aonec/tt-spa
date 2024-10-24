import { PanelTitle } from './Statistics.types';

export const PanelTitleDictionary: {
  [key in PanelTitle]: string;
} = {
  [PanelTitle.Normal]: 'В норме',
  [PanelTitle.NotPolled]: 'Не опрашиваются',
  [PanelTitle.Error]: 'С ошибкой',
  [PanelTitle.NoArchives]: 'Нет архивов',
};
