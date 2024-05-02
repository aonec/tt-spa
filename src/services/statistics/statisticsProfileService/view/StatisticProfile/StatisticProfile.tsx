import React, { FC, ReactNode, useMemo } from 'react';
import { TabsSC } from './StatisticProfile.styled';
import { StatisticProfileProps } from './StatisticProfile.types';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { ResourceConsumptionContainer } from 'services/resources/resourceConsumptionService';
import { StatisticProfileGrouptype } from '../../statisticsProfileService.types';
import { SubscribersConsumptionSearchType } from 'services/statistics/subscribersConsumptionService/subscribersConsumptionService.types';
import { SubscribersConsumptionContainer } from 'services/statistics/subscribersConsumptionService';
import { useNavigate } from 'react-router-dom';
import { ResourceDisablingScheduleContainer } from 'services/settings/resourcesDisablingScheduleService/ResourceDisablingSchedule.container';
import { chooseTypeOfResourceDisconnectionModalService } from 'services/resources/chooseTypeOfResourceDisconnectionModalService';

export const StatisticProfile: FC<StatisticProfileProps> = ({
  handleOpenExportStatisticModal,
  setFileName,
  grouptype,
  searchType,
  housingStockId,
  housingStockAddress,
}) => {
  const navigate = useNavigate();

  const menuButtons = useMemo(() => {
    if (grouptype === StatisticProfileGrouptype.disabledResources) {
      return [
        {
          title: 'Создать отключение ресурса',
          onClick:
            chooseTypeOfResourceDisconnectionModalService.inputs.openModal,
        },
      ];
    }
    if (searchType === SubscribersConsumptionSearchType.Houses) {
      return [
        {
          hidden: !Boolean(housingStockId),
          title: 'Выгрузить список квартир',
          onClick: () => {
            const { BuildingNumber, Street } = housingStockAddress;

            if (!housingStockId) {
              return null;
            }

            handleOpenExportStatisticModal(housingStockId);

            if (BuildingNumber && Street) {
              setFileName(`${Street}_${BuildingNumber}`);
            } else {
              setFileName('');
            }
          },
        },
      ];
    }
    return;
  }, [
    grouptype,
    housingStockId,
    handleOpenExportStatisticModal,
    setFileName,
    searchType,
    housingStockAddress,
  ]);

  const tabItems = useMemo(
    () => [
      {
        label: 'Анализ потребления ресурсов',
        key: StatisticProfileGrouptype.resourceConsumption,
      },
      {
        label: 'Учет абонентского потребления',
        key: StatisticProfileGrouptype.subscribersConsumption,
      },
      {
        label: 'Отключение ресурсов',
        key: StatisticProfileGrouptype.disabledResources,
      },
    ],
    [],
  );

  const components: { [key in StatisticProfileGrouptype]: ReactNode } = {
    [StatisticProfileGrouptype.resourceConsumption]: (
      <ResourceConsumptionContainer />
    ),
    [StatisticProfileGrouptype.disabledResources]: (
      <ResourceDisablingScheduleContainer />
    ),
    [StatisticProfileGrouptype.subscribersConsumption]: (
      <SubscribersConsumptionContainer />
    ),
  };

  return (
    <>
      <PageHeader title="Статистика и данные" contextMenu={{ menuButtons }} />

      <TabsSC
        activeKey={grouptype}
        onChange={(value) => navigate(`/statistics/${value}`)}
        items={tabItems}
      />
      {components[grouptype]}
    </>
  );
};
