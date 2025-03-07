import { ECalculatorConnectionGroupType } from 'api/types';

export const PanelTitleDictionary: {
  [key in ECalculatorConnectionGroupType]: string;
} = {
  [ECalculatorConnectionGroupType.Success]: 'В норме',
  [ECalculatorConnectionGroupType.NotPolling]: 'Не опрашивается',
  [ECalculatorConnectionGroupType.Error]: 'С ошибкой',
  [ECalculatorConnectionGroupType.NoArchives]: 'Нет архивов',
};
