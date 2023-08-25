import React, { FC, useMemo } from 'react';
import { TabsSC } from './StatisticProfile.styled';
import { StatisticProfileProps } from './StatisticProfile.types';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { ResourceConsumptionContainer } from 'services/resources/resourceConsumptionService';
import { StatisticProfileGrouptype } from '../../statisticsProfileService.types';
import { SubscribersConsumptionSearchType } from 'services/statistics/subscribersConsumptionService/subscribersConsumptionService.types';
import { SubscribersConsumptionContainer } from 'services/statistics/subscribersConsumptionService';
import { useHistory } from 'react-router-dom';
import { ResourceDisablingScheduleContainer } from 'services/settings/resourcesDisablingScheduleService/ResourceDisablingScheduleContainer';
import { chooseTypeOfResourceDisconnectionModalService } from 'services/resources/chooseTypeOfResourceDisconnectionModalService';
const { TabPane } = TabsSC;

export const StatisticProfile: FC<StatisticProfileProps> = ({
  handleOpenExportStatisticModal,
  setFileName,
  grouptype,
  searchType,
  housingStockId,
  housingStockAddress,
}) => {
  const history = useHistory();

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

  return (
    <>
      <PageHeader title="Статистика" contextMenu={{ menuButtons }} />

      <TabsSC
        activeKey={grouptype}
        onChange={(value) => history.push(`/statistics/${value}`)}
      >
        <TabPane
          tab="Анализ потребления ресурсов"
          key={StatisticProfileGrouptype.resourceConsumption}
        >
          <ResourceConsumptionContainer />
        </TabPane>
        <TabPane
          style={{ overflow: 'none' }}
          tab="Учет абонентского потребления"
          key={StatisticProfileGrouptype.subscribersConsumption}
        >
          <SubscribersConsumptionContainer />
        </TabPane>

        <TabPane
          tab="Отключение ресурсов"
          key={StatisticProfileGrouptype.disabledResources}
        >
          <ResourceDisablingScheduleContainer />
        </TabPane>
      </TabsSC>
    </>
  );
};
