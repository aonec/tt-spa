import React, { FC } from 'react';
import { Wrapper } from './HousingStockInfo.styled';
import { HousingStockInfoProps } from './HousingStockInfo.types';
import { CommonInfo } from 'ui-kit/shared/CommonInfo';
import {
  ElevatorDictionary,
  getElevatorType,
} from '../../../createObjectService/view/CreateObjectPage/CreateObjectFinalStageModal/CreateObjectFinalStageModal.constants';
import { ObjectDisconnectionAlerts } from 'services/objects/ObjectDisconnectionAlerts';

export const HousingStockInfo: FC<HousingStockInfoProps> = ({
  housingStock,
  resourceDisconnections,
}) => {
  return (
    <>
      <ObjectDisconnectionAlerts disconnections={resourceDisconnections} />
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
              value:
                ElevatorDictionary[
                  getElevatorType(housingStock.isThereElevator)
                ],
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
    </>
  );
};
