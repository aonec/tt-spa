import { TaskPanelComponentAdditionalType } from "../TaskActionsPanel.types";

export const documentComponentDataDictionary = {
  [TaskPanelComponentAdditionalType.EmailTemplate]: {
    lable: 'Загрузить письмо из шаблона',
    maxDocuments: 1,
  },
  Default: {
    lable: 'Загрузить',
    maxDocuments: Infinity,
  },
};
