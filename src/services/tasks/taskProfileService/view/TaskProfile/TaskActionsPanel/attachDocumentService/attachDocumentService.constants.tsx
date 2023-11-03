import { TaskPanelComponentAdditionalType } from '../TaskActionsPanel.types';

export const documentComponentDataDictionary: {
  [key: string]: { lable: string; maxDocuments: number };
} = {
  [TaskPanelComponentAdditionalType.EmailTemplate]: {
    lable: 'Загрузить письмо из шаблона',
    maxDocuments: 1,
  },
  [TaskPanelComponentAdditionalType.CurrentApplication]: {
    lable: 'Загрузить акт',
    maxDocuments: Infinity,
  },
  Default: {
    lable: 'Загрузить',
    maxDocuments: Infinity,
  },
};
