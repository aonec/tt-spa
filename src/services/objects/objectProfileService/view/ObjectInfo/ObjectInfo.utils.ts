import moment from 'moment';
import { HousingStockResponse } from 'myApi';

export const getObjectInfoFields = (object: HousingStockResponse) => {
  const {
    address,
    houseType,
    index,
    numberOfFloors,
    numberOfEntrances,
    numberOfApartments,
    isThereElevator,
    totalLivingArea,
    totalArea,
    areaOfNonResidential,
    constructionDate,
  } = object;

  const city = address?.mainAddress?.city || null;
  const constructionYear = moment(constructionDate).format('YYYY');

  return {
    city,
    houseType,
    index,
    numberOfEntrances,
    numberOfFloors,
    isThereElevator,
    numberOfApartments,
    totalLivingArea,
    areaOfNonResidential,
    totalArea,
    constructionYear,
  };
};

export enum ObjectInfoRowTitle {
  city = 'Город',
  houseType = 'Тип дома',
  index = 'Индекс',
  numberOfEntrances = 'Количество подъездов',
  numberOfFloors = 'Количество этажей',
  isThereElevator = 'Наличие лифта',
  numberOfApartments = 'Количество квартир',
  totalLivingArea = 'Общая площадь жилых помещений',
  areaOfNonResidential = 'Площадь нежилых помещений',
  totalArea = 'Общая площадь',
  constructionYear = 'Год постройки',
}
