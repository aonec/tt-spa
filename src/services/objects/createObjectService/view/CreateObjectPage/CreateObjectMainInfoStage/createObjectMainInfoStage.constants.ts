import {
  EHouseCategory,
  ELivingHouseType,
  ENonResidentialHouseType,
} from 'myApi';
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  houseManagement: yup.string().nullable().required('Обязательное поле'),
  objectCategotry: yup.string().nullable().required('Обязательное поле'),
  livingHouseType: yup.string().nullable(),
  nonResidentialHouseType: yup.string().nullable(),
  heatingStation: yup.string(),
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
  [ENonResidentialHouseType.Social]: 'Социальное помещение',
  [ENonResidentialHouseType.Commercial]: 'Коммерческое помещение',
};
