import { PageHeader } from '01/shared/ui/PageHeader';
import { Tabs } from 'antd';
import { useForm } from 'effector-forms/dist';
import { useEvent, useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { useHistory, useParams } from 'react-router';
import { SubscribersConsumption } from './subscribersConsumption';
import { exportSubscribersConsumptionService } from './subscribersConsumption/exportSubscribersConsumptionService';
import {
  $selectedHousingsStockId,
  subscribersConsumptionFindForm,
} from './subscribersConsumption/models';
import { SubscribersConsumptionSearchType } from './subscribersConsumption/subscribersConsumption.types';

const { TabPane } = Tabs;

export const StatisticsPage = () => {
  const history = useHistory();
  const { grouptype, searchType } = useParams<{
    grouptype: string;
    searchType: string;
  }>();
  const selectedHousingStockId = useStore($selectedHousingsStockId);
  const { fields } = useForm(subscribersConsumptionFindForm);

  const handleOpenExportStatisticModal = useEvent(
    exportSubscribersConsumptionService.inputs.openModal
  );
  const setFileName = useEvent(
    exportSubscribersConsumptionService.inputs.setFileName
  );

  const menuButtons =
    searchType === SubscribersConsumptionSearchType.Houses
      ? [
          {
            hidden: !Boolean(selectedHousingStockId),
            title: 'Выгрузить список квартир',
            onClick: () => {
              const { house, street } = fields;
              handleOpenExportStatisticModal(selectedHousingStockId);
              if (house && street) {
                setFileName(`${street.value}_${house.value}`);
              } else {
                setFileName('');
              }
            },
          },
        ]
      : undefined;

  return (
    <div>
      <PageHeader title="Статистика" contextMenu={{ menuButtons }} />

      <Tabs
        activeKey={grouptype}
        onChange={(value) => history.push(`/statistics/${value}`)}
      >
        <TabPane
          style={{ overflow: 'none' }}
          tab="Учет абонентского потребления"
          key="subscribersConsumption"
        >
          <SubscribersConsumption />
        </TabPane>
        <TabPane tab="Анализ количества задач" key="tasks"></TabPane>
        <TabPane
          tab="Анализ потребления ресурсов"
          key="resourceConsumption"
        ></TabPane>
      </Tabs>
    </div>
  );
};
