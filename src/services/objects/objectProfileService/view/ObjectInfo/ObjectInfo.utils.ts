import moment from 'moment';
import { HousingStockResponse } from 'myApi';
import { ObjectInfoRowField } from './ObjectInfo.constants';

export const getObjectInfoFields = (
  object: HousingStockResponse
): { [key in ObjectInfoRowField]: string | number | null } => {
  const {
    address,
    houseTypeString,
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
  const isThereElevatorText = isThereElevator ? 'Есть' : 'Нет';

  return {
    city,
    houseTypeString,
    index,
    numberOfEntrances,
    numberOfFloors,
    isThereElevator: isThereElevatorText,
    numberOfApartments,
    totalLivingArea,
    areaOfNonResidential,
    totalArea,
    constructionYear,
  };
};
