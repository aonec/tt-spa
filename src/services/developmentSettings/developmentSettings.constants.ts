import { FeatureToggles } from './developmentSettings.types';

export const FeatureTogglesTranslates: {
  [key in keyof FeatureToggles]: string;
} = {
  reportsConstructor: 'Конструктор отчётов',
  workingRanges: 'Рабочие диапазоны',
  dispatcherAddTask: 'Диспетчер: создание заявки',
  services: 'Услуги',
  districtsManage: 'Районы',
  controllersDistribution: 'Распределение контролёров',
  mvitu: 'Интеграция с ВИС МВИТУ',
  workWithReadings: 'Работа с показаниями',
};
