import React, { FC } from 'react';
import { CommonInfoSC } from './NonResidentialBuildingInfo.styled';
import { NonResidentialBuildingInfoProps } from './NonResidentialBuildingInfo.types';
import {
  ElevatorDictionary,
  getElevatorType,
} from 'services/objects/createObjectService/view/CreateObjectPage/CreateObjectFinalStageModal/CreateObjectFinalStageModal.constants';

export const NonResidentialBuildingInfo: FC<
  NonResidentialBuildingInfoProps
> = ({ nonResidentialBuilding }) => {
  if (!nonResidentialBuilding) {
    return null;
  }
  return (
    <CommonInfoSC
      items={[
        {
          key: 'Управляющая компания',
          value: nonResidentialBuilding.managementFirmName,
        },
        {
          key: 'Категория здания',
          value: nonResidentialBuilding.houseTypeString,
        },
        {
          key: 'Тепловой пункт',
          value: nonResidentialBuilding.heatingStation?.name,
        },
        {
          key: 'Индивидуальный тепловой пункт',
          value: nonResidentialBuilding.hasIndividualHeatingStation
            ? 'Есть'
            : 'Нет',
        },

        {
          key: 'Общая площадь',
          value: nonResidentialBuilding.totalArea
            ? `${nonResidentialBuilding.totalArea} м²`
            : '-',
        },
        {
          key: 'Площадь придомовой территории',
          value: nonResidentialBuilding.houseArea
            ? `${nonResidentialBuilding.houseArea} м²`
            : '-',
        },
        {
          key: 'Год постройки',
          value: nonResidentialBuilding.constructionYear,
        },
        {
          key: 'Количество этажей',
          value: nonResidentialBuilding.numberOfFloors,
        },
        {
          key: 'Наличие лифта',
          value:
            ElevatorDictionary[
              getElevatorType(nonResidentialBuilding.isThereElevator)
            ],
        },
      ]}
    />
  );
};
