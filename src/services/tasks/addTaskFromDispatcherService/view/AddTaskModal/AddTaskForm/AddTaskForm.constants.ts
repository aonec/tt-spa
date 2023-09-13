import { EResourceType } from 'api/types';

export type TaskReasonType = {
  id: string;
  resourceType: EResourceType;
  name: string;
  nomenclatureName: string;
}[];

export const taskReasonData: TaskReasonType = [
  {
    id: 'id1',
    resourceType: EResourceType.ColdWaterSupply,
    name: 'Отсутствие ХВС',
    nomenclatureName: 'Ревизия узла учета горячего и холодного водоснабжения',
  },
  {
    id: 'id2',
    resourceType: EResourceType.Electricity,
    name: 'Отсутствие света в подъезде в домах коридорного типа',
    nomenclatureName: 'Восстновление 1 светоточки',
  },
  {
    id: 'id3',
    resourceType: EResourceType.HotWaterSupply,
    name: 'ГВС',
    nomenclatureName: 'Ревизия узла учета горячего и холодного водоснабжения',
  },
  {
    id: 'id4',
    resourceType: EResourceType.Heat,
    name: 'Отсутствие тепла',
    nomenclatureName: 'Починить батарею',
  },
  {
    id: 'id5',
    resourceType: EResourceType.Heat,
    name: 'Теплота',
    nomenclatureName: 'Включить батарею',
  },
  {
    id: 'id6',
    resourceType: EResourceType.Heat,
    name: 'Холодно',
    nomenclatureName: 'Включить батарею',
  },
  {
    id: 'id7',
    resourceType: EResourceType.Heat,
    name: 'Фанта вместо ХВС',
    nomenclatureName: 'Чинят трубы',
  },
];
