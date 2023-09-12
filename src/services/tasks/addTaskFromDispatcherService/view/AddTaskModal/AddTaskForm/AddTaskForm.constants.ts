import { EResourceType } from 'api/types';

export const petitionData = [
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
    name: 'Теплишко',
    nomenclatureName: 'Починить батарею',
  },
  {
    id: 'id5',
    resourceType: EResourceType.Heat,
    name: 'Теплата',
    nomenclatureName: 'Включить батарею',
  },
];
