import {
  EHouseCategory,
  ELivingHouseType,
  ENonResidentialHouseType,
} from 'myApi';
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  houseManagement: yup.string().nullable(true),
  objectCategory: yup.string().nullable().required('Обязательное поле'),

  livingHouseType: yup
    .string()
    .nullable()
    .when('objectCategory', {
      is: EHouseCategory.Living,
      then: yup.string().required('Обязательное поле'),
    }),

  nonResidentialHouseType: yup
    .string()
    .nullable()
    .when('objectCategory', {
      is: EHouseCategory.NonResidential,
      then: yup.string().required('Обязательное поле'),
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
  [ELivingHouseType.None]: 'Не выбрано',
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
