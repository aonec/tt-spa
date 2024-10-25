import { EConnectionStatusType } from 'api/types';

export const PanelTitleDictionary: {
  [key in EConnectionStatusType]: string;
} = {
  [EConnectionStatusType.Success]: 'В норме',
  [EConnectionStatusType.NoConnection]: 'Нет связи',
  [EConnectionStatusType.DeviceMalfunction]: 'Прибор неисправен',
  [EConnectionStatusType.UnstableConnection]: 'Нестабильная связь',
  [EConnectionStatusType.Unknown]: 'Не опрашивается',
};
