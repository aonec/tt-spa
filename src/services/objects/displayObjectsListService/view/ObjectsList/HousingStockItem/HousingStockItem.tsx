import { ContextMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton';
import { Tooltip } from 'ui-kit/shared/Tooltip';
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
import { EHouseCategory, ESecuredIdentityRoleName } from 'api/types';
import { useNavigate } from 'react-router-dom';
import { ContextMenuButtonColor } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';
import { usePermission } from 'hooks/usePermission';

export const HousingStockItem: FC<HousingStockItemProps> = ({
  housingStock,
  setSelectedBuilding,
  openConsolidatedReportModal,
  openHeatIndividualDeviceReportModal,
  openResourceDisconnectionReportModal,
  openDeleteBuildingModal,
}) => {
  const address = getBuildingAddress(housingStock);
  const mainAddress = housingStock.address?.mainAddress;
  const navigate = useNavigate();
  const isAdmin = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  ]);

  const additionalAddressesString = useMemo(() => {
    const additionalAddresses = housingStock.address?.additionalAddresses || [];

    return additionalAddresses
      .map((elem) => {
        const corpusText = elem.corpus ? `, к.${elem.corpus}` : '';
        return `${elem.street}, ${elem.number}${corpusText}`;
      })
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
                navigate(
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
            {
              title: 'Удалить дом',
              color: ContextMenuButtonColor.danger,
              onClick: () => openDeleteBuildingModal(housingStock),
              hidden: !isAdmin,
            },
          ]}
        />
      </div>
    </Wrapper>
  );
};
