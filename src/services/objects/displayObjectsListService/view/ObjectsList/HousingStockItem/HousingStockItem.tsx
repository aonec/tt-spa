import { ContextMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton';
import { Tooltip } from 'antd';
import React, { FC, useMemo } from 'react';
import { WarningIcon } from 'ui-kit/icons';
import { getBuildingAddress } from 'utils/getBuildingAddress';
import {
  AdditionalAddress,
  Address,
  NumberOfTasks,
  Wrapper,
} from './HousingStockItem.styled';
import { HousingStockItemProps } from './HousingStockItem.types';
import { HouseCategoryDictionary } from 'services/objects/createObjectService/view/CreateObjectPage/CreateObjectMainInfoStage/createObjectMainInfoStage.constants';
import { EHouseCategory } from 'api/types';
import { useHistory } from 'react-router-dom';

export const HousingStockItem: FC<HousingStockItemProps> = ({
  housingStock,
  setSelectedBuilding,
  openConsolidatedReportModal,
  openHeatIndividualDeviceReportModal,
  openResourceDisconnectionReportModal,
}) => {
  const address = getBuildingAddress(housingStock);
  const mainAddress = housingStock.address?.mainAddress;
  const history = useHistory();

  const additionalAddressesString = useMemo(() => {
    const additionalAddresses = housingStock.address?.additionalAddresses || [];

    return additionalAddresses
      .map((elem) => `${elem.street}, ${elem.number}`)
      .join('; ');
  }, [housingStock.address]);

  const numberOfTasks = useMemo(() => {
    return (
      Boolean(housingStock.numberOfTasks) && (
        <NumberOfTasks>
          <WarningIcon /> Задач: {housingStock.numberOfTasks}
        </NumberOfTasks>
      )
    );
  }, [housingStock.numberOfTasks]);

  const buildingProfilePath = useMemo(() => {
    if (housingStock.houseCategory === EHouseCategory.Living) {
      return 'livingProfile';
    }
    return 'nonResidentialProfile';
  }, [housingStock]);

  return (
    <Wrapper to={`/buildings/${buildingProfilePath}/${housingStock.id}`}>
      <div>
        <Address>
          {address}
          {numberOfTasks}
        </Address>
        <Tooltip title={additionalAddressesString}>
          <AdditionalAddress>{additionalAddressesString}</AdditionalAddress>
        </Tooltip>
      </div>
      <div>{mainAddress?.city}</div>
      <div>{HouseCategoryDictionary[housingStock.houseCategory]}</div>
      <div>
        <ContextMenuButton
          size="small"
          menuButtons={[
            {
              title: 'Посмотреть информацию',
              onClick: () =>
                history.push(
                  `/buildings/${buildingProfilePath}/${housingStock.id}`,
                ),
            },
            {
              title: 'Выгрузить сводный отчёт по дому',
              onClick: () => {
                setSelectedBuilding(housingStock);
                openConsolidatedReportModal();
              },
            },
            {
              title: 'Выгрузить сводный отчёт по ИПУ',
              onClick: () => {
                openHeatIndividualDeviceReportModal(housingStock);
              },
            },
            {
              title: 'Создать отключение ресурса на объекте',
              onClick: () => {
                openResourceDisconnectionReportModal(housingStock);
              },
            },
          ]}
        />
      </div>
    </Wrapper>
  );
};
