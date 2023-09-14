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

export type SubscriberType = {
  id: string;
  firstName: string;
  lastName: string;
  surname: string;
  address: string;
  apartmentNumber: string;
}[];

export const subscriberData: SubscriberType = [
  {
    id: '1',
    firstName: 'Петр',
    lastName: 'Иванов',
    surname: 'Сергеевич',
    address: '50 лет Октября 116 к5',
    apartmentNumber: '4',
  },
  {
    id: '2',
    firstName: 'Иван',
    lastName: 'Макаров',
    surname: 'Алексеевич',
    address: '50 лет Октября 112',
    apartmentNumber: '11',
  },
  {
    id: '3',
    firstName: 'Олег',
    lastName: 'Яшин',
    surname: 'Иванович',
    address: 'Советская 1',
    apartmentNumber: '44',
  },
];


