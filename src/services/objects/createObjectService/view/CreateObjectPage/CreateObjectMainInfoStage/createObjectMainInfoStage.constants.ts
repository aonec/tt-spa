import {
  EHouseCategory,
  ELivingHouseType,
  ENonResidentialHouseType,
} from 'api/types';
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  houseManagement: yup.string().nullable(),
  objectCategory: yup.string().nullable().required('Обязательное поле'),

  livingHouseType: yup
    .string()
    .nullable()
    .when('objectCategory', {
      is: EHouseCategory.Living,
      then: (schema) => schema.required('Обязательное поле'),
    }),

  nonResidentialHouseType: yup
    .string()
    .nullable()
    .when('objectCategory', {
      is: EHouseCategory.NonResidential,
      then: (schema) => schema.required('Обязательное поле'),
    }),

  heatingStationId: yup.string().nullable().required('Обязательное поле'),
});

export const HouseCategoryDictionary: { [key in EHouseCategory]: string } = {
  [EHouseCategory.Living]: 'Жилое',
  [EHouseCategory.NonResidential]: 'Нежилое',
};

export const LivingHouseTypeDictionary: {
  [key in ELivingHouseType]: string;
} = {
  [ELivingHouseType.ApartmentHouse]: 'Многоквартирный дом',
  [ELivingHouseType.Private]: 'Частный дом',
  [ELivingHouseType.Townhouse]: 'Таунхаус',
};

export const NonResidentialHouseTypeDictionary: {
  [key in ENonResidentialHouseType]: string;
} = {
  [ENonResidentialHouseType.None]: 'Не выбрано',
  [ENonResidentialHouseType.Social]: 'Социальное помещение',
  [ENonResidentialHouseType.Commercial]: 'Коммерческое помещение',
};
