import React, { FC } from 'react';
import { Wrapper } from './ObjectInfo.styled';
import { ObjectInfoProps } from './ObjectInfo.types';
import { CommonInfo } from 'ui-kit/shared_components/CommonInfo';

export const ObjectInfo: FC<ObjectInfoProps> = ({ housingStock }) => {
  return (
    <Wrapper>
      <CommonInfo
        items={[
          {
            key: 'Город',
            value: housingStock.address?.mainAddress?.city,
          },
          {
            key: 'Домоуправление',
            value: housingStock.houseManagement?.name,
          },
          {
            key: 'Категория и тип здания',
            value: housingStock.houseTypeString,
          },
          {
            key: 'Количество этажей',
            value: housingStock.numberOfFloors,
          },
          {
            key: 'Наличие лифта',
            value: housingStock.isThereElevator,
          },
          {
            key: 'Количество квартир',
            value: housingStock.numberOfApartments,
          },
          {
            key: 'Общая площадь жилых помещений',
            value: housingStock.totalLivingArea,
          },
          {
            key: 'Общая площадь',
            value: housingStock.totalArea,
          },
          {
            key: 'Тепловой пункт',
            value: housingStock.heatingStation?.name,
          },
        ]}
      />
    </Wrapper>
  );
};
